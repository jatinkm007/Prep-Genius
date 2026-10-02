import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem',
      required: true,
      index: true,
    },
    problemSlug: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      required: true,
      enum: ['cpp', 'python', 'javascript'],
    },
    code: {
      type: String,
      required: true,
    },
    verdict: {
      type: String,
      required: true,
      enum: ['Accepted', 'Wrong Answer', 'Compile Error', 'Time Limit Exceeded', 'Runtime Error'],
    },
    passed: {
      type: Boolean,
      required: true,
      default: false,
    },
    passedTestCases: {
      type: Number,
      required: true,
      default: 0,
    },
    totalTestCases: {
      type: Number,
      required: true,
      default: 0,
    },
    runtime: {
      type: String,
      default: '0.000s',
    },
  },
  { timestamps: true }
);

// Compound index for querying user problem status quickly
submissionSchema.index({ userId: 1, problemId: 1, passed: 1 });

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;