import React, { useState, useEffect } from 'react';
import { CHILE_WEATHER_DATA } from '../services/mockData';

interface WeatherWidgetProps {
  className?: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ className = 'mt-6' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Auto slide every 4 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CHILE_WEATHER_DATA.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = CHILE_WEATHER_DATA[currentIndex];

  const getIcon = (condition: string) => {
    switch (condition) {
      case 'Sunny': return 'fa-sun text-yellow-400';
      case 'Cloudy': return 'fa-cloud text-slate-300';
      case 'Partly Cloudy': return 'fa-cloud-sun text-slate-200';
      case 'Rainy': return 'fa-cloud-showers-heavy text-blue-300';
      case 'Storm': return 'fa-bolt text-yellow-600';
      default: return 'fa-sun';
    }
  };

  const getBgGradient = (temp: number) => {
    if (temp >= 25) return 'from-orange-500 to-red-600'; // Hot
    if (temp >= 15) return 'from-blue-400 to-blue-600'; // Mild
    return 'from-slate-600 to-slate-800'; // Cold
  };

  return (
    <div className={`w-full rounded-2xl overflow-hidden shadow-lg relative group ${className}`}>
      {/* Background with Transition */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${getBgGradient(current.temp)} transition-all duration-1000`}
      />
      
      {/* Header Attribution */}
      <div className="relative z-10 px-4 pt-3 flex justify-between items-center border-b border-white/10 pb-2">
        <span className="text-[10px] text-white/80 font-bold uppercase tracking-wider flex items-center gap-1">
          <i className="fas fa-satellite-dish"></i> El Tiempo
        </span>
        <div className="flex items-center gap-1 opacity-70">
            <span className="text-[9px] text-white font-semibold">Powered by</span>
            <span className="text-[9px] text-orange-400 font-bold">AccuWeather</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-5 text-white">
        <div className="flex items-center justify-between animate-fade-in">
           <div>
               <h3 className="text-xl font-serif font-bold leading-tight">{current.city}</h3>
               <p className="text-xs text-white/70 font-medium uppercase tracking-wide">{current.region}</p>
           </div>
           <div className="text-right">
              <i className={`fas ${getIcon(current.condition)} text-3xl drop-shadow-md mb-1 block`}></i>
              <p className="text-xs font-medium">{current.condition}</p>
           </div>
        </div>
        
        <div className="flex items-end gap-2 mt-4">
            <span className="text-5xl font-black tracking-tighter">{current.temp}°</span>
            <span className="mb-2 text-sm text-white/80 font-medium">
                <i className="fas fa-tint text-blue-300 mr-1"></i> 
                {current.humidity}%
            </span>
        </div>
      </div>

      {/* Progress Bar for Slider */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
          <div 
            key={currentIndex} 
            className="h-full bg-white/50 animate-[width_4s_linear]" 
            style={{ width: '100%' }}
          ></div>
      </div>
      
      {/* Decorative Shine */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
    </div>
  );
};

export default WeatherWidget;