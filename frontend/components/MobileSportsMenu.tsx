import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { News, NewsCategory, MediaType } from '../types';

interface MobileSportsMenuProps {
  news: News[];
}

const MobileSportsMenu: React.FC<MobileSportsMenuProps> = ({ news }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Filter sports news
  const sportsNews = news.filter(n => n.category === NewsCategory.SPORTS).slice(0, 4);

  // Close click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative lg:hidden" ref={menuRef}>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
          ${isOpen ? 'bg-green-50 text-green-600 border border-green-200' : 'text-slate-600 hover:text-green-600 hover:bg-green-50'}
        `}
        title="Zona Deportiva"
      >
        <i className="fas fa-futbol text-lg"></i>
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden ring-1 ring-black/5 animate-fade-in-down">
          
          {/* Header */}
          <div className="p-3 border-b border-slate-100 bg-slate-50/80 flex justify-between items-center">
            <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
                <i className="fas fa-futbol text-green-600"></i>
                Zona Deportiva
            </h3>
            <span className="text-[10px] uppercase font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded border border-green-200">
                Live Score
            </span>
          </div>

          {/* List */}
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {sportsNews.map(item => (
                <Link 
                    key={item.id} 
                    to={`/article/${item.id}`} 
                    onClick={() => setIsOpen(false)}
                    className="group flex gap-3 items-start p-2 hover:bg-slate-50 rounded-lg transition-colors mb-1"
                >
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200 shadow-sm">
                        <img 
                            src={item.media.find(m => m.type === MediaType.IMAGE)?.url} 
                            alt={item.headline}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider mb-0.5 block">
                            {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                        <h4 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                            {item.headline}
                        </h4>
                    </div>
                </Link>
            ))}

            {/* Mini Widget */}
            <div className="mt-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-3 text-center text-white shadow-sm mx-2">
                <div className="flex justify-between items-center font-bold text-sm mb-1">
                    <span>LOCAL</span>
                    <span className="text-blue-200 text-xs">VS</span>
                    <span>VISITA</span>
                </div>
                <p className="text-blue-100 text-[10px] opacity-90">Domingo, 18:00 HS</p>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-2 border-t border-slate-100 bg-slate-50">
            <button className="w-full py-2 text-xs font-bold text-slate-500 hover:text-blue-600 hover:bg-white border border-transparent hover:border-slate-200 rounded transition-all uppercase">
                Ver todo deportes
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default MobileSportsMenu;