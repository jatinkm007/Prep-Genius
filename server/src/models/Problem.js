import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
  isSample: { type: Boolean, default: false },
  explanation: { type: String, default: '' }
});

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  constraints: [{ type: String }],
  starterCode: {
    javascript: { type: String, default: '' },
    python: { type: String, default: '' },
    cpp: { type: String, default: '' }
  },
  testCases: [testCaseSchema]
}, { timestamps: true });

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;