import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/common/Logo';
import { 
  LogOut, 
  Sparkles, 
  Code2, 
  FileText, 
  Bot, 
  Flame, 
  CheckCircle2, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#070b14]/80 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Logo size="sm" />

        <div className="flex items-center gap-3">
          {/* User Meta: Shows name always, hides email on small screens to prevent clutter */}
          <div className="text-right">
            <p className="text-xs sm:text-sm font-semibold text-white leading-tight">
              {user?.name || 'Candidate'}
            </p>
            <p className="hidden sm:block text-[11px] text-slate-400 font-mono">
              {user?.email}
            </p>
          </div>

          <button
            onClick={logout}
            title="Sign Out"
            className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e1628] via-[#090e1a] to-[#050811] p-6 sm:p-10 shadow-2xl">
          {/* Ambient Glows */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-2xl">
            {/* Top Badge with Candidate Greeting */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Welcome back, <strong className="text-white">{user?.name || 'Candidate'}</strong></span>
            </div>

            {/* Responsive, balanced headline that won't orphan words */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.2]">
              Ready to level up your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
                interview prep?
              </span>
            </h1>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl">
              Step into deliberate practice. Benchmark your code, sharpen behavioral clarity, and optimize your resume for top-tier tech rounds.
            </p>

            {/* Quick Readiness Metrics Bar */}
            <div className="pt-2 grid grid-cols-3 gap-2.5 sm:gap-4 max-w-md">
              <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-[11px] text-amber-400 font-mono mb-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Streak</span>
                </div>
                <p className="text-lg sm:text-2xl font-bold text-white">3 <span className="text-xs font-normal text-slate-500">days</span></p>
              </div>

              <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-[11px] text-indigo-400 font-mono mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Solved</span>
                </div>
                <p className="text-lg sm:text-2xl font-bold text-white">0 <span className="text-xs font-normal text-slate-500">probs</span></p>
              </div>

              <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-[11px] text-emerald-400 font-mono mb-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Readiness</span>
                </div>
                <p className="text-lg sm:text-2xl font-bold text-emerald-400">72%</p>
              </div>
            </div>
          </div>
        </section>

        {/* PREPARATION MODULES SECTION */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-400" />
              Preparation Modules
            </h2>
            <p className="text-slate-400 text-xs">
              Core suites engineered for placement assessment rounds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Coding Workspace */}
            <div className="group relative rounded-2xl border border-white/10 bg-slate-900/50 hover:bg-slate-900/90 p-5 transition-all duration-300 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base">Live Coding IDE</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Monaco-powered sandboxed execution with real-time Socratic hints and multi-language support.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-indigo-400 font-medium">
                <span>Phase 2 (Next)</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: AI Resume Screener */}
            <div className="group relative rounded-2xl border border-white/10 bg-slate-900/50 hover:bg-slate-900/90 p-5 transition-all duration-300 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/5 flex flex-col justify-between opacity-80">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base">ATS Resume Audit</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Parse your resume against target JDs to identify keyword gaps and formatting bottlenecks.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Phase 3</span>
              </div>
            </div>

            {/* Card 3: Mock Interviewer */}
            <div className="group relative rounded-2xl border border-white/10 bg-slate-900/50 hover:bg-slate-900/90 p-5 transition-all duration-300 hover:border-pink-500/40 hover:shadow-xl hover:shadow-pink-500/5 flex flex-col justify-between opacity-80">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base">Adaptive AI Mock</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Interactive voice/text interviews challenging your algorithmic complexity and system design trade-offs.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Phase 4</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;