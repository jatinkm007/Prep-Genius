export const problemsBatch2 = [
  // --- TWO POINTERS ---
  {
    title: 'Two Sum II - Sorted Array',
    slug: 'two-sum-ii-sorted-array',
    difficulty: 'Medium',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers', 'Binary Search'],
    description: `Given a 1-indexed array of integers \`numbers\` sorted in non-decreasing order, locate two distinct values that sum to a specified \`target\`.

Return the 1-based indices of the two elements as a two-element array \`[index1, index2]\`. Exactly one solution exists, and the same element cannot be used twice.`,
    constraints: [
      '2 <= numbers.length <= 3 * 10^4',
      '-1000 <= numbers[i] <= 1000',
      'numbers is sorted in non-decreasing order.',
      '-1000 <= target <= 1000',
      'Exactly one valid answer exists.',
    ],
    signature: {
      methodName: 'twoSum',
      returnType: 'vector<int>',
      params: [
        { name: 'numbers', type: 'vector<int>' },
        { name: 'target', type: 'int' },
      ],
    },
    starterCode: {
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        // Implement two-pointer technique
        return {};
    }
};`,
      python: `from typing import List

class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        # Implement two-pointer technique
        return []`,
      javascript: `/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
function twoSum(numbers, target) {
    // Implement two-pointer technique
    return [];
}`,
    },
    visibleTestCases: [
      {
        input: 'numbers = [2,7,11,15], target = 9',
        expectedOutput: '[1,2]',
        explanation: 'indices 1 and 2 correspond to 2 and 7.',
      },
      {
        input: 'numbers = [2,3,4], target = 6',
        expectedOutput: '[1,3]',
        explanation: 'indices 1 and 3 correspond to 2 and 4.',
      },
    ],
    hiddenTestCases: [
      {
        input: 'numbers = [-1,0], target = -1',
        expectedOutput: '[1,2]',
      },
      {
        input: 'numbers = [1,2,3,4,4,9,56,90], target = 8',
        expectedOutput: '[4,5]',
      },
    ],
  },

  {
    title: 'Container With Most Water',
    slug: 'container-with-most-water',
    difficulty: 'Medium',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers', 'Greedy'],
    description: `Given an integer array \`height\` of length \`n\`, representing vertical lines erected at coordinate indices, compute the maximum volume of water a container formed by any pair of lines can hold with the x-axis.`,
    constraints: [
      '2 <= height.length <= 10^5',
      '0 <= height[i] <= 10^4',
    ],
    signature: {
      methodName: 'maxArea',
      returnType: 'int',
      params: [{ name: 'height', type: 'vector<int>' }],
    },
    starterCode: {
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height) {
        // Implement two-pointer inward scan
        return 0;
    }
};`,
      python: `from typing import List

class Solution:
    def maxArea(self, height: List[int]) -> int:
        # Implement two-pointer inward scan
        return 0`,
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
    // Implement two-pointer inward scan
    return 0;
}`,
    },
    visibleTestCases: [
      {
        input: 'height = [1,8,6,2,5,4,8,3,7]',
        expectedOutput: '49',
        explanation: 'Lines at index 1 and index 8 hold area min(8,7) * 7 = 49.',
      },
      {
        input: 'height = [1,1]',
        expectedOutput: '1',
        explanation: 'min(1,1) * 1 = 1.',
      },
    ],
    hiddenTestCases: [
      {
        input: 'height = [4,3,2,1,4]',
        expectedOutput: '16',
      },
      {
        input: 'height = [1,2,1]',
        expectedOutput: '2',
      },
    ],
  },

  // --- STACK ---
  {
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    tags: ['String', 'Stack'],
    description: `Given a string \`s\` containing bracket characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if open brackets are closed by the same type of brackets in the correct order, and every close bracket has a matching opening bracket.`,
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only: ()[]{}',
    ],
    signature: {
      methodName: 'isValid',
      returnType: 'bool',
      params: [{ name: 's', type: 'string' }],
    },
    starterCode: {
      cpp: `#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        // Implement stack-based validation
        return false;
    }
};`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        # Implement stack-based validation
        return False`,
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    // Implement stack-based validation
    return false;
}`,
    },
    visibleTestCases: [
      {
        input: 's = "()"',
        expectedOutput: 'true',
      },
      {
        input: 's = "()[]{}"',
        expectedOutput: 'true',
      },
      {
        input: 's = "(]"',
        expectedOutput: 'false',
      },
    ],
    hiddenTestCases: [
      {
        input: 's = "([)]"',
        expectedOutput: 'false',
      },
      {
        input: 's = "{[]}"',
        expectedOutput: 'true',
      },
    ],
  },

  // --- BINARY SEARCH ---
  {
    title: 'Binary Search',
    slug: 'binary-search',
    difficulty: 'Easy',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search'],
    description: `Given a sorted array of integers \`nums\` in ascending order and a target value \`target\`, search for \`target\` in \`nums\`. 

If \`target\` exists, return its 0-based index. Otherwise, return \`-1\`. You must design an algorithm with \`O(log n)\` runtime complexity.`,
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All integers in nums are unique.',
      'nums is sorted in ascending order.',
    ],
    signature: {
      methodName: 'search',
      returnType: 'int',
      params: [
        { name: 'nums', type: 'vector<int>' },
        { name: 'target', type: 'int' },
      ],
    },
    starterCode: {
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Implement O(log n) binary search
        return -1;
    }
};`,
      python: `from typing import List

