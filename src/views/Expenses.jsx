import React, { useState } from 'react';
import { DollarSign, AlertCircle, Plus, Edit2, Trash2, X, Check } from 'lucide-react';

export default function Expenses({ expenses, addExpense, updateExpense, deleteExpense }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form states
  const [newName, setNewName] = useState('');
  const [newAmount, setNewAmount] = useState('');
  
  const [editName, setEditName] = useState('');
  const [editAmount, setEditAmount] = useState('');

  const formatCurrency = (value) => 
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);

  const totalGastosFijos = expenses.reduce((total, e) => total + e.amount, 0);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newName || !newAmount) return;
    addExpense({ name: newName, amount: Number(newAmount) });
    setNewName('');
    setNewAmount('');
    setIsAdding(false);
  };

  const startEdit = (expense) => {
    setEditingId(expense.id);
    setEditName(expense.name);
    setEditAmount(expense.amount);
  };

  const saveEdit = (id) => {
    if (!editName || !editAmount) return;
    updateExpense(id, { name: editName, amount: Number(editAmount) });
    setEditingId(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-dark-800 p-6 rounded-xl border border-gold-500/30 flex flex-col md:flex-row items-start md:items-center justify-between shadow-[0_0_20px_rgba(212,175,55,0.05)] gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-gold-500/20 p-4 rounded-full shrink-0">
            <DollarSign className="text-gold-500" size={32} />
          </div>
          <div>
            <h2 className="text-xl font-medium text-text-light">Total Gastos Fijos (Mensual)</h2>
            <p className="text-sm text-text-muted mt-1">Suma de todos los costos operativos fijos</p>
          </div>
        </div>
        <div className="text-left md:text-right w-full md:w-auto">
          <span className="text-3xl font-bold text-gold-500">{formatCurrency(totalGastosFijos)}</span>
        </div>
      </div>

      <div className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-dark-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="text-text-muted shrink-0" size={20} />
            <h3 className="text-lg font-medium text-text-light">Detalle de Gastos Fijos</h3>
          </div>
          {!isAdding && (
            <button 
              onClick={() => setIsAdding(true)}
              className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-500/90 text-dark-900 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus size={18} />
              <span>Añadir Gasto</span>
            </button>
          )}
        </div>

        {isAdding && (
          <div className="p-4 md:p-6 border-b border-dark-700 bg-dark-900/50">
            <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
              <div className="flex-1 w-full">
                <label className="block text-xs text-text-muted mb-1">Nombre del Gasto</label>
                <input 
                  type="text" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ej. Alquiler Local"
                  className="w-full bg-dark-900 border border-dark-700 rounded px-3 py-2 text-text-light focus:outline-none focus:border-gold-500"
                  autoFocus
                />
              </div>
              <div className="flex-1 w-full sm:max-w-xs">
                <label className="block text-xs text-text-muted mb-1">Monto Mensual (ARS)</label>
                <input 
                  type="number" 
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  placeholder="0"
                  className="w-full bg-dark-900 border border-dark-700 rounded px-3 py-2 text-text-light focus:outline-none focus:border-gold-500"
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button type="submit" className="flex-1 sm:flex-none bg-gold-500 text-dark-900 px-4 py-2 rounded hover:bg-gold-500/90 transition-colors font-medium">
                  Guardar
                </button>
                <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-text-muted hover:text-text-light transition-colors">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="divide-y divide-dark-700">
          {expenses.length === 0 ? (
            <p className="p-6 text-center text-text-muted">No hay gastos fijos registrados.</p>
          ) : (
            expenses.map(expense => (
              <div key={expense.id} className="p-4 md:p-6 hover:bg-dark-700/30 transition-colors">
                {editingId === expense.id ? (
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <input 
                      type="text" 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 w-full sm:w-auto bg-dark-900 border border-dark-600 rounded px-3 py-2 text-text-light focus:outline-none focus:border-gold-500"
                    />
                    <input 
                      type="number" 
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      className="w-full sm:w-32 md:w-48 bg-dark-900 border border-dark-600 rounded px-3 py-2 text-text-light focus:outline-none focus:border-gold-500"
                    />
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button onClick={() => saveEdit(expense.id)} className="p-2 text-green-400 hover:bg-green-400/10 rounded transition-colors" title="Guardar">
                        <Check size={20} />
                      </button>
                      <button onClick={() => setEditingId(null)} className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors" title="Cancelar">
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="font-medium text-text-light text-lg">{expense.name}</span>
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                      <span className="text-gold-200 font-medium text-lg">{formatCurrency(expense.amount)}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => startEdit(expense)} className="p-2 text-text-muted hover:text-gold-500 transition-colors" title="Editar">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => deleteExpense(expense.id)} className="p-2 text-text-muted hover:text-red-400 transition-colors" title="Eliminar">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
