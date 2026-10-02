import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      required: true,
    },
    expectedOutput: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
      default: '',
    },
  },
  { _id: false }
);

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Easy',
    },
    category: {
      type: String,
      default: 'Data Structures & Algorithms',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    constraints: [
      {
        type: String,
      },
    ],
    signature: {
      methodName: { type: String, default: '' },
      returnType: { type: String, default: '' },
      params: [
        {
          name: { type: String },
          type: { type: String },
          _id: false,
        },
      ],
    },
    starterCode: {
      cpp: {
        type: String,
        default: '',
      },
      python: {
        type: String,
        default: '',
      },
      javascript: {
        type: String,
        default: '',
      },
    },
    visibleTestCases: [testCaseSchema],
    hiddenTestCases: [testCaseSchema],
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;