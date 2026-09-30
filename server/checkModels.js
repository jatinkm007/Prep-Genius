import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY.trim() });

async function run() {
  try {
    const res = await ai.models.list();
    console.log('--- AVAILABLE MODELS FOR YOUR KEY ---');
    for await (const m of res) {
      console.log(m.name);
    }
  } catch (e) {
    console.error('Failed to list models:', e);
  }
}

run();