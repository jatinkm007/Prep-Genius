import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Problem from '../src/models/Problem.js';

const sampleProblems = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      'Only one valid answer exists.'
    ],
    starterCode: {
      javascript: 'function twoSum(nums, target) {\n  // Write your code here\n}',
      python: 'def two_sum(nums, target):\n    # Write your code here\n    pass',
      cpp: '#include <vector>\n\nstd::vector<int> twoSum(std::vector<int>& nums, int target) {\n    // Write your code here\n}'
    },
    testCases: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        expectedOutput: '[0,1]',
        isSample: true,
        explanation: 'nums[0] + nums[1] == 9'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        expectedOutput: '[1,2]',
        isSample: true,
        explanation: 'nums[1] + nums[2] == 6'
      },
      {
        input: 'nums = [3,3], target = 6',
        expectedOutput: '[0,1]',
        isSample: false
      }
    ]
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!mongoUri) {
      console.log('Error: MONGO_URI is missing in your .env file!');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB!');

    await Problem.deleteMany({});
    console.log('Cleaned old problems.');

    await Problem.insertMany(sampleProblems);
    console.log('Success! Problems added to database.');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();