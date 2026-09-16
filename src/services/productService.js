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
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from '../lib/firebase';
import { products as initialProducts } from '../data/companyData';

const COLLECTION_NAME = 'products';

/**
 * Standardize Firestore Product Object
 */
function formatProduct(docSnapshot) {
  const data = docSnapshot.data();
  const id = docSnapshot.id;

  const images = data.images || data.imagens || [];
  const mainImage = data.mainImage || (images.length > 0 ? images[0] : '/images/hero_equipment.jpg');
  const status = data.status === 'inactive' || data.ativo === false ? 'inactive' : 'active';

  return {
    id,
    name: data.name || data.nome || '',
    nome: data.name || data.nome || '',
    description: data.description || data.descricao || '',
    descricao: data.description || data.descricao || '',
    fullDescription: data.fullDescription || data.descricaoCompleta || data.description || data.descricao || '',
    descricaoCompleta: data.fullDescription || data.descricaoCompleta || data.description || data.descricao || '',
    category: data.category || data.categoria || 'maquinas',
    categoria: data.category || data.categoria || 'maquinas',
    price: data.price !== undefined ? data.price : (data.preco !== undefined ? data.preco : null),
    preco: data.price !== undefined ? data.price : (data.preco !== undefined ? data.preco : null),
    status, // "active" | "inactive"
    mainImage,
    images: images.length > 0 ? images : [mainImage],
    imagens: images.length > 0 ? images : [mainImage],
    active: status === 'active',
    ativo: status === 'active',
    highlight: Boolean(data.highlight || data.destaque),
    destaque: Boolean(data.highlight || data.destaque),
    specifications: data.specifications || data.especificacoes || {},
    especificacoes: data.specifications || data.especificacoes || {},
    order: data.order || data.ordem || 1,
    ordem: data.order || data.ordem || 1,
    createdAt: data.createdAt || data.criadoEm || null,
    updatedAt: data.updatedAt || data.atualizadoEm || null
  };
}

/**
 * Subscribe to Public Site Products (ONLY status === 'active')
 */
export function subscribePublicProducts(callback) {
  if (!isFirebaseConfigured) {
    callback(initialProducts.map(p => ({
      ...p,
      name: p.nome,
      description: p.descricao,
      category: p.categoria,
      price: p.preco,
      mainImage: p.imagens[0],
      images: p.imagens,
      status: 'active',
      active: true
    })));
    return () => {};
  }

  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', 'active')
    );

    return onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        callback(initialProducts.map(p => ({
          ...p,
          name: p.nome,
          description: p.descricao,
          category: p.categoria,
          price: p.preco,
          mainImage: p.imagens[0],
          images: p.imagens,
          status: 'active',
          active: true
        })));
      } else {
        const productList = snapshot.docs.map(formatProduct);
        productList.sort((a, b) => (a.order || 99) - (b.order || 99));
        callback(productList);
      }
    }, (error) => {
      console.warn("Firestore public listener fallback:", error);
      callback(initialProducts.map(p => ({
        ...p,
        name: p.nome,
        description: p.descricao,
        category: p.categoria,
        price: p.preco,
        mainImage: p.imagens[0],
        images: p.imagens,
        status: 'active',
        active: true
      })));
    });
  } catch (err) {
    console.warn("Firestore public error:", err);
    callback(initialProducts);
    return () => {};
  }
}

/**
 * Subscribe to Admin Dashboard Products (both active & inactive)
 */
