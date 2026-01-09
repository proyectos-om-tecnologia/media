import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SocialLinks from './SocialLinks';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div 
        className={`
          fixed top-0 right-0 h-full w-[280px] bg-white/95 backdrop-blur-xl border-l border-white/20 shadow-2xl z-50 
          transform transition-transform duration-300 ease-out flex flex-col
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <h2 className="font-serif font-bold text-slate-900 text-lg">Menú</h2>
            <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors"
            >
                <i className="fas fa-times"></i>
            </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-5 space-y-6">
            <nav className="flex flex-col space-y-4">
                <Link to="/" onClick={onClose} className="text-lg font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-3">
                    <i className="fas fa-home w-6 text-center text-slate-400"></i> Inicio
                </Link>
                <div className="h-px bg-slate-100 my-2"></div>
                <button className="text-lg font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-3 text-left">
                    <i className="fas fa-newspaper w-6 text-center text-slate-400"></i> Noticias
                </button>
                <Link to="/podcast" onClick={onClose} className="text-lg font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-3">
                    <i className="fas fa-podcast w-6 text-center text-slate-400"></i> Podcast
                </Link>
                <div className="h-px bg-slate-100 my-2"></div>
                <button className="text-lg font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-3 text-left">
                    <i className="fas fa-address-card w-6 text-center text-slate-400"></i> Sobre Nosotros
                </button>
                <button className="text-lg font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-3 text-left">
                    <i className="fas fa-envelope w-6 text-center text-slate-400"></i> Contacto
                </button>
            </nav>
            
            {/* Mobile CTA */}
            <div className="pt-6">
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg">
                    Suscribirse Premium
                </button>
            </div>
        </div>

        {/* Footer / Socials */}
        <div className="p-5 bg-slate-50 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Síguenos</p>
            <SocialLinks className="justify-center" />
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;