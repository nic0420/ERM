import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useAppData();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    cost: '',
    price: '',
    stock: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      category: formData.category,
      cost: Number(formData.cost),
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    if (editingId) {
      updateProduct(editingId, productData);
      setEditingId(null);
    } else {
      addProduct(productData);
      setIsAdding(false);
    }
    
    setFormData({ name: '', category: '', cost: '', price: '', stock: '' });
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      cost: product.cost,
      price: product.price,
      stock: product.stock
    });
    setIsAdding(true);
  };

  const formatCurrency = (val) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(val);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>Gestión de Productos</h1>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            setIsAdding(!isAdding);
            setEditingId(null);
            setFormData({ name: '', category: '', cost: '', price: '', stock: '' });
          }}
        >
          <Plus size={18} /> {isAdding ? 'Cancelar' : 'Nuevo Producto'}
        </button>
      </div>

      {isAdding && (
        <div className="card mb-6">
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Nombre</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <input type="text" name="category" value={formData.category} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Costo</label>
                <input type="number" name="cost" value={formData.cost} onChange={handleInputChange} required min="0" step="0.01" />
              </div>
              <div className="form-group">
                <label>Precio de Venta</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" step="0.01" />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required min="0" />
              </div>
            </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-primary">{editingId ? 'Actualizar' : 'Guardar'}</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Costo</th>
              <th>Precio</th>
              <th>Ganancia/U</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{formatCurrency(product.cost)}</td>
                <td>{formatCurrency(product.price)}</td>
                <td className="success">{formatCurrency(product.price - product.cost)}</td>
                <td>{product.stock}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn" style={{ padding: '0.5rem', backgroundColor: 'var(--color-bg-input)', color: 'var(--color-text-main)' }} onClick={() => handleEdit(product)}>
                      <Edit size={16} />
                    </button>
                    <button className="btn btn-danger" style={{ padding: '0.5rem' }} onClick={() => deleteProduct(product.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No hay productos cargados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
