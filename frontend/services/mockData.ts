import { News, NewsCategory, NewsPriority, NewsStatus, User, UserRole, MediaType, StreamSource, Podcast, WeatherData } from '../types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Admin Global',
  email: 'admin@omnistream.com',
  role: UserRole.ADMIN,
  avatar: 'https://picsum.photos/id/64/100/100'
};

// Alternate user for testing permissions
export const EDITOR_USER: User = {
  id: 'u2',
  name: 'Editor Deportes',
  email: 'sports@omnistream.com',
  role: UserRole.EDITOR,
  assignedCategory: NewsCategory.SPORTS,
  avatar: 'https://picsum.photos/id/65/100/100'
};

export const STREAMS: StreamSource[] = [
  {
    id: 's1',
    name: 'Radio En Vivo',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Using video as audio source for demo
    type: 'audio',
    thumbnail: 'https://picsum.photos/id/100/400/400'
  },
  {
    id: 's2',
    name: 'TV Noticiero',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    type: 'video',
    thumbnail: 'https://picsum.photos/id/200/400/400'
  },
  {
    id: 's3',
    name: 'Deportes 24/7',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    type: 'video',
    thumbnail: 'https://picsum.photos/id/202/400/400'
  },
   {
    id: 's4',
    name: 'Jazz Lounge',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    type: 'audio',
    thumbnail: 'https://picsum.photos/id/304/400/400'
  }
];

export const MOCK_PODCASTS: Podcast[] = [
  {
    id: 'p1',
    title: 'Tecnología al Día',
    host: 'Ana Tech',
    description: 'Análisis profundo de las últimas tendencias en tecnología, IA y startups.',
    coverImage: 'https://picsum.photos/id/0/400/400',
    category: 'Tecnología',
    episodes: [
      { id: 'e1', title: 'El Futuro de la IA Generativa', duration: '45 min', publishedAt: '2023-10-25', url: STREAMS[0].url, episodeNumber: 142 },
      { id: 'e2', title: 'Review: iPhone 15 vs Pixel 8', duration: '30 min', publishedAt: '2023-10-18', url: STREAMS[0].url, episodeNumber: 141 }
    ]
  },
  {
    id: 'p2',
    title: 'Mente Sana',
    host: 'Dr. Carlos Paz',
    description: 'Consejos prácticos para mejorar tu salud mental y bienestar emocional.',
    coverImage: 'https://picsum.photos/id/10/400/400',
    category: 'Salud',
    episodes: [
      { id: 'e3', title: 'Meditación para principiantes', duration: '20 min', publishedAt: '2023-10-24', url: STREAMS[0].url, episodeNumber: 24 },
      { id: 'e4', title: 'Manejando la ansiedad laboral', duration: '35 min', publishedAt: '2023-10-10', url: STREAMS[0].url, episodeNumber: 23 }
    ]
  },
  {
    id: 'p3',
    title: 'Crónicas Deportivas',
    host: 'Leo Messi (Fan)',
    description: 'Debate apasionado sobre fútbol, tenis y baloncesto.',
    coverImage: 'https://picsum.photos/id/1025/400/400',
    category: 'Deportes',
    episodes: [
      { id: 'e5', title: 'La Final Soñada', duration: '55 min', publishedAt: '2023-10-26', url: STREAMS[0].url, episodeNumber: 88 }
    ]
  },
  {
    id: 'p4',
    title: 'Historia Oculta',
    host: 'Diana Uribe',
    description: 'Viajes sonoros a través de los momentos que definieron nuestra civilización.',
    coverImage: 'https://picsum.photos/id/1015/400/400',
    category: 'Historia',
    episodes: [
      { id: 'e6', title: 'La Ruta de la Seda', duration: '60 min', publishedAt: '2023-09-15', url: STREAMS[0].url, episodeNumber: 12 }
    ]
  }
];

