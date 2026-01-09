import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { News, MediaType } from '../types';

interface HeroCarouselProps {
  news: News[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ news }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = news.slice(0, 3); // Limit to top 3

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6000); // 6 seconds
    return () => clearInterval(interval);
  }, [items.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  if (items.length === 0) return null;

  return (
    <div className="relative w-full h-[75vh] min-h-[500px] max-h-[800px] rounded-2xl overflow-hidden shadow-2xl group mb-8">
      
      {/* Slides */}
      {items.map((item, index) => {
        const image = item.media.find(m => m.type === MediaType.IMAGE)?.url || 'https://picsum.photos/1200/800';
        const isActive = index === currentIndex;

        return (
          <div 
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
             {/* Background Image with Zoom Effect */}
            <div className="absolute inset-0 overflow-hidden">
                <img 
                    src={image} 
                    alt={item.headline} 
                    className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-linear ${isActive ? 'scale-110' : 'scale-100'}`} 
                />
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col items-start justify-end h-full max-w-4xl">
                <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-white uppercase bg-blue-600 rounded shadow-lg">
                    {item.category}
                </span>
                
                {item.preTitle && (
                    <span className="text-blue-200 text-sm md:text-base font-bold uppercase tracking-wide mb-2 drop-shadow-md">
                        {item.preTitle}
                    </span>
                )}

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white leading-tight mb-4 drop-shadow-lg line-clamp-3">
                    <Link to={`/article/${item.id}`} className="hover:text-blue-200 transition-colors">
                        {item.headline}
                    </Link>
                </h2>
                
                <p className="text-gray-200 text-lg md:text-xl font-light line-clamp-2 max-w-2xl mb-6 drop-shadow-md hidden sm:block">
                    {item.lead}
                </p>

                <div className="flex items-center gap-4">
                    <Link 
                        to={`/article/${item.id}`}
                        className="bg-white text-slate-900 hover:bg-blue-50 px-6 py-3 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Leer Artículo Completo
                    </Link>
                    <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                        <img src={item.author.avatar} alt={item.author.name} className="w-8 h-8 rounded-full border border-white/30" />
                        <span>Por {item.author.name}</span>
                    </div>
                </div>
            </div>
          </div>
        );
      })}

      {/* Controls */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-4">
        {/* Indicators */}
        <div className="flex gap-2 mr-4">
            {items.map((_, idx) => (
                <button 
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-blue-500' : 'w-2 bg-white/50 hover:bg-white'}`}
                />
            ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
            <button 
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-white/20 bg-black/20 text-white hover:bg-white hover:text-slate-900 flex items-center justify-center transition-all backdrop-blur-sm"
            >
                <i className="fas fa-chevron-left"></i>
            </button>
            <button 
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-white/20 bg-black/20 text-white hover:bg-white hover:text-slate-900 flex items-center justify-center transition-all backdrop-blur-sm"
            >
                <i className="fas fa-chevron-right"></i>
            </button>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;