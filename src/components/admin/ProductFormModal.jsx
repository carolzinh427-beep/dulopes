import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2, Star, Check, Plus, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { uploadProductImage, saveProduct } from '../../services/productService';
import { categories } from '../../data/companyData';

export default function ProductFormModal({ product, onClose, onSaveSuccess }) {
  const isEditing = Boolean(product && product.id);

  const [formData, setFormData] = useState({
    id: product?.id || null,
    nome: product?.nome || '',
    categoria: product?.categoria || 'maquinas',
    descricao: product?.descricao || '',
    descricaoCompleta: product?.descricaoCompleta || '',
    imagens: product?.imagens ? [...product.imagens] : [],
    preco: product?.preco || '',
    status: product?.status || 'Pronta Entrega',
    ativo: product?.ativo !== false,
    destaque: product?.destaque || false,
    ordem: product?.ordem || 1,
    especificacoes: product?.especificacoes ? { ...product.especificacoes } : {
      "Material": "Aço Inox AISI 304 Sanitário",
      "Tensão": "220V / 60Hz",
      "Aplicação": "Indústria e alimentos"
    }
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Specs editor temporary state
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
      setFormData(prev => ({
        ...prev,
        imagens: [...prev.imagens, ...uploadedUrls]
      }));
      setUploading(false);
    } catch (err) {
      console.error("Upload error:", err);
      setUploading(false);
      setErrorMsg("Erro no upload da imagem para o Firebase Storage. " + err.message);
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      imagens: prev.imagens.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const setAsMainImage = (indexToMakeMain) => {
    setFormData(prev => {
      const imgs = [...prev.imagens];
      const [selected] = imgs.splice(indexToMakeMain, 1);
      imgs.unshift(selected);
      return { ...prev, imagens: imgs };
    });
  };

  const addSpec = () => {
    if (!newSpecKey.trim() || !newSpecVal.trim()) return;
    setFormData(prev => ({
      ...prev,
      especificacoes: {
        ...prev.especificacoes,
        [newSpecKey.trim()]: newSpecVal.trim()
      }
    }));
    setNewSpecKey('');
    setNewSpecVal('');
  };

  const removeSpec = (keyToRemove) => {
    setFormData(prev => {
      const copy = { ...prev.especificacoes };
      delete copy[keyToRemove];
      return { ...prev, especificacoes: copy };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.nome.trim()) {
      setErrorMsg("O nome do produto é obrigatório.");
      return;
    }

    if (!formData.imagens.length) {
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
      setErrorMsg("Erro ao salvar produto no Firestore: " + err.message);
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
              {isEditing ? 'Editar Equipamento' : 'Adicionar Novo Equipamento'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-dark)' }}>
              Preencha os detalhes e faça o upload das imagens para o catálogo.
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
                Nome do Equipamento *
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                placeholder="Ex: Envasadora Pneumática em Inox"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid var(--gray-light)',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--navy-darker)' }}>
                Categoria *
              </label>
              <select
                value={formData.categoria}
                onChange={(e) => handleInputChange('categoria', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid var(--gray-light)',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  backgroundColor: 'var(--white)'
                }}
              >
                {categories.filter(c => c.id !== 'todas').map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Status, Price & Active Toggle */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }} className="form-row">
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--navy-darker)' }}>
                Status de Disponibilidade
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid var(--gray-light)',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit'
                }}
              >
                <option value="Pronta Entrega">Pronta Entrega</option>
                <option value="Sob Encomenda">Sob Encomenda</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--navy-darker)' }}>
                Preço (Deixe vazio para "Consulte")
              </label>
              <input
                type="text"
                value={formData.preco || ''}
                onChange={(e) => handleInputChange('preco', e.target.value)}
                placeholder="Ex: 4500 ou vazio"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid var(--gray-light)',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--navy-darker)' }}>
                Visibilidade no Site
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="ativoCheckbox"
                  checked={formData.ativo}
                  onChange={(e) => handleInputChange('ativo', e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--orange-main)' }}
                />
                <label htmlFor="ativoCheckbox" style={{ fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer' }}>
                  {formData.ativo ? 'Ativo (Visível)' : 'Oculto'}
                </label>
              </div>
            </div>
          </div>

          {/* Row 3: Descriptions */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--navy-darker)' }}>
              Descrição Resumida (Para o Card)
            </label>
            <input
              type="text"
              value={formData.descricao}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
              placeholder="Resumo curto de 1 a 2 linhas..."
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--gray-light)',
                fontSize: '0.9rem',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--navy-darker)' }}>
              Descrição Completa (Para o Modale)
            </label>
            <textarea
              rows={3}
              value={formData.descricaoCompleta}
              onChange={(e) => handleInputChange('descricaoCompleta', e.target.value)}
              placeholder="Detalhamento completo das características e aplicação do equipamento..."
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--gray-light)',
                fontSize: '0.9rem',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Image Upload Area */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--navy-darker)' }}>
              Imagens do Equipamento (Firebase Storage) *
            </label>
            <p style={{ fontSize: '0.785rem', color: 'var(--gray-dark)', marginBottom: '0.75rem' }}>
              A primeira imagem será a imagem principal do card. Clique na estrela ⭐ para definir como principal.
            </p>

            {/* Upload Box */}
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
                {uploading ? `Enviando para Firebase Storage (${uploadProgress}%)...` : 'Clique ou arraste imagens aqui para fazer upload'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-dark)', marginTop: '0.2rem' }}>
                Suporta JPG, PNG, WEBP
              </div>
            </div>

            {/* Uploaded Images Preview Grid */}
            {formData.imagens.length > 0 && (
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {formData.imagens.map((imgUrl, idx) => (
                  <div key={idx} style={{
                    position: 'relative',
                    width: '90px',
                    height: '90px',
                    borderRadius: 'var(--border-radius-sm)',
                    overflow: 'hidden',
                    border: idx === 0 ? '3px solid var(--orange-main)' : '1px solid var(--gray-light)',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <img src={imgUrl} alt={`Foto ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                    {/* Main Image Badge */}
                    {idx === 0 && (
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

                    {/* Actions overlay */}
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
                      {idx !== 0 && (
                        <button
                          type="button"
                          onClick={() => setAsMainImage(idx)}
                          title="Definir como Principal"
                          style={{ color: '#FDE047' }}
                        >
                          <Star size={14} />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        title="Remover Imagem"
                        style={{ color: '#EF4444' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Technical Specs Editor */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--navy-darker)' }}>
              Especificações Técnicas
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <input
                type="text"
                placeholder="Ex: Tensão"
                value={newSpecKey}
                onChange={(e) => setNewSpecKey(e.target.value)}
                style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--gray-light)' }}
              />
              <input
                type="text"
                placeholder="Ex: 220V Single-phase"
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

            {/* List of Current Specs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {Object.entries(formData.especificacoes).map(([key, val]) => (
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

          {/* Submit Actions */}
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
              {saving ? 'Salvando no Firestore...' : 'Salvar Equipamento'}
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