export const MOCK_NEWS: News[] = [
  {
    id: 'n1',
    headline: 'Avance Histórico en Energías Renovables',
    preTitle: 'Tecnología',
    lead: 'Científicos logran récord de eficiencia en paneles solares de nueva generación, prometiendo energía más barata para todos.',
    body: '<p>En un giro sorprendente de los acontecimientos, el laboratorio nacional ha confirmado que su nuevo prototipo supera el 40% de eficiencia.</p><p>Este avance podría significar el fin de la dependencia de combustibles fósiles en la próxima década.</p>',
    author: CURRENT_USER,
    category: NewsCategory.NATIONAL,
    priority: NewsPriority.BREAKING,
    status: NewsStatus.PUBLISHED,
    createdAt: new Date().toISOString(),
    media: [
      {
        url: 'https://picsum.photos/id/26/800/450',
        type: MediaType.IMAGE,
        caption: 'Planta solar experimental'
      }
    ]
  },
  {
    id: 'n2',
    headline: 'Final del Campeonato: Todo lo que debes saber',
    preTitle: 'Deportes',
    lead: 'Los dos equipos más grandes del país se enfrentan este domingo en un duelo que promete ser legendario.',
    body: '<p>El estadio está listo para recibir a más de 50.000 espectadores. Las entradas se agotaron en tiempo récord.</p><p>Los entrenadores de ambos equipos han mantenido sus estrategias en secreto absoluto.</p>',
    author: EDITOR_USER,
    category: NewsCategory.SPORTS,
    priority: NewsPriority.COVER,
    status: NewsStatus.PUBLISHED,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    media: [
      {
        url: 'https://picsum.photos/id/73/800/450',
        type: MediaType.IMAGE,
        caption: 'Estadio Nacional'
      }
    ]
  },
  {
    id: 'n3',
    headline: 'Nuevas medidas de salud pública',
    preTitle: 'Bienestar',
    lead: 'El ministerio anuncia campaña de vacunación para el invierno entrante con nuevos puntos de acceso en toda la ciudad.',
    body: '<p>Se han habilitado más de 200 nuevos puntos de vacunación en farmacias y centros comunitarios.</p>',
    author: CURRENT_USER,
    category: NewsCategory.HEALTH,
    priority: NewsPriority.NORMAL,
    status: NewsStatus.PUBLISHED,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    media: [
      {
        url: 'https://picsum.photos/id/88/800/450',
        type: MediaType.IMAGE,
        caption: 'Centro de salud'
      }
    ]
  },
    {
    id: 'n4',
    headline: 'Festival de Cine Internacional: Ganadores',
    preTitle: 'Cultura',
    lead: 'La ciudad se viste de gala para recibir a las estrellas del séptimo arte. Conoce la lista completa de galardonados.',
    body: '<p>La película sorpresa de la noche fue una producción independiente que cautivó al jurado.</p>',
    author: CURRENT_USER,
    category: NewsCategory.LIFESTYLE,
    priority: NewsPriority.NORMAL,
    status: NewsStatus.PUBLISHED,
    createdAt: new Date(Date.now() - 200000000).toISOString(),
    media: [
      {
        url: 'https://picsum.photos/id/91/800/450',
        type: MediaType.IMAGE,
        caption: 'Alfombra roja'
      }
    ]
  },
  {
    id: 'n5',
    headline: 'Tráfico: Cierre de Avenida Principal',
    preTitle: 'Tránsito',
    lead: 'Debido a obras de mantenimiento, la Avenida Libertador permanecerá cerrada este fin de semana.',
    body: '<p>Las autoridades recomiendan tomar rutas alternas por la Costanera o la Ruta 5.</p>',
    author: CURRENT_USER,
    category: NewsCategory.CITIZEN_SERVICE,
    priority: NewsPriority.NORMAL,
    status: NewsStatus.PUBLISHED,
    createdAt: new Date(Date.now() - 30000000).toISOString(),
    media: [
      {
        url: 'https://picsum.photos/id/111/800/450',
        type: MediaType.IMAGE,
        caption: 'Obras en la avenida'
      }
    ]
  },
  {
    id: 'n6',
    headline: 'Cumbre Climática Global: Acuerdos Clave',
    preTitle: 'Internacional',
    lead: 'Líderes mundiales firman un acuerdo histórico para reducir las emisiones de carbono en un 50% para 2030.',
    body: '<p>Tras dos semanas de intensas negociaciones, se llegó a un consenso sobre la financiación para países en desarrollo.</p>',
    author: CURRENT_USER,
    category: NewsCategory.INTERNATIONAL,
    priority: NewsPriority.COVER,
    status: NewsStatus.PUBLISHED,
    createdAt: new Date(Date.now() - 400000000).toISOString(),
    media: [
      {
        url: 'https://picsum.photos/id/124/800/450',
        type: MediaType.IMAGE,
        caption: 'Líderes en la cumbre'
      }
    ]
  },
  {
    id: 'n7',
    headline: 'Receta de la semana: Paella Valenciana',
    preTitle: 'Gastronomía',
    lead: 'Aprende a preparar este clásico plato español con los secretos de los mejores chefs locales.',
    body: '<p>El secreto está en el sofrito y el punto exacto del arroz bomba.</p>',
    author: CURRENT_USER,
    category: NewsCategory.LIFESTYLE,
    priority: NewsPriority.NORMAL,
    status: NewsStatus.PUBLISHED,
    createdAt: new Date(Date.now() - 500000000).toISOString(),
    media: [
      {
        url: 'https://picsum.photos/id/225/800/450',
        type: MediaType.IMAGE,
        caption: 'Paella lista para servir'
      }
    ]
  },
  {
    id: 'n8',
    headline: 'Tenis: La Joven Promesa Local Avanza',
    preTitle: 'Deportes',
    lead: 'Con solo 19 años, sorprende al mundo del deporte tras vencer al número 5 del ranking mundial en sets corridos.',
    body: '<p>El partido duró más de tres horas y fue una demostración de resistencia física y mental.</p>',
    author: EDITOR_USER,
    category: NewsCategory.SPORTS,
    priority: NewsPriority.NORMAL,
    status: NewsStatus.PUBLISHED,
    createdAt: new Date(Date.now() - 100000000).toISOString(),
    media: [
      {
        url: 'https://picsum.photos/id/250/800/450',
        type: MediaType.IMAGE,
        caption: 'Celebración del punto de partido'
      }
    ]
  },
  {
    id: 'n9',
    headline: 'Innovación en Inteligencia Artificial',
    preTitle: 'Tecnología',
    lead: 'Nueva startup presenta un modelo capaz de predecir desastres naturales con una precisión del 90%.',
    body: '<p>Utilizando datos satelitales y aprendizaje profundo, el sistema puede alertar con horas de antelación.</p>',
    author: CURRENT_USER,
    category: NewsCategory.NATIONAL,
    priority: NewsPriority.NORMAL,
    status: NewsStatus.PUBLISHED,
    createdAt: new Date(Date.now() - 600000000).toISOString(),
    media: [
      {
        url: 'https://picsum.photos/id/350/800/450',
        type: MediaType.IMAGE,
        caption: 'Centro de datos'
      }
    ]
  },
   {
    id: 'n10',
    headline: 'Beneficios del Yoga Matutino',
    preTitle: 'Salud',
    lead: 'Estudios recientes confirman que 15 minutos de yoga al despertar mejoran la productividad y reducen el estrés.',
    body: '<p>No se requiere experiencia previa, solo ropa cómoda y constancia.</p>',
    author: CURRENT_USER,
    category: NewsCategory.HEALTH,
    priority: NewsPriority.NORMAL,
    status: NewsStatus.PUBLISHED,
    createdAt: new Date(Date.now() - 700000000).toISOString(),
    media: [
      {
        url: 'https://picsum.photos/id/400/800/450',
        type: MediaType.IMAGE,
        caption: 'Clase de yoga al aire libre'
      }
    ]
  },
  {
    id: 'n11',
    headline: 'Inauguración del Nuevo Parque Central',
    preTitle: 'Ciudad',
    lead: 'El pulmón verde más grande de la ciudad abre sus puertas con actividades gratuitas para toda la familia.',
    body: '<p>El parque cuenta con lagos artificiales, senderos para bicicletas y zonas de picnic.</p>',
    author: CURRENT_USER,
    category: NewsCategory.CITIZEN_SERVICE,
    priority: NewsPriority.COVER,
    status: NewsStatus.PUBLISHED,
    createdAt: new Date(Date.now() - 50000000).toISOString(),
    media: [
      {
        url: 'https://picsum.photos/id/450/800/450',
        type: MediaType.IMAGE,
        caption: 'Vista aérea del parque'
      }
    ]
  },
  {
    id: 'n12',
    headline: 'Exploración Espacial: Misión a Marte',
    preTitle: 'Internacional',
    lead: 'La agencia espacial internacional confirma el lanzamiento de la próxima misión tripulada para 2030.',
    body: '<p>Los astronautas ya han comenzado los entrenamientos en simuladores de gravedad cero.</p>',
    author: CURRENT_USER,
    category: NewsCategory.INTERNATIONAL,
    priority: NewsPriority.NORMAL,
    status: NewsStatus.PUBLISHED,
    createdAt: new Date(Date.now() - 800000000).toISOString(),
    media: [
      {
        url: 'https://picsum.photos/id/550/800/450',
        type: MediaType.IMAGE,
        caption: 'Cohete en plataforma de lanzamiento'
      }
    ]
  }
];

export const CHILE_WEATHER_DATA: WeatherData[] = [
  { city: 'Santiago', region: 'RM', temp: 28, condition: 'Sunny', humidity: 30 },
  { city: 'Valparaíso', region: 'Valparaíso', temp: 19, condition: 'Partly Cloudy', humidity: 65 },
  { city: 'Concepción', region: 'Biobío', temp: 16, condition: 'Cloudy', humidity: 70 },
  { city: 'La Serena', region: 'Coquimbo', temp: 20, condition: 'Sunny', humidity: 55 },
  { city: 'Antofagasta', region: 'Antofagasta', temp: 22, condition: 'Sunny', humidity: 40 },
  { city: 'Temuco', region: 'Araucanía', temp: 14, condition: 'Rainy', humidity: 85 },
  { city: 'Puerto Montt', region: 'Los Lagos', temp: 12, condition: 'Rainy', humidity: 90 },
  { city: 'Valdivia', region: 'Los Ríos', temp: 13, condition: 'Rainy', humidity: 88 },
  { city: 'Punta Arenas', region: 'Magallanes', temp: 6, condition: 'Storm', humidity: 75 },
  { city: 'Iquique', region: 'Tarapacá', temp: 24, condition: 'Sunny', humidity: 45 },
];