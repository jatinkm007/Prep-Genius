import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from '../src/models/Problem.js';

dotenv.config();

const sampleProblems = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Implement your solution here
        return {};
    }
};

int main() {
    Solution s;
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> ans = s.twoSum(nums, target);
    for (int idx : ans) cout << idx << " ";
    cout << endl;
    return 0;
}`,
      python: `from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Implement your solution here
        return []

if __name__ == "__main__":
    s = Solution()
    print(s.twoSum([2, 7, 11, 15], 9))`,
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Implement your solution here
    return [];
};

console.log(twoSum([2, 7, 11, 15], 9));`,
    },
    visibleTestCases: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        expectedOutput: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        expectedOutput: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
      },
    ],
    hiddenTestCases: [
      {
        input: 'nums = [3,3], target = 6',
        expectedOutput: '[0,1]',
        explanation: 'Both elements are identical.',
      },
    ],
  },
  {
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    tags: ['String', 'Stack'],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only: ()[]{}',
    ],
    starterCode: {
      cpp: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        // Implement your solution here
        return false;
    }
};

int main() {
    Solution sol;
    cout << boolalpha << sol.isValid("()[]{}") << endl;
    return 0;
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        # Implement your solution here
        return False

if __name__ == "__main__":
    sol = Solution()
    print(sol.isValid("()[]{}"))`,
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    // Implement your solution here
    return false;
};

console.log(isValid("()[]{}"));`,
    },
    visibleTestCases: [
      {
        input: 's = "()"',
        expectedOutput: 'true',
        explanation: 'Simple valid parenthesis pair.',
      },
      {
        input: 's = "()[]{}"',
        expectedOutput: 'true',
        explanation: 'All open brackets matched properly.',
      },
      {
        input: 's = "(]"',
        expectedOutput: 'false',
        explanation: 'Mismatched closing bracket type.',
      },
    ],
    hiddenTestCases: [
      {
        input: 's = "([)]"',
        expectedOutput: 'false',
        explanation: 'Improperly nested sequence.',
      },
    ],
  },
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is missing in server/.env');
    }

    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB Atlas.');

    for (const item of sampleProblems) {
      await Problem.findOneAndUpdate({ slug: item.slug }, item, {
        upsert: true,
        new: true,
      });
      console.log(`[Seed] Seeded / Updated problem: ${item.title}`);
    }

    console.log('[Seed] Database successfully populated!');
    process.exit(0);
  } catch (err) {
    console.error('[Seed Error]:', err);
    process.exit(1);
  }
};

seedDatabase();