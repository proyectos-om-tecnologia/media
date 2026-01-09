import React, { useRef, useEffect, useState } from 'react';
import { usePlayer } from '../context/PlayerContext';

const StreamingPlayer: React.FC = () => {
  const { 
    currentStream, 
    isPlaying, 
    togglePlay, 
    isExpanded, 
    toggleExpand, 
    volume, 
    setVolume,
    closePlayer
  } = usePlayer();
  
  const mediaRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.volume = volume;
      if (isPlaying) {
        setIsLoading(true);
        mediaRef.current.play()
          .then(() => setIsLoading(false))
          .catch(() => {
            setIsLoading(false);
            setError(true);
          });
      } else {
        mediaRef.current.pause();
      }
    }
  }, [currentStream, isPlaying]);

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.volume = volume;
    }
  }, [volume]);

  if (!currentStream) return null;

  return (
    <div 
      className={`fixed bottom-0 right-0 z-50 transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-full md:w-96 h-auto' : 'w-full h-20'}
        bg-gray-900/90 backdrop-blur-xl border-t border-white/10 shadow-2xl flex flex-col`}
    >
      {/* Expanded Video Area */}
      {isExpanded && currentStream.type === 'video' && (
        <div className="relative w-full aspect-video bg-black">
           {/* Close Button specific for expanded view */}
           <button 
             onClick={toggleExpand}
             className="absolute top-2 right-2 text-white bg-black/50 p-1 rounded-full hover:bg-white/20 z-10"
           >
             <i className="fas fa-compress"></i>
           </button>
        </div>
      )}

      {/* Hidden Media Element (Audio/Video handled same way logic-wise) */}
      <video
        ref={mediaRef}
        src={currentStream.url}
        className={isExpanded && currentStream.type === 'video' ? 'absolute top-0 w-full aspect-video' : 'hidden'}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onError={() => setError(true)}
      />

      {/* Control Bar */}
      <div className="flex items-center justify-between p-4 h-20 w-full">
        {/* Info */}
        <div className="flex items-center gap-3 flex-1 overflow-hidden">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
            <img src={currentStream.thumbnail} alt="Stream" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <i className={`fas fa-${currentStream.type === 'video' ? 'tv' : 'radio'} text-white/80`}></i>
            </div>
          </div>
          <div className="flex flex-col truncate">
            <span className="text-white font-semibold text-sm truncate">{currentStream.name}</span>
            <span className="text-red-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Live
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          
          {/* Volume (Hidden on mobile for simplicity) */}
          <div className="hidden sm:flex items-center gap-2 group">
            <i className={`fas fa-volume-${volume === 0 ? 'mute' : 'up'} text-gray-400 text-xs`}></i>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Play/Pause */}
          <button 
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center hover:scale-105 transition-transform"
            disabled={error}
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : error ? (
              <i className="fas fa-exclamation-triangle text-red-500"></i>
            ) : (
              <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
            )}
          </button>

          {/* Expand/Collapse */}
          <button onClick={toggleExpand} className="text-gray-400 hover:text-white transition-colors">
            <i className={`fas fa-${isExpanded ? 'compress-arrows-alt' : 'expand-arrows-alt'}`}></i>
          </button>

           {/* Close */}
           <button onClick={closePlayer} className="text-gray-400 hover:text-red-400 transition-colors ml-2">
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreamingPlayer;