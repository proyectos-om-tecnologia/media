import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const PORT = Number(process.env.PORT || 3100);

// Allowed origins for CORS (comma-separated in env)
const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || '';
const allowedOrigins = allowedOriginsEnv.split(',').map(s => s.trim()).filter(Boolean);

// Allowed image sources for Helmet CSP (comma-separated in env)
const allowedImageSourcesEnv = process.env.ALLOWED_IMAGE_SOURCES || '';
const allowedImageSources = allowedImageSourcesEnv.split(',').map(s => s.trim()).filter(Boolean);

const app = express();

// CORS configuration: allow requests from allowedOrigins or allow same-origin (no origin header)
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow non-browser or same-origin requests
    if (allowedOrigins.length === 0 || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS: Origin not allowed'));
  }
};

app.use(cors(corsOptions));

// Helmet with a more complete CSP to allow external fonts, CDN styles and FontAwesome/icons
// Allow https: broadly for external images, fonts and CDNs used by the frontend
const imgSrc = ["'self'", 'data:', 'blob:', 'https:'];
const scriptSrc = ["'self'", "'unsafe-inline'", 'https:'];
const styleSrc = ["'self'", "'unsafe-inline'", 'https:'];
const fontSrc = ["'self'", 'data:', 'https:'];

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc,
      styleSrc,
      imgSrc,
      fontSrc,
      connectSrc: ["'self'", 'https://esm.sh'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    }
  })
);

// Path to frontend/dist (assumes backend cwd is media/backend)
const frontendDist = path.resolve(process.cwd(), '..', 'frontend', 'dist');
if (!fs.existsSync(frontendDist)) {
  console.warn(`Warning: frontend dist not found at ${frontendDist}`);
}

app.use(express.static(frontendDist, { extensions: ['html'] }));

app.get('*', (req, res) => {
  const indexPath = path.join(frontendDist, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Frontend build not found. Run the frontend build first.');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`Serving frontend from ${frontendDist}`);
});
