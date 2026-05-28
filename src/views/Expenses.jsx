import React from 'react';
import { DollarSign, AlertCircle } from 'lucide-react';

export default function Expenses({ expenses }) {
  const formatCurrency = (value) => 
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);

  const totalGastosFijos = expenses.reduce((total, e) => total + e.amount, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-dark-800 p-6 rounded-xl border border-gold-500/30 flex items-center justify-between shadow-[0_0_20px_rgba(212,175,55,0.05)]">
        <div className="flex items-center gap-4">
          <div className="bg-gold-500/20 p-4 rounded-full">
            <DollarSign className="text-gold-500" size={32} />
          </div>
          <div>
            <h2 className="text-xl font-medium text-text-light">Total Gastos Fijos (Mensual)</h2>
            <p className="text-sm text-text-muted mt-1">Suma de todos los costos operativos fijos</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-gold-500">{formatCurrency(totalGastosFijos)}</span>
        </div>
      </div>

      <div className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden">
        <div className="p-6 border-b border-dark-700 flex items-center gap-2">
          <AlertCircle className="text-text-muted" size={20} />
          <h3 className="text-lg font-medium text-text-light">Detalle de Gastos Fijos</h3>
        </div>
        <div className="divide-y divide-dark-700">
          {expenses.map(expense => (
            <div key={expense.id} className="p-6 flex justify-between items-center hover:bg-dark-700/30 transition-colors">
              <span className="font-medium text-text-light text-lg">{expense.name}</span>
              <span className="text-gold-200 font-medium text-lg">{formatCurrency(expense.amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
