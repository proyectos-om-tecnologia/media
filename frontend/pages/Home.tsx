import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { News } from '../types';
import { newsService } from '../services/newsService';
import NewsCard from '../components/NewsCard';
import HeaderStreamMenu from '../components/HeaderStreamMenu';
import SportsSidebar from '../components/SportsSidebar';
import HeroCarousel from '../components/HeroCarousel';
import MobileSportsMenu from '../components/MobileSportsMenu';
import MobileWeatherMenu from '../components/MobileWeatherMenu';
import MobileDrawer from '../components/MobileDrawer';
import AdSpace from '../components/AdSpace';
import WeatherWidget from '../components/WeatherWidget';
import SocialLinks from '../components/SocialLinks';

const Home: React.FC = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    newsService.getAll().then(data => {
        const sorted = [...data].sort((a, b) => a.priority - b.priority);
        setNewsList(sorted);
    });
  }, []);

  const heroNews = newsList.slice(0, 3);
  const gridNews = newsList.slice(3);

  return (
    <div className="min-h-screen pb-24">
        {/* Navigation / Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                
                {/* Brand */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                        <i className="fas fa-bolt"></i>
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Omni<span className="text-blue-600">Stream</span></h1>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    
                    {/* Quick Access Icons (Visible on Mobile/Tablet) */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <MobileWeatherMenu />
                        <MobileSportsMenu news={newsList} />
                    </div>

                    {/* Live Stream (Always visible) */}
                    <HeaderStreamMenu />

                    {/* Desktop Navigation (Hidden on Tablet/Mobile) */}
                    <div className="hidden lg:flex items-center gap-6 border-l border-slate-200 pl-6 ml-2">
                        <nav className="flex gap-5 text-sm font-semibold text-slate-600">
                             <button className="hover:text-blue-600 transition-colors">Noticias</button>
                             <Link to="/podcast" className="hover:text-blue-600 transition-colors">Podcast</Link>
                        </nav>
                        
                        <SocialLinks className="gap-3 text-sm" iconSize="text-base" />

                        <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                            Suscribirse
                        </button>
                    </div>

                    {/* Mobile Menu Trigger (Hamburger) */}
                    <button 
                        onClick={() => setIsDrawerOpen(true)}
                        className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-full transition-colors ml-1"
                    >
                        <i className="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </header>

        {/* Mobile Drawer Component */}
        <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

        <main className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Left/Main Column */}
                <div className="flex-1 min-w-0">
                    <HeroCarousel news={heroNews} />
                    <AdSpace variant="leaderboard" className="max-w-4xl mx-auto" />

                    <div className="flex items-center justify-between mb-6 mt-6 border-b border-slate-200 pb-4">
                        <h2 className="text-2xl font-serif font-bold text-slate-900">Más Noticias</h2>
                        <div className="hidden sm:flex gap-2">
                            {['Todo', 'Nacional', 'Mundo', 'Tecno'].map(cat => (
                                <button key={cat} className="px-3 py-1 rounded-full border border-slate-200 bg-white text-xs text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm">
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[300px]">
                        {gridNews.map(news => (
                            <NewsCard key={news.id} news={news} />
                        ))}
                    </div>

                     <AdSpace variant="leaderboard" className="mt-10" label="CONTENIDO PATROCINADO" />
                </div>

                {/* Right Column: Sidebar (Hidden on Mobile/Tablet) */}
                <div className="hidden lg:block lg:w-80 flex-shrink-0">
                    <div className="sticky top-24 space-y-6">
                        <SportsSidebar news={newsList} />
                        <WeatherWidget />
                        <AdSpace variant="rectangle" />
                    </div>
                </div>

            </div>
        </main>
    </div>
  );
};

export default Home;