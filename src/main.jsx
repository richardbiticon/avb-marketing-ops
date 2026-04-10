import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

/*
  Cloud-synced storage using JSONBin.io (free tier)
  
  SETUP (one time, 2 minutes):
  1. Go to jsonbin.io and create a free account
  2. Go to API Keys, copy your X-Access-Key
  3. Create a new bin with: {"data":{}}
  4. Copy the Bin ID
  5. Paste both values below
  
  All devices then share the same saved data.
  Skip this and it falls back to localStorage (single device).
*/
const JSONBIN_KEY = "UgAhioLzyPrmD3Iph58mcucWwyd7c9OhyhwTOc8Ysy3VdFMSioP";
const JSONBIN_BIN = "69d94a25aaba882197e5fdca";

let cache = {};
let loaded = false;
let writeTimer = null;

async function cloudLoad() {
  if (!JSONBIN_KEY || !JSONBIN_BIN) return;
  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN}/latest`, {
      headers: { "X-Access-Key": JSONBIN_KEY }
    });
    const json = await res.json();
    cache = json.record || {};
    loaded = true;
  } catch (e) {
    console.warn("Cloud load failed:", e);
    loaded = true;
  }
}

function cloudSave() {
  if (!JSONBIN_KEY || !JSONBIN_BIN) return;
  if (writeTimer) clearTimeout(writeTimer);
  writeTimer = setTimeout(async () => {
    try {
      await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-Access-Key": JSONBIN_KEY },
        body: JSON.stringify(cache)
      });
    } catch (e) { console.warn("Cloud save failed:", e); }
  }, 1500);
}

const useCloud = JSONBIN_KEY && JSONBIN_BIN;

if (!window.storage) {
  window.storage = {
    async get(key) {
      if (useCloud) {
        if (!loaded) await cloudLoad();
        const val = cache[key];
        return val != null ? { key, value: val, shared: true } : null;
      }
      try {
        const v = localStorage.getItem("avb-" + key);
        return v ? { key, value: v, shared: false } : null;
      } catch { return null; }
    },
    async set(key, value) {
      if (useCloud) {
        if (!loaded) await cloudLoad();
        cache[key] = value;
        cloudSave();
        return { key, value, shared: true };
      }
      try {
        localStorage.setItem("avb-" + key, value);
        return { key, value, shared: false };
      } catch { return null; }
    },
    async delete(key) {
      if (useCloud) { delete cache[key]; cloudSave(); return { key, deleted: true }; }
      try { localStorage.removeItem("avb-" + key); return { key, deleted: true }; } catch { return null; }
    },
    async list() { return { keys: [] }; }
  };
}

async function start() {
  if (useCloud) await cloudLoad();
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode><App /></React.StrictMode>
  );
}
start();
