import React from 'react';
import MarkdownRenderer from '../../components/common/MarkdownRenderer';
import { Tag, CheckCircle2, ChevronDown, BookOpen } from 'lucide-react';

const DIFFICULTY_STYLES = {
  Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Hard: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export default function ProblemDescription({
  problems = [],
  currentProblem,
  onSelectProblem,
  loading = false,
}) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-zinc-500 text-xs">
        <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-2"></div>
        <span>Loading problem statement...</span>
      </div>
    );
  }

  if (!currentProblem) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-zinc-500 text-xs text-center">
        <BookOpen className="w-8 h-8 text-zinc-600 mb-2" />
        <p>No problem selected. Choose one from the dropdown above.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#0A0E17] border-r border-zinc-800/80 overflow-hidden text-zinc-300">
      {/* Problem Top Header & Selector */}
      <div className="p-4 border-b border-zinc-800/80 bg-[#0B0F19] flex items-center justify-between gap-3 shrink-0">
        <div className="relative flex-1">
          <select
            value={currentProblem.slug}
            onChange={(e) => onSelectProblem(e.target.value)}
            className="w-full appearance-none bg-zinc-900 border border-zinc-700/60 rounded-lg px-3 py-1.5 text-xs font-semibold text-zinc-100 pr-8 focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            {problems.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title} ({p.difficulty})
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
            DIFFICULTY_STYLES[currentProblem.difficulty] || DIFFICULTY_STYLES.Easy
          }`}
        >
          {currentProblem.difficulty}
        </span>
      </div>

      {/* Problem Content Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 text-xs sm:text-sm">
        {/* Title and Tags */}
        <div>
          <h2 className="text-base sm:text-lg font-bold text-zinc-100 mb-2">
            {currentProblem.title}
          </h2>
          <div className="flex flex-wrap items-center gap-1.5">
            {currentProblem.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-800/80 border border-zinc-700/40 text-[10px] font-medium text-zinc-400"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Description Body */}
        <div className="text-zinc-300 leading-relaxed space-y-2">
          <MarkdownRenderer content={currentProblem.description} />
        </div>

        {/* Visible Test Cases / Examples */}
        {currentProblem.visibleTestCases?.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
              Examples
            </h3>
            <div className="space-y-2.5">
              {currentProblem.visibleTestCases.map((tc, idx) => (
                <div
                  key={idx}
                  className="bg-[#0E131F] border border-zinc-800 rounded-lg p-3 space-y-1.5 font-mono text-[11px]"
                >
                  <div className="text-zinc-400">
                    <span className="text-purple-400 font-semibold font-sans">Example {idx + 1}:</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Input: </span>
                    <span className="text-zinc-200">{tc.input}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Output: </span>
                    <span className="text-emerald-400">{tc.expectedOutput}</span>
                  </div>
                  {tc.explanation && (
                    <div className="font-sans text-zinc-400 pt-1 text-[11px]">
                      <span className="text-zinc-500 font-mono">Explanation: </span>
                      {tc.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Constraints */}
        {currentProblem.constraints?.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-zinc-800/60">
            <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
              Constraints
            </h3>
            <ul className="space-y-1 text-[11px] font-mono text-zinc-400 list-disc list-inside">
              {currentProblem.constraints.map((constraint, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span className="text-zinc-300">{constraint}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}