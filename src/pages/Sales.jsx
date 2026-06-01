import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';

export default function Sales() {
  const { products, sales, addSale } = useAppData();
  
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSale = (e) => {
    e.preventDefault();
    if (!selectedProductId || quantity < 1) return;

    const product = products.find(p => p.id === selectedProductId);
    if (!product) return;
    
    if (quantity > product.stock) {
      alert('Stock insuficiente');
      return;
    }

    const saleItem = {
      productId: product.id,
      name: product.name,
      quantity: Number(quantity),
      price: product.price,
      cost: product.cost,
      subtotal: product.price * quantity,
      profit: (product.price - product.cost) * quantity
    };

    const sale = {
      items: [saleItem], // simplified: 1 product type per sale to start
      total: saleItem.subtotal,
      cost: saleItem.cost * quantity,
      profit: saleItem.profit
    };

    addSale(sale);
    setSelectedProductId('');
    setQuantity(1);
  };

  const formatCurrency = (val) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(val);

  return (
    <div>
      <h1>Registro de Ventas</h1>

      <div className="card mb-6">
        <h2>Nueva Venta</h2>
        <form onSubmit={handleSale} className="mt-4">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Producto</label>
              <select 
                value={selectedProductId} 
                onChange={(e) => setSelectedProductId(e.target.value)}
                required
              >
                <option value="">Seleccione un producto...</option>
                {products.filter(p => p.stock > 0).map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} - {formatCurrency(p.price)} (Stock: {p.stock})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Cantidad</label>
              <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary">Registrar Venta</button>
          </div>
        </form>
      </div>

      <div className="card">
        <h2>Últimas Ventas</h2>
        <div className="table-container mt-4">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Total Venta</th>
                <th>Costo Reposición</th>
                <th>Ganancia Bruta</th>
              </tr>
            </thead>
            <tbody>
              {sales.slice().reverse().map(sale => {
                const item = sale.items[0];
                return (
                  <tr key={sale.id}>
                    <td>{new Date(sale.date).toLocaleString('es-AR')}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(sale.total)}</td>
                    <td className="warning">{formatCurrency(sale.cost)}</td>
                    <td className="success">{formatCurrency(sale.profit)}</td>
                  </tr>
                );
              })}
              {sales.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Aún no hay ventas registradas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
