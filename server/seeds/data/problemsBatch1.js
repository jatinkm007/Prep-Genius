export const problemsBatch1 = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have ***exactly one solution***, and you may not use the same element twice. You can return the answer in any order.`,
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    signature: {
      methodName: 'twoSum',
      returnType: 'vector<int>',
      params: [
        { name: 'nums', type: 'vector<int>' },
        { name: 'target', type: 'int' },
      ],
    },
    starterCode: {
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Implement your solution here
        return {};
    }
};`,
      python: `from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Implement your solution here
        return []`,
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Implement your solution here
    return [];
}`,
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
        explanation: 'Duplicate numbers forming the target.',
      },
      {
        input: 'nums = [-1,-2,-3,-4,-5], target = -8',
        expectedOutput: '[2,4]',
        explanation: 'Handling negative integers.',
      },
    ],
  },
  {
    title: 'Contains Duplicate',
    slug: 'contains-duplicate',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table', 'Sorting'],
    description: `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.`,
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9',
    ],
    signature: {
      methodName: 'containsDuplicate',
      returnType: 'bool',
      params: [{ name: 'nums', type: 'vector<int>' }],
    },
    starterCode: {
      cpp: `#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        // Implement your solution here
        return false;
    }
};`,
      python: `from typing import List

class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        # Implement your solution here
        return False`,
      javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
    // Implement your solution here
    return false;
}`,
    },
    visibleTestCases: [
      {
        input: 'nums = [1,2,3,1]',
        expectedOutput: 'true',
        explanation: '1 appears more than once.',
      },
      {
        input: 'nums = [1,2,3,4]',
        expectedOutput: 'false',
        explanation: 'All elements are distinct.',
      },
    ],
    hiddenTestCases: [
      {
        input: 'nums = [1,1,1,3,3,4,3,2,4,2]',
        expectedOutput: 'true',
      },
      {
        input: 'nums = [1000000000]',
        expectedOutput: 'false',
      },
    ],
  },
  {
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['Hash Table', 'String', 'Sorting'],
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    constraints: [
      '1 <= s.length, t.length <= 5 * 10^4',
      's and t consist of lowercase English letters.',
    ],
    signature: {
      methodName: 'isAnagram',
      returnType: 'bool',
      params: [
        { name: 's', type: 'string' },
        { name: 't', type: 'string' },
      ],
    },
    starterCode: {
      cpp: `#include <string>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool isAnagram(string s, string t) {
        // Implement your solution here
        return false;
    }
};`,
      python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        # Implement your solution here
        return False`,
      javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s, t) {
    // Implement your solution here
    return false;
}`,
    },
    visibleTestCases: [
      {
        input: 's = "anagram", t = "nagaram"',
        expectedOutput: 'true',
      },
      {
        input: 's = "rat", t = "car"',
        expectedOutput: 'false',
      },
    ],
    hiddenTestCases: [
      {
        input: 's = "a", t = "ab"',
        expectedOutput: 'false',
      },
      {
        input: 's = "listen", t = "silent"',
        expectedOutput: 'true',
      },
    ],
  },
  {
    title: 'Valid Palindrome',
    slug: 'valid-palindrome',
    difficulty: 'Easy',
    category: 'Two Pointers',
    tags: ['Two Pointers', 'String'],
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` *if it is a **palindrome**, or* \`false\` *otherwise*.`,
    constraints: [
      '1 <= s.length <= 2 * 10^5',
      's consists only of printable ASCII characters.',
    ],
    signature: {
      methodName: 'isPalindrome',
      returnType: 'bool',
      params: [{ name: 's', type: 'string' }],
    },
    starterCode: {
      cpp: `#include <string>
#include <cctype>
using namespace std;

class Solution {
public:
    bool isPalindrome(string s) {
        // Implement your solution here
        return false;
    }
};`,
      python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        # Implement your solution here
        return False`,
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
    // Implement your solution here
    return false;
}`,
    },
    visibleTestCases: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        expectedOutput: 'true',
      },
      {
        input: 's = "race a car"',
        expectedOutput: 'false',
      },
    ],
    hiddenTestCases: [
      {
        input: 's = " "',
        expectedOutput: 'true',
      },
      {
        input: 's = "0P"',
        expectedOutput: 'false',
      },
    ],
  },
];