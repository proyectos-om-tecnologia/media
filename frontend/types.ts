// Enums mirroring the Mongoose Schema requirements
export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  USER = 'USER'
}

export enum NewsCategory {
  SPORTS = 'Deportes',
  NATIONAL = 'Nacional',
  INTERNATIONAL = 'Internacional',
  LIFESTYLE = 'Estilo de Vida',
  HEALTH = 'Salud',
  CITIZEN_SERVICE = 'Servicio Ciudadano'
}

export enum NewsPriority {
  BREAKING = 1,
  COVER = 2,
  NORMAL = 3
}

export enum NewsStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video'
}

// Interfaces
export interface Media {
  url: string;
  type: MediaType;
  caption?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  assignedCategory?: NewsCategory; // For Section Editors
  avatar?: string;
}

export interface News {
  id: string;
  headline: string;
  preTitle?: string;
  lead: string;
  body: string; // HTML string
  author: User;
  media: Media[];
  category: NewsCategory;
  priority: NewsPriority;
  status: NewsStatus;
  createdAt: string;
}

// Stream Types
export interface StreamSource {
  id: string;
  name: string;
  url: string;
  type: 'audio' | 'video';
  thumbnail: string;
}

// Podcast Types
export interface PodcastEpisode {
  id: string;
  title: string;
  duration: string;
  publishedAt: string;
  url: string; // Audio URL
  episodeNumber: number;
}

export interface Podcast {
  id: string;
  title: string;
  host: string;
  description: string;
  coverImage: string;
  category: string;
  episodes: PodcastEpisode[];
}

// Weather Types
export interface WeatherData {
  city: string;
  region: string;
  temp: number;
  condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Partly Cloudy' | 'Storm';
  humidity: number;
}