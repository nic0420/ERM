import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ role, currentView, setView, setRole, children }) {
  return (
    <div className="flex min-h-screen bg-dark-900 text-text-light font-sans">
      <Sidebar 
        role={role} 
        currentView={currentView} 
        setView={setView} 
        setRole={setRole} 
      />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-dark-800 border-b border-dark-700 h-16 flex items-center px-8 shrink-0">
          <h1 className="text-xl font-semibold capitalize text-text-light">
            {currentView === 'pos' ? 'Punto de Venta' : currentView}
          </h1>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
