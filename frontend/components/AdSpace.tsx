import React from 'react';

type AdVariant = 'leaderboard' | 'rectangle' | 'banner';

interface AdSpaceProps {
  variant: AdVariant;
  className?: string;
  label?: string; // Optional custom label
}

const AdSpace: React.FC<AdSpaceProps> = ({ variant, className = '', label = 'PUBLICIDAD' }) => {
  
  // Dimensions and aspect ratios based on IAB standards
  const getDimensions = () => {
    switch (variant) {
      case 'leaderboard':
        return 'h-24 md:h-32 w-full'; // 728x90 responsive
      case 'rectangle':
        return 'h-[250px] w-full'; // 300x250 responsive
      case 'banner':
        return 'h-16 w-full'; // Mobile banner
      default:
        return 'h-32 w-full';
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center my-6 ${className}`}>
      <div className="w-full text-center mb-1">
        <span className="text-[10px] uppercase font-bold text-slate-300 tracking-widest">{label}</span>
      </div>
      
      <div className={`
        relative overflow-hidden bg-slate-100 border border-slate-200 
        flex items-center justify-center text-slate-400 group
        ${getDimensions()}
      `}>
        
        {/* Pattern Background to simulate content */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
        </div>

        {/* Placeholder Icon/Text */}
        <div className="flex flex-col items-center z-10">
            <i className="fas fa-ad text-2xl mb-2 opacity-50 group-hover:scale-110 transition-transform"></i>
            <span className="text-xs font-medium opacity-70 hidden sm:block">Espacio Patrocinado</span>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      </div>
    </div>
  );
};

export default AdSpace;