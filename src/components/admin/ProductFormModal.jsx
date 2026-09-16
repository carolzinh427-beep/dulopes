import React, { useState } from 'react';
import { X, Upload, Trash2, Star, Plus, AlertCircle } from 'lucide-react';
import { uploadProductImage, saveProduct } from '../../services/productService';
import { categories } from '../../data/companyData';

export default function ProductFormModal({ product, onClose, onSaveSuccess }) {
  const isEditing = Boolean(product && product.id);

  const [formData, setFormData] = useState({
    id: product?.id || null,
    name: product?.name || product?.nome || '',
    category: product?.category || product?.categoria || 'maquinas',
    description: product?.description || product?.descricao || '',
    fullDescription: product?.fullDescription || product?.descricaoCompleta || '',
    images: product?.images ? [...product.images] : (product?.imagens ? [...product.imagens] : []),
    mainImage: product?.mainImage || (product?.images && product.images[0]) || '',
    price: product?.price !== undefined ? product.price : (product?.preco !== undefined ? product.preco : ''),
    status: product?.status === 'inactive' || product?.active === false ? 'inactive' : 'active',
    highlight: Boolean(product?.highlight || product?.destaque),
    order: product?.order || product?.ordem || 1,
    specifications: product?.specifications ? { ...product.specifications } : (product?.especificacoes ? { ...product.especificacoes } : {
      "Material": "Aço Inox AISI 304 Sanitário",
      "Tensão": "220V / 60Hz",
      "Aplicação": "Indústria e alimentos"
    })
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecVal, setNewSpecVal] = useState('');

  const handleInputChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    setErrorMsg('');

    try {
      const uploadedUrls = [];
      for (const file of files) {
        const url = await uploadProductImage(file, (progress) => {
          setUploadProgress(progress);
        });
        uploadedUrls.push(url);
      }
      setFormData(prev => {
        const newImages = [...prev.images, ...uploadedUrls];
        const newMain = prev.mainImage || newImages[0];
        return {
          ...prev,
          images: newImages,
          mainImage: newMain
        };
      });
      setUploading(false);
    } catch (err) {
      console.error("Upload error:", err);
      setUploading(false);
      setErrorMsg("Erro no upload de imagem para o Firebase Storage: " + err.message);
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => {
      const newImgs = prev.images.filter((_, idx) => idx !== indexToRemove);
      const newMain = newImgs.length > 0 ? (prev.mainImage === prev.images[indexToRemove] ? newImgs[0] : prev.mainImage) : '';
      return {
        ...prev,
        images: newImgs,
        mainImage: newMain
      };
    });
  };

  const setAsMainImage = (urlToMakeMain) => {
    setFormData(prev => {
      const remaining = prev.images.filter(u => u !== urlToMakeMain);
      return {
        ...prev,
        images: [urlToMakeMain, ...remaining],
        mainImage: urlToMakeMain
      };
    });
  };

  const addSpec = () => {
    if (!newSpecKey.trim() || !newSpecVal.trim()) return;
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [newSpecKey.trim()]: newSpecVal.trim()
      }
    }));
    setNewSpecKey('');
    setNewSpecVal('');
  };

  const removeSpec = (keyToRemove) => {
    setFormData(prev => {
      const copy = { ...prev.specifications };
      delete copy[keyToRemove];
      return { ...prev, specifications: copy };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg("O nome do produto é obrigatório.");
      return;
    }

    if (!formData.images.length) {
      setErrorMsg("Adicione ao menos uma imagem ao produto.");
      return;
    }

    setSaving(true);
    try {
      await saveProduct(formData);
      setSaving(false);
      onSaveSuccess();
      onClose();
    } catch (err) {
      console.error("Save product error:", err);
      setSaving(false);
      setErrorMsg("Erro ao salvar produto no Firestore 'products': " + err.message);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(5, 14, 26, 0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div style={{
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--border-radius-lg)',
        width: '100%',
        maxWidth: '850px',
        maxHeight: '92vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
        padding: '2rem'
      }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--gray-light)' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--navy-darker)' }}>
              {isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-dark)' }}>
              Salvando no Firestore `products` e imagens no Firebase Storage.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--off-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--gray-light)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {errorMsg && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--border-radius-md)',
            padding: '0.85rem 1rem',
            color: '#DC2626',
            fontSize: '0.875rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={18} />
            <div>{errorMsg}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Row 1: Name & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--navy-darker)' }}>
                Nome do Produto (name) *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ex: Envasadora Pneumática em Inox"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid var(--gray-light)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--navy-darker)' }}>
                Categoria (category) *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid var(--gray-light)',
                  fontSize: '0.9rem',
                  backgroundColor: 'var(--white)'
                }}
              >
                {categories.filter(c => c.id !== 'todas').map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Status, Price & Visibilidade */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }} className="form-row">
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--navy-darker)' }}>
                Preço (price)
              </label>
              <input
                type="text"
                value={formData.price || ''}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="Ex: 4500 ou deixe vazio"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid var(--gray-light)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--navy-darker)' }}>
                Status Público
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid var(--gray-light)',
                  fontSize: '0.9rem'
                }}
              >
                <option value="active">Active (Visível no site)</option>
                <option value="inactive">Inactive (Oculto do site)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--navy-darker)' }}>
                Destaque
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="highlightCheckbox"
                  checked={formData.highlight}
                  onChange={(e) => handleInputChange('highlight', e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--orange-main)' }}
                />
                <label htmlFor="highlightCheckbox" style={{ fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer' }}>
                  Marcar como Destaque
                </label>
              </div>
            </div>
          </div>

          {/* Descriptions */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--navy-darker)' }}>
              Descrição Resumida (description)
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Resumo de 1 a 2 linhas..."
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--gray-light)',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--navy-darker)' }}>
              Descrição Completa (fullDescription)
            </label>
            <textarea
              rows={3}
              value={formData.fullDescription}
              onChange={(e) => handleInputChange('fullDescription', e.target.value)}
              placeholder="Descrição completa para a página/modale do produto..."
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--gray-light)',
                fontSize: '0.9rem'
              }}
            />
          </div>

          {/* Firebase Storage Image Upload */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--navy-darker)' }}>
              Imagens do Produto (Firebase Storage) *
            </label>
            <p style={{ fontSize: '0.785rem', color: 'var(--gray-dark)', marginBottom: '0.75rem' }}>
              A imagem marcada com ⭐ será salva em <code style={{ color: 'var(--orange-main)' }}>mainImage</code> no Firestore.
            </p>

            <div style={{
              border: '2px dashed var(--gray-mid)',
              borderRadius: 'var(--border-radius-md)',
              padding: '1.25rem',
              textAlign: 'center',
              backgroundColor: 'var(--off-white)',
              cursor: 'pointer',
              position: 'relative',
              marginBottom: '1rem'
            }}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer'
                }}
              />
              <Upload size={28} color="var(--orange-main)" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--navy-darker)' }}>
                {uploading ? `Enviando foto (${uploadProgress}%)...` : 'Fazer Upload de Imagens no Firebase Storage'}
              </div>
            </div>

            {/* Images Grid */}
            {formData.images.length > 0 && (
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {formData.images.map((imgUrl, idx) => {
                  const isMain = imgUrl === formData.mainImage || idx === 0;
                  return (
                    <div key={idx} style={{
                      position: 'relative',
                      width: '90px',
                      height: '90px',
                      borderRadius: 'var(--border-radius-sm)',
                      overflow: 'hidden',
                      border: isMain ? '3px solid var(--orange-main)' : '1px solid var(--gray-light)',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      <img src={imgUrl} alt={`Preview ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                      {isMain && (
                        <span style={{
                          position: 'absolute',
                          top: 2,
                          left: 2,
                          backgroundColor: 'var(--orange-main)',
                          color: 'white',
                          fontSize: '0.65rem',
                          fontWeight: '800',
                          padding: '1px 4px',
                          borderRadius: '2px'
                        }}>
                          Principal
                        </span>
                      )}

                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        display: 'flex',
                        justifyContent: 'space-around',
                        padding: '2px'
                      }}>
                        {!isMain && (
                          <button
                            type="button"
                            onClick={() => setAsMainImage(imgUrl)}
                            title="Definir como mainImage"
                            style={{ color: '#FDE047' }}
                          >
                            <Star size={14} />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          title="Remover"
                          style={{ color: '#EF4444' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Specifications Editor */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--navy-darker)' }}>
              Especificações Técnicas (specifications)
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <input
                type="text"
                placeholder="Item (ex: Material)"
                value={newSpecKey}
                onChange={(e) => setNewSpecKey(e.target.value)}
                style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--gray-light)' }}
              />
              <input
                type="text"
                placeholder="Valor (ex: Aço Inox AISI 304)"
                value={newSpecVal}
                onChange={(e) => setNewSpecVal(e.target.value)}
                style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--gray-light)' }}
              />
              <button
                type="button"
                onClick={addSpec}
                className="btn btn-navy"
                style={{ padding: '0.6rem 0.85rem', fontSize: '0.825rem' }}
              >
                <Plus size={16} /> Adicionar
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {Object.entries(formData.specifications).map(([key, val]) => (
                <div key={key} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'var(--off-white)',
                  border: '1px solid var(--gray-light)',
                  padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: '0.8rem'
                }}>
                  <strong>{key}:</strong> <span>{val}</span>
                  <button type="button" onClick={() => removeSpec(key)} style={{ color: '#EF4444', marginLeft: '4px' }}>
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--gray-light)',
            marginTop: '1rem'
          }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline-navy"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="btn btn-orange"
            >
              {saving ? 'Gravando no Firestore...' : 'Salvar Produto'}
            </button>
          </div>

        </form>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
