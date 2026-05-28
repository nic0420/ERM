import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

export default function POS({ products, registerSale }) {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');

  const formatCurrency = (value) => 
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.quantity < product.stock) {
        setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
    } else {
      if (product.stock > 0) {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        if (newQty > 0 && newQty <= item.stock) {
          return { ...item, quantity: newQty };
        }
        return item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return alert('El carrito está vacío');
    if (!paymentMethod) return alert('Seleccione un método de pago');

    registerSale({
      items: cart,
      total,
      paymentMethod,
      date: new Date().toISOString(),
    });

    setCart([]);
    setPaymentMethod('');
    alert('¡Venta registrada con éxito!');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Products Grid */}
      <div className="flex-1 bg-dark-800 rounded-xl p-6 border border-dark-700 overflow-y-auto">
        <h2 className="text-xl font-medium text-gold-500 mb-6">Catálogo de Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {products.map(product => (
            <div 
              key={product.id} 
              className={`bg-dark-900 border border-dark-700 p-4 rounded-lg flex flex-col justify-between transition-all duration-200 ${product.stock === 0 ? 'opacity-50' : 'hover:border-gold-500/30'}`}
            >
              <div>
                <h3 className="font-medium text-text-light">{product.name}</h3>
                <p className="text-gold-200 font-bold mt-2">{formatCurrency(product.price)}</p>
                <p className="text-xs text-text-muted mt-1">Stock: {product.stock}</p>
              </div>
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className="mt-4 w-full bg-dark-700 hover:bg-dark-600 text-text-light py-2 rounded transition-colors disabled:opacity-50 flex justify-center"
              >
                <Plus size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Panel */}
      <div className="w-full lg:w-96 bg-dark-800 rounded-xl p-6 border border-dark-700 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6 border-b border-dark-700 pb-4">
          <ShoppingCart className="text-gold-500" />
          <h2 className="text-xl font-medium text-gold-500">Orden Actual</h2>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {cart.length === 0 ? (
            <p className="text-text-muted text-center mt-10">Agregue productos a la orden</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="bg-dark-900 p-3 rounded-lg border border-dark-700">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm text-text-light line-clamp-2 pr-2">{item.name}</h4>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-gold-200 font-bold text-sm">{formatCurrency(item.price * item.quantity)}</p>
                  <div className="flex items-center gap-3 bg-dark-800 rounded px-2 py-1">
                    <button onClick={() => updateQuantity(item.id, -1)} className="text-text-muted hover:text-white">
                      <Minus size={14} />
                    </button>
                    <span className="text-sm w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="text-text-muted hover:text-white">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-dark-700 space-y-4 shrink-0">
          <div>
            <label className="block text-sm text-text-muted mb-2">Método de Pago *</label>
            <select 
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full bg-dark-900 border border-dark-700 text-text-light rounded-lg p-3 focus:outline-none focus:border-gold-500"
            >
              <option value="">Seleccionar...</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Tarjeta">Tarjeta</option>
            </select>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-lg text-text-muted">Total</span>
            <span className="text-2xl font-bold text-gold-500">{formatCurrency(total)}</span>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full bg-gold-500 hover:bg-gold-500/90 text-dark-900 font-bold text-lg py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          >
            Registrar Venta
          </button>
        </div>
      </div>
    </div>
  );
}
