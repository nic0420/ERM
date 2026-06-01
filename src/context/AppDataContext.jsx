import React, { createContext, useContext, useState, useEffect } from 'react';

const AppDataContext = createContext();

export const useAppData = () => useContext(AppDataContext);

export const AppDataProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('giorgio_products');
    return saved ? JSON.parse(saved) : [];
  });

  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('giorgio_sales');
    return saved ? JSON.parse(saved) : [];
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('giorgio_expenses');
    return saved ? JSON.parse(saved) : {
      alquiler: 0,
      sueldos: 0,
      publicidad: 0,
      servicios: 0,
      impuestos: 0,
      deudas: 0,
      otros: 0
    };
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('giorgio_auth') === 'true';
  });

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('giorgio_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('giorgio_sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('giorgio_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const login = (password) => {
    if (password === 'admin123gestion') {
      sessionStorage.setItem('giorgio_auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('giorgio_auth');
    setIsAuthenticated(false);
  };

  // Product Actions
  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now().toString() }]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Sales Actions
  const addSale = (sale) => {
    setSales([...sales, { ...sale, id: Date.now().toString(), date: new Date().toISOString() }]);
    // Decrease stock
    const newProducts = [...products];
    sale.items.forEach(item => {
      const product = newProducts.find(p => p.id === item.productId);
      if (product) {
        product.stock -= item.quantity;
      }
    });
    setProducts(newProducts);
  };

  // Expenses Actions
  const updateExpenses = (newExpenses) => {
    setExpenses({ ...expenses, ...newExpenses });
  };

  return (
    <AppDataContext.Provider value={{
      products, addProduct, updateProduct, deleteProduct,
      sales, addSale,
      expenses, updateExpenses,
      isAuthenticated, login, logout
    }}>
      {children}
    </AppDataContext.Provider>
  );
};
