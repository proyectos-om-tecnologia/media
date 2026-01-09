import React, { useState } from 'react';
import { CURRENT_USER, EDITOR_USER } from '../services/mockData';
import { newsService } from '../services/newsService';
import { User, NewsCategory, NewsPriority, UserRole } from '../types';

const Admin: React.FC = () => {
  // Simulate Auth State
  const [currentUser, setCurrentUser] = useState<User>(CURRENT_USER);
  const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');
  
  // Form State
  const [headline, setHeadline] = useState('');
  const [lead, setLead] = useState('');
  const [category, setCategory] = useState<NewsCategory>(NewsCategory.NATIONAL);
  const [statusMsg, setStatusMsg] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const switchUser = () => {
    setCurrentUser(prev => prev.role === UserRole.ADMIN ? EDITOR_USER : CURRENT_USER);
    setStatusMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    const result = await newsService.create({
        headline,
        lead,
        category,
        body: '<p>Contenido generado por el CMS...</p>', // Simplified for demo
        priority: NewsPriority.NORMAL
    }, currentUser);

    if (result.success) {
        setStatusMsg({ type: 'success', text: 'Noticia creada exitosamente.' });
        setHeadline('');
        setLead('');
    } else {
        setStatusMsg({ type: 'error', text: result.error || 'Error desconocido' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 text-slate-800">
        <header className="bg-white p-4 border-b border-slate-200 shadow-sm flex justify-between items-center sticky top-0 z-30">
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <i className="fas fa-layer-group text-blue-600"></i> CMS Panel
            </h1>
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-xs text-slate-500 font-semibold">{currentUser.role} {currentUser.assignedCategory ? `(${currentUser.assignedCategory})` : ''}</p>
                </div>
                <button 
                    onClick={switchUser} 
                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 px-3 py-1.5 rounded transition font-medium"
                >
                    Switch User
                </button>
            </div>
        </header>

        <main className="container mx-auto p-6 max-w-3xl">
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">Crear Nueva Noticia</h2>

                {statusMsg && (
                    <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 font-medium ${statusMsg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                        <i className={`fas fa-${statusMsg.type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
                        {statusMsg.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Titular</label>
                        <input 
                            type="text" 
                            required
                            value={headline}
                            onChange={e => setHeadline(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-inner"
                            placeholder="Escribe un titular impactante..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Lead (Entradilla)</label>
                        <textarea 
                            rows={3}
                            required
                            value={lead}
                            onChange={e => setLead(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-inner"
                            placeholder="Resumen corto de la noticia..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Categoría</label>
                        <div className="relative">
                            <select 
                                value={category}
                                onChange={e => setCategory(e.target.value as NewsCategory)}
                                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-inner"
                            >
                                {Object.values(NewsCategory).map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
                                <i className="fas fa-chevron-down text-xs"></i>
                            </div>
                        </div>
                        {currentUser.role === UserRole.EDITOR && currentUser.assignedCategory !== category && (
                            <p className="text-xs text-red-500 mt-2 font-medium">
                                <i className="fas fa-lock mr-1"></i>
                                No tienes permisos para publicar en esta categoría.
                            </p>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transform hover:-translate-y-0.5"
                    >
                        Publicar Noticia
                    </button>
                </form>
            </div>
        </main>
    </div>
  );
};

export default Admin;