import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ChevronUp, 
  ChevronDown, 
  Trash2,
  CheckCircle,
  ListCheck
} from 'lucide-react';

export default function TerminalDrawer({
  isOpen,
  setIsOpen,
  executionResult,
  submissionResult,
  isExecuting,
  isSubmitting,
  onClear,
}) {
  const [activeTab, setActiveTab] = useState('console'); // 'console' | 'tests'

  useEffect(() => {
    if (submissionResult) {
      setActiveTab('tests');
      setIsOpen(true);
    }
  }, [submissionResult, setIsOpen]);

  useEffect(() => {
    if (executionResult) {
      setActiveTab('console');
      setIsOpen(true);
    }
  }, [executionResult, setIsOpen]);

  const isBusy = isExecuting || isSubmitting;

  return (
    <div
      className={`border-t border-zinc-800/80 bg-[#090D16] flex flex-col transition-all duration-200 shrink-0 ${
        isOpen ? 'h-64 sm:h-60' : 'h-9'
      }`}
    >
      {/* Title Bar & Tab Switcher */}
      <div className="h-9 px-3 bg-[#0B0F19] border-b border-zinc-800/60 flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Console / Test Case Run Tab */}
          <button
            onClick={() => {
              setActiveTab('console');
              if (!isOpen) setIsOpen(true);
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
              activeTab === 'console'
                ? 'bg-zinc-800/90 text-purple-300 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>Test Case Run</span>
            {executionResult && (
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  executionResult.success ? 'bg-emerald-400' : 'bg-rose-400'
                }`}
              />
            )}
          </button>

          {/* Test Results (Submit) Tab */}
          <button
            onClick={() => {
              setActiveTab('tests');
              if (!isOpen) setIsOpen(true);
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
              activeTab === 'tests'
                ? 'bg-zinc-800/90 text-purple-300 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ListCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>Submission</span>
            {submissionResult && (
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  submissionResult.passed ? 'bg-emerald-400' : 'bg-rose-400'
                }`}
              />
            )}
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {(executionResult || submissionResult) && (
            <button
              onClick={onClear}
              title="Clear Output"
              className="p-1 text-zinc-500 hover:text-zinc-300 rounded hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-zinc-400 hover:text-zinc-200 rounded hover:bg-zinc-800 transition-colors cursor-pointer"
            title={isOpen ? 'Minimize' : 'Expand'}
          >
            {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Drawer Content */}
      {isOpen && (
        <div className="flex-1 p-3 overflow-y-auto font-mono text-[11px] leading-relaxed selection:bg-purple-600/30">
          {isBusy ? (
            <div className="flex items-center gap-2 text-zinc-400 py-4">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              <span>
                {isSubmitting
                  ? 'Testing solution against all test cases...'
                  : 'Executing code against sample case...'}
              </span>
            </div>
          ) : activeTab === 'console' ? (
            /* LEETCODE STYLE TEST RUN VIEW */
            !executionResult ? (
              <div className="text-zinc-600 italic py-2">
                Click &quot;Run&quot; to test your solution against sample input.
              </div>
            ) : executionResult.isCompileError ? (
              <div className="space-y-1">
                <div className="text-rose-400 text-[10px] uppercase font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Compilation Error:</span>
                </div>
                <pre className="text-rose-400 whitespace-pre-wrap bg-rose-950/20 p-2.5 rounded border border-rose-900/40 text-[11px]">
                  {executionResult.stderr || 'Compilation failed'}
                </pre>
              </div>
            ) : (
              <div className="space-y-3.5">
                {/* Result Status Banner */}
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                  <div className="flex items-center gap-2">
                    {executionResult.success ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-emerald-400 font-sans tracking-wide">
                          Accepted
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span className="text-xs font-bold text-rose-400 font-sans tracking-wide">
                          Wrong Answer
                        </span>
                      </>
                    )}
                    <span className="text-zinc-500 text-[11px] font-sans">
                      (Sample Test Case 1)
                    </span>
                  </div>
                  {executionResult.time && (
                    <span className="text-[11px] text-zinc-500 font-mono">
                      Runtime: {executionResult.time}s
                    </span>
                  )}
                </div>

                {/* ROW 1: Input */}
                <div className="space-y-1">
                  <div className="text-zinc-400 text-[10px] uppercase tracking-wider font-bold">
                    Input
                  </div>
                  <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-lg px-3 py-2 text-zinc-200 text-xs font-mono">
                    {executionResult.input || 'No input'}
                  </div>
                </div>

                {/* ROW 2: Output */}
                <div className="space-y-1">
                  <div className="text-zinc-400 text-[10px] uppercase tracking-wider font-bold">
                    Output
                  </div>
                  <div
                    className={`border rounded-lg px-3 py-2 text-xs font-mono font-semibold ${
                      executionResult.success
                        ? 'bg-zinc-950/70 border-zinc-800/80 text-zinc-200'
                        : 'bg-rose-950/25 border-rose-900/50 text-rose-400'
                    }`}
                  >
                    {executionResult.output || 'No output'}
                  </div>
                </div>

                {/* ROW 3: Expected */}
                <div className="space-y-1">
                  <div className="text-zinc-400 text-[10px] uppercase tracking-wider font-bold">
                    Expected
                  </div>
                  <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-lg px-3 py-2 text-emerald-400 text-xs font-mono font-semibold">
                    {executionResult.expected || 'No expected output'}
                  </div>
                </div>

                {/* ROW 4: Stdout Debug Prints (cout / print) */}
                {executionResult.stdout && executionResult.stdout.trim() && (
                  <div className="space-y-1 pt-1 border-t border-zinc-800/60">
                    <div className="text-zinc-400 text-[10px] uppercase tracking-wider font-bold">
                      Stdout (Console Print)
                    </div>
                    <pre className="bg-zinc-950/70 border border-zinc-800/80 rounded-lg px-3 py-2 text-zinc-300 text-xs font-mono whitespace-pre-wrap">
                      {executionResult.stdout}
                    </pre>
                  </div>
                )}
              </div>
            )
          ) : (
            /* SUBMISSION RESULTS VIEW */
            !submissionResult ? (
              <div className="text-zinc-600 italic py-2">
                Click &quot;Submit&quot; to test your solution against all test cases.
              </div>
            ) : (
              <div className="space-y-3">
                {/* Summary Header */}
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold font-sans ${
                        submissionResult.passed ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {submissionResult.verdict}
                    </span>
                    <span className="text-zinc-500 text-[10px]">
                      ({submissionResult.passedTestCases} / {submissionResult.totalTestCases} Test Cases Passed)
                    </span>
                  </div>
                </div>

                {/* Compilation Error Notice if any */}
                {submissionResult.compileError && (
                  <pre className="text-rose-400 whitespace-pre-wrap bg-rose-950/20 p-2.5 rounded border border-rose-900/40 text-[11px]">
                    {submissionResult.compileError}
                  </pre>
                )}

                {/* Individual Test Cases List */}
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {submissionResult.results?.map((res) => (
                    <div
                      key={res.testCaseIndex}
                      className={`p-2.5 rounded-lg border text-[11px] ${
                        res.passed
                          ? 'bg-emerald-950/10 border-emerald-900/30'
                          : 'bg-rose-950/10 border-rose-900/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          {res.passed ? (
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-rose-400" />
                          )}
                          <span
                            className={`font-semibold font-sans ${
                              res.passed ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            Case {res.testCaseIndex} {res.isHidden ? '(Hidden)' : ''}
                          </span>
                        </div>
                        {res.time && (
                          <span className="text-[10px] text-zinc-500">{res.time}s</span>
                        )}
                      </div>

                      {!res.isHidden && (
                        <div className="space-y-1 text-zinc-400 text-[10px] font-mono">
                          <div>
                            <span className="text-zinc-500">Input: </span>
                            <span className="text-zinc-300">{res.input}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500">Expected: </span>
                            <span className="text-emerald-400">{res.expectedOutput}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500">Actual: </span>
                            <span className={res.passed ? 'text-zinc-300' : 'text-rose-400 font-semibold'}>
                              {res.actualOutput}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}