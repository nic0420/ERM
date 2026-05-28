import React from 'react';
import { UserCircle, Store } from 'lucide-react';

export default function Login({ setRole, setView }) {
  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    setView('pos'); // Default view after login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 p-4">
      <div className="bg-dark-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-dark-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gold-500 mb-2">D'ORO Boutique</h1>
          <p className="text-text-muted">Mini ERP System</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin('admin')}
            className="w-full flex items-center justify-center gap-3 bg-dark-700 hover:bg-dark-600 text-text-light p-4 rounded-lg transition-colors border border-dark-600 hover:border-gold-500/50"
          >
            <UserCircle className="text-gold-500" size={24} />
            <span className="font-medium text-lg">Ingresar como Administrador</span>
          </button>

          <button
            onClick={() => handleLogin('vendedora')}
            className="w-full flex items-center justify-center gap-3 bg-dark-700 hover:bg-dark-600 text-text-light p-4 rounded-lg transition-colors border border-dark-600 hover:border-gold-500/50"
          >
            <Store className="text-gold-500" size={24} />
            <span className="font-medium text-lg">Ingresar como Vendedora</span>
          </button>
        </div>
      </div>
    </div>
  );
}
