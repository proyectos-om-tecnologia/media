import React, { useState, useEffect, useRef } from 'react';
import { CURRENT_USER } from '../services/mockData';

interface Message {
  id: string;
  user: string;
  avatar: string;
  text: string;
  isSystem?: boolean;
  isMe?: boolean;
}

const RANDOM_MESSAGES = [
  "¡Qué buena música están pasando! 🎶",
  "Saludos desde Valparaíso 👋",
  "¿Alguien sabe cuándo sale la entrevista?",
  "Increíble la noticia de tecnología 🤯",
  "Suban el volumen!!",
  "OmniStream siempre informando primero.",
  "Hola a todos en el chat",
  "Ese gol fue fuera de juego clarísimo...",
];

const RANDOM_USERS = [
  { name: "Carlos M.", avatar: "https://picsum.photos/id/1005/50/50" },
  { name: "Ana P.", avatar: "https://picsum.photos/id/1011/50/50" },
  { name: "TechFan99", avatar: "https://picsum.photos/id/1025/50/50" },
  { name: "Luisa Viajera", avatar: "https://picsum.photos/id/1027/50/50" },
];

const CommunityChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', user: 'System', avatar: '', text: 'Bienvenido al chat de la comunidad OmniStream!', isSystem: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Simulate incoming messages
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldAdd = Math.random() > 0.6; // 40% chance
      if (shouldAdd) {
        const randomUser = RANDOM_USERS[Math.floor(Math.random() * RANDOM_USERS.length)];
        const randomText = RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)];
        
        const newMessage: Message = {
          id: Date.now().toString(),
          user: randomUser.name,
          avatar: randomUser.avatar,
          text: randomText
        };

        setMessages(prev => [...prev.slice(-49), newMessage]); // Keep last 50
        
        if (!isOpen) {
          setUnreadCount(prev => Math.min(prev + 1, 99));
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const myMessage: Message = {
      id: Date.now().toString(),
      user: CURRENT_USER.name,
      avatar: CURRENT_USER.avatar || 'https://ui-avatars.com/api/?name=User',
      text: inputValue,
      isMe: true
    };

    setMessages(prev => [...prev, myMessage]);
    setInputValue('');
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setUnreadCount(0);
  };

  return (
    <div className="fixed bottom-24 left-4 z-50 flex flex-col items-start font-sans pointer-events-none">
      
      {/* Chat Window */}
      <div 
        className={`
          pointer-events-auto bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden
          transition-all duration-300 origin-bottom-left mb-4
          ${isOpen ? 'w-80 h-96 opacity-100 scale-100' : 'w-80 h-0 opacity-0 scale-95'}
        `}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <div className="relative">
                <i className="fas fa-users"></i>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full border border-blue-600"></span>
            </div>
            <span className="font-bold text-sm">Comunidad ({120 + Math.floor(Math.random() * 20)})</span>
          </div>
          <button onClick={toggleChat} className="text-white/80 hover:text-white">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Messages Area */}
        <div 
          ref={scrollRef}
          className="h-[calc(100%-110px)] overflow-y-auto p-3 space-y-3 bg-slate-50/50 scroll-smooth"
        >
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-start gap-2 ${msg.isMe ? 'flex-row-reverse' : ''} ${msg.isSystem ? 'justify-center' : ''}`}
            >
              
              {msg.isSystem ? (
                 <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded-full uppercase font-bold tracking-wider">
                    {msg.text}
                 </span>
              ) : (
                <>
                    <img src={msg.avatar} alt={msg.user} className="w-6 h-6 rounded-full border border-slate-200 shadow-sm mt-1" />
                    <div 
                        className={`
                            max-w-[75%] p-2 rounded-xl text-xs shadow-sm
                            ${msg.isMe 
                                ? 'bg-blue-600 text-white rounded-tr-none' 
                                : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'}
                        `}
                    >
                        {!msg.isMe && <p className="font-bold text-[10px] opacity-70 mb-0.5">{msg.user}</p>}
                        <p className="leading-relaxed">{msg.text}</p>
                    </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="absolute bottom-0 left-0 w-full p-3 bg-white border-t border-slate-100 flex gap-2">
            <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Di algo..."
                className="flex-1 bg-slate-100 border-none rounded-full px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <i className="fas fa-paper-plane text-xs"></i>
            </button>
        </form>
      </div>

      {/* Floating Toggle Button */}
      <button 
        onClick={toggleChat}
        className="pointer-events-auto group relative w-12 h-12 bg-white text-blue-600 rounded-full shadow-lg border border-blue-100 flex items-center justify-center hover:scale-110 hover:shadow-blue-500/20 transition-all duration-300"
      >
        <i className={`fas ${isOpen ? 'fa-chevron-down' : 'fa-comment-alt'} text-xl`}></i>
        
        {/* Unread Badge */}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
            {unreadCount}
          </span>
        )}
      </button>

    </div>
  );
};

export default CommunityChat;