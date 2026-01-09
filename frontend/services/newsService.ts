import { News, NewsCategory, User, UserRole, NewsStatus } from '../types';
import { MOCK_NEWS } from './mockData';

// Simulating database latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const newsService = {
  getAll: async (): Promise<News[]> => {
    await delay(500);
    return [...MOCK_NEWS];
  },

  getById: async (id: string): Promise<News | undefined> => {
    await delay(300);
    return MOCK_NEWS.find(n => n.id === id);
  },

  /**
   * BACKEND LOGIC SIMULATION
   * This mirrors the Controller requirements: Validating Role and Category
   */
  create: async (newsData: Partial<News>, currentUser: User): Promise<{ success: boolean; data?: News; error?: string }> => {
    await delay(800);

    // 1. Auth Guard
    if (!currentUser) {
      return { success: false, error: 'Unauthorized' };
    }

    // 2. Permission Logic
    if (currentUser.role === UserRole.EDITOR) {
      // Editor can only post in their assigned category
      if (newsData.category !== currentUser.assignedCategory) {
        return { 
          success: false, 
          error: `Access Denied: You are only authorized to publish in ${currentUser.assignedCategory}` 
        };
      }
    }

    // 3. Create "DB" Entry
    const newNews: News = {
      id: `n${Date.now()}`,
      headline: newsData.headline!,
      preTitle: newsData.preTitle,
      lead: newsData.lead!,
      body: newsData.body!,
      author: currentUser,
      media: newsData.media || [],
      category: newsData.category!,
      priority: newsData.priority!,
      status: newsData.status || NewsStatus.DRAFT,
      createdAt: new Date().toISOString()
    };

    // Simulate DB Insert
    MOCK_NEWS.unshift(newNews);

    return { success: true, data: newNews };
  }
};