export function subscribeAllProductsAdmin(callback) {
  if (!isFirebaseConfigured) {
    callback(initialProducts.map(p => ({
      ...p,
      name: p.nome,
      description: p.descricao,
      category: p.categoria,
      price: p.preco,
      mainImage: p.imagens[0],
      images: p.imagens,
      status: 'active',
      active: true
    })));
    return () => {};
  }

  try {
    const colRef = collection(db, COLLECTION_NAME);
    return onSnapshot(colRef, (snapshot) => {
      if (snapshot.empty) {
        callback(initialProducts.map(p => ({
          ...p,
          name: p.nome,
          description: p.descricao,
          category: p.categoria,
          price: p.preco,
          mainImage: p.imagens[0],
          images: p.imagens,
          status: 'active',
          active: true
        })));
      } else {
        const productList = snapshot.docs.map(formatProduct);
        productList.sort((a, b) => (a.order || 99) - (b.order || 99));
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
 * Create or Update Product in Firestore 'products'
 */
export async function saveProduct(productData) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase não está configurado.");
  }

  const imagesList = productData.images || productData.imagens || [];
  const mainImg = productData.mainImage || (imagesList.length > 0 ? imagesList[0] : '/images/hero_equipment.jpg');
  const isInactive = productData.status === 'inactive' || productData.active === false || productData.ativo === false;
  const finalStatus = isInactive ? 'inactive' : 'active';

  const payload = {
    name: productData.name || productData.nome || '',
    nome: productData.name || productData.nome || '',
    description: productData.description || productData.descricao || '',
    descricao: productData.description || productData.descricao || '',
    fullDescription: productData.fullDescription || productData.descricaoCompleta || '',
    descricaoCompleta: productData.fullDescription || productData.descricaoCompleta || '',
    category: productData.category || productData.categoria || 'maquinas',
    categoria: productData.category || productData.categoria || 'maquinas',
    price: productData.price !== undefined ? productData.price : (productData.preco !== undefined ? productData.preco : null),
    preco: productData.price !== undefined ? productData.price : (productData.preco !== undefined ? productData.preco : null),
    status: finalStatus,
    active: finalStatus === 'active',
    ativo: finalStatus === 'active',
    mainImage: mainImg,
    images: imagesList,
    imagens: imagesList,
    highlight: Boolean(productData.highlight || productData.destaque),
    destaque: Boolean(productData.highlight || productData.destaque),
    specifications: productData.specifications || productData.especificacoes || {},
    especificacoes: productData.specifications || productData.especificacoes || {},
    order: Number(productData.order || productData.ordem) || 1,
    ordem: Number(productData.order || productData.ordem) || 1,
    updatedAt: serverTimestamp(),
    atualizadoEm: serverTimestamp()
  };

  if (productData.id && typeof productData.id === 'string' && !productData.isNew) {
    const docRef = doc(db, COLLECTION_NAME, productData.id);
    await updateDoc(docRef, payload);
    return productData.id;
  } else {
    payload.createdAt = serverTimestamp();
    payload.criadoEm = serverTimestamp();
    const docRef = await addDoc(collection(db, COLLECTION_NAME), payload);
    return docRef.id;
  }
}

/**
 * Toggle product status: 'active' <-> 'inactive'
 */
export async function toggleProductStatus(id, currentStatus) {
  if (!isFirebaseConfigured) return;
  const docRef = doc(db, COLLECTION_NAME, id);
  const nextStatus = currentStatus === 'active' ? 'inactive' : 'active';
  await updateDoc(docRef, {
    status: nextStatus,
    active: nextStatus === 'active',
    ativo: nextStatus === 'active',
    updatedAt: serverTimestamp(),
    atualizadoEm: serverTimestamp()
  });
}

/**
 * Delete product document
 */
export async function deleteProduct(id) {
  if (!isFirebaseConfigured) return;
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}

/**
 * Upload Image to Firebase Storage under 'products/'
 */
export async function uploadProductImage(file, onProgress) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase Storage não configurado.");
  }

  const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `products/${Date.now()}_${sanitizedFileName}`;
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
        console.error("Storage upload error:", error);
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
    const mainImg = item.imagens && item.imagens.length > 0 ? item.imagens[0] : '/images/hero_equipment.jpg';

    await setDoc(docRef, {
      name: item.nome,
      nome: item.nome,
      description: item.descricao,
      descricao: item.descricao,
      fullDescription: item.descricaoCompleta || item.descricao,
      descricaoCompleta: item.descricaoCompleta || item.descricao,
      category: item.categoria,
      categoria: item.categoria,
      price: item.preco || null,
      preco: item.preco || null,
      status: 'active',
      active: true,
      ativo: true,
      mainImage: mainImg,
      images: item.imagens || [mainImg],
      imagens: item.imagens || [mainImg],
      highlight: Boolean(item.destaque),
      destaque: Boolean(item.destaque),
      specifications: item.especificacoes || {},
      especificacoes: item.especificacoes || {},
      order: item.ordem || 1,
      ordem: item.ordem || 1,
      createdAt: serverTimestamp(),
      criadoEm: serverTimestamp(),
      updatedAt: serverTimestamp(),
      atualizadoEm: serverTimestamp()
    }, { merge: true });
  }
}
