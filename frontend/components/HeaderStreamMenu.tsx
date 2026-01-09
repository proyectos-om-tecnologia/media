import React, { useState, useRef, useEffect } from 'react';
import { STREAMS } from '../services/mockData';
import { usePlayer } from '../context/PlayerContext';

const HeaderStreamMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { playStream, currentStream, isPlaying, togglePlay } = usePlayer();
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

  const handlePlayClick = (stream: typeof STREAMS[0]) => {
    if (currentStream?.id === stream.id) {
      togglePlay();
    } else {
      playStream(stream);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-semibold
          ${isOpen || isPlaying ? 'bg-red-50 text-red-600 border border-red-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}
        `}
      >
        <div className="relative">
            <i className="fas fa-broadcast-tower"></i>
            {isPlaying && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse border border-white"></span>
            )}
        </div>
        <span className="text-sm hidden sm:block">En Vivo</span>
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-80 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden ring-1 ring-black/5">
          <div className="p-3 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Fuentes Disponibles</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {STREAMS.map(stream => {
              const isActive = currentStream?.id === stream.id;
              
              return (
                <div 
                  key={stream.id} 
                  className={`flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0 ${isActive ? 'bg-blue-50/50' : ''}`}
                  onClick={() => handlePlayClick(stream)}
                >
                  {/* Thumbnail */}
                  <div className="relative w-12 h-12 rounded bg-slate-200 flex-shrink-0 overflow-hidden group">
                    <img src={stream.thumbnail} alt={stream.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                       {isActive && isPlaying ? (
                           <div className="w-3 h-3 bg-red-500 rounded-sm animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)] border border-white"></div>
                       ) : (
                           <i className={`fas fa-${stream.type === 'video' ? 'tv' : 'music'} text-white text-xs drop-shadow-md`}></i>
                       )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold truncate ${isActive ? 'text-blue-600' : 'text-slate-700'}`}>
                        {stream.name}
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">{stream.type}</p>
                  </div>

                  {/* Action */}
                  <button 
                    className={`
                        w-8 h-8 rounded-full flex items-center justify-center border transition-all shadow-sm
                        ${isActive && isPlaying 
                            ? 'bg-red-100 border-red-200 text-red-600' 
                            : 'bg-white border-slate-200 text-slate-400 hover:border-blue-400 hover:text-blue-500'}
                    `}
                  >
                    <i className={`fas fa-${isActive && isPlaying ? 'stop' : 'play'} text-xs`}></i>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderStreamMenu;