import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Problem from '../src/models/Problem.js';
import { generateStarterCode } from '../src/utils/starterCodeGenerator.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

const runImporter = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error('MONGO_URI is missing in .env');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected! Ingesting problems dataset from problems.json...');

    const filePath = path.join(__dirname, 'problems.json');
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const rawData = fs.readFileSync(filePath, 'utf8');
    const problemList = JSON.parse(rawData);

    let count = 0;

    for (const item of problemList) {
      const starterCode = item.starterCode || generateStarterCode(item.signature);

      const problemDoc = {
        ...item,
        starterCode,
      };

      await Problem.findOneAndUpdate(
        { slug: item.slug },
        { $set: problemDoc },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      count++;
      console.log(`[${count}/${problemList.length}] Ingested: [${item.difficulty}] ${item.title} (${item.slug})`);
    }

    console.log(`\nSuccessfully imported ${count} problems cleanly!`);
    process.exit(0);
  } catch (err) {
    console.error('Import failed:', err);
    process.exit(1);
  }
};

runImporter();