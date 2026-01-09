import React, { useState, useRef, useEffect } from 'react';
import WeatherWidget from './WeatherWidget';

const MobileWeatherMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
          ${isOpen ? 'bg-orange-50 text-orange-600 border border-orange-200' : 'text-slate-600 hover:text-orange-500 hover:bg-orange-50'}
        `}
        title="El Tiempo"
      >
        <i className="fas fa-cloud-sun text-lg"></i>
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-80 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden ring-1 ring-black/5 animate-fade-in-down">
          
          {/* Header */}
          <div className="p-3 border-b border-slate-100 bg-slate-50/80 flex justify-between items-center">
            <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
                <i className="fas fa-temperature-high text-orange-500"></i>
                Pronóstico Regional
            </h3>
          </div>

          {/* Widget Container */}
          <div className="p-2 bg-slate-50">
             {/* Pass mt-0 to remove default top margin */}
             <WeatherWidget className="mt-0 shadow-sm" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileWeatherMenu;