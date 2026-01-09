import React from 'react';
import { Link } from 'react-router-dom';
import { News, NewsPriority, MediaType } from '../types';

interface NewsCardProps {
  news: News;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  // Determine size based on priority
  const isBreaking = news.priority === NewsPriority.BREAKING;
  const isCover = news.priority === NewsPriority.COVER;

  // Grid span logic
  const gridClasses = isBreaking 
    ? 'col-span-1 md:col-span-2 lg:col-span-2 row-span-2' 
    : isCover 
      ? 'col-span-1 md:col-span-2 lg:col-span-1'
      : 'col-span-1';

  const image = news.media.find(m => m.type === MediaType.IMAGE)?.url || 'https://picsum.photos/800/600';

  return (
    <Link 
      to={`/article/${news.id}`} 
      // FIX: Added 'block w-full h-full' to force the link to fill the grid cell
      className={`block w-full h-full group relative overflow-hidden rounded-2xl bg-glass-100 border border-glass-200 hover:border-glass-300 transition-all duration-300 shadow-lg ${gridClasses}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={image} 
          alt={news.headline} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full">
        
        {/* Badges */}
        <div className="flex gap-2 mb-3">
          <span className="px-2 py-1 text-xs font-bold tracking-wider uppercase text-white bg-blue-600 rounded-md shadow-sm">
            {news.category}
          </span>
          {isBreaking && (
             <span className="px-2 py-1 text-xs font-bold tracking-wider uppercase text-white bg-red-600 rounded-md animate-pulse shadow-sm">
             Breaking
           </span>
          )}
        </div>

        {/* Text */}
        <div className="space-y-2">
          {news.preTitle && (
            <span className="text-blue-300 text-sm font-semibold uppercase tracking-wide drop-shadow-md">
              {news.preTitle}
            </span>
          )}
          <h3 className={`font-serif font-bold text-white leading-tight drop-shadow-md ${isBreaking ? 'text-3xl md:text-4xl' : 'text-xl'}`}>
            {news.headline}
          </h3>
          { (isBreaking || isCover) && (
            <p className="text-gray-200 text-sm line-clamp-2 mt-2 font-sans drop-shadow-sm">
              {news.lead}
            </p>
          )}
        </div>

        {/* Author Meta (Hidden on small cards) */}
        { (isBreaking || isCover) && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
             <div className="w-6 h-6 rounded-full bg-gray-600 overflow-hidden ring-1 ring-white/20">
                <img src={news.author.avatar} alt={news.author.name} />
             </div>
             <span className="text-xs text-gray-300 font-medium">By {news.author.name}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default NewsCard;