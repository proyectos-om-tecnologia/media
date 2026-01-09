import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { News, MediaType } from '../types';
import { newsService } from '../services/newsService';
import AdSpace from '../components/AdSpace';

const ArticleLayout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      newsService.getById(id).then(data => {
        setNews(data || null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Cargando noticia...</div>;
  if (!news) return <div className="min-h-screen flex items-center justify-center text-slate-500">Noticia no encontrada</div>;

  const mainImage = news.media.find(m => m.type === MediaType.IMAGE);

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header / Nav Placeholder */}
      <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200 mb-8">
        <div className="container mx-auto px-4 h-14 flex items-center">
            <Link to="/" className="text-slate-500 hover:text-blue-600 font-medium flex items-center gap-2 transition-colors">
                <i className="fas fa-arrow-left"></i> Volver al Inicio
            </Link>
        </div>
      </nav>

      <article className="container mx-auto px-4 lg:px-0 max-w-4xl">
        {/* Header */}
        <header className="mb-8 space-y-4">
          <div className="flex items-center gap-3">
             <span className="text-blue-600 font-bold uppercase tracking-widest text-xs bg-blue-50 px-2 py-1 rounded border border-blue-100">{news.category}</span>
             <span className="text-slate-300">•</span>
             <span className="text-slate-500 text-sm font-medium">{new Date(news.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          
          {news.preTitle && <h2 className="text-xl text-slate-500 font-medium font-sans uppercase tracking-wide">{news.preTitle}</h2>}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-slate-900 leading-tight tracking-tight">
            {news.headline}
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 font-serif font-light leading-relaxed border-l-4 border-blue-600 pl-6 py-1 my-8">
            {news.lead}
          </p>

          <div className="flex items-center gap-3 mt-6 border-y border-slate-100 py-4">
             <img src={news.author.avatar} alt={news.author.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
             <div>
                <p className="text-slate-900 text-sm font-bold">{news.author.name}</p>
                <p className="text-slate-500 text-xs uppercase font-semibold tracking-wide">{news.author.role}</p>
             </div>
          </div>
        </header>

        {/* Media */}
        {mainImage && (
          <figure className="mb-10 rounded-xl overflow-hidden shadow-xl bg-slate-100">
            <img src={mainImage.url} alt={news.headline} className="w-full h-auto object-cover max-h-[600px]" />
            {mainImage.caption && (
                <figcaption className="bg-slate-50 p-3 text-center text-slate-500 text-sm italic border-t border-slate-100">
                    {mainImage.caption}
                </figcaption>
            )}
          </figure>
        )}

        {/* ADVERTISEMENT: In-Article Top */}
        <AdSpace variant="leaderboard" className="mb-10" />

        {/* Body Content */}
        <div 
            className="prose prose-slate prose-lg max-w-none text-slate-700 font-serif leading-loose"
            dangerouslySetInnerHTML={{ __html: news.body }}
        />
        
        {/* ADVERTISEMENT: In-Article Bottom */}
        <AdSpace variant="rectangle" className="mt-10" />

        {/* Tags / Footer */}
        <div className="mt-8 pt-8 border-t border-slate-200 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-sm text-slate-600 hover:bg-slate-200 cursor-pointer transition">#Noticias</span>
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-sm text-slate-600 hover:bg-slate-200 cursor-pointer transition">#{news.category}</span>
        </div>
      </article>
    </div>
  );
};

export default ArticleLayout;