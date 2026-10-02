/**
 * Dynamically generates C++, Python, and JavaScript execution drivers
 * based on problem signature metadata without hardcoded problem checks.
 */
export const buildDynamicDriver = (signature, language, userCode, inputRaw, isSubmit = false) => {
  if (!signature || !signature.methodName) {
    return userCode;
  }

  const { methodName, returnType, params = [] } = signature;
  const delimiter = isSubmit ? '\n' : '\n___PREP_GENIUS_RETURN___\n';

  // Extract argument values using regex against patterns like "nums = [2,7,11,15], target = 9"
  const parsedArgs = {};
  params.forEach((param) => {
    // Matches: paramName = [...] OR paramName = "..." OR paramName = value
    const regex = new RegExp(`${param.name}\\s*=\\s*([^\n,]+(?:\\[[^\\]]*\\])?)`);
    const match = inputRaw.match(regex);
    parsedArgs[param.name] = match ? match[1].trim() : '';
  });

  // 1. C++ DRIVER
  if (language === 'cpp') {
    const formattedArgs = params.map((p) => {
      const val = parsedArgs[p.name] || '';
      if (p.type.includes('vector<string>')) {
        return `{${val.replace(/^\[|\]$/g, '')}}`;
      }
      if (p.type.includes('vector<int>')) {
        return `{${val.replace(/^\[|\]$/g, '')}}`;
      }
      return val;
    });

    let printLogic = `cout << "${delimiter}" << ans << endl;`;
    if (returnType === 'bool') {
      printLogic = `cout << "${delimiter}" << (ans ? "true" : "false") << endl;`;
    } else if (returnType === 'vector<int>') {
      printLogic = `
    cout << "${delimiter}[";
    for (size_t i = 0; i < ans.size(); i++) {
        cout << ans[i] << (i + 1 < ans.size() ? "," : "");
    }
    cout << "]" << endl;
      `;
    }

    return `
#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <stack>
#include <queue>
#include <algorithm>
using namespace std;

${userCode}

int main() {
    Solution sol;
    ${params.map((p, idx) => `${p.type} ${p.name} =${formattedArgs[idx]};`).join('\n    ')}
    auto ans = sol.${methodName}(${params.map((p) => p.name).join(', ')});
    ${printLogic}
    return 0;
}
`;
  }

  // 2. PYTHON DRIVER
  if (language === 'python') {
    const pyArgs = params.map((p) => `${p.name}=${parsedArgs[p.name] || 'None'}`).join(', ');
    return `
import json
from typing import List, Dict, Set, Optional

${userCode}

if __name__ == '__main__':
    sol = Solution()
    ans = sol.${methodName}(${pyArgs})
    print("${delimiter}")
    if isinstance(ans, bool):
        print("true" if ans else "false")
    else:
        print(json.dumps(ans).replace(" ", ""))
`;
  }

  // 3. JAVASCRIPT DRIVER
  if (language === 'javascript') {
    const jsArgs = params.map((p) => parsedArgs[p.name] || 'undefined').join(', ');
    return `
${userCode}

const ans = ${methodName}(${jsArgs});
console.log("${delimiter}");
if (typeof ans === 'boolean') {
  console.log(ans ? 'true' : 'false');
} else {
  console.log(JSON.stringify(ans).replace(/\\s+/g, ''));
}
`;
  }

  return userCode;
};