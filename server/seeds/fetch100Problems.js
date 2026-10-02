import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from '../src/models/Problem.js';
import { generateStarterCode } from '../src/utils/starterCodeGenerator.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

// 100 Curated Algorithmic Problems across all standard interview categories
const curated100 = [
  // --- ARRAYS & HASHING (1-12) ---
  {
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table'],
    description: 'Find two indices in nums that add up to target.',
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9'],
    signature: { methodName: 'twoSum', returnType: 'vector<int>', params: [{ name: 'nums', type: 'vector<int>' }, { name: 'target', type: 'int' }] },
    visibleTestCases: [{ input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0,1]' }],
    hiddenTestCases: [{ input: 'nums = [3,2,4], target = 6', expectedOutput: '[1,2]' }]
  },
  {
    title: 'Contains Duplicate',
    slug: 'contains-duplicate',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table'],
    description: 'Return true if any value appears at least twice in the array.',
    constraints: ['1 <= nums.length <= 10^5'],
    signature: { methodName: 'containsDuplicate', returnType: 'bool', params: [{ name: 'nums', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nums = [1,2,3,1]', expectedOutput: 'true' }],
    hiddenTestCases: [{ input: 'nums = [1,2,3,4]', expectedOutput: 'false' }]
  },
  {
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['String', 'Hash Table'],
    description: 'Given two strings s and t, return true if t is an anagram of s.',
    constraints: ['1 <= s.length, t.length <= 5 * 10^4'],
    signature: { methodName: 'isAnagram', returnType: 'bool', params: [{ name: 's', type: 'string' }, { name: 't', type: 'string' }] },
    visibleTestCases: [{ input: 's = "anagram", t = "nagaram"', expectedOutput: 'true' }],
    hiddenTestCases: [{ input: 's = "rat", t = "car"', expectedOutput: 'false' }]
  },
  {
    title: 'Group Anagrams',
    slug: 'group-anagrams',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table', 'String'],
    description: 'Group an array of strings into sub-lists of anagrams.',
    constraints: ['1 <= strs.length <= 10^4'],
    signature: { methodName: 'groupAnagrams', returnType: 'vector<vector<string>>', params: [{ name: 'strs', type: 'vector<string>' }] },
    visibleTestCases: [{ input: 'strs = ["eat","tea","tan","ate","nat","bat"]', expectedOutput: '[["bat"],["nat","tan"],["ate","eat","tea"]]' }],
    hiddenTestCases: [{ input: 'strs = [""]', expectedOutput: '[[""]]' }]
  },
  {
    title: 'Top K Frequent Elements',
    slug: 'top-k-frequent-elements',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table', 'Heap'],
    description: 'Given an integer array nums and integer k, return the k most frequent elements.',
    constraints: ['1 <= nums.length <= 10^5', 'k is in range of unique elements'],
    signature: { methodName: 'topKFrequent', returnType: 'vector<int>', params: [{ name: 'nums', type: 'vector<int>' }, { name: 'k', type: 'int' }] },
    visibleTestCases: [{ input: 'nums = [1,1,1,2,2,3], k = 2', expectedOutput: '[1,2]' }],
    hiddenTestCases: [{ input: 'nums = [1], k = 1', expectedOutput: '[1]' }]
  },
  {
    title: 'Product of Array Except Self',
    slug: 'product-of-array-except-self',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Prefix Sum'],
    description: 'Return an array where output[i] equals the product of all elements except nums[i] in O(n) without division.',
    constraints: ['2 <= nums.length <= 10^5'],
    signature: { methodName: 'productExceptSelf', returnType: 'vector<int>', params: [{ name: 'nums', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nums = [1,2,3,4]', expectedOutput: '[24,12,8,6]' }],
    hiddenTestCases: [{ input: 'nums = [-1,1,0,-3,3]', expectedOutput: '[0,0,9,0,0]' }]
  },
  {
    title: 'Longest Consecutive Sequence',
    slug: 'longest-consecutive-sequence',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table', 'Union Find'],
    description: 'Find the length of the longest consecutive elements sequence in O(n) time.',
    constraints: ['0 <= nums.length <= 10^5'],
    signature: { methodName: 'longestConsecutive', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nums = [100,4,200,1,3,2]', expectedOutput: '4' }],
    hiddenTestCases: [{ input: 'nums = [0,3,7,2,5,8,4,6,0,1]', expectedOutput: '9' }]
  },
  {
    title: 'Encode and Decode Strings',
    slug: 'encode-and-decode-strings',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    tags: ['String', 'Design'],
    description: 'Design an algorithm to encode a list of strings to a string and decode back.',
    constraints: ['0 <= strs.length <= 200'],
    signature: { methodName: 'encodeDecodeCount', returnType: 'int', params: [{ name: 'strs', type: 'vector<string>' }] },
    visibleTestCases: [{ input: 'strs = ["lint","code","love","you"]', expectedOutput: '4' }],
    hiddenTestCases: [{ input: 'strs = ["we","say",":","yes"]', expectedOutput: '4' }]
  },
  {
    title: 'Majority Element',
    slug: 'majority-element',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Counting'],
    description: 'Given an array nums of size n, return the majority element that appears more than n/2 times.',
    constraints: ['1 <= nums.length <= 5 * 10^4'],
    signature: { methodName: 'majorityElement', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nums = [3,2,3]', expectedOutput: '3' }],
    hiddenTestCases: [{ input: 'nums = [2,2,1,1,1,2,2]', expectedOutput: '2' }]
  },
  {
    title: 'Sort Colors',
    slug: 'sort-colors',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    description: 'Sort an array of 0s, 1s, and 2s in-place (Dutch National Flag problem).',
    constraints: ['1 <= nums.length <= 300'],
    signature: { methodName: 'sortColorsCount', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nums = [2,0,2,1,1,0]', expectedOutput: '6' }],
    hiddenTestCases: [{ input: 'nums = [2,0,1]', expectedOutput: '3' }]
  },
  {
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Divide and Conquer', 'Dynamic Programming'],
    description: 'Find the contiguous subarray with the largest sum and return its sum.',
    constraints: ['1 <= nums.length <= 10^5'],
    signature: { methodName: 'maxSubArray', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6' }],
    hiddenTestCases: [{ input: 'nums = [1]', expectedOutput: '1' }]
  },
  {
    title: 'Subarray Sum Equals K',
    slug: 'subarray-sum-equals-k',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    tags: ['Array', 'Hash Table', 'Prefix Sum'],
    description: 'Given an array of integers nums and an integer k, return total contiguous subarrays whose sum equals k.',
    constraints: ['1 <= nums.length <= 2 * 10^4'],
    signature: { methodName: 'subarraySum', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }, { name: 'k', type: 'int' }] },
    visibleTestCases: [{ input: 'nums = [1,1,1], k = 2', expectedOutput: '2' }],
    hiddenTestCases: [{ input: 'nums = [1,2,3], k = 3', expectedOutput: '2' }]
  },

  // --- TWO POINTERS (13-22) ---
  {
    title: 'Valid Palindrome',
    slug: 'valid-palindrome',
    difficulty: 'Easy',
    category: 'Two Pointers',
    tags: ['String', 'Two Pointers'],
    description: 'Determine if a string is a palindrome after converting uppercase letters and removing non-alphanumeric characters.',
    constraints: ['1 <= s.length <= 2 * 10^5'],
    signature: { methodName: 'isPalindrome', returnType: 'bool', params: [{ name: 's', type: 'string' }] },
    visibleTestCases: [{ input: 's = "A man, a plan, a canal: Panama"', expectedOutput: 'true' }],
    hiddenTestCases: [{ input: 's = "race a car"', expectedOutput: 'false' }]
  },
  {
    title: 'Two Sum II - Sorted Array',
    slug: 'two-sum-ii-sorted-array',
    difficulty: 'Medium',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers'],
    description: 'Find two numbers in a 1-indexed sorted array that add up to target.',
    constraints: ['2 <= numbers.length <= 3 * 10^4'],
    signature: { methodName: 'twoSum', returnType: 'vector<int>', params: [{ name: 'numbers', type: 'vector<int>' }, { name: 'target', type: 'int' }] },
    visibleTestCases: [{ input: 'numbers = [2,7,11,15], target = 9', expectedOutput: '[1,2]' }],
    hiddenTestCases: [{ input: 'numbers = [2,3,4], target = 6', expectedOutput: '[1,3]' }]
  },
  {
    title: '3Sum',
    slug: '3sum',
    difficulty: 'Medium',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    description: 'Return all unique triplets [nums[i], nums[j], nums[k]] that sum to 0.',
    constraints: ['3 <= nums.length <= 3000'],
    signature: { methodName: 'threeSumCount', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nums = [-1,0,1,2,-1,-4]', expectedOutput: '2' }],
    hiddenTestCases: [{ input: 'nums = [0,1,1]', expectedOutput: '0' }]
  },
  {
    title: 'Container With Most Water',
    slug: 'container-with-most-water',
    difficulty: 'Medium',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers', 'Greedy'],
    description: 'Find two vertical lines that contain the maximum volume of water with the x-axis.',
    constraints: ['2 <= height.length <= 10^5'],
    signature: { methodName: 'maxArea', returnType: 'int', params: [{ name: 'height', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'height = [1,8,6,2,5,4,8,3,7]', expectedOutput: '49' }],
    hiddenTestCases: [{ input: 'height = [1,1]', expectedOutput: '1' }]
  },
  {
    title: 'Trapping Rain Water',
    slug: 'trapping-rain-water',
    difficulty: 'Hard',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers', 'Dynamic Programming', 'Stack'],
    description: 'Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.',
    constraints: ['n == height.length', '1 <= n <= 2 * 10^4'],
    signature: { methodName: 'trap', returnType: 'int', params: [{ name: 'height', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', expectedOutput: '6' }],
    hiddenTestCases: [{ input: 'height = [4,2,0,3,2,5]', expectedOutput: '9' }]
  },
  {
    title: 'Move Zeroes',
    slug: 'move-zeroes',
    difficulty: 'Easy',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers'],
    description: 'Move all zeroes to the end of nums while maintaining relative order of non-zero elements.',
    constraints: ['1 <= nums.length <= 10^4'],
    signature: { methodName: 'moveZeroesCount', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nums = [0,1,0,3,12]', expectedOutput: '3' }],
    hiddenTestCases: [{ input: 'nums = [0]', expectedOutput: '0' }]
  },
  {
    title: 'Remove Duplicates from Sorted Array',
    slug: 'remove-duplicates-from-sorted-array',
    difficulty: 'Easy',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers'],
    description: 'Remove duplicates in-place from sorted nums and return number of unique elements.',
    constraints: ['1 <= nums.length <= 3 * 10^4'],
    signature: { methodName: 'removeDuplicates', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nums = [1,1,2]', expectedOutput: '2' }],
    hiddenTestCases: [{ input: 'nums = [0,0,1,1,1,2,2,3,3,4]', expectedOutput: '5' }]
  },
  {
    title: 'Boats to Save People',
    slug: 'boats-to-save-people',
    difficulty: 'Medium',
    category: 'Two Pointers',
    tags: ['Array', 'Two Pointers', 'Greedy', 'Sorting'],
    description: 'Find minimum number of rescue boats to carry people given weight limit.',
    constraints: ['1 <= people.length <= 5 * 10^4', 'people[i] <= limit'],
    signature: { methodName: 'numRescueBoats', returnType: 'int', params: [{ name: 'people', type: 'vector<int>' }, { name: 'limit', type: 'int' }] },
    visibleTestCases: [{ input: 'people = [1,2], limit = 3', expectedOutput: '1' }],
    hiddenTestCases: [{ input: 'people = [3,2,2,1], limit = 3', expectedOutput: '3' }]
  },
  {
    title: 'Valid Palindrome II',
    slug: 'valid-palindrome-ii',
    difficulty: 'Easy',
    category: 'Two Pointers',
    tags: ['Two Pointers', 'String'],
    description: 'Given a string s, return true if s can be a palindrome after deleting at most one character.',
    constraints: ['1 <= s.length <= 10^5'],
    signature: { methodName: 'validPalindrome', returnType: 'bool', params: [{ name: 's', type: 'string' }] },
    visibleTestCases: [{ input: 's = "aba"', expectedOutput: 'true' }],
    hiddenTestCases: [{ input: 's = "abca"', expectedOutput: 'true' }]
  },
  {
    title: 'Compare Version Numbers',
    slug: 'compare-version-numbers',
    difficulty: 'Medium',
    category: 'Two Pointers',
    tags: ['Two Pointers', 'String'],
    description: 'Compare two version numbers version1 and version2 returning -1, 1, or 0.',
    constraints: ['1 <= version1.length, version2.length <= 500'],
    signature: { methodName: 'compareVersion', returnType: 'int', params: [{ name: 'version1', type: 'string' }, { name: 'version2', type: 'string' }] },
    visibleTestCases: [{ input: 'version1 = "1.2", version2 = "1.10"', expectedOutput: '-1' }],
    hiddenTestCases: [{ input: 'version1 = "1.01", version2 = "1.001"', expectedOutput: '0' }]
  },

  // --- SLIDING WINDOW (23-32) ---
  {
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
    difficulty: 'Easy',
    category: 'Sliding Window',
    tags: ['Array', 'Sliding Window'],
    description: 'Maximize profit by choosing a single day to buy one stock and choosing a different future day to sell.',
    constraints: ['1 <= prices.length <= 10^5'],
    signature: { methodName: 'maxProfit', returnType: 'int', params: [{ name: 'prices', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'prices = [7,1,5,3,6,4]', expectedOutput: '5' }],
    hiddenTestCases: [{ input: 'prices = [7,6,4,3,1]', expectedOutput: '0' }]
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    difficulty: 'Medium',
    category: 'Sliding Window',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    description: 'Find the length of the longest substring without duplicate characters.',
    constraints: ['0 <= s.length <= 5 * 10^4'],
    signature: { methodName: 'lengthOfLongestSubstring', returnType: 'int', params: [{ name: 's', type: 'string' }] },
    visibleTestCases: [{ input: 's = "abcabcbb"', expectedOutput: '3' }],
    hiddenTestCases: [{ input: 's = "bbbbb"', expectedOutput: '1' }]
  },
  {
    title: 'Longest Repeating Character Replacement',
    slug: 'longest-repeating-character-replacement',
    difficulty: 'Medium',
    category: 'Sliding Window',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    description: 'Choose at most k characters and replace them to make the longest substring with identical letters.',
    constraints: ['1 <= s.length <= 10^5', '0 <= k <= s.length'],
    signature: { methodName: 'characterReplacement', returnType: 'int', params: [{ name: 's', type: 'string' }, { name: 'k', type: 'int' }] },
    visibleTestCases: [{ input: 's = "ABAB", k = 2', expectedOutput: '4' }],
    hiddenTestCases: [{ input: 's = "AABABBA", k = 1', expectedOutput: '4' }]
  },
  {
    title: 'Permutation in String',
    slug: 'permutation-in-string',
    difficulty: 'Medium',
    category: 'Sliding Window',
    tags: ['Hash Table', 'Two Pointers', 'String', 'Sliding Window'],
    description: 'Given two strings s1 and s2, return true if s2 contains a permutation of s1.',
    constraints: ['1 <= s1.length, s2.length <= 10^4'],
    signature: { methodName: 'checkInclusion', returnType: 'bool', params: [{ name: 's1', type: 'string' }, { name: 's2', type: 'string' }] },
    visibleTestCases: [{ input: 's1 = "ab", s2 = "eidbaooo"', expectedOutput: 'true' }],
    hiddenTestCases: [{ input: 's1 = "ab", s2 = "eidboaoo"', expectedOutput: 'false' }]
  },
  {
    title: 'Minimum Window Substring',
    slug: 'minimum-window-substring',
    difficulty: 'Hard',
    category: 'Sliding Window',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    description: 'Given strings s and t, return the minimum window substring of s such that every character in t is included.',
    constraints: ['m == s.length, n == t.length', '1 <= m, n <= 10^5'],
    signature: { methodName: 'minWindowLength', returnType: 'int', params: [{ name: 's', type: 'string' }, { name: 't', type: 'string' }] },
    visibleTestCases: [{ input: 's = "ADOBECODEBANC", t = "ABC"', expectedOutput: '4' }],
    hiddenTestCases: [{ input: 's = "a", t = "a"', expectedOutput: '1' }]
  },
  {
    title: 'Sliding Window Maximum',
    slug: 'sliding-window-maximum',
    difficulty: 'Hard',
    category: 'Sliding Window',
    tags: ['Array', 'Queue', 'Sliding Window', 'Monotonic Queue'],
    description: 'Return max sliding window array of size k as it slides from left to right across nums.',
    constraints: ['1 <= nums.length <= 10^5', '1 <= k <= nums.length'],
    signature: { methodName: 'maxSlidingWindow', returnType: 'vector<int>', params: [{ name: 'nums', type: 'vector<int>' }, { name: 'k', type: 'int' }] },
    visibleTestCases: [{ input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', expectedOutput: '[3,3,5,5,6,7]' }],
    hiddenTestCases: [{ input: 'nums = [1], k = 1', expectedOutput: '[1]' }]
  },
  {
    title: 'Maximum Average Subarray I',
    slug: 'maximum-average-subarray-i',
    difficulty: 'Easy',
    category: 'Sliding Window',
    tags: ['Array', 'Sliding Window'],
    description: 'Find a contiguous subarray whose length is equal to k that has the maximum average value.',
    constraints: ['n == nums.length', '1 <= k <= n <= 10^5'],
    signature: { methodName: 'findMaxAverageSum', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }, { name: 'k', type: 'int' }] },
    visibleTestCases: [{ input: 'nums = [1,12,-5,-6,50,3], k = 4', expectedOutput: '51' }],
    hiddenTestCases: [{ input: 'nums = [5], k = 1', expectedOutput: '5' }]
  },
  {
    title: 'Fruit Into Baskets',
    slug: 'fruit-into-baskets',
    difficulty: 'Medium',
    category: 'Sliding Window',
    tags: ['Array', 'Hash Table', 'Sliding Window'],
    description: 'Find the maximum number of fruits you can pick with at most two types of fruit trees in a contiguous subsegment.',
    constraints: ['1 <= fruits.length <= 10^5'],
    signature: { methodName: 'totalFruit', returnType: 'int', params: [{ name: 'fruits', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'fruits = [1,2,1]', expectedOutput: '3' }],
    hiddenTestCases: [{ input: 'fruits = [0,1,2,2]', expectedOutput: '3' }]
  },
  {
    title: 'Minimum Size Subarray Sum',
    slug: 'minimum-size-subarray-sum',
    difficulty: 'Medium',
    category: 'Sliding Window',
    tags: ['Array', 'Binary Search', 'Sliding Window', 'Prefix Sum'],
    description: 'Return minimal length of a subarray whose sum is greater than or equal to target.',
    constraints: ['1 <= target <= 10^9', '1 <= nums.length <= 10^5'],
    signature: { methodName: 'minSubArrayLen', returnType: 'int', params: [{ name: 'target', type: 'int' }, { name: 'nums', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'target = 7, nums = [2,3,1,2,4,3]', expectedOutput: '2' }],
    hiddenTestCases: [{ input: 'target = 4, nums = [1,4,4]', expectedOutput: '1' }]
  },
  {
    title: 'Subarrays with K Different Integers',
    slug: 'subarrays-with-k-different-integers',
    difficulty: 'Hard',
    category: 'Sliding Window',
    tags: ['Array', 'Hash Table', 'Sliding Window', 'Counting'],
    description: 'Return the number of good subarrays of nums with exactly k different integers.',
    constraints: ['1 <= nums.length <= 2 * 10^4', '1 <= k <= nums.length'],
    signature: { methodName: 'subarraysWithKDistinct', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }, { name: 'k', type: 'int' }] },
    visibleTestCases: [{ input: 'nums = [1,2,1,2,3], k = 2', expectedOutput: '7' }],
    hiddenTestCases: [{ input: 'nums = [1,2,1,3,4], k = 3', expectedOutput: '3' }]
  },

  // --- STACK & MONOTONIC STACK (33-42) ---
  {
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    tags: ['String', 'Stack'],
    description: 'Determine if an input string composed of brackets ()[]{} is valid.',
    constraints: ['1 <= s.length <= 10^4'],
    signature: { methodName: 'isValid', returnType: 'bool', params: [{ name: 's', type: 'string' }] },
    visibleTestCases: [{ input: 's = "()[]{}"', expectedOutput: 'true' }],
    hiddenTestCases: [{ input: 's = "(]"', expectedOutput: 'false' }]
  },
  {
    title: 'Min Stack',
    slug: 'min-stack',
    difficulty: 'Medium',
    category: 'Stack',
    tags: ['Stack', 'Design'],
    description: 'Design a stack that supports push, pop, top, and retrieving minimum element in O(1).',
    constraints: ['Methods called at most 3 * 10^4 times'],
    signature: { methodName: 'minStackCapacity', returnType: 'int', params: [{ name: 'ops', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'ops = [1,2,3]', expectedOutput: '3' }],
    hiddenTestCases: [{ input: 'ops = [-2,0,-3]', expectedOutput: '3' }]
  },
  {
    title: 'Evaluate Reverse Polish Notation',
    slug: 'evaluate-reverse-polish-notation',
    difficulty: 'Medium',
    category: 'Stack',
    tags: ['Array', 'Math', 'Stack'],
    description: 'Evaluate value of an arithmetic expression in Reverse Polish Notation.',
    constraints: ['1 <= tokens.length <= 10^4'],
    signature: { methodName: 'evalRPN', returnType: 'int', params: [{ name: 'tokens', type: 'vector<string>' }] },
    visibleTestCases: [{ input: 'tokens = ["2","1","+","3","*"]', expectedOutput: '9' }],
    hiddenTestCases: [{ input: 'tokens = ["4","13","5","/","+"]', expectedOutput: '6' }]
  },
  {
    title: 'Daily Temperatures',
    slug: 'daily-temperatures',
    difficulty: 'Medium',
    category: 'Stack',
    tags: ['Array', 'Stack', 'Monotonic Stack'],
    description: 'Return an array such that answer[i] is the number of days you have to wait for a warmer temperature.',
    constraints: ['1 <= temperatures.length <= 10^5'],
    signature: { methodName: 'dailyTemperatures', returnType: 'vector<int>', params: [{ name: 'temperatures', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'temperatures = [73,74,75,71,69,72,76,73]', expectedOutput: '[1,1,4,2,1,1,0,0]' }],
    hiddenTestCases: [{ input: 'temperatures = [30,40,50,60]', expectedOutput: '[1,1,1,0]' }]
  },
  {
    title: 'Generate Parentheses',
    slug: 'generate-parentheses',
    difficulty: 'Medium',
    category: 'Stack',
    tags: ['String', 'Dynamic Programming', 'Backtracking'],
    description: 'Given n pairs of parentheses, generate all combinations of well-formed parentheses.',
    constraints: ['1 <= n <= 8'],
    signature: { methodName: 'generateParenthesisCount', returnType: 'int', params: [{ name: 'n', type: 'int' }] },
    visibleTestCases: [{ input: 'n = 3', expectedOutput: '5' }],
    hiddenTestCases: [{ input: 'n = 1', expectedOutput: '1' }]
  },
  {
    title: 'Car Fleet',
    slug: 'car-fleet',
    difficulty: 'Medium',
    category: 'Stack',
    tags: ['Array', 'Stack', 'Sorting', 'Monotonic Stack'],
    description: 'Return number of car fleets that will arrive at the target destination.',
    constraints: ['n == position.length == speed.length', '1 <= n <= 10^5'],
    signature: { methodName: 'carFleet', returnType: 'int', params: [{ name: 'target', type: 'int' }, { name: 'position', type: 'vector<int>' }, { name: 'speed', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]', expectedOutput: '3' }],
    hiddenTestCases: [{ input: 'target = 10, position = [3], speed = [3]', expectedOutput: '1' }]
  },
  {
    title: 'Largest Rectangle in Histogram',
    slug: 'largest-rectangle-in-histogram',
    difficulty: 'Hard',
    category: 'Stack',
    tags: ['Array', 'Stack', 'Monotonic Stack'],
    description: 'Given an array of integers heights representing the histogram bar heights, find area of largest rectangle.',
    constraints: ['1 <= heights.length <= 10^5'],
    signature: { methodName: 'largestRectangleArea', returnType: 'int', params: [{ name: 'heights', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'heights = [2,1,5,6,2,3]', expectedOutput: '10' }],
    hiddenTestCases: [{ input: 'heights = [2,4]', expectedOutput: '4' }]
  },
  {
    title: 'Asteroid Collision',
    slug: 'asteroid-collision',
    difficulty: 'Medium',
    category: 'Stack',
    tags: ['Array', 'Stack', 'Simulation'],
    description: 'Find out the state of asteroids after all collisions according to size and movement direction.',
    constraints: ['2 <= asteroids.length <= 10^4'],
    signature: { methodName: 'asteroidCollision', returnType: 'vector<int>', params: [{ name: 'asteroids', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'asteroids = [5,10,-5]', expectedOutput: '[5,10]' }],
    hiddenTestCases: [{ input: 'asteroids = [8,-8]', expectedOutput: '[]' }]
  },
  {
    title: 'Simplify Path',
    slug: 'simplify-path',
    difficulty: 'Medium',
    category: 'Stack',
    tags: ['String', 'Stack'],
    description: 'Given an absolute Unix-style file path, simplify it to the canonical path.',
    constraints: ['1 <= path.length <= 3000'],
    signature: { methodName: 'simplifyPath', returnType: 'string', params: [{ name: 'path', type: 'string' }] },
    visibleTestCases: [{ input: 'path = "/home/"', expectedOutput: '"/home"' }],
    hiddenTestCases: [{ input: 'path = "/../"', expectedOutput: '"/"' }]
  },
  {
    title: 'Decode String',
    slug: 'decode-string',
    difficulty: 'Medium',
    category: 'Stack',
    tags: ['String', 'Stack', 'Recursion'],
    description: 'Given an encoded string k[encoded_string], return its decoded string.',
    constraints: ['1 <= s.length <= 30'],
    signature: { methodName: 'decodeStringLength', returnType: 'int', params: [{ name: 's', type: 'string' }] },
    visibleTestCases: [{ input: 's = "3[a]2[bc]"', expectedOutput: '7' }],
    hiddenTestCases: [{ input: 's = "3[a2[c]]"', expectedOutput: '15' }]
  },

  // --- BINARY SEARCH (43-52) ---
  {
    title: 'Binary Search',
    slug: 'binary-search',
    difficulty: 'Easy',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search'],
    description: 'Search for target in sorted nums in O(log n). Return index or -1.',
    constraints: ['1 <= nums.length <= 10^4'],
    signature: { methodName: 'search', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }, { name: 'target', type: 'int' }] },
    visibleTestCases: [{ input: 'nums = [-1,0,3,5,9,12], target = 9', expectedOutput: '4' }],
    hiddenTestCases: [{ input: 'nums = [-1,0,3,5,9,12], target = 2', expectedOutput: '-1' }]
  },
  {
    title: 'Search a 2D Matrix',
    slug: 'search-a-2d-matrix',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search', 'Matrix'],
    description: 'Search for target in m x n matrix where rows are sorted and first integer of each row is greater than prior row.',
    constraints: ['m == matrix.length', '1 <= m, n <= 100'],
    signature: { methodName: 'searchMatrixCount', returnType: 'bool', params: [{ name: 'target', type: 'int' }] },
    visibleTestCases: [{ input: 'target = 3', expectedOutput: 'true' }],
    hiddenTestCases: [{ input: 'target = 13', expectedOutput: 'false' }]
  },
  {
    title: 'Koko Eating Bananas',
    slug: 'koko-eating-bananas',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search'],
    description: 'Find minimum integer eating speed k such that Koko eats all bananas within h hours.',
    constraints: ['1 <= piles.length <= 10^4', 'piles.length <= h <= 10^9'],
    signature: { methodName: 'minEatingSpeed', returnType: 'int', params: [{ name: 'piles', type: 'vector<int>' }, { name: 'h', type: 'int' }] },
    visibleTestCases: [{ input: 'piles = [3,6,7,11], h = 8', expectedOutput: '4' }],
    hiddenTestCases: [{ input: 'piles = [30,11,23,4,20], h = 5', expectedOutput: '30' }]
  },
  {
    title: 'Find Minimum in Rotated Sorted Array',
    slug: 'find-minimum-in-rotated-sorted-array',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search'],
    description: 'Find the minimum element in a sorted rotated array of unique elements in O(log n).',
    constraints: ['1 <= nums.length <= 5000'],
    signature: { methodName: 'findMin', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nums = [3,4,5,1,2]', expectedOutput: '1' }],
    hiddenTestCases: [{ input: 'nums = [4,5,6,7,0,1,2]', expectedOutput: '0' }]
  },
  {
    title: 'Search in Rotated Sorted Array',
    slug: 'search-in-rotated-sorted-array',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search'],
    description: 'Given sorted rotated array nums and target, return index of target, or -1 if not found.',
    constraints: ['1 <= nums.length <= 5000'],
    signature: { methodName: 'searchRotated', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }, { name: 'target', type: 'int' }] },
    visibleTestCases: [{ input: 'nums = [4,5,6,7,0,1,2], target = 0', expectedOutput: '4' }],
    hiddenTestCases: [{ input: 'nums = [4,5,6,7,0,1,2], target = 3', expectedOutput: '-1' }]
  },
  {
    title: 'Time Based Key-Value Store',
    slug: 'time-based-key-value-store',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['Hash Table', 'String', 'Binary Search', 'Design'],
    description: 'Design a time-based key-value data structure that can store multiple values at different timestamps.',
    constraints: ['Calls made at most 2 * 10^5 times'],
    signature: { methodName: 'timeMapSize', returnType: 'int', params: [{ name: 'timestamps', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'timestamps = [1,4]', expectedOutput: '2' }],
    hiddenTestCases: [{ input: 'timestamps = [2,5,8]', expectedOutput: '3' }]
  },
  {
    title: 'Median of Two Sorted Arrays',
    slug: 'median-of-two-sorted-arrays',
    difficulty: 'Hard',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    description: 'Find median of two sorted arrays nums1 and nums2 in O(log (m+n)) runtime.',
    constraints: ['0 <= nums1.length, nums2.length <= 1000'],
    signature: { methodName: 'findMedianArraysSum', returnType: 'int', params: [{ name: 'nums1', type: 'vector<int>' }, { name: 'nums2', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nums1 = [1,3], nums2 = [2]', expectedOutput: '2' }],
    hiddenTestCases: [{ input: 'nums1 = [1,2], nums2 = [3,4]', expectedOutput: '2' }]
  },
  {
    title: 'Find Peak Element',
    slug: 'find-peak-element',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search'],
    description: 'Find a peak element that is strictly greater than its neighbors in O(log n).',
    constraints: ['1 <= nums.length <= 1000'],
    signature: { methodName: 'findPeakElement', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nums = [1,2,3,1]', expectedOutput: '2' }],
    hiddenTestCases: [{ input: 'nums = [1,2,1,3,5,6,4]', expectedOutput: '5' }]
  },
  {
    title: 'Capacity To Ship Packages Within D Days',
    slug: 'capacity-to-ship-packages-within-d-days',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search'],
    description: 'Return least weight capacity of ship that will result in all packages shipped within days.',
    constraints: ['1 <= days <= weights.length <= 5 * 10^4'],
    signature: { methodName: 'shipWithinDays', returnType: 'int', params: [{ name: 'weights', type: 'vector<int>' }, { name: 'days', type: 'int' }] },
    visibleTestCases: [{ input: 'weights = [1,2,3,4,5,6,7,8,9,10], days = 5', expectedOutput: '15' }],
    hiddenTestCases: [{ input: 'weights = [3,2,2,4,1,4], days = 3', expectedOutput: '6' }]
  },
  {
    title: 'Split Array Largest Sum',
    slug: 'split-array-largest-sum',
    difficulty: 'Hard',
    category: 'Binary Search',
    tags: ['Array', 'Binary Search', 'Dynamic Programming', 'Greedy'],
    description: 'Minimize largest sum among k non-empty subarrays.',
    constraints: ['1 <= nums.length <= 1000', '1 <= k <= min(50, nums.length)'],
    signature: { methodName: 'splitArray', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }, { name: 'k', type: 'int' }] },
    visibleTestCases: [{ input: 'nums = [7,2,5,10,8], k = 2', expectedOutput: '18' }],
    hiddenTestCases: [{ input: 'nums = [1,2,3,4,5], k = 2', expectedOutput: '9' }]
  },

  // --- LINKED LIST (53-62) ---
  {
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    difficulty: 'Easy',
    category: 'Linked List',
    tags: ['Linked List', 'Recursion'],
    description: 'Reverse a singly linked list and return the reversed head values.',
    constraints: ['The number of nodes is in range [0, 5000]'],
    signature: { methodName: 'reverseListNodes', returnType: 'vector<int>', params: [{ name: 'values', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'values = [1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]' }],
    hiddenTestCases: [{ input: 'values = [1,2]', expectedOutput: '[2,1]' }]
  },
  {
    title: 'Merge Two Sorted Lists',
    slug: 'merge-two-sorted-lists',
    difficulty: 'Easy',
    category: 'Linked List',
    tags: ['Linked List', 'Recursion'],
    description: 'Merge two sorted linked lists into one sorted list.',
    constraints: ['0 <= list1.length, list2.length <= 50'],
    signature: { methodName: 'mergeTwoListsValues', returnType: 'vector<int>', params: [{ name: 'list1', type: 'vector<int>' }, { name: 'list2', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'list1 = [1,2,4], list2 = [1,3,4]', expectedOutput: '[1,1,2,3,4,4]' }],
    hiddenTestCases: [{ input: 'list1 = [], list2 = []', expectedOutput: '[]' }]
  },
  {
    title: 'Reorder List',
    slug: 'reorder-list',
    difficulty: 'Medium',
    category: 'Linked List',
    tags: ['Linked List', 'Two Pointers', 'Stack'],
    description: 'Reorder linked list to L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2.',
    constraints: ['1 <= node count <= 5 * 10^4'],
    signature: { methodName: 'reorderListValues', returnType: 'vector<int>', params: [{ name: 'head', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'head = [1,2,3,4]', expectedOutput: '[1,4,2,3]' }],
    hiddenTestCases: [{ input: 'head = [1,2,3,4,5]', expectedOutput: '[1,5,2,4,3]' }]
  },
  {
    title: 'Remove Nth Node From End of List',
    slug: 'remove-nth-node-from-end-of-list',
    difficulty: 'Medium',
    category: 'Linked List',
    tags: ['Linked List', 'Two Pointers'],
    description: 'Remove nth node from end of the list and return its head.',
    constraints: ['1 <= sz <= 30', '1 <= n <= sz'],
    signature: { methodName: 'removeNthFromEndValues', returnType: 'vector<int>', params: [{ name: 'head', type: 'vector<int>' }, { name: 'n', type: 'int' }] },
    visibleTestCases: [{ input: 'head = [1,2,3,4,5], n = 2', expectedOutput: '[1,2,3,5]' }],
    hiddenTestCases: [{ input: 'head = [1], n = 1', expectedOutput: '[]' }]
  },
  {
    title: 'Linked List Cycle',
    slug: 'linked-list-cycle',
    difficulty: 'Easy',
    category: 'Linked List',
    tags: ['Hash Table', 'Linked List', 'Two Pointers'],
    description: 'Determine if the linked list has a cycle in it using Floyd\'s cycle detection.',
    constraints: ['0 <= number of nodes <= 10^4'],
    signature: { methodName: 'hasCyclePos', returnType: 'bool', params: [{ name: 'pos', type: 'int' }] },
    visibleTestCases: [{ input: 'pos = 1', expectedOutput: 'true' }],
    hiddenTestCases: [{ input: 'pos = -1', expectedOutput: 'false' }]
  },
  {
    title: 'Merge K Sorted Lists',
    slug: 'merge-k-sorted-lists',
    difficulty: 'Hard',
    category: 'Linked List',
    tags: ['Linked List', 'Divide and Conquer', 'Heap'],
    description: 'Merge k sorted linked lists and return it as one sorted list.',
    constraints: ['k == lists.length', '0 <= k <= 10^4'],
    signature: { methodName: 'mergeKListsLength', returnType: 'int', params: [{ name: 'totalElements', type: 'int' }] },
    visibleTestCases: [{ input: 'totalElements = 8', expectedOutput: '8' }],
    hiddenTestCases: [{ input: 'totalElements = 0', expectedOutput: '0' }]
  },
  {
    title: 'Add Two Numbers',
    slug: 'add-two-numbers',
    difficulty: 'Medium',
    category: 'Linked List',
    tags: ['Linked List', 'Math', 'Recursion'],
    description: 'Add two numbers represented by linked lists in reverse order.',
    constraints: ['1 <= node count <= 100'],
    signature: { methodName: 'addTwoNumbersValues', returnType: 'vector<int>', params: [{ name: 'l1', type: 'vector<int>' }, { name: 'l2', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'l1 = [2,4,3], l2 = [5,6,4]', expectedOutput: '[7,0,8]' }],
    hiddenTestCases: [{ input: 'l1 = [0], l2 = [0]', expectedOutput: '[0]' }]
  },
  {
    title: 'Copy List with Random Pointer',
    slug: 'copy-list-with-random-pointer',
    difficulty: 'Medium',
    category: 'Linked List',
    tags: ['Hash Table', 'Linked List'],
    description: 'Construct a deep copy of a linked list where nodes include a random pointer.',
    constraints: ['0 <= n <= 1000'],
    signature: { methodName: 'copyRandomListCount', returnType: 'int', params: [{ name: 'nodes', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nodes = [7,13,11,10,1]', expectedOutput: '5' }],
    hiddenTestCases: [{ input: 'nodes = [1,2]', expectedOutput: '2' }]
  },
  {
    title: 'Find the Duplicate Number',
    slug: 'find-the-duplicate-number',
    difficulty: 'Medium',
    category: 'Linked List',
    tags: ['Array', 'Two Pointers', 'Binary Search', 'Bit Manipulation'],
    description: 'Find duplicate number in nums without modifying the array using Floyd\'s Tortoise and Hare.',
    constraints: ['1 <= n <= 10^5', 'nums.length == n + 1'],
    signature: { methodName: 'findDuplicate', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nums = [1,3,4,2,2]', expectedOutput: '2' }],
    hiddenTestCases: [{ input: 'nums = [3,1,3,4,2]', expectedOutput: '3' }]
  },
  {
    title: 'LRU Cache',
    slug: 'lru-cache',
    difficulty: 'Medium',
    category: 'Linked List',
    tags: ['Hash Table', 'Linked List', 'Design', 'Doubly-Linked List'],
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
    constraints: ['1 <= capacity <= 3000'],
    signature: { methodName: 'lruCapacity', returnType: 'int', params: [{ name: 'capacity', type: 'int' }] },
    visibleTestCases: [{ input: 'capacity = 2', expectedOutput: '2' }],
    hiddenTestCases: [{ input: 'capacity = 5', expectedOutput: '5' }]
  },

  // --- TREES & BINARY SEARCH TREES (63-74) ---
  {
    title: 'Invert Binary Tree',
    slug: 'invert-binary-tree',
    difficulty: 'Easy',
    category: 'Trees',
    tags: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
    description: 'Given the root of a binary tree, invert the tree and return its root.',
    constraints: ['0 <= node count <= 100'],
    signature: { methodName: 'invertTreeValues', returnType: 'vector<int>', params: [{ name: 'root', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'root = [4,2,7,1,3,6,9]', expectedOutput: '[4,7,2,9,6,3,1]' }],
    hiddenTestCases: [{ input: 'root = [2,1,3]', expectedOutput: '[2,3,1]' }]
  },
  {
    title: 'Maximum Depth of Binary Tree',
    slug: 'maximum-depth-of-binary-tree',
    difficulty: 'Easy',
    category: 'Trees',
    tags: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
    description: 'Find maximum depth from root node down to farthest leaf node.',
    constraints: ['0 <= node count <= 10^4'],
    signature: { methodName: 'maxDepthCount', returnType: 'int', params: [{ name: 'nodes', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nodes = [3,9,20,15,7]', expectedOutput: '3' }],
    hiddenTestCases: [{ input: 'nodes = [1,2]', expectedOutput: '2' }]
  },
  {
    title: 'Diameter of Binary Tree',
    slug: 'diameter-of-binary-tree',
    difficulty: 'Easy',
    category: 'Trees',
    tags: ['Tree', 'Depth-First Search', 'Binary Tree'],
    description: 'Return length of diameter of tree: longest path between any two nodes.',
    constraints: ['1 <= node count <= 10^4'],
    signature: { methodName: 'diameterOfBinaryTree', returnType: 'int', params: [{ name: 'nodeCount', type: 'int' }] },
    visibleTestCases: [{ input: 'nodeCount = 5', expectedOutput: '3' }],
    hiddenTestCases: [{ input: 'nodeCount = 2', expectedOutput: '1' }]
  },
  {
    title: 'Balanced Binary Tree',
    slug: 'balanced-binary-tree',
    difficulty: 'Easy',
    category: 'Trees',
    tags: ['Tree', 'Depth-First Search', 'Binary Tree'],
    description: 'Determine if binary tree is height-balanced (depth of two subtrees never differs by more than 1).',
    constraints: ['0 <= node count <= 5000'],
    signature: { methodName: 'isBalancedNodes', returnType: 'bool', params: [{ name: 'diff', type: 'int' }] },
    visibleTestCases: [{ input: 'diff = 1', expectedOutput: 'true' }],
    hiddenTestCases: [{ input: 'diff = 2', expectedOutput: 'false' }]
  },
  {
    title: 'Same Tree',
    slug: 'same-tree',
    difficulty: 'Easy',
    category: 'Trees',
    tags: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
    description: 'Given roots of two binary trees p and q, check if they are structurally identical and have identical values.',
    constraints: ['0 <= node count <= 100'],
    signature: { methodName: 'isSameTreeValues', returnType: 'bool', params: [{ name: 'p', type: 'vector<int>' }, { name: 'q', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'p = [1,2,3], q = [1,2,3]', expectedOutput: 'true' }],
    hiddenTestCases: [{ input: 'p = [1,2], q = [1,0,2]', expectedOutput: 'false' }]
  },
  {
    title: 'Subtree of Another Tree',
    slug: 'subtree-of-another-tree',
    difficulty: 'Easy',
    category: 'Trees',
    tags: ['Tree', 'Depth-First Search', 'String Matching', 'Binary Tree'],
    description: 'Return true if there is a subtree of root with identical structure and node values as subRoot.',
    constraints: ['1 <= root nodes <= 2000', '1 <= subRoot nodes <= 1000'],
    signature: { methodName: 'isSubtreeCheck', returnType: 'bool', params: [{ name: 'matches', type: 'bool' }] },
    visibleTestCases: [{ input: 'matches = true', expectedOutput: 'true' }],
    hiddenTestCases: [{ input: 'matches = false', expectedOutput: 'false' }]
  },
  {
    title: 'Lowest Common Ancestor of a Binary Search Tree',
    slug: 'lowest-common-ancestor-of-a-binary-search-tree',
    difficulty: 'Medium',
    category: 'Trees',
    tags: ['Tree', 'Depth-First Search', 'Binary Search Tree', 'Binary Tree'],
    description: 'Find lowest common ancestor node of two given nodes p and q in a BST.',
    constraints: ['2 <= node count <= 10^5'],
    signature: { methodName: 'lowestCommonAncestorVal', returnType: 'int', params: [{ name: 'p', type: 'int' }, { name: 'q', type: 'int' }, { name: 'lca', type: 'int' }] },
    visibleTestCases: [{ input: 'p = 2, q = 8, lca = 6', expectedOutput: '6' }],
    hiddenTestCases: [{ input: 'p = 2, q = 4, lca = 2', expectedOutput: '2' }]
  },
  {
    title: 'Binary Tree Level Order Traversal',
    slug: 'binary-tree-level-order-traversal',
    difficulty: 'Medium',
    category: 'Trees',
    tags: ['Tree', 'Breadth-First Search', 'Binary Tree'],
    description: 'Return the level order traversal of binary tree node values (left to right, level by level).',
    constraints: ['0 <= node count <= 2000'],
    signature: { methodName: 'levelOrderCount', returnType: 'int', params: [{ name: 'levels', type: 'int' }] },
    visibleTestCases: [{ input: 'levels = 3', expectedOutput: '3' }],
    hiddenTestCases: [{ input: 'levels = 0', expectedOutput: '0' }]
  },
  {
    title: 'Validate Binary Search Tree',
    slug: 'validate-binary-search-tree',
    difficulty: 'Medium',
    category: 'Trees',
    tags: ['Tree', 'Depth-First Search', 'Binary Search Tree', 'Binary Tree'],
    description: 'Determine if binary tree is a valid Binary Search Tree (BST).',
    constraints: ['1 <= node count <= 10^4'],
    signature: { methodName: 'isValidBSTNodes', returnType: 'bool', params: [{ name: 'isValid', type: 'bool' }] },
    visibleTestCases: [{ input: 'isValid = true', expectedOutput: 'true' }],
    hiddenTestCases: [{ input: 'isValid = false', expectedOutput: 'false' }]
  },
  {
    title: 'Kth Smallest Element in a BST',
    slug: 'kth-smallest-element-in-a-bst',
    difficulty: 'Medium',
    category: 'Trees',
    tags: ['Tree', 'Depth-First Search', 'Binary Search Tree', 'Binary Tree'],
    description: 'Given root of BST and integer k, return kth smallest value (1-indexed) of all values of nodes in tree.',
    constraints: ['1 <= k <= node count <= 10^4'],
    signature: { methodName: 'kthSmallestVal', returnType: 'int', params: [{ name: 'k', type: 'int' }, { name: 'target', type: 'int' }] },
    visibleTestCases: [{ input: 'k = 1, target = 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: 'k = 3, target = 3', expectedOutput: '3' }]
  },
  {
    title: 'Construct Binary Tree from Preorder and Inorder Traversal',
    slug: 'construct-binary-tree-from-preorder-and-inorder-traversal',
    difficulty: 'Medium',
    category: 'Trees',
    tags: ['Array', 'Hash Table', 'Divide and Conquer', 'Tree', 'Binary Tree'],
    description: 'Construct binary tree given preorder and inorder traversal arrays.',
    constraints: ['1 <= preorder.length <= 3000'],
    signature: { methodName: 'buildTreeCount', returnType: 'int', params: [{ name: 'size', type: 'int' }] },
    visibleTestCases: [{ input: 'size = 5', expectedOutput: '5' }],
    hiddenTestCases: [{ input: 'size = 1', expectedOutput: '1' }]
  },
  {
    title: 'Binary Tree Maximum Path Sum',
    slug: 'binary-tree-maximum-path-sum',
    difficulty: 'Hard',
    category: 'Trees',
    tags: ['Dynamic Programming', 'Tree', 'Depth-First Search', 'Binary Tree'],
    description: 'Find maximum path sum of any non-empty path in binary tree.',
    constraints: ['1 <= node count <= 3 * 10^4'],
    signature: { methodName: 'maxPathSumVal', returnType: 'int', params: [{ name: 'maxSum', type: 'int' }] },
    visibleTestCases: [{ input: 'maxSum = 6', expectedOutput: '6' }],
    hiddenTestCases: [{ input: 'maxSum = 42', expectedOutput: '42' }]
  },

  // --- DYNAMIC PROGRAMMING (75-88) ---
  {
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    tags: ['Math', 'Dynamic Programming', 'Memoization'],
    description: 'Count distinct ways to climb n stairs taking 1 or 2 steps each time.',
    constraints: ['1 <= n <= 45'],
    signature: { methodName: 'climbStairs', returnType: 'int', params: [{ name: 'n', type: 'int' }] },
    visibleTestCases: [{ input: 'n = 2', expectedOutput: '2' }],
    hiddenTestCases: [{ input: 'n = 3', expectedOutput: '3' }]
  },
  {
    title: 'House Robber',
    slug: 'house-robber',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming'],
    description: 'Maximize loot from houses along a street without robbing two adjacent houses.',
    constraints: ['1 <= nums.length <= 100'],
    signature: { methodName: 'rob', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nums = [1,2,3,1]', expectedOutput: '4' }],
    hiddenTestCases: [{ input: 'nums = [2,7,9,3,1]', expectedOutput: '12' }]
  },
  {
    title: 'House Robber II',
    slug: 'house-robber-ii',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming'],
    description: 'Maximize loot when all houses at this place are arranged in a circle.',
    constraints: ['1 <= nums.length <= 100'],
    signature: { methodName: 'robCircle', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nums = [2,3,2]', expectedOutput: '3' }],
    hiddenTestCases: [{ input: 'nums = [1,2,3,1]', expectedOutput: '4' }]
  },
  {
    title: 'Longest Palindromic Substring',
    slug: 'longest-palindromic-substring',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Two Pointers', 'String', 'Dynamic Programming'],
    description: 'Find the length of the longest palindromic substring in s.',
    constraints: ['1 <= s.length <= 1000'],
    signature: { methodName: 'longestPalindromeLen', returnType: 'int', params: [{ name: 's', type: 'string' }] },
    visibleTestCases: [{ input: 's = "babad"', expectedOutput: '3' }],
    hiddenTestCases: [{ input: 's = "cbbd"', expectedOutput: '2' }]
  },
  {
    title: 'Palindromic Substrings',
    slug: 'palindromic-substrings',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Two Pointers', 'String', 'Dynamic Programming'],
    description: 'Given string s, return number of palindromic substrings in it.',
    constraints: ['1 <= s.length <= 1000'],
    signature: { methodName: 'countSubstrings', returnType: 'int', params: [{ name: 's', type: 'string' }] },
    visibleTestCases: [{ input: 's = "abc"', expectedOutput: '3' }],
    hiddenTestCases: [{ input: 's = "aaa"', expectedOutput: '6' }]
  },
  {
    title: 'Decode Ways',
    slug: 'decode-ways',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['String', 'Dynamic Programming'],
    description: 'Count total ways to decode numeric string where 1->A, 2->B... 26->Z.',
    constraints: ['1 <= s.length <= 100'],
    signature: { methodName: 'numDecodings', returnType: 'int', params: [{ name: 's', type: 'string' }] },
    visibleTestCases: [{ input: 's = "12"', expectedOutput: '2' }],
    hiddenTestCases: [{ input: 's = "226"', expectedOutput: '3' }]
  },
  {
    title: 'Coin Change',
    slug: 'coin-change',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming', 'Breadth-First Search'],
    description: 'Fewest number of coins needed to make up amount. Return -1 if not possible.',
    constraints: ['1 <= coins.length <= 12', '0 <= amount <= 10^4'],
    signature: { methodName: 'coinChange', returnType: 'int', params: [{ name: 'coins', type: 'vector<int>' }, { name: 'amount', type: 'int' }] },
    visibleTestCases: [{ input: 'coins = [1,2,5], amount = 11', expectedOutput: '3' }],
    hiddenTestCases: [{ input: 'coins = [2], amount = 3', expectedOutput: '-1' }]
  },
  {
    title: 'Maximum Product Subarray',
    slug: 'maximum-product-subarray',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming'],
    description: 'Find contiguous subarray that has largest product, and return the product.',
    constraints: ['1 <= nums.length <= 2 * 10^4'],
    signature: { methodName: 'maxProduct', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nums = [2,3,-2,4]', expectedOutput: '6' }],
    hiddenTestCases: [{ input: 'nums = [-2,0,-1]', expectedOutput: '0' }]
  },
  {
    title: 'Word Break',
    slug: 'word-break',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Array', 'Hash Table', 'String', 'Dynamic Programming', 'Trie', 'Memoization'],
    description: 'Return true if s can be segmented into a space-separated sequence of dictionary words.',
    constraints: ['1 <= s.length <= 300'],
    signature: { methodName: 'wordBreak', returnType: 'bool', params: [{ name: 's', type: 'string' }, { name: 'wordDict', type: 'vector<string>' }] },
    visibleTestCases: [{ input: 's = "leetcode", wordDict = ["leet","code"]', expectedOutput: 'true' }],
    hiddenTestCases: [{ input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', expectedOutput: 'false' }]
  },
  {
    title: 'Longest Increasing Subsequence',
    slug: 'longest-increasing-subsequence',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Array', 'Binary Search', 'Dynamic Programming'],
    description: 'Return length of longest strictly increasing subsequence in O(n log n).',
    constraints: ['1 <= nums.length <= 2500'],
    signature: { methodName: 'lengthOfLIS', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nums = [10,9,2,5,3,7,101,18]', expectedOutput: '4' }],
    hiddenTestCases: [{ input: 'nums = [0,1,0,3,2,3]', expectedOutput: '4' }]
  },
  {
    title: 'Partition Equal Subset Sum',
    slug: 'partition-equal-subset-sum',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Array', 'Dynamic Programming'],
    description: 'Return true if array can be partitioned into two subsets such that sum of elements in both is equal.',
    constraints: ['1 <= nums.length <= 200', '1 <= nums[i] <= 100'],
    signature: { methodName: 'canPartition', returnType: 'bool', params: [{ name: 'nums', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nums = [1,5,11,5]', expectedOutput: 'true' }],
    hiddenTestCases: [{ input: 'nums = [1,2,3,5]', expectedOutput: 'false' }]
  },
  {
    title: 'Unique Paths',
    slug: 'unique-paths',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['Math', 'Dynamic Programming', 'Combinatorics'],
    description: 'Robot on m x n grid starts top-left and wants to reach bottom-right moving only right or down.',
    constraints: ['1 <= m, n <= 100'],
    signature: { methodName: 'uniquePaths', returnType: 'int', params: [{ name: 'm', type: 'int' }, { name: 'n', type: 'int' }] },
    visibleTestCases: [{ input: 'm = 3, n = 7', expectedOutput: '28' }],
    hiddenTestCases: [{ input: 'm = 3, n = 2', expectedOutput: '3' }]
  },
  {
    title: 'Longest Common Subsequence',
    slug: 'longest-common-subsequence',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['String', 'Dynamic Programming'],
    description: 'Return length of longest common subsequence between text1 and text2.',
    constraints: ['1 <= text1.length, text2.length <= 1000'],
    signature: { methodName: 'longestCommonSubsequence', returnType: 'int', params: [{ name: 'text1', type: 'string' }, { name: 'text2', type: 'string' }] },
    visibleTestCases: [{ input: 'text1 = "abcde", text2 = "ace"', expectedOutput: '3' }],
    hiddenTestCases: [{ input: 'text1 = "abc", text2 = "def"', expectedOutput: '0' }]
  },
  {
    title: 'Edit Distance',
    slug: 'edit-distance',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['String', 'Dynamic Programming'],
    description: 'Minimum operations to convert word1 to word2 (insert, delete, or replace character).',
    constraints: ['0 <= word1.length, word2.length <= 500'],
    signature: { methodName: 'minDistance', returnType: 'int', params: [{ name: 'word1', type: 'string' }, { name: 'word2', type: 'string' }] },
    visibleTestCases: [{ input: 'word1 = "horse", word2 = "ros"', expectedOutput: '3' }],
    hiddenTestCases: [{ input: 'word1 = "intention", word2 = "execution"', expectedOutput: '5' }]
  },

  // --- GRAPHS & BACKTRACKING (89-100) ---
  {
    title: 'Number of Islands',
    slug: 'number-of-islands',
    difficulty: 'Medium',
    category: 'Graphs',
    tags: ['Array', 'Depth-First Search', 'Breadth-First Search', 'Union Find', 'Matrix'],
    description: 'Given m x n 2D binary grid grid representing map of 1s (land) and 0s (water), return count of islands.',
    constraints: ['m == grid.length', '1 <= m, n <= 300'],
    signature: { methodName: 'numIslandsCount', returnType: 'int', params: [{ name: 'islandCount', type: 'int' }] },
    visibleTestCases: [{ input: 'islandCount = 1', expectedOutput: '1' }],
    hiddenTestCases: [{ input: 'islandCount = 3', expectedOutput: '3' }]
  },
  {
    title: 'Clone Graph',
    slug: 'clone-graph',
    difficulty: 'Medium',
    category: 'Graphs',
    tags: ['Hash Table', 'Depth-First Search', 'Breadth-First Search', 'Graph'],
    description: 'Return a deep copy of a connected undirected graph.',
    constraints: ['Number of nodes in graph is in range [0, 100]'],
    signature: { methodName: 'cloneGraphNodes', returnType: 'int', params: [{ name: 'nodes', type: 'int' }] },
    visibleTestCases: [{ input: 'nodes = 4', expectedOutput: '4' }],
    hiddenTestCases: [{ input: 'nodes = 0', expectedOutput: '0' }]
  },
  {
    title: 'Pacific Atlantic Water Flow',
    slug: 'pacific-atlantic-water-flow',
    difficulty: 'Medium',
    category: 'Graphs',
    tags: ['Array', 'Depth-First Search', 'Breadth-First Search', 'Matrix'],
    description: 'Find all grid coordinates where water can flow to both Pacific and Atlantic oceans.',
    constraints: ['m == heights.length', '1 <= m, n <= 200'],
    signature: { methodName: 'pacificAtlanticCount', returnType: 'int', params: [{ name: 'count', type: 'int' }] },
    visibleTestCases: [{ input: 'count = 7', expectedOutput: '7' }],
    hiddenTestCases: [{ input: 'count = 1', expectedOutput: '1' }]
  },
  {
    title: 'Course Schedule',
    slug: 'course-schedule',
    difficulty: 'Medium',
    category: 'Graphs',
    tags: ['Depth-First Search', 'Breadth-First Search', 'Graph', 'Topological Sort'],
    description: 'Return true if you can finish all courses given prerequisite pairs, detecting directed cycles.',
    constraints: ['1 <= numCourses <= 2000'],
    signature: { methodName: 'canFinish', returnType: 'bool', params: [{ name: 'numCourses', type: 'int' }, { name: 'prerequisites', type: 'vector<vector<int>>' }] },
    visibleTestCases: [{ input: 'numCourses = 2, prerequisites = [[1,0]]', expectedOutput: 'true' }],
    hiddenTestCases: [{ input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', expectedOutput: 'false' }]
  },
  {
    title: 'Course Schedule II',
    slug: 'course-schedule-ii',
    difficulty: 'Medium',
    category: 'Graphs',
    tags: ['Depth-First Search', 'Breadth-First Search', 'Graph', 'Topological Sort'],
    description: 'Return the ordering of courses you should take to finish all courses (Topological ordering).',
    constraints: ['1 <= numCourses <= 2000'],
    signature: { methodName: 'findOrder', returnType: 'vector<int>', params: [{ name: 'numCourses', type: 'int' }, { name: 'prerequisites', type: 'vector<vector<int>>' }] },
    visibleTestCases: [{ input: 'numCourses = 2, prerequisites = [[1,0]]', expectedOutput: '[0,1]' }],
    hiddenTestCases: [{ input: 'numCourses = 1, prerequisites = []', expectedOutput: '[0]' }]
  },
  {
    title: 'Graph Valid Tree',
    slug: 'graph-valid-tree',
    difficulty: 'Medium',
    category: 'Graphs',
    tags: ['Depth-First Search', 'Breadth-First Search', 'Union Find', 'Graph'],
    description: 'Determine if undirected edges make up a valid connected tree with no cycles.',
    constraints: ['1 <= n <= 2000'],
    signature: { methodName: 'validTree', returnType: 'bool', params: [{ name: 'n', type: 'int' }, { name: 'edges', type: 'vector<vector<int>>' }] },
    visibleTestCases: [{ input: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]', expectedOutput: 'true' }],
    hiddenTestCases: [{ input: 'n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]', expectedOutput: 'false' }]
  },
  {
    title: 'Subsets',
    slug: 'subsets',
    difficulty: 'Medium',
    category: 'Backtracking',
    tags: ['Array', 'Backtracking', 'Bit Manipulation'],
    description: 'Given integer array nums of unique elements, return all possible power set subsets.',
    constraints: ['1 <= nums.length <= 10'],
    signature: { methodName: 'subsetsCount', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nums = [1,2,3]', expectedOutput: '8' }],
    hiddenTestCases: [{ input: 'nums = [0]', expectedOutput: '2' }]
  },
  {
    title: 'Combination Sum',
    slug: 'combination-sum',
    difficulty: 'Medium',
    category: 'Backtracking',
    tags: ['Array', 'Backtracking'],
    description: 'Find all unique combinations of candidates where candidate numbers sum to target.',
    constraints: ['1 <= candidates.length <= 30'],
    signature: { methodName: 'combinationSumCount', returnType: 'int', params: [{ name: 'candidates', type: 'vector<int>' }, { name: 'target', type: 'int' }] },
    visibleTestCases: [{ input: 'candidates = [2,3,6,7], target = 7', expectedOutput: '2' }],
    hiddenTestCases: [{ input: 'candidates = [2,3,5], target = 8', expectedOutput: '3' }]
  },
  {
    title: 'Permutations',
    slug: 'permutations',
    difficulty: 'Medium',
    category: 'Backtracking',
    tags: ['Array', 'Backtracking'],
    description: 'Given an array nums of distinct integers, return all possible permutations.',
    constraints: ['1 <= nums.length <= 6'],
    signature: { methodName: 'permuteCount', returnType: 'int', params: [{ name: 'nums', type: 'vector<int>' }] },
    visibleTestCases: [{ input: 'nums = [1,2,3]', expectedOutput: '6' }],
    hiddenTestCases: [{ input: 'nums = [0,1]', expectedOutput: '2' }]
  },
  {
    title: 'Word Search',
    slug: 'word-search',
    difficulty: 'Medium',
    category: 'Backtracking',
    tags: ['Array', 'Backtracking', 'Matrix'],
    description: 'Given an m x n grid of characters and string word, return true if word exists in grid.',
    constraints: ['m == board.length', '1 <= m, n <= 6'],
    signature: { methodName: 'exist', returnType: 'bool', params: [{ name: 'board', type: 'vector<vector<string>>' }, { name: 'word', type: 'string' }] },
    visibleTestCases: [{ input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', expectedOutput: 'true' }],
    hiddenTestCases: [{ input: 'board = [["A","B"],["C","D"]], word = "ABCD"', expectedOutput: 'false' }]
  },
  {
    title: 'Rotting Oranges',
    slug: 'rotting-oranges',
    difficulty: 'Medium',
    category: 'Graphs',
    tags: ['Array', 'Breadth-First Search', 'Matrix'],
    description: 'Return minimum minutes that must elapse until no cell has a fresh orange using multi-source BFS.',
    constraints: ['m == grid.length', '1 <= m, n <= 10'],
    signature: { methodName: 'orangesRotting', returnType: 'int', params: [{ name: 'grid', type: 'vector<vector<int>>' }] },
    visibleTestCases: [{ input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', expectedOutput: '4' }],
    hiddenTestCases: [{ input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', expectedOutput: '-1' }]
  },
  {
    title: 'Word Ladder',
    slug: 'word-ladder',
    difficulty: 'Hard',
    category: 'Graphs',
    tags: ['Hash Table', 'String', 'Breadth-First Search'],
    description: 'Return number of words in shortest transformation sequence from beginWord to endWord.',
    constraints: ['1 <= beginWord.length <= 10', '1 <= wordList.length <= 5000'],
    signature: { methodName: 'ladderLength', returnType: 'int', params: [{ name: 'beginWord', type: 'string' }, { name: 'endWord', type: 'string' }, { name: 'wordList', type: 'vector<string>' }] },
    visibleTestCases: [{ input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', expectedOutput: '5' }],
    hiddenTestCases: [{ input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]', expectedOutput: '0' }]
  }
];

const runBulkImport = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error('MONGO_URI is missing in .env');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log(`Connected! Ingesting all ${curated100.length} curated problems...`);

    let count = 0;

    for (const item of curated100) {
      const starterCode = item.starterCode || generateStarterCode(item.signature);

      const problemDoc = {
        title: item.title,
        slug: item.slug.toLowerCase().trim(),
        difficulty: item.difficulty,
        category: item.category,
        tags: item.tags,
        description: item.description,
        constraints: item.constraints,
        signature: item.signature,
        starterCode,
        visibleTestCases: item.visibleTestCases,
        hiddenTestCases: item.hiddenTestCases,
      };

      await Problem.findOneAndUpdate(
        { slug: problemDoc.slug },
        { $set: problemDoc },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      count++;
      console.log(`[${count}/100] Ingested: [${item.difficulty}] ${item.title}`);
    }

    console.log(`\n🎉 Done! All ${count} problems have been seeded into MongoDB!`);
    process.exit(0);
  } catch (error) {
    console.error('Bulk import encountered an error:', error);
    process.exit(1);
  }
};

runBulkImport();