class Solution:
    def search(self, nums: List[int], target: int) -> int:
        # Implement O(log n) binary search
        return -1`,
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
    // Implement O(log n) binary search
    return -1;
}`,
    },
    visibleTestCases: [
      {
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        expectedOutput: '4',
        explanation: '9 exists in nums and its index is 4.',
      },
      {
        input: 'nums = [-1,0,3,5,9,12], target = 2',
        expectedOutput: '-1',
        explanation: '2 does not exist in nums so return -1.',
      },
    ],
    hiddenTestCases: [
      {
        input: 'nums = [5], target = 5',
        expectedOutput: '0',
      },
      {
        input: 'nums = [2,5], target = 0',
        expectedOutput: '-1',
      },
    ],
  },

  {
    title: 'Find Minimum in Rotated Sorted Array',
    slug: 'find-minimum-in-rotated-sorted-array',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search'],
    description: `Suppose an array of unique integers sorted in ascending order is rotated between 1 and \`n\` times. 

Given the sorted rotated array \`nums\`, return the minimum element in the array. You must design an algorithm that runs in \`O(log n)\` time.`,
    constraints: [
      '1 <= nums.length <= 5000',
      '-5000 <= nums[i] <= 5000',
      'All elements of nums are unique.',
    ],
    signature: {
      methodName: 'findMin',
      returnType: 'int',
      params: [{ name: 'nums', type: 'vector<int>' }],
    },
    starterCode: {
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int findMin(vector<int>& nums) {
        // Implement O(log n) minimum search
        return 0;
    }
};`,
      python: `from typing import List

class Solution:
    def findMin(self, nums: List[int]) -> int:
        # Implement O(log n) minimum search
        return 0`,
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function findMin(nums) {
    // Implement O(log n) minimum search
    return 0;
}`,
    },
    visibleTestCases: [
      {
        input: 'nums = [3,4,5,1,2]',
        expectedOutput: '1',
      },
      {
        input: 'nums = [4,5,6,7,0,1,2]',
        expectedOutput: '0',
      },
      {
        input: 'nums = [11,13,15,17]',
        expectedOutput: '11',
      },
    ],
    hiddenTestCases: [
      {
        input: 'nums = [2,1]',
        expectedOutput: '1',
      },
      {
        input: 'nums = [1]',
        expectedOutput: '1',
      },
    ],
  },

  // --- SLIDING WINDOW ---
  {
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
    difficulty: 'Easy',
    category: 'Sliding Window',
    tags: ['Array', 'Dynamic Programming', 'Sliding Window'],
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i-th\` day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit achievable from this transaction. If no profit can be achieved, return \`0\`.`,
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4',
    ],
    signature: {
      methodName: 'maxProfit',
      returnType: 'int',
      params: [{ name: 'prices', type: 'vector<int>' }],
    },
    starterCode: {
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // Implement one-pass sliding min profit tracker
        return 0;
    }
};`,
      python: `from typing import List

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # Implement one-pass sliding min profit tracker
        return 0`,
      javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
    // Implement one-pass sliding min profit tracker
    return 0;
}`,
    },
    visibleTestCases: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        expectedOutput: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.',
      },
      {
        input: 'prices = [7,6,4,3,1]',
        expectedOutput: '0',
        explanation: 'In this case, no transactions are done and the max profit = 0.',
      },
    ],
    hiddenTestCases: [
      {
        input: 'prices = [2,4,1]',
        expectedOutput: '2',
      },
      {
        input: 'prices = [1,2]',
        expectedOutput: '1',
      },
    ],
  },
];