import React from 'react';
import { PackageSearch, TrendingUp } from 'lucide-react';

export default function Inventory({ products }) {
  const formatCurrency = (value) => 
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);

  const capitalImmovilizado = products.reduce((total, p) => total + (p.cost * p.stock), 0);
  const potentialRevenue = products.reduce((total, p) => total + (p.price * p.stock), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 flex items-center gap-4">
          <div className="bg-gold-500/10 p-4 rounded-lg">
            <PackageSearch className="text-gold-500" size={32} />
          </div>
          <div>
            <p className="text-sm text-text-muted">Capital Inmovilizado en Stock (Costo)</p>
            <p className="text-2xl font-bold text-text-light">{formatCurrency(capitalImmovilizado)}</p>
          </div>
        </div>

        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 flex items-center gap-4">
          <div className="bg-gold-500/10 p-4 rounded-lg">
            <TrendingUp className="text-gold-500" size={32} />
          </div>
          <div>
            <p className="text-sm text-text-muted">Ganancia Potencial Total (Venta)</p>
            <p className="text-2xl font-bold text-text-light">{formatCurrency(potentialRevenue)}</p>
          </div>
        </div>
      </div>

      <div className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-dark-900 border-b border-dark-700">
              <tr>
                <th className="px-6 py-4 text-sm font-medium text-text-muted uppercase tracking-wider">Producto</th>
                <th className="px-6 py-4 text-sm font-medium text-text-muted uppercase tracking-wider">Costo (U)</th>
                <th className="px-6 py-4 text-sm font-medium text-text-muted uppercase tracking-wider">Precio Venta (U)</th>
                <th className="px-6 py-4 text-sm font-medium text-text-muted uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-sm font-medium text-text-muted uppercase tracking-wider">Valor Total (Venta)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-dark-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-text-light">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 text-text-muted">{formatCurrency(product.cost)}</td>
                  <td className="px-6 py-4 text-gold-200 font-medium">{formatCurrency(product.price)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      product.stock > 10 ? 'bg-green-900/30 text-green-400' :
                      product.stock > 0 ? 'bg-yellow-900/30 text-yellow-400' : 'bg-red-900/30 text-red-400'
                    }`}>
                      {product.stock} un.
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-light">{formatCurrency(product.price * product.stock)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
