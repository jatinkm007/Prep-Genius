import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { 
  Play, 
  Send, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Terminal, 
  Sparkles, 
  X, 
  ArrowLeft,
  BookOpen,
  Code
} from 'lucide-react';

const LANGUAGE_CONFIG = {
  javascript: { label: 'JS', monacoLang: 'javascript' },
  python: { label: 'Py', monacoLang: 'python' },
  cpp: { label: 'C++', monacoLang: 'cpp' }
};

export default function Workspace({ problem: initialProblem }) {
  const { slug } = useParams();
  const [problem, setProblem] = useState(initialProblem || null);
  const [loading, setLoading] = useState(!initialProblem);

  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [activeTab, setActiveTab] = useState('cases'); // 'cases' or 'result'
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [execResult, setExecResult] = useState(null);

  // Mobile view toggle: 'problem' or 'editor'
  const [mobileView, setMobileView] = useState('problem');

  // AI Hint state
  const [hint, setHint] = useState(null);
  const [isHintLoading, setIsHintLoading] = useState(false);

  const editorRef = useRef(null);

  useEffect(() => {
    if (!initialProblem) {
      const problemSlug = slug || 'two-sum';
      setLoading(true);
      fetch(`http://localhost:5000/api/problems/${problemSlug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setProblem(data.data);
          }
        })
        .catch((err) => console.error('Failed to load problem:', err))
        .finally(() => setLoading(false));
    }
  }, [slug, initialProblem]);

  const currentSlug = problem?.slug || slug || 'draft';
  const storageKey = `code_${currentSlug}_${language}`;

  useEffect(() => {
    const savedCode = localStorage.getItem(storageKey);
    if (savedCode) {
      setCode(savedCode);
    } else if (problem?.starterCode?.[language]) {
      setCode(problem.starterCode[language]);
    }
  }, [language, problem, storageKey]);

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
  };

  const handleCodeChange = (newCode) => {
    const val = newCode || '';
    setCode(val);
    localStorage.setItem(storageKey, val);
  };

  const handleResetCode = () => {
    localStorage.removeItem(storageKey);
    if (problem?.starterCode?.[language]) {
      setCode(problem.starterCode[language]);
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setActiveTab('result');

    setTimeout(() => {
      setExecResult({
        status: 'Accepted',
        passed: true,
        runtime: '52 ms',
        output: '[0, 1]',
        expected: problem?.testCases?.[selectedCaseIdx]?.expectedOutput || '[0, 1]'
      });
      setIsRunning(false);
    }, 700);
  };

  const handleAskAI = async () => {
    setIsHintLoading(true);
    setHint(null);

    const currentCode = editorRef.current ? editorRef.current.getValue() : code;

    try {
      const res = await fetch(`http://localhost:5000/api/problems/${problem.slug}/hint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: currentCode, language })
      });
      const data = await res.json();
      if (data.success) {
        setHint(data.hint);
      } else {
        setHint('Could not retrieve hint right now. Please try again.');
      }
    } catch {
      setHint('Server error: Make sure backend is running.');
    } finally {
      setIsHintLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-zinc-950 flex items-center justify-center text-zinc-400 text-sm">
        Loading challenge...
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="h-screen bg-zinc-950 flex flex-col items-center justify-center gap-3 text-sm">
        <span className="text-rose-400">Problem not found.</span>
        <Link to="/dashboard" className="text-zinc-400 hover:text-zinc-200 flex items-center gap-1 text-xs">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Dashboard
        </Link>
      </div>
    );
  }

  const sampleCases = problem?.testCases?.filter((tc) => tc.isSample) || [];

  return (
    <div className="h-screen w-full flex flex-col bg-zinc-950 text-zinc-100 font-sans overflow-hidden">
      {/* Top Header Navbar */}
      <header className="h-12 border-b border-zinc-800 px-3 sm:px-4 flex items-center justify-between bg-zinc-900/70 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link
            to="/dashboard"
            className="text-zinc-400 hover:text-zinc-200 p-1 rounded hover:bg-zinc-800 transition-colors shrink-0"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <span className="font-semibold text-xs sm:text-sm text-zinc-200 truncate">
            {problem.title}
          </span>

          {problem.difficulty && (
            <span
              className={`text-[10px] sm:text-xs px-2 py-0.5 rounded font-medium shrink-0 ${
                problem.difficulty === 'Easy'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : problem.difficulty === 'Medium'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {problem.difficulty}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* AI Hint Button */}
          <button
            onClick={handleAskAI}
            disabled={isHintLoading}
            className="flex items-center gap-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 px-2 sm:px-2.5 py-1 rounded text-xs font-medium transition-colors disabled:opacity-50"
            title="Ask AI Hint"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="hidden sm:inline">{isHintLoading ? 'Thinking...' : 'AI Hint'}</span>
          </button>

          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 text-xs rounded px-2 py-1 text-zinc-200 focus:outline-none"
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>
                {config.label}
              </option>
            ))}
          </select>

          {/* Reset Code */}
          <button
            onClick={handleResetCode}
            title="Reset code"
            className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Run Button */}
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-2.5 sm:px-3 py-1 rounded text-xs font-medium border border-zinc-700 transition-colors disabled:opacity-50"
          >
            <Play className="w-3 h-3 text-emerald-400 fill-emerald-400 shrink-0" />
            <span className="hidden sm:inline">{isRunning ? 'Running...' : 'Run'}</span>
          </button>

          {/* Submit Button */}
          <button
            disabled={isRunning}
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 sm:px-3 py-1 rounded text-xs font-medium transition-colors disabled:opacity-50"
          >
            <Send className="w-3 h-3 shrink-0" />
            <span className="hidden sm:inline">Submit</span>
          </button>
        </div>
      </header>

      {/* Mobile Switcher (Visible ONLY on phones < md) */}
      <div className="flex md:hidden h-9 border-b border-zinc-800 bg-zinc-900/50 shrink-0 text-xs font-medium">
        <button
          onClick={() => setMobileView('problem')}
          className={`flex-1 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
            mobileView === 'problem'
              ? 'border-purple-500 text-purple-300 bg-purple-950/20'
              : 'border-transparent text-zinc-400'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Problem
        </button>
        <button
          onClick={() => setMobileView('editor')}
          className={`flex-1 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
            mobileView === 'editor'
              ? 'border-purple-500 text-purple-300 bg-purple-950/20'
              : 'border-transparent text-zinc-400'
          }`}
        >
          <Code className="w-3.5 h-3.5" /> Editor & Console
        </button>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Left Side: Problem Spec (Visible on desktop OR if mobileView === 'problem') */}
        <div
          className={`w-full md:w-1/2 h-full overflow-y-auto border-r border-zinc-800 p-4 sm:p-6 space-y-6 bg-zinc-950 ${
            mobileView === 'problem' ? 'flex flex-col' : 'hidden md:flex md:flex-col'
          }`}
        >
          {/* AI Hint Notification Card */}
          {hint && (
            <div className="bg-purple-950/30 border border-purple-800/50 rounded-lg p-3.5 relative">
              <button
                onClick={() => setHint(null)}
                className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1.5 mb-1.5 text-purple-300 font-semibold text-xs">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Socratic Hint
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line">{hint}</p>
            </div>
          )}

          <div>
            <h1 className="text-lg sm:text-xl font-bold text-zinc-100">{problem.title}</h1>
            <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
              {problem.description}
            </p>
          </div>

          {problem.constraints?.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Constraints
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-xs text-zinc-400 font-mono">
                {problem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Examples
            </h2>
            {sampleCases.map((tc, idx) => (
              <div
                key={idx}
                className="bg-zinc-900 border border-zinc-800 rounded p-3 text-xs space-y-1.5 font-mono"
              >
                <div>
                  <span className="text-zinc-500">Input: </span>
                  <span className="text-zinc-200">{tc.input}</span>
                </div>
                <div>
                  <span className="text-zinc-500">Output: </span>
                  <span className="text-zinc-200">{tc.expectedOutput}</span>
                </div>
                {tc.explanation && (
                  <div className="text-zinc-400 font-sans text-[11px] pt-1 border-t border-zinc-800/80">
                    {tc.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Monaco Editor + Console (Visible on desktop OR if mobileView === 'editor') */}
        <div
          className={`w-full md:w-1/2 h-full flex flex-col ${
            mobileView === 'editor' ? 'flex' : 'hidden md:flex'
          }`}
        >
          {/* Monaco Editor */}
          <div className="flex-1 relative min-h-[220px]">
            <Editor
              height="100%"
              language={LANGUAGE_CONFIG[language].monacoLang}
              value={code}
              theme="vs-dark"
              onChange={handleCodeChange}
              onMount={handleEditorMount}
              options={{
                fontSize: 13,
                fontFamily: 'JetBrains Mono, Menlo, monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                bracketPairColorization: { enabled: true }
              }}
            />
          </div>

          {/* Test Console */}
          <div className="h-56 sm:h-64 border-t border-zinc-800 bg-zinc-950 flex flex-col shrink-0">
            <div className="h-9 px-3 border-b border-zinc-800 flex items-center gap-4 bg-zinc-900/40 text-xs">
              <button
                onClick={() => setActiveTab('cases')}
                className={`h-full border-b-2 font-medium flex items-center gap-1.5 transition-colors ${
                  activeTab === 'cases'
                    ? 'border-emerald-500 text-zinc-100'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" /> Test Cases
              </button>
              <button
                onClick={() => setActiveTab('result')}
                className={`h-full border-b-2 font-medium flex items-center gap-1.5 transition-colors ${
                  activeTab === 'result'
                    ? 'border-emerald-500 text-zinc-100'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Result
              </button>
            </div>

            <div className="p-3 sm:p-4 flex-1 overflow-y-auto text-xs font-mono">
              {activeTab === 'cases' ? (
                <div>
                  <div className="flex gap-2 mb-3">
                    {sampleCases.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedCaseIdx(idx)}
                        className={`px-2.5 py-1 rounded text-xs transition-colors ${
                          selectedCaseIdx === idx
                            ? 'bg-zinc-800 text-zinc-100 font-semibold'
                            : 'bg-zinc-900/60 text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        Case {idx + 1}
                      </button>
                    ))}
                  </div>

                  {sampleCases[selectedCaseIdx] && (
                    <div className="space-y-3">
                      <div>
                        <span className="text-zinc-500 block mb-1">Input</span>
                        <div className="bg-zinc-900 rounded p-2 text-zinc-300">
                          {sampleCases[selectedCaseIdx].input}
                        </div>
                      </div>
                      <div>
                        <span className="text-zinc-500 block mb-1">Expected Output</span>
                        <div className="bg-zinc-900 rounded p-2 text-zinc-300">
                          {sampleCases[selectedCaseIdx].expectedOutput}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {!execResult ? (
                    <div className="text-zinc-500 pt-6 text-center font-sans">
                      Click "Run" to test your code.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        {execResult.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-500" />
                        )}
                        <span className="font-semibold text-emerald-400">
                          {execResult.status}
                        </span>
                        <span className="text-zinc-500 text-[11px] ml-2">
                          Runtime: {execResult.runtime}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div>
                          <span className="text-zinc-500 block mb-1">Your Output</span>
                          <div className="bg-zinc-900 rounded p-2 text-zinc-200">
                            {execResult.output}
                          </div>
                        </div>
                        <div>
                          <span className="text-zinc-500 block mb-1">Expected Output</span>
                          <div className="bg-zinc-900 rounded p-2 text-zinc-200">
                            {execResult.expected}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}