import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StreamSource } from '../types';
import { STREAMS } from '../services/mockData';

interface PlayerContextType {
  currentStream: StreamSource | null;
  isPlaying: boolean;
  isExpanded: boolean;
  volume: number;
  playStream: (stream: StreamSource) => void;
  togglePlay: () => void;
  toggleExpand: () => void;
  setVolume: (vol: number) => void;
  closePlayer: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStream, setCurrentStream] = useState<StreamSource | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.8);

  const playStream = (stream: StreamSource) => {
    // If playing the same stream, just toggle expand
    if (currentStream?.id === stream.id) {
      setIsExpanded(true);
      return;
    }
    setCurrentStream(stream);
    setIsPlaying(true);
    setIsExpanded(stream.type === 'video'); // Auto expand for video
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const closePlayer = () => {
    setIsPlaying(false);
    setCurrentStream(null);
    setIsExpanded(false);
  };

  return (
    <PlayerContext.Provider value={{
      currentStream,
      isPlaying,
      isExpanded,
      volume,
      playStream,
      togglePlay,
      toggleExpand,
      setVolume,
      closePlayer
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be used within PlayerProvider');
  return context;
};