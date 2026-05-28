import React from 'react';
import { TrendingUp, CreditCard, Activity, Target, CalendarDays, Wallet } from 'lucide-react';

export default function Dashboard({ products, expenses, sales }) {
  const formatCurrency = (value) => 
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);

  const formatPercent = (value) =>
    new Intl.NumberFormat('es-AR', { style: 'percent', maximumFractionDigits: 1 }).format(value);

  // Metrics calculations
  const totalGastosFijos = expenses.reduce((total, e) => total + e.amount, 0);

  const today = new Date().toDateString();
  const todaySales = sales.filter(s => new Date(s.date).toDateString() === today);
  
  const ventasDelDia = todaySales.reduce((total, s) => total + s.total, 0);
  const ventasDelMes = sales.reduce((total, s) => total + s.total, 0); // Assuming all mock sales are from current month

  // Net Profit (Ventas - Costos de productos vendidos)
  const cogs = sales.reduce((totalCost, sale) => {
    const saleCost = sale.items.reduce((acc, item) => acc + (item.cost * item.quantity), 0);
    return totalCost + saleCost;
  }, 0);
  const gananciaNeta = ventasDelMes - cogs;

  // Break-even point calculations
  // Margen = (Precio - Costo) / Precio
  const averageMargin = products.length > 0 
    ? products.reduce((acc, p) => acc + ((p.price - p.cost) / p.price), 0) / products.length
    : 0;
  
  const puntoEquilibrioMes = averageMargin > 0 ? totalGastosFijos / averageMargin : 0;
  const puntoEquilibrioDia = puntoEquilibrioMes / 30;

  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-900/20 p-3 rounded-lg">
              <CalendarDays className="text-blue-400" />
            </div>
            <h3 className="text-text-muted font-medium">Ventas del Día</h3>
          </div>
          <p className="text-3xl font-bold text-text-light">{formatCurrency(ventasDelDia)}</p>
        </div>

        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-green-900/20 p-3 rounded-lg">
              <CreditCard className="text-green-400" />
            </div>
            <h3 className="text-text-muted font-medium">Ventas del Mes</h3>
          </div>
          <p className="text-3xl font-bold text-text-light">{formatCurrency(ventasDelMes)}</p>
        </div>

        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-purple-900/20 p-3 rounded-lg">
              <Activity className="text-purple-400" />
            </div>
            <h3 className="text-text-muted font-medium">Ganancia Neta</h3>
          </div>
          <p className="text-3xl font-bold text-text-light">{formatCurrency(gananciaNeta)}</p>
          <p className="text-xs text-text-muted mt-2">Ventas - Costo Mercadería</p>
        </div>
      </div>

      {/* Break-even Point Section */}
      <div className="bg-dark-900 rounded-2xl border-2 border-gold-500/40 p-8 shadow-[0_0_40px_rgba(212,175,55,0.08)] relative overflow-hidden">
        <div className="absolute -top-10 -right-10 opacity-10">
          <Target size={200} className="text-gold-500" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <Target className="text-gold-500" size={32} />
            <h2 className="text-2xl font-bold text-gold-500">Punto de Equilibrio</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-dark-800/80 backdrop-blur-sm p-6 rounded-xl border border-dark-700">
              <h3 className="text-text-muted text-sm uppercase tracking-wider mb-2">Gastos Fijos a Cubrir</h3>
              <p className="text-3xl font-bold text-text-light">{formatCurrency(totalGastosFijos)}</p>
              <div className="mt-4 pt-4 border-t border-dark-700">
                <p className="text-sm text-text-muted">Margen Promedio: <span className="text-gold-200 font-bold">{formatPercent(averageMargin)}</span></p>
              </div>
            </div>

            <div className="bg-dark-800/80 backdrop-blur-sm p-6 rounded-xl border border-gold-500/30 shadow-[inset_0_0_20px_rgba(212,175,55,0.05)]">
              <h3 className="text-text-muted text-sm uppercase tracking-wider mb-2">Meta Mensual (Ventas)</h3>
              <p className="text-3xl font-bold text-gold-500">{formatCurrency(puntoEquilibrioMes)}</p>
              <p className="text-xs text-text-muted mt-3">Para cubrir gastos fijos exactos</p>
            </div>

            <div className="bg-dark-800/80 backdrop-blur-sm p-6 rounded-xl border border-dark-700">
              <h3 className="text-text-muted text-sm uppercase tracking-wider mb-2">Meta Diaria (Ventas)</h3>
              <p className="text-3xl font-bold text-text-light">{formatCurrency(puntoEquilibrioDia)}</p>
              <p className="text-xs text-text-muted mt-3">Promedio sobre 30 días</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress towards Break-even */}
      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="text-text-light font-medium">Progreso del Mes</h3>
            <p className="text-sm text-text-muted">Ventas actuales vs Punto de Equilibrio</p>
          </div>
          <span className="text-gold-500 font-bold text-xl">
            {formatPercent(puntoEquilibrioMes > 0 ? (ventasDelMes / puntoEquilibrioMes) : 0)}
          </span>
        </div>
        
        <div className="w-full bg-dark-900 rounded-full h-4 border border-dark-700 overflow-hidden">
          <div 
            className="bg-gold-500 h-4 rounded-full transition-all duration-1000" 
            style={{ width: `${Math.min(100, puntoEquilibrioMes > 0 ? (ventasDelMes / puntoEquilibrioMes) * 100 : 0)}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-text-muted">
          <span>$0</span>
          <span>Meta: {formatCurrency(puntoEquilibrioMes)}</span>
        </div>
      </div>
    </div>
  );
}
