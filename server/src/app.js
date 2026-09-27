import express from 'express';
import cors from 'cors';
// ... other imports

const app = express();

// Automatically sanitize and extract clean origin (strips paths like /register)
const getCleanOrigin = (url) => {
  if (!url || url === '*') return '*';
  try {
    return new URL(url).origin;
  } catch {
    return url.replace(/\/+$/, '');
  }
};

const allowedOrigin = getCleanOrigin(process.env.CLIENT_URL) || 'http://localhost:5173';

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);

    if (
      allowedOrigin === '*' ||
      origin === allowedOrigin ||
      origin === 'http://localhost:5173' ||
      origin === 'https://perp-genius.vercel.app'
    ) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ... rest of your middleware (express.json, routes, errorHandler)