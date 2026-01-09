import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import Home from './pages/Home';
import ArticleLayout from './pages/ArticleLayout';
import Admin from './pages/Admin';
import PodcastPage from './pages/PodcastPage';
import StreamingPlayer from './components/StreamingPlayer';
import CommunityChat from './components/CommunityChat';

const App: React.FC = () => {
  return (
    <PlayerProvider>
      <Router>
        <div className="relative min-h-screen text-slate-800 antialiased selection:bg-blue-200 selection:text-blue-900">
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<ArticleLayout />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/podcast" element={<PodcastPage />} />
          </Routes>

          {/* Persistent Floating Components */}
          <CommunityChat />
          <StreamingPlayer />
          
          {/* Quick Admin Link for Demo */}
          <Link to="/admin" className="fixed bottom-24 right-4 bg-white hover:bg-slate-50 p-3 rounded-full z-40 text-slate-600 border border-slate-200 shadow-lg transition-all hover:shadow-xl" title="Go to CMS">
            <i className="fas fa-cog"></i>
          </Link>

        </div>
      </Router>
    </PlayerProvider>
  );
};

export default App;