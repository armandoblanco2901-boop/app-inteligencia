import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Map, Award, Truck, DollarSign, MessageSquareText } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const menuItems = [
    { id: ViewState.DASHBOARD, label: 'Resumen', icon: LayoutDashboard },
    { id: ViewState.SOURCING, label: 'Origen & Sourcing', icon: Map },
    { id: ViewState.QUALITY, label: 'Calidad & SCA', icon: Award },
    { id: ViewState.LOGISTICS, label: 'Logística & Ruta', icon: Truck },
    { id: ViewState.COMMERCIAL, label: 'Precios & Riesgos', icon: DollarSign },
    { id: ViewState.ASSISTANT, label: 'Consultor IA', icon: MessageSquareText },
  ];

  const sidebarClasses = `fixed inset-y-0 left-0 z-30 w-64 bg-stone-900 text-stone-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
  }`;

  return (
    <aside className={sidebarClasses}>
      <div className="flex items-center justify-center h-20 border-b border-stone-700 bg-stone-950">
        <div className="flex items-center space-x-2">
            <span className="text-2xl">☕</span>
            <h1 className="text-xl font-bold font-serif tracking-wider text-amber-500">VeneKaz</h1>
        </div>
      </div>
      <nav className="mt-6 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-amber-700 text-white shadow-lg'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-0 w-full p-4 border-t border-stone-800">
        <div className="bg-stone-800 rounded-lg p-3">
            <p className="text-xs text-stone-400 uppercase font-semibold mb-1">Estado de Conexión</p>
            <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-stone-200">API Operativa</span>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;