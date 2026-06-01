import React from 'react';
import { useAppData } from '../context/AppDataContext';

export default function Dashboard() {
  const { products, sales, expenses } = useAppData();

  // Calculate Today's Sales & Profit
  const today = new Date().toLocaleDateString();
  const todaySales = sales.filter(s => new Date(s.date).toLocaleDateString() === today);
  const todaysRevenue = todaySales.reduce((acc, sale) => acc + sale.total, 0);
  const todaysProfit = todaySales.reduce((acc, sale) => acc + sale.profit, 0);

  // Calculate Month's Profit
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthSales = sales.filter(s => {
    const date = new Date(s.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });
  const monthProfit = monthSales.reduce((acc, sale) => acc + sale.profit, 0);

  // Calculate Fixed Expenses
  const totalExpenses = Object.values(expenses).reduce((acc, val) => acc + Number(val || 0), 0);

  // Daily Break-Even
  // The daily break-even in profit terms is simply: Total Monthly Expenses / 30.
  // Or in sales terms: (Expenses / 30) / Average Margin Ratio
  // We'll calculate Average Margin Ratio across all products
  const totalCost = products.reduce((acc, p) => acc + (p.cost * p.stock), 0);
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
  const avgMarginRatio = totalValue > 0 ? ((totalValue - totalCost) / totalValue) : 0.5; // fallback 50%
  
  const dailyBreakEvenSales = avgMarginRatio > 0 ? (totalExpenses / 30) / avgMarginRatio : 0;
  const breakEvenProfit = totalExpenses / 30;

  // Real Month Profit = Gross Month Profit - Expenses
  const realProfit = monthProfit - totalExpenses;

  // Status calculation
  let statusText = "En Equilibrio";
  let statusClass = "warning";
  if (realProfit > 0) {
    statusText = "Ganando";
    statusClass = "success";
  } else if (realProfit < 0) {
    statusText = "Perdiendo";
    statusClass = "danger";
  }

  const formatCurrency = (val) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(val);

  return (
    <div>
      <h1>Resumen del Negocio</h1>
      
      <div className="kpi-grid">
        <div className="card">
          <div className="kpi-title">Vendiste Hoy</div>
          <div className="kpi-value highlight">{formatCurrency(todaysRevenue)}</div>
        </div>
        <div className="card">
          <div className="kpi-title">Ganancia del Día</div>
          <div className="kpi-value">{formatCurrency(todaysProfit)}</div>
        </div>
        <div className="card">
          <div className="kpi-title">Ganancia Bruta del Mes</div>
          <div className="kpi-value">{formatCurrency(monthProfit)}</div>
        </div>
        <div className="card">
          <div className="kpi-title">Gastos Fijos del Mes</div>
          <div className="kpi-value danger">{formatCurrency(totalExpenses)}</div>
        </div>
        <div className="card">
          <div className="kpi-title">Punto de Equilibrio Diario (Ventas)</div>
          <div className="kpi-value warning">{formatCurrency(dailyBreakEvenSales)}</div>
        </div>
        <div className="card">
          <div className="kpi-title">Stock Valorizado (PVP)</div>
          <div className="kpi-value">{formatCurrency(totalValue)}</div>
        </div>
        <div className="card">
          <div className="kpi-title">Resultado Actual</div>
          <div className={`kpi-value ${statusClass}`}>{statusText}</div>
        </div>
        <div className="card">
          <div className="kpi-title">Ganancia Real del Mes</div>
          <div className={`kpi-value ${statusClass}`}>{formatCurrency(realProfit)}</div>
        </div>
      </div>
    </div>
  );
}
