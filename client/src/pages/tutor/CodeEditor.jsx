import React from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw } from 'lucide-react';

const BOILERPLATES = {
  cpp: `#include <iostream>
#include <vector>
using namespace std;

// Implement your solution below
int main() {
    cout << "Ready for deliberate practice!" << endl;
    return 0;
}`,
  python: `# Implement your solution below
def solve():
    print("Ready for deliberate practice!")

if __name__ == "__main__":
    solve()`,
  javascript: `// Implement your solution below
function solve() {
    console.log("Ready for deliberate practice!");
}

solve();`
};

export default function CodeEditor({ 
  language, 
  setLanguage, 
  code, 
  setCode, 
  onAskAboutCode 
}) {
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(BOILERPLATES[newLang] || '');
  };

  const handleReset = () => {
    setCode(BOILERPLATES[language] || '');
  };

  return (
    <div className="flex flex-col h-full bg-[#0E131F] border-r border-zinc-800/80">
      {/* Editor Toolbar */}
      <div className="h-12 border-b border-zinc-800/80 px-4 flex items-center justify-between bg-[#0B0F19]">
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-zinc-400 font-mono">LANG:</label>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-zinc-900 border border-zinc-700/60 text-zinc-200 text-xs rounded-md px-2.5 py-1 focus:outline-none focus:border-purple-500"
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            title="Reset to boilerplate"
            className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-md transition-colors text-xs flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          
          <button
            onClick={onAskAboutCode}
            className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Analyze Logic</span>
          </button>
        </div>
      </div>

      {/* Monaco Container */}
      <div className="flex-1 w-full overflow-hidden">
        <Editor
          height="100%"
          language={language}
          value={code}
          theme="vs-dark"
          onChange={(val) => setCode(val || '')}
          options={{
            fontSize: 13,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            lineNumbers: 'on',
            tabSize: 4,
            padding: { top: 12 },
            fontFamily: "'Fira Code', 'Courier New', monospace",
          }}
        />
      </div>
    </div>
  );
}