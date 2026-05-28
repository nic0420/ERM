import React from 'react';
import { ShoppingCart, Package, DollarSign, LayoutDashboard, LogOut, X } from 'lucide-react';

export default function Sidebar({ role, currentView, setView, setRole, isOpen, setIsOpen }) {
  const menuItems = [
    { id: 'pos', label: 'Punto de Venta', icon: ShoppingCart, roles: ['admin', 'vendedora'] },
    { id: 'inventory', label: 'Inventario', icon: Package, roles: ['admin'] },
    { id: 'expenses', label: 'Gastos Fijos', icon: DollarSign, roles: ['admin'] },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin'] },
  ];

  const visibleItems = menuItems.filter(item => item.roles.includes(role));

  const handleLogout = () => {
    setRole(null);
    setView('login');
  };

  const handleNavigation = (id) => {
    setView(id);
    setIsOpen(false); // Close sidebar on mobile after navigation
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-dark-800 border-r border-dark-700 flex flex-col h-screen transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        <div className="p-6 border-b border-dark-700 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gold-500 tracking-wider">D'ORO</h2>
            <p className="text-xs text-text-muted uppercase tracking-widest mt-1">Boutique</p>
          </div>
          <button 
            className="lg:hidden text-text-muted hover:text-text-light"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                  isActive 
                    ? 'bg-dark-700 text-gold-500 shadow-[inset_4px_0_0_0_#D4AF37]' 
                    : 'text-text-muted hover:bg-dark-700 hover:text-text-light'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-gold-500' : ''} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-dark-700">
          <div className="mb-4 px-4">
            <p className="text-xs text-text-muted uppercase">Usuario actual</p>
            <p className="font-medium text-text-light capitalize">{role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-dark-700 hover:bg-red-900/30 text-text-muted hover:text-red-400 rounded-md transition-colors"
          >
            <LogOut size={18} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}
