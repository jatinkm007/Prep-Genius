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
  onResetCode,
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
    if (onResetCode) {
      onResetCode();
    } else {
      setCode(BOILERPLATES[language] || '');
    }
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
    <div className="flex flex-col h-full bg-[#0E131F] border-r border-zinc-800/80 min-w-0">
      {/* Editor Toolbar - Responsive & Compact on mobile */}
      <div className="h-11 sm:h-12 border-b border-zinc-800/80 px-2 sm:px-4 flex items-center justify-between bg-[#0B0F19] shrink-0 gap-1">
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <label className="hidden sm:inline text-xs font-semibold text-zinc-400 font-mono">LANG:</label>
          <select
            value={language}
            onChange={handleLanguageChange}
            disabled={isBusy}
            className="bg-zinc-900 border border-zinc-700/60 text-zinc-200 text-[11px] sm:text-xs rounded-md px-1.5 sm:px-2.5 py-1 focus:outline-none focus:border-purple-500 disabled:opacity-50 cursor-pointer"
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="javascript">JS</option>
          </select>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Reset button */}
          <button
            onClick={handleReset}
            disabled={isBusy}
            title="Reset code"
            className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-md transition-colors text-xs flex items-center gap-1 disabled:opacity-50 cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset</span>
          </button>

          {/* Run button */}
          <button
            onClick={handleRunClick}
            disabled={isBusy}
            title="Run Code"
            className="px-2 sm:px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/70 text-zinc-200 rounded-md text-[11px] sm:text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            {isExecuting ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin text-purple-400" />
                <span className="hidden xs:inline">Run</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                <span className="hidden xs:inline">Run</span>
              </>
            )}
          </button>

          {/* Submit button */}
          <button
            onClick={handleSubmitClick}
            disabled={isBusy}
            title="Submit Solution"
            className="px-2 sm:px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 rounded-md text-[11px] sm:text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin text-emerald-400" />
                <span className="hidden xs:inline">Submit</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden xs:inline">Submit</span>
              </>
            )}
          </button>

          {/* Socratic Mentor Analyze Button */}
          <button
            onClick={onAskAboutCode}
            disabled={isBusy}
            title="Analyze Logic with Mentor"
            className="px-2 sm:px-2.5 py-1 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800/50 text-white rounded-md text-[11px] sm:text-xs font-semibold flex items-center gap-1 transition-colors shadow-sm cursor-pointer disabled:cursor-not-allowed shrink-0"
          >
            {isAiAnalyzing ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span className="hidden sm:inline">Thinking...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3 text-purple-200" />
                <span className="hidden xs:inline">Analyze</span>
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
            padding: { top: 10 },
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