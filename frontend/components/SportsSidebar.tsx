import React from 'react';
import { Link } from 'react-router-dom';
import { News, NewsCategory, MediaType } from '../types';

interface SportsSidebarProps {
  news: News[];
}

const SportsSidebar: React.FC<SportsSidebarProps> = ({ news }) => {
  // Filter only sports news
  const sportsNews = news.filter(n => n.category === NewsCategory.SPORTS).slice(0, 5);

  if (sportsNews.length === 0) return null;

  return (
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
            <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <i className="fas fa-futbol text-green-600"></i>
                Zona Deportiva
            </h3>
            <span className="text-[10px] uppercase font-bold bg-green-100 text-green-700 px-2 py-1 rounded border border-green-200">
                Live Score
            </span>
        </div>

        <div className="space-y-6">
            {sportsNews.map(item => (
                <Link key={item.id} to={`/article/${item.id}`} className="group flex gap-3 items-start">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200 shadow-inner">
                        <img 
                            src={item.media.find(m => m.type === MediaType.IMAGE)?.url} 
                            alt={item.headline}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider mb-1 block">
                            {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                        <h4 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-3">
                            {item.headline}
                        </h4>
                    </div>
                </Link>
            ))}
        </div>

        <button className="w-full mt-6 py-2.5 text-xs font-bold text-slate-500 hover:text-blue-600 border border-slate-200 hover:border-blue-200 hover:bg-blue-50 rounded-lg transition-all uppercase tracking-wide">
            Ver más deportes
        </button>
      </div>
  );
};

export default SportsSidebar;