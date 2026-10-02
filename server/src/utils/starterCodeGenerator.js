/**
 * Generates clean starter boilerplate for C++, Python, and JavaScript
 * given a method name, return type, and argument specifications.
 */
export const generateStarterCode = (signature) => {
  if (!signature || !signature.methodName) {
    return { cpp: '', python: '', javascript: '' };
  }

  const { methodName, returnType = 'void', params = [] } = signature;

  // 1. C++ Boilerplate
  const cppParams = params
    .map((p) => {
      if (p.type.includes('vector<') || p.type === 'string') {
        return `${p.type}& ${p.name}`;
      }
      return `${p.type} ${p.name}`;
    })
    .join(', ');

  const cpp = `#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <stack>
#include <queue>
#include <algorithm>
using namespace std;

class Solution {
public:
    ${returnType} ${methodName}(${cppParams}) {
        // Implement your solution here
        
    }
};`;

  // 2. Python Boilerplate
  const pyTypeMap = {
    'vector<int>': 'List[int]',
    'vector<string>': 'List[str]',
    'vector<vector<int>>': 'List[List[int]]',
    'string': 'str',
    'bool': 'bool',
    'int': 'int',
    'void': 'None',
  };

  const pyParams = params
    .map((p) => `${p.name}: ${pyTypeMap[p.type] || 'Any'}`)
    .join(', ');
  const pyReturn = pyTypeMap[returnType] || 'Any';

  const python = `from typing import List, Dict, Set, Optional

class Solution:
    def ${methodName}(self, ${pyParams}) -> ${pyReturn}:
        # Implement your solution here
        pass`;

  // 3. JavaScript Boilerplate
  const jsParams = params.map((p) => p.name).join(', ');
  const jsDocParams = params
    .map((p) => ` * @param {${p.type.includes('vector') ? 'number[]' : p.type}} ${p.name}`)
    .join('\n');

  const javascript = `/**
${jsDocParams}
 * @return {${returnType.includes('vector') ? 'number[]' : returnType}}
 */
function ${methodName}(${jsParams}) {
    // Implement your solution here
    
}`;

  return { cpp, python, javascript };
};