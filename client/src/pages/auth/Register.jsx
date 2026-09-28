import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/common/Logo';
import {
  Lock,
  Mail,
  User,
  Briefcase,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Terminal,
  CheckCircle2,
  Code2,
} from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    targetRole: 'Full Stack Developer',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#070b14] text-slate-100 flex overflow-hidden font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 border-r border-white/5 bg-gradient-to-br from-[#0c1222] via-[#070b14] to-[#04070e] overflow-hidden">
        <div className="relative z-10">
          <Logo size="lg" />
        </div>

        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Interview Readiness</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
            Build the instincts needed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400">high-stakes engineering rounds</span>.
          </h1>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                <Code2 className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Active Socratic Code Workspace:</strong> Build solutions using AI hints that ask guiding questions rather than writing the answers for you.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Targeted Role Alignment:</strong> Tailor your interview questions and resume checks directly to your desired job title.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6 text-xs text-slate-500 font-mono">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            100% Free Open Toolchain
          </span>
          <span className="flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-purple-400" />
            Vercel & Render Ready
          </span>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        <div className="w-full max-w-md relative z-10 space-y-6 my-auto py-6">
          <div className="lg:hidden flex justify-center mb-4">
            <Logo size="lg" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Create Candidate Profile</h2>
            <p className="text-slate-400 text-sm">Setup your account to start solving problems and preparing</p>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="candidate@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  minLength={6}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="Min. 6 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">Target Role</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="Full Stack Engineer / SDE 1"
                  value={formData.targetRole}
                  onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-[1px] font-semibold text-white shadow-lg transition-all disabled:opacity-50"
            >
              <div className="flex items-center justify-center gap-2 rounded-[11px] bg-indigo-600 px-6 py-3 hover:bg-indigo-500 transition-colors">
                <span className="text-sm">{isSubmitting ? 'Configuring Account...' : 'Get Started Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </form>

          <div className="text-center pt-3 border-t border-white/5">
            <p className="text-xs text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold underline ml-1">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;