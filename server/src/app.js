import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

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

// Body parser
app.use(express.json());

// Base health check
app.get('/', (req, res) => {
  res.json({ status: 'active', message: 'Prep Genius API is running' });
});

// Routes
app.use('/api/auth', authRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// CRUCIAL: Export the app instance as default
export default app;