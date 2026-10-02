import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from '../src/models/Problem.js';
import { problemsBatch1 } from './data/problemsBatch1.js';
import { problemsBatch2 } from './data/problemsBatch2.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

const seedProblems = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error('MONGO_URI is missing from your .env file.');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected! Upserting all problem batches...');

    const combinedBatches = [...problemsBatch1, ...problemsBatch2];
    let count = 0;

    for (const prob of combinedBatches) {
      await Problem.findOneAndUpdate(
        { slug: prob.slug },
        { $set: prob },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      count++;
      console.log(`Synced [${prob.difficulty}] ${prob.title} (${prob.slug})`);
    }

    console.log(`\nSuccessfully upserted all ${count} problems into MongoDB!`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding encountered an error:', err);
    process.exit(1);
  }
};

seedProblems();