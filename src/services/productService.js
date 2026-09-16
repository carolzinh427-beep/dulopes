import {
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from '../lib/firebase';
import { products as initialProducts } from '../data/companyData';

const COLLECTION_NAME = 'produtos';

/**
 * Real-time subscription for Public Site (only active products)
 */
export function subscribePublicProducts(callback) {
  if (!isFirebaseConfigured) {
    callback(initialProducts);
    return () => {};
  }

  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('ativo', '!=', false)
    );

    return onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        callback(initialProducts);
      } else {
        const productList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // Sort by ordem if available
        productList.sort((a, b) => (a.ordem || 99) - (b.ordem || 99));
        callback(productList);
      }
    }, (error) => {
      console.warn("Firestore listener fallback to initial products:", error);
      callback(initialProducts);
    });
  } catch (err) {
    console.warn("Firestore error fallback:", err);
    callback(initialProducts);
    return () => {};
  }
}

/**
 * Real-time subscription for Admin Dashboard (all products: active and hidden)
 */
export function subscribeAllProductsAdmin(callback) {
  if (!isFirebaseConfigured) {
    callback(initialProducts.map(p => ({ ...p, ativo: p.ativo !== false })));
    return () => {};
  }

  try {
    const colRef = collection(db, COLLECTION_NAME);
    return onSnapshot(colRef, (snapshot) => {
      if (snapshot.empty) {
        callback(initialProducts.map(p => ({ ...p, ativo: p.ativo !== false })));
      } else {
        const productList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        productList.sort((a, b) => (a.ordem || 99) - (b.ordem || 99));
        callback(productList);
      }
    }, (error) => {
      console.error("Admin Firestore listener error:", error);
      callback(initialProducts);
    });
  } catch (err) {
    console.error("Admin Firestore error:", err);
    callback(initialProducts);
    return () => {};
  }
}

/**
 * Add or Update a Product
 */
export async function saveProduct(productData) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase não está configurado. Adicione as variáveis de ambiente na Vercel.");
  }

  const payload = {
    nome: productData.nome || '',
    categoria: productData.categoria || 'maquinas',
    categoriasSecundarias: productData.categoriasSecundarias || [],
    descricao: productData.descricao || '',
    descricaoCompleta: productData.descricaoCompleta || '',
    imagens: productData.imagens || [],
    preco: productData.preco || null,
    status: productData.status || 'Pronta Entrega',
    ativo: productData.ativo !== false,
    destaque: Boolean(productData.destaque),
    especificacoes: productData.especificacoes || {},
    ordem: Number(productData.ordem) || 1,
    atualizadoEm: serverTimestamp()
  };

  if (productData.id && typeof productData.id === 'string' && !productData.isNew) {
    const docRef = doc(db, COLLECTION_NAME, productData.id);
    await updateDoc(docRef, payload);
    return productData.id;
  } else {
    payload.criadoEm = serverTimestamp();
    const docRef = await addDoc(collection(db, COLLECTION_NAME), payload);
    return docRef.id;
  }
}

/**
 * Toggle active/hidden status of a product
 */
export async function toggleProductActiveStatus(id, currentAtivoState) {
  if (!isFirebaseConfigured) return;
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    ativo: !currentAtivoState,
    atualizadoEm: serverTimestamp()
  });
}

/**
 * Delete a product document
 */
export async function deleteProduct(id) {
  if (!isFirebaseConfigured) return;
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}

/**
 * Upload Image to Firebase Storage
 */
export async function uploadProductImage(file, onProgress) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase Storage não configurado. Verifique as variáveis de ambiente.");
  }

  const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `produtos_imagens/${Date.now()}_${cleanFileName}`;
  const imageRef = ref(storage, storagePath);

  const uploadTask = uploadBytesResumable(imageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(Math.round(progress));
      },
      (error) => {
        console.error("Erro no upload de imagem:", error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}

/**
 * Seed initial sample products to Firestore
 */
export async function seedInitialProductsToFirestore() {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase não configurado.");
  }

  for (const item of initialProducts) {
    const docRef = doc(db, COLLECTION_NAME, item.id);
    await setDoc(docRef, {
      ...item,
      ativo: true,
      criadoEm: serverTimestamp(),
      atualizadoEm: serverTimestamp()
    }, { merge: true });
  }
}
