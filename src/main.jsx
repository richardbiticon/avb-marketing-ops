import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const JSONBIN_KEY = "$2a$10$UgAhioLzyPrmD3Iph58mcucWwyd7c9OhyhwTOc8Ysy3VdFMSioP.C";
const JSONBIN_BIN = "69d94a25aaba882197e5fdca";

let cache = {};
let loaded = false;
let writeTimer = null;

async function cloudLoad() {
  try {
    const res = await fetch("https://api.jsonbin.io/v3/b/" + JSONBIN_BIN + "/latest", {
      headers: { "X-Access-Key": JSONBIN_KEY }
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const json = await res.json();
    cache = json.record || {};
    loaded = true;
    console.log("[AVB] Cloud data loaded successfully");
  } catch (e) {
    console.warn("[AVB] Cloud load failed, using local fallback:", e.message);
    loaded = true;
  }
}

function cloudSave() {
  if (writeTimer) clearTimeout(writeTimer);
  writeTimer = setTimeout(async () => {
    try {
      const res = await fetch("https://api.jsonbin.io/v3/b/" + JSONBIN_BIN, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key": JSONBIN_KEY
        },
        body: JSON.stringify(cache)
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      console.log("[AVB] Cloud save successful");
    } catch (e) {
      console.warn("[AVB] Cloud save failed:", e.message);
    }
  }, 1500);
}

if (!window.storage) {
  window.storage = {
    async get(key) {
      if (!loaded) await cloudLoad();
      const val = cache[key];
      if (val != null) return { key: key, value: val, shared: true };
      // Fallback to localStorage
      try {
        const local = localStorage.getItem("avb-" + key);
        return local ? { key: key, value: local, shared: false } : null;
      } catch (e) { return null; }
    },
    async set(key, value) {
      if (!loaded) await cloudLoad();
      cache[key] = value;
      // Save to both cloud and local
      try { localStorage.setItem("avb-" + key, value); } catch (e) {}
      cloudSave();
      return { key: key, value: value, shared: true };
    },
    async delete(key) {
      delete cache[key];
      try { localStorage.removeItem("avb-" + key); } catch (e) {}
      cloudSave();
      return { key: key, deleted: true };
    },
    async list() {
      return { keys: Object.keys(cache) };
    }
  };
}

async function start() {
  await cloudLoad();
  ReactDOM.createRoot(document.getElementById('root')).render(
    React.createElement(React.StrictMode, null, React.createElement(App))
  );
}

start();
