import React, { useState } from 'react';
import { useAppData } from './context/AppDataContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Sales from './pages/Sales';
import Expenses from './pages/Expenses';
import { LayoutDashboard, Package, ShoppingCart, DollarSign, LogOut } from 'lucide-react';

function App() {
  const { isAuthenticated, logout } = useAppData();
  const [currentView, setCurrentView] = useState('dashboard');

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'products': return <Products />;
      case 'sales': return <Sales />;
      case 'expenses': return <Expenses />;
      default: return <Dashboard />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Resumen', icon: <LayoutDashboard size={20} /> },
    { id: 'products', label: 'Productos', icon: <Package size={20} /> },
    { id: 'sales', label: 'Ventas', icon: <ShoppingCart size={20} /> },
    { id: 'expenses', label: 'Gastos Fijos', icon: <DollarSign size={20} /> },
  ];

  return (
    <div className="app-container">
      <nav className="sidebar">
        <div className="sidebar-brand">Giorgio<br/>Gestion</div>
        <div className="nav-links">
          {navItems.map(item => (
            <div 
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
            >
              {item.icon} {item.label}
            </div>
          ))}
        </div>
        <div style={{ padding: '1rem' }}>
          <button 
            className="btn" 
            style={{ width: '100%', backgroundColor: 'var(--color-bg-input)', color: 'var(--color-text-muted)' }}
            onClick={logout}
          >
            <LogOut size={18} /> Salir
          </button>
        </div>
      </nav>
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
