import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllProblems } from '../../api/problems';
import { fetchUserSubmissions } from '../../api/code';
import { 
  ArrowLeft, 
  Search, 
  Terminal, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight
} from 'lucide-react';

export default function ProblemList() {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [solvedSlugSet, setSolvedSlugSet] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setLoading(true);
      try {
        const [problemData, submissionData] = await Promise.all([
          fetchAllProblems(),
          fetchUserSubmissions().catch(() => ({ submissions: [] })),
        ]);

        if (!isMounted) return;

        setProblems(problemData || []);

        const solved = new Set(
          (submissionData?.submissions || [])
            .filter((sub) => sub.passed)
            .map((sub) => sub.problemSlug)
        );
        setSolvedSlugSet(solved);
      } catch (err) {
        console.error('Failed to load problem listing:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = ['All', ...new Set(problems.map((p) => p.category).filter(Boolean))];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = 
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDifficulty = 
      selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
    const matchesCategory = 
      selectedCategory === 'All' || problem.category === selectedCategory;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#080B11] text-zinc-100 font-sans selection:bg-purple-600/30 flex flex-col">
      {/* Top Header */}
      <header className="h-16 border-b border-zinc-800/80 px-4 sm:px-8 flex items-center justify-between bg-[#080B11]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 p-1.5 rounded-lg flex items-center justify-center shadow-lg shadow-purple-600/20">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center text-sm font-extrabold tracking-wider">
              <span className="text-white">PREP</span>
              <span className="text-purple-400">GENIUS</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-500/20 text-xs font-mono text-purple-400">
            <Sparkles className="w-3.5 h-3.5" /> CodePilot Ready
          </span>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Curated Problem Library
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
            Select a target challenge to launch your dedicated CodePilot pair-programming workspace.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#0E131F] border border-zinc-800/80 rounded-xl p-3 sm:p-4 space-y-3 shadow-xl">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by problem title, algorithmic tags..."
              className="w-full bg-zinc-900/90 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            {/* Difficulty Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500 text-[11px] font-mono">DIFF:</span>
              <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                      selectedDifficulty === diff
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Selector */}
            <div className="flex items-center gap-1.5 ml-auto">
              <span className="text-zinc-500 text-[11px] font-mono">TAG:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Problems Table / List */}
        <div className="bg-[#0B0F19] border border-zinc-800/80 rounded-xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="p-12 text-center text-xs text-zinc-500">
              Loading challenges...
            </div>
          ) : filteredProblems.length === 0 ? (
            <div className="p-12 text-center text-xs text-zinc-500">
              No matching problems found. Adjust your filters or search terms.
            </div>
          ) : (
            <div className="divide-y divide-zinc-800/60">
              {filteredProblems.map((problem, idx) => {
                const isSolved = solvedSlugSet.has(problem.slug);

                return (
                  <div
                    key={problem.slug}
                    onClick={() => navigate(`/tutor/${problem.slug}`)}
                    className="p-4 sm:px-6 hover:bg-zinc-900/50 transition-colors flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-6 shrink-0 flex items-center justify-center">
                        {isSolved ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <span className="text-xs font-mono text-zinc-600">
                            {idx + 1}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-purple-300 transition-colors flex items-center gap-2">
                          <span className="truncate">{problem.title}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                              problem.difficulty === 'Easy'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : problem.difficulty === 'Medium'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}
                          >
                            {problem.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] text-zinc-500">
                            {problem.category}
                          </span>
                          {problem.tags?.map((t) => (
                            <span
                              key={t}
                              className="hidden sm:inline text-[10px] text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600/10 group-hover:bg-purple-600 text-purple-300 group-hover:text-white rounded-lg text-xs font-semibold transition-all">
                        <span>Solve</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <ChevronRight className="w-4 h-4 text-zinc-500 sm:hidden" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}