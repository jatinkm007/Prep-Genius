import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB then start the HTTP server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in development mode on port ${PORT}`);
  });
});