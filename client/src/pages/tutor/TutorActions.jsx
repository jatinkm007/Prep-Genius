import React from 'react';
import { Lightbulb, Gauge, Bug, GitFork } from 'lucide-react';

const ACTIONS = [
  {
    id: 'hint',
    label: 'Next Hint',
    icon: Lightbulb,
    color: 'text-amber-400 border-amber-500/30 hover:bg-amber-500/10',
    prompt: 'Without giving away the complete solution or full code, give me the next subtle Socratic hint to help me progress past my current blocker.'
  },
  {
    id: 'complexity',
    label: 'Analyze Complexity',
    icon: Gauge,
    color: 'text-blue-400 border-blue-500/30 hover:bg-blue-500/10',
    prompt: 'Analyze the current time and space complexity of my approach or code. Highlight any bottlenecks or suboptimal operations, and ask me how I might optimize them.'
  },
  {
    id: 'edge_cases',
    label: 'Find Edge Cases',
    icon: Bug,
    color: 'text-rose-400 border-rose-500/30 hover:bg-rose-500/10',
    prompt: 'What critical edge cases, boundary constraints, or tricky inputs could break this logic? List them as conceptual test cases for me to check.'
  },
  {
    id: 'dry_run',
    label: 'Dry Run Trace',
    icon: GitFork,
    color: 'text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10',
    prompt: 'Let us perform a dry run of this logic with a small representative input. Trace the variable states step-by-step and ask me what the pointer/state should be next.'
  }
];

export default function TutorActions({ onTriggerAction, disabled }) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
      {ACTIONS.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.id}
            type="button"
            disabled={disabled}
            onClick={() => onTriggerAction(action.prompt)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-all whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed ${action.color} bg-zinc-900/60`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{action.label}</span>
          </button>
        );
      })}
    </div>
  );
}