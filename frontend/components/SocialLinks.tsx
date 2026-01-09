import React from 'react';

interface SocialLinksProps {
  className?: string;
  iconSize?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ className = '', iconSize = 'text-xl' }) => {
  const socials = [
    { name: 'Instagram', icon: 'fa-instagram', color: 'hover:text-pink-600', url: '#' },
    { name: 'X', icon: 'fa-x-twitter', color: 'hover:text-slate-900', url: '#' },
    { name: 'Facebook', icon: 'fa-facebook-f', color: 'hover:text-blue-700', url: '#' },
    { name: 'YouTube', icon: 'fa-youtube', color: 'hover:text-red-600', url: '#' },
    { name: 'TikTok', icon: 'fa-tiktok', color: 'hover:text-black', url: '#' },
  ];

  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {socials.map((social) => (
        <a 
          key={social.name}
          href={social.url}
          className={`text-slate-400 transition-colors duration-300 transform hover:scale-110 ${social.color} ${iconSize}`}
          aria-label={social.name}
        >
          <i className={`fab ${social.icon}`}></i>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;