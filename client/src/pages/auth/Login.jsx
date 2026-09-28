import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/common/Logo';
import {
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Terminal,
  CheckCircle2,
} from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#070b14] text-slate-100 flex overflow-hidden font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 border-r border-white/5 bg-gradient-to-br from-[#0c1222] via-[#070b14] to-[#04070e] overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10">
          <Logo size="lg" />
        </div>

        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Placement Intelligence Platform</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
            Crack technical interviews with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">adaptive AI coaching</span>.
          </h1>

          <p className="text-slate-400 text-sm leading-relaxed">
            Run code in an integrated sandbox, trigger Socratic hints without giving away the solutions, and master data structures faster.
          </p>

          <div className="rounded-xl border border-white/10 bg-slate-950/80 backdrop-blur-md p-4 font-mono text-xs shadow-2xl space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-white/5 text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-[11px] text-slate-400">prep-genius-engine ~ v1.0</span>
            </div>
            <p className="text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> Judge0 & Piston sandbox: Ready
            </p>
            <p className="text-indigo-300 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> Socratic AI hint engine: Active
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6 text-xs text-slate-500 font-mono">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            JWT End-to-End Auth
          </span>
          <span className="flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-indigo-400" />
            Zero-Cost Sandbox
          </span>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md relative z-10 space-y-8">
          <div className="lg:hidden flex justify-center mb-6">
            <Logo size="lg" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Welcome back</h2>
            <p className="text-slate-400 text-sm">Enter your credentials to access your prep dashboard</p>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="candidate@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 p-[1px] font-semibold text-white shadow-lg transition-all disabled:opacity-50"
            >
              <div className="flex items-center justify-center gap-2 rounded-[11px] bg-indigo-600 px-6 py-3 hover:bg-indigo-500 transition-colors">
                <span className="text-sm">{isSubmitting ? 'Authenticating...' : 'Sign In to Workspace'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </form>

          <div className="text-center pt-4 border-t border-white/5">
            <p className="text-xs text-slate-400">
              New to Prep Genius?{' '}
              <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold underline ml-1">
                Create your account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;