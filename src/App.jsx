import React, { useState } from 'react';
import Login from './components/Login';
import Layout from './components/Layout';
import POS from './views/POS';
import Inventory from './views/Inventory';
import Expenses from './views/Expenses';
import Dashboard from './views/Dashboard';
import { initialProducts, initialExpenses, mockSales } from './data/mockData';

function App() {
  const [role, setRole] = useState(null); // 'admin' | 'vendedora' | null
  const [view, setView] = useState('login'); // 'login' | 'pos' | 'inventory' | 'expenses' | 'dashboard'

  // Global State
  const [products, setProducts] = useState(initialProducts);
  const [expenses] = useState(initialExpenses); // Gastos son estáticos en el prototipo
  const [sales, setSales] = useState(mockSales);

  const registerSale = (saleData) => {
    // 1. Add sale to history
    setSales([...sales, { id: Date.now(), ...saleData }]);

    // 2. Update stock
    const updatedProducts = products.map(product => {
      const soldItem = saleData.items.find(item => item.id === product.id);
      if (soldItem) {
        return { ...product, stock: product.stock - soldItem.quantity };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  // Render logic
  if (!role || view === 'login') {
    return <Login setRole={setRole} setView={setView} />;
  }

  // Si la vendedora intenta entrar a otra vista que no sea POS, la forzamos a POS
  if (role === 'vendedora' && view !== 'pos') {
    setView('pos');
  }

  const renderView = () => {
    switch (view) {
      case 'pos':
        return <POS products={products} registerSale={registerSale} />;
      case 'inventory':
        return <Inventory products={products} />;
      case 'expenses':
        return <Expenses expenses={expenses} />;
      case 'dashboard':
        return <Dashboard products={products} expenses={expenses} sales={sales} />;
      default:
        return <POS products={products} registerSale={registerSale} />;
    }
  };

  return (
    <Layout role={role} currentView={view} setView={setView} setRole={setRole}>
      {renderView()}
    </Layout>
  );
}

export default App;
