import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { 
  Code2, 
  FileText, 
  Bot, 
  Flame, 
  Target, 
  TrendingUp, 
  LogOut, 
  Terminal, 
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth() || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) logout();
    navigate('/login');
  };

  const username = user?.name || user?.email?.split('@')[0] || 'coder';

  return (
    <div className="min-h-screen bg-[#080B11] text-zinc-100 font-sans selection:bg-purple-600/30 flex flex-col">
      {/* Top Navbar */}
      <header className="h-16 border-b border-zinc-800/80 px-4 sm:px-6 md:px-10 flex items-center justify-between bg-[#080B11]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="bg-purple-600 p-1.5 rounded-lg flex items-center justify-center shadow-lg shadow-purple-600/20">
            <Terminal className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center text-sm font-extrabold tracking-wider">
            <span className="text-white">PREP</span>
            <span className="text-purple-400">GENIUS</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 px-2.5 py-1.5 rounded-full max-w-[160px] sm:max-w-none">
            <div className="w-5 h-5 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center text-[10px] font-bold shrink-0">
              {username.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-zinc-200 truncate">{user?.email || 'user@prepgenius.io'}</span>
          </div>

          <button
            onClick={handleLogout}
            title="Log out"
            className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-zinc-900 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#101423] to-[#0B0F19] border border-zinc-800/90 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-400 mb-4 sm:mb-6 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              phase2_active_v2.0
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Ready to level up your interview prep?
            </h1>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
              Step into deliberate practice. Benchmark your code, sharpen behavioral clarity, and optimize your resume for eager tech recruiters.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 border-t border-zinc-800/80">
              <div className="flex items-center gap-3 bg-zinc-900/40 sm:bg-transparent p-2.5 sm:p-0 rounded-lg border border-zinc-800/40 sm:border-0">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Streak</div>
                  <div className="text-sm font-bold text-zinc-100">3 days</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-zinc-900/40 sm:bg-transparent p-2.5 sm:p-0 rounded-lg border border-zinc-800/40 sm:border-0">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Solved</div>
                  <div className="text-sm font-bold text-zinc-100">0 Problems</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-zinc-900/40 sm:bg-transparent p-2.5 sm:p-0 rounded-lg border border-zinc-800/40 sm:border-0">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Readiness</div>
                  <div className="text-sm font-bold text-emerald-400">72%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Preparation Modules
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Core suites engineered for placement assessment rounds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Module 1: Socratic AI Tutor & Workspace (Active in Phase 2) */}
            <div 
              onClick={() => navigate('/tutor')}
              className="group relative flex flex-col justify-between p-5 sm:p-6 bg-[#0E131F] hover:bg-[#121929] border border-purple-500/30 hover:border-purple-500/70 rounded-xl cursor-pointer transition-all duration-200 shadow-lg shadow-purple-950/20 hover:shadow-purple-900/30"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-600/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:bg-purple-600/20 transition-colors">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Live Now
                  </span>
                </div>
                <h3 className="text-sm font-bold text-zinc-100 group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                  Socratic AI Tutor
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-purple-400" />
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Interactive guided problem solving. Benchmark logic and get step-by-step Socratic hints without spoilers.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-purple-400 font-mono">
                  Phase 2 Active
                </span>
                <span className="text-xs font-medium text-purple-400 flex items-center gap-1 group-hover:underline">
                  Launch &rarr;
                </span>
              </div>
            </div>

            {/* Module 2: ATS Resume Audit */}
            <div className="relative flex flex-col justify-between p-5 sm:p-6 bg-[#0E131F]/60 border border-zinc-800/60 rounded-xl opacity-75">
              <div>
                <div className="w-10 h-10 rounded-lg bg-zinc-800/50 border border-zinc-700/40 flex items-center justify-center text-zinc-400 mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-zinc-200">
                  ATS Resume Audit
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Parse your resume against target JDs to identify keyword gaps and formatting bottlenecks.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-zinc-500 font-mono">
                  Phase 3
                </span>
                <span className="flex items-center gap-1 text-xs text-zinc-500">
                  <Lock className="w-3.5 h-3.5" /> Upcoming
                </span>
              </div>
            </div>

            {/* Module 3: Adaptive AI Mock */}
            <div className="relative flex flex-col justify-between p-5 sm:p-6 bg-[#0E131F]/60 border border-zinc-800/60 rounded-xl opacity-75">
              <div>
                <div className="w-10 h-10 rounded-lg bg-zinc-800/50 border border-zinc-700/40 flex items-center justify-center text-zinc-400 mb-4">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-zinc-200">
                  Adaptive AI Mock
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Interactive voice/text interviews challenging your algorithmic complexity and system design trade-offs.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-zinc-500 font-mono">
                  Phase 4
                </span>
                <span className="flex items-center gap-1 text-xs text-zinc-500">
                  <Lock className="w-3.5 h-3.5" /> Upcoming
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}