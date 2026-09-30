import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  sendTutorMessage, 
  fetchUserSessions, 
  fetchSessionById, 
  deleteUserSession 
} from '../../api/tutorApi';
import MarkdownRenderer from '../../components/common/MarkdownRenderer';
import CodeEditor from '../../pages/tutor/CodeEditor';
import TutorActions from '../../pages/tutor/TutorActions';
import { 
  Terminal, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Send, 
  Sparkles, 
  PanelLeftClose, 
  PanelLeft,
  Code,
  MessageSquare,
  X
} from 'lucide-react';

const INITIAL_CPP = `#include <iostream>
#include <vector>
using namespace std;

// Implement your solution below
int main() {
    cout << "Ready for deliberate practice!" << endl;
    return 0;
}`;

export default function Tutor() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingHistory, setFetchingHistory] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [showEditorDesktop, setShowEditorDesktop] = useState(true);
  const [mobileActiveTab, setMobileActiveTab] = useState('chat');

  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState(INITIAL_CPP);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    if (mobileActiveTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, loading, mobileActiveTab]);

  const loadSessions = async () => {
    try {
      const data = await fetchUserSessions();
      setSessions(data);
    } catch (err) {
      console.error('Failed to load sessions:', err);
    }
  };

  const handleSelectSession = async (sessionId) => {
    if (sessionId === currentSessionId) return;
    setFetchingHistory(true);
    try {
      const sessionData = await fetchSessionById(sessionId);
      setCurrentSessionId(sessionData._id);
      setMessages(sessionData.messages || []);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    } catch (err) {
      console.error('Failed to retrieve session:', err);
    } finally {
      setFetchingHistory(false);
    }
  };

  const handleNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
    setInputMessage('');
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleDeleteSession = async (e, sessionId) => {
    e.stopPropagation();
    try {
      await deleteUserSession(sessionId);
      setSessions((prev) => prev.filter((s) => s._id !== sessionId));
      if (currentSessionId === sessionId) {
        handleNewChat();
      }
    } catch (err) {
      console.error('Failed to delete session:', err);
    }
  };

  const executeSend = async (userText) => {
    if (!userText.trim() || loading) return;

    const updatedMessages = [...messages, { role: 'user', content: userText }];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await sendTutorMessage(userText, currentSessionId);
      
      if (!currentSessionId && res.sessionId) {
        setCurrentSessionId(res.sessionId);
        loadSessions();
      }
      
      setMessages(res.messages);
    } catch (err) {
      console.error('Error sending message:', err);
      setMessages([
        ...updatedMessages,
        { 
          role: 'assistant', 
          content: 'Sorry, I ran into an issue connecting to the mentor engine. Please try again.' 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const text = inputMessage.trim();
    setInputMessage('');
    executeSend(text);
  };

  const handleAnalyzeCode = () => {
    const prompt = `Here is my current ${language.toUpperCase()} implementation:\n\`\`\`${language}\n${code}\n\`\`\`\nPlease review my logic, point out potential edge-case issues or complexity bottlenecks, and give me a progressive Socratic hint without giving away the full answer.`;
    if (window.innerWidth < 768) {
      setMobileActiveTab('chat');
    }
    executeSend(prompt);
  };

  return (
    <div className="relative flex h-screen bg-[#080B11] text-zinc-100 font-sans selection:bg-purple-600/30 overflow-hidden">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar: Past Sessions */}
      <aside
        className={`fixed md:relative top-0 bottom-0 left-0 z-50 transition-all duration-300 ease-in-out border-zinc-800/80 bg-[#0B0F19] flex flex-col overflow-hidden shrink-0 ${
          sidebarOpen 
            ? 'w-72 border-r translate-x-0' 
            : 'w-0 border-r-0 -translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 p-1 rounded-md">
              <Terminal className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs font-bold tracking-wider text-zinc-300 uppercase">Prep History</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleNewChat}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New</span>
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 text-zinc-400 hover:text-zinc-200 md:hidden"
              title="Close Drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {sessions.length === 0 ? (
            <p className="text-xs text-zinc-500 p-4 text-center">No past prep sessions yet.</p>
          ) : (
            sessions.map((session) => (
              <div
                key={session._id}
                onClick={() => handleSelectSession(session._id)}
                className={`flex items-center justify-between p-2.5 rounded-lg text-xs cursor-pointer transition-colors group ${
                  currentSessionId === session._id
                    ? 'bg-zinc-800/90 text-purple-300 font-medium border border-zinc-700/60'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                }`}
              >
                <span className="truncate pr-2">{session.title || 'Untitled Session'}</span>
                <button
                  onClick={(e) => handleDeleteSession(e, session._id)}
                  className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-rose-400 p-1 rounded transition-opacity"
                  title="Delete Session"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-full bg-[#080B11] min-w-0 w-full overflow-hidden">
        {/* Workspace Top Header */}
        <header className="h-14 border-b border-zinc-800/80 px-4 sm:px-6 flex items-center justify-between bg-[#080B11]/80 backdrop-blur-md sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-1.5 sm:p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded-lg transition-colors shrink-0"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 sm:p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded-lg transition-colors shrink-0"
              title={sidebarOpen ? 'Hide History' : 'Show History'}
            >
              {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
            </button>
            
            <div className="flex items-center gap-2 min-w-0">
              <h1 className="text-xs sm:text-sm font-bold text-zinc-100 truncate">
                Socratic AI Tutor
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-600/10 border border-purple-500/20 text-[10px] font-mono text-purple-400 shrink-0">
                <Sparkles className="w-3 h-3" /> Socratic Guided
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Desktop Code Editor Toggle */}
            <button
              onClick={() => setShowEditorDesktop(!showEditorDesktop)}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                showEditorDesktop 
                  ? 'bg-purple-600/15 border-purple-500/30 text-purple-300' 
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>{showEditorDesktop ? 'Hide Editor' : 'Show Editor'}</span>
            </button>

            {/* Mobile Tab Switcher */}
            <div className="flex md:hidden items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
              <button
                onClick={() => setMobileActiveTab('chat')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  mobileActiveTab === 'chat'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <MessageSquare className="w-3 h-3" />
                <span>Chat</span>
              </button>
              <button
                onClick={() => setMobileActiveTab('code')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  mobileActiveTab === 'code'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Code</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 flex overflow-hidden min-h-0 relative">
          {/* Code Editor Pane */}
          <div
            className={`h-full border-r border-zinc-800/80 transition-all overflow-hidden ${
              showEditorDesktop ? 'md:w-1/2 md:block' : 'md:hidden'
            } ${
              mobileActiveTab === 'code' ? 'w-full block z-20 absolute inset-0 md:relative' : 'hidden'
            }`}
          >
            <CodeEditor
              language={language}
              setLanguage={setLanguage}
              code={code}
              setCode={setCode}
              onAskAboutCode={handleAnalyzeCode}
            />
          </div>

          {/* Tutor Chat Pane */}
          <div
            className={`flex-1 flex flex-col h-full bg-[#080B11] min-w-0 overflow-hidden ${
              mobileActiveTab === 'chat' ? 'flex' : 'hidden md:flex'
            }`}
          >
            {/* Messages Thread */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {fetchingHistory ? (
                <div className="flex justify-center items-center h-full text-zinc-500 text-xs">
                  Loading session thread...
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center max-w-sm mx-auto px-4 text-zinc-400">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 shadow-lg shadow-purple-950/30">
                    <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-zinc-200 mb-1">
                    What algorithm are you tackling?
                  </h3>
                  <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed">
                    Write code in the editor, click <span className="text-purple-400 font-semibold">Analyze Logic</span>, or use the guided action modes below.
                  </p>
                </div>
              ) : (
                messages.map((msg, index) => {
                  const isAssistant = msg.role === 'assistant';
                  return (
                    <div
                      key={index}
                      className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[92%] sm:max-w-[85%] rounded-xl p-3 sm:p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                          isAssistant
                            ? 'bg-[#0E131F] border border-zinc-800 text-zinc-200'
                            : 'bg-purple-600 text-white font-medium'
                        }`}
                      >
                        {isAssistant ? (
                          <>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-2">
                              <Sparkles className="w-3 h-3" /> Socratic Mentor
                            </div>
                            <MarkdownRenderer content={msg.content} />
                          </>
                        ) : (
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        )}
                      </div>
                    </div>
                  );
                })
              )}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#0E131F] border border-zinc-800 rounded-xl p-3 sm:p-4 text-xs text-zinc-400 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-75"></span>
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-150"></span>
                    <span className="text-xs ml-2 text-zinc-400">Reviewing code & formulating hint...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Input Area with Action Pills */}
            <div className="p-3 sm:p-4 border-t border-zinc-800/80 bg-[#080B11]/90 backdrop-blur-md shrink-0 space-y-2.5">
              <div className="max-w-4xl mx-auto">
                <TutorActions 
                  onTriggerAction={executeSend} 
                  disabled={loading} 
                />
              </div>

              <form onSubmit={handleFormSubmit} className="flex items-center gap-2 max-w-4xl mx-auto">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask a question or explain your approach..."
                  disabled={loading}
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={loading || !inputMessage.trim()}
                  className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-md shadow-purple-600/20 shrink-0"
                >
                  <span className="hidden sm:inline">Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}