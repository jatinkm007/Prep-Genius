import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Sparkles, RotateCcw, Loader2, UploadCloud } from 'lucide-react';
import TerminalDrawer from './TerminalDrawer';

export const BOILERPLATES = {
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
  onAskAboutCode,
  onRunCode,
  onSubmitCode,
  isAiAnalyzing = false,
  isExecuting = false,
  isSubmitting = false,
  executionResult = null,
  submissionResult = null,
  onClearConsole,
}) {
  const [terminalOpen, setTerminalOpen] = useState(true);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);

    const isDefaultCode = Object.values(BOILERPLATES).some(
      (b) => b.trim() === (code || '').trim()
    );

    if (!code || isDefaultCode) {
      setCode(BOILERPLATES[newLang] || '');
    }
  };

  const handleReset = () => {
    setCode(BOILERPLATES[language] || '');
  };

  const handleRunClick = async () => {
    setTerminalOpen(true);
    if (onRunCode) {
      await onRunCode();
    }
  };

  const handleSubmitClick = async () => {
    setTerminalOpen(true);
    if (onSubmitCode) {
      await onSubmitCode();
    }
  };

  const isBusy = isAiAnalyzing || isExecuting || isSubmitting;

  return (
    <div className="flex flex-col h-full bg-[#0E131F] border-r border-zinc-800/80">
      {/* Editor Toolbar */}
      <div className="h-12 border-b border-zinc-800/80 px-4 flex items-center justify-between bg-[#0B0F19] shrink-0">
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-zinc-400 font-mono">LANG:</label>
          <select
            value={language}
            onChange={handleLanguageChange}
            disabled={isBusy}
            className="bg-zinc-900 border border-zinc-700/60 text-zinc-200 text-xs rounded-md px-2.5 py-1 focus:outline-none focus:border-purple-500 disabled:opacity-50 cursor-pointer"
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={handleReset}
            disabled={isBusy}
            title="Reset to boilerplate"
            className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-md transition-colors text-xs flex items-center gap-1 disabled:opacity-50 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Sandbox Execution Run Button */}
          <button
            onClick={handleRunClick}
            disabled={isBusy}
            title="Execute code in sandbox against stdout"
            className="px-2.5 sm:px-3 py-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/70 text-zinc-200 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isExecuting ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin text-purple-400" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                <span>Run</span>
              </>
            )}
          </button>

          {/* Submit Solution Button */}
          <button
            onClick={handleSubmitClick}
            disabled={isBusy}
            title="Submit solution against test cases"
            className="px-2.5 sm:px-3 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin text-emerald-400" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-3.5 h-3.5 text-emerald-400" />
                <span>Submit</span>
              </>
            )}
          </button>

          {/* Socratic Mentor Code Analysis Button */}
          <button
            onClick={onAskAboutCode}
            disabled={isBusy}
            title="Ask Socratic tutor for hints or guidance on this code"
            className="px-2.5 sm:px-3 py-1 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800/50 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer disabled:cursor-not-allowed"
          >
            {isAiAnalyzing ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Thinking...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3 text-purple-200" />
                <span>Analyze Logic</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Monaco Container */}
      <div className="flex-1 w-full overflow-hidden min-h-0">
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

      {/* Terminal Drawer Bottom Panel */}
      <TerminalDrawer
        isOpen={terminalOpen}
        setIsOpen={setTerminalOpen}
        executionResult={executionResult}
        submissionResult={submissionResult}
        isExecuting={isExecuting}
        isSubmitting={isSubmitting}
        onClear={onClearConsole}
      />
    </div>
  );
}