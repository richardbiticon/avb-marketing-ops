import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Polyfill window.storage for standalone deployment (outside Claude)
// Uses localStorage as fallback
if (!window.storage) {
  window.storage = {
    async get(key, shared) {
      try {
        const val = localStorage.getItem(`avb-${shared ? 's' : 'p'}-${key}`);
        return val ? { key, value: val, shared: !!shared } : null;
      } catch { return null; }
    },
    async set(key, value, shared) {
      try {
        localStorage.setItem(`avb-${shared ? 's' : 'p'}-${key}`, value);
        return { key, value, shared: !!shared };
      } catch { return null; }
    },
    async delete(key, shared) {
      try {
        localStorage.removeItem(`avb-${shared ? 's' : 'p'}-${key}`);
        return { key, deleted: true, shared: !!shared };
      } catch { return null; }
    },
    async list(prefix, shared) {
      try {
        const pre = `avb-${shared ? 's' : 'p'}-${prefix || ''}`;
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k.startsWith(pre)) keys.push(k.replace(`avb-${shared ? 's' : 'p'}-`, ''));
        }
        return { keys, prefix, shared: !!shared };
      } catch { return null; }
    }
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
