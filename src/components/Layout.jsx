import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

export default function Layout({ role, currentView, setView, setRole, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-dark-900 text-text-light font-sans relative">
      <Sidebar 
        role={role} 
        currentView={currentView} 
        setView={setView} 
        setRole={setRole}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-dark-800 border-b border-dark-700 h-16 flex items-center px-4 lg:px-8 shrink-0">
          <button 
            className="lg:hidden mr-4 text-text-muted hover:text-text-light"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold capitalize text-text-light">
            {currentView === 'pos' ? 'Punto de Venta' : currentView}
          </h1>
        </header>
        
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
