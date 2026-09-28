export const LANGUAGE_VERSIONS = {
  javascript: {
    language: 'javascript',
    version: '*',
    extension: 'js',
  },
  python: {
    language: 'python',
    version: '*',
    extension: 'py',
  },
  cpp: {
    language: 'c++',
    version: '*',
    extension: 'cpp',
  },
  java: {
    language: 'java',
    version: '*',
    extension: 'java',
  },
};

export const normalizeLanguage = (lang = '') => {
  const normalized = lang.toLowerCase().trim();
  const aliasMap = {
    js: 'javascript',
    javascript: 'javascript',
    node: 'javascript',
    py: 'python',
    python: 'python',
    python3: 'python',
    cpp: 'cpp',
    'c++': 'cpp',
    c: 'cpp',
    java: 'java',
  };
  return aliasMap[normalized] || null;
};