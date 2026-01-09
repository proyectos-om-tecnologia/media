import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PODCASTS } from '../services/mockData';
import { usePlayer } from '../context/PlayerContext';
import { StreamSource, Podcast, PodcastEpisode } from '../types';
import AdSpace from '../components/AdSpace';

const PodcastPage: React.FC = () => {
  const { playStream } = usePlayer();

  const handlePlayEpisode = (episode: PodcastEpisode, podcast: Podcast) => {
    // Convert Episode to StreamSource for the player
    const streamSource: StreamSource = {
        id: episode.id,
        name: `${podcast.title} (Ep. ${episode.episodeNumber}): ${episode.title}`,
        url: episode.url,
        type: 'audio',
        thumbnail: podcast.coverImage
    };
    playStream(streamSource);
  };

  const featuredPodcast = MOCK_PODCASTS[0];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
       {/* Header / Nav */}
      <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <Link to="/" className="text-slate-500 hover:text-blue-600 font-medium flex items-center gap-2 transition-colors">
                    <i className="fas fa-arrow-left"></i> Inicio
                </Link>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Omni<span className="text-purple-600">Cast</span></h1>
             <div className="w-20"></div> {/* Spacer for center alignment */}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-full md:w-1/3 flex justify-center md:justify-end">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 shadow-2xl rounded-2xl overflow-hidden border-4 border-white/10 group">
                        <img src={featuredPodcast.coverImage} alt={featuredPodcast.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                         <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                             onClick={() => handlePlayEpisode(featuredPodcast.episodes[0], featuredPodcast)}
                         >
                            <i className="fas fa-play-circle text-6xl text-white drop-shadow-lg"></i>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-2/3 text-center md:text-left">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase bg-purple-600 rounded-full text-white">
                        Destacado del Mes
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{featuredPodcast.title}</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed">
                        {featuredPodcast.description}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <button 
                            onClick={() => handlePlayEpisode(featuredPodcast.episodes[0], featuredPodcast)}
                            className="px-8 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-purple-50 transition-colors flex items-center gap-2 shadow-lg"
                        >
                            <i className="fas fa-play"></i> Escuchar Ep. {featuredPodcast.episodes[0].episodeNumber}
                        </button>
                        <button className="px-8 py-3 border border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-colors backdrop-blur-sm">
                            <i className="fas fa-plus mr-2"></i> Seguir
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Ad Space */}
      <div className="container mx-auto px-4">
          <AdSpace variant="leaderboard" label="Publicidad" />
      </div>

      <main className="container mx-auto px-4 py-12">
        
        {/* Latest Episodes List */}
        <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <i className="fas fa-headphones-alt text-purple-600"></i> Episodios Recientes
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {MOCK_PODCASTS.flatMap(p => p.episodes.map(e => ({...e, podcast: p})))
                    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
                    .slice(0, 5)
                    .map((item, idx) => (
                        <div key={item.id} className={`flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0`}>
                            <span className="text-slate-400 font-bold text-lg w-6 text-center">{idx + 1}</span>
                            <div className="w-12 h-12 rounded bg-slate-200 flex-shrink-0 overflow-hidden relative group cursor-pointer"
                                onClick={() => handlePlayEpisode(item, item.podcast)}
                            >
                                <img src={item.podcast.coverImage} alt={item.podcast.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <i className="fas fa-play text-white text-xs"></i>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-slate-800 text-sm md:text-base truncate">{item.title}</h4>
                                <p className="text-xs text-slate-500 font-medium mt-1">
                                    <span className="inline-block bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded mr-2 font-bold border border-purple-200">
                                        Ep. {item.episodeNumber}
                                    </span>
                                    {item.podcast.title} • {item.duration}
                                </p>
                            </div>
                            <div className="hidden sm:block text-xs text-slate-400 font-medium">
                                {item.publishedAt}
                            </div>
                            <button 
                                onClick={() => handlePlayEpisode(item, item.podcast)}
                                className="w-8 h-8 rounded-full border border-slate-200 text-purple-600 hover:bg-purple-50 flex items-center justify-center transition-colors"
                            >
                                <i className="fas fa-play text-xs"></i>
                            </button>
                        </div>
                    ))
                }
            </div>
        </section>

        {/* Categories Grid */}
        <section>
            <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Explorar Canales</h2>
                <button className="text-sm font-bold text-purple-600 hover:text-purple-700">Ver Todos</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_PODCASTS.map(podcast => (
                    <div key={podcast.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-slate-100">
                             <img src={podcast.coverImage} alt={podcast.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                             <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                {podcast.category}
                             </div>
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg mb-1 truncate">{podcast.title}</h3>
                        <p className="text-sm text-slate-500 mb-3 truncate">Por {podcast.host}</p>
                        
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                            <span className="text-xs font-bold text-slate-400">{podcast.episodes.length} Episodios</span>
                            <button 
                                className="text-purple-600 hover:bg-purple-50 p-2 rounded-full transition-colors"
                                onClick={() => handlePlayEpisode(podcast.episodes[0], podcast)}
                                title={`Reproducir Ep. ${podcast.episodes[0].episodeNumber}`}
                            >
                                <i className="fas fa-play-circle text-xl"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>

         {/* Bottom Ad */}
        <AdSpace variant="leaderboard" className="mt-16" />
      </main>
    </div>
  );
};

export default PodcastPage;