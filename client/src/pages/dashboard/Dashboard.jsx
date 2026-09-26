import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/common/Logo';
import { 
  Code2, 
  FileCheck2, 
  Sparkles, 
  Flame, 
  Trophy, 
  ArrowUpRight, 
  LogOut, 
  Cpu, 
  CheckCircle2,
  Clock,
  Compass
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const modules = [
    {
      id: 'workspace',
      title: 'Coding Workspace',
      badge: 'Phase 2 Ready',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      description: 'Zero-setup IDE with real-time multi-language execution and Socratic AI hints that guide without spoiling.',
      icon: Code2,
      accent: 'from-indigo-500/20 to-blue-500/0 hover:border-indigo-500/40',
      iconBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      actionText: 'Launch Sandbox',
      ready: true,
      onClick: () => navigate('/workspace'),
    },
    {
      id: 'resume',
      title: 'AI Resume Screener',
      badge: 'Phase 3',
      badgeColor: 'border-slate-700 text-slate-400 bg-slate-800/40',
      description: 'Upload your PDF resume against job descriptions for instant ATS scoring, tech-stack keyword checks, and punch-ups.',
      icon: FileCheck2,
      accent: 'from-emerald-500/20 to-teal-500/0 hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      actionText: 'Analyze Resume',
      ready: false,
    },
    {
      id: 'interview',
      title: 'Adaptive Mock Interviewer',
      badge: 'Phase 4',
      badgeColor: 'border-slate-700 text-slate-400 bg-slate-800/40',
      description: 'Voice & text technical grilling that listens to your architectural decisions and challenges edge cases in real-time.',
      icon: Cpu,
      accent: 'from-purple-500/20 to-pink-500/0 hover:border-purple-500/40',
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      actionText: 'Start Session',
      ready: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 relative overflow-hidden font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Top Glass Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#090d16]/80 backdrop-blur-xl px-6 py-3.5 flex items-center justify-between">
        <Logo size="md" />

        <div className="flex items-center gap-5">
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 border border-white/10 px-3 py-1.5 rounded-full text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">Target:</span>
            <span className="text-slate-200 font-semibold">{user?.targetRole || 'Full Stack Engineer'}</span>
          </div>

          <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-white leading-none capitalize">{user?.name}</p>
              <p className="text-[11px] text-slate-400 font-mono mt-1">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="p-2 rounded-lg bg-slate-800/60 border border-white/5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="relative max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* Hero Banner with Stats Overview */}
        <div className="relative rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-indigo-950/30 p-8 overflow-hidden backdrop-blur-md">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Placement Season 2026 Ready</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Ready to level up, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 capitalize">{user?.name?.split(' ')[0]}</span>?
              </h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Step into deliberate practice. Benchmark your code, sharpen behavioral clarity, and optimize your resume for top-tier tech rounds.
              </p>
            </div>

            {/* Quick Readiness Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 font-mono">
              <div className="bg-slate-950/60 border border-white/5 p-4 rounded-xl text-center">
                <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs mb-1 font-sans">
                  <Flame className="w-4 h-4" />
                  <span>Streak</span>
                </div>
                <div className="text-2xl font-bold text-white">3 <span className="text-xs text-slate-500">days</span></div>
              </div>
              <div className="bg-slate-950/60 border border-white/5 p-4 rounded-xl text-center">
                <div className="flex items-center justify-center gap-1.5 text-indigo-400 text-xs mb-1 font-sans">
                  <Trophy className="w-4 h-4" />
                  <span>Solved</span>
                </div>
                <div className="text-2xl font-bold text-white">0 <span className="text-xs text-slate-500">probs</span></div>
              </div>
              <div className="bg-slate-950/60 border border-white/5 p-4 rounded-xl text-center">
                <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs mb-1 font-sans">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Readiness</span>
                </div>
                <div className="text-2xl font-bold text-emerald-400">72%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-400" />
                Preparation Modules
              </h2>
              <p className="text-xs text-slate-400">Core suites engineered for placement assessment rounds</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.id}
                  className={`group relative rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6 flex flex-col justify-between transition-all duration-300 ${
                    mod.ready 
                      ? 'hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer' 
                      : 'opacity-70 border-white/5 cursor-not-allowed'
                  }`}
                  onClick={mod.ready ? mod.onClick : undefined}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${mod.iconBg}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-full border ${mod.badgeColor}`}>
                        {mod.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                        {mod.title}
                        {mod.ready && <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-indigo-400" />}
                      </h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        {mod.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {mod.ready ? 'Interactive' : 'In Roadmap'}
                    </span>
                    <button
                      disabled={!mod.ready}
                      className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
                        mod.ready
                          ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {mod.actionText}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;