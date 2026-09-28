import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import problemRoutes from './routes/problemRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();

const getCleanOrigin = (url) => {
  if (!url || url === '*') return '*';
  try {
    return new URL(url).origin;
  } catch {
    return url.replace(/\/+$/, '');
  }
};

const allowedOrigins = [
  'http://localhost:5173',
  'https://prep-genius.vercel.app',
  getCleanOrigin(process.env.CLIENT_URL),
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow tools like Postman or mobile requests without origin header
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// 1. CORS middleware (this handles all routes and options automatically)
app.use(cors(corsOptions));

// 2. Read incoming JSON body
app.use(express.json());

// 3. Health check route
app.get('/', (req, res) => {
  res.json({ status: 'active', message: 'Prep Genius API is running' });
});

// 4. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);

// 5. Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;