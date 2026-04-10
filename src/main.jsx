import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const API_KEY = "$2a$10$UgAhioLzyPrmD3Iph58mcucWwyd7c9OhyhwTOc8Ysy3VdFMSioP.C";
const BIN_ID = "69d94a25aaba882197e5fdca";
const API_URL = "https://api.jsonbin.io/v3/b/" + BIN_ID;

let cloudData = {};
let cloudLoaded = false;
let saveTimer = null;
let saving = false;

async function loadFromCloud() {
  if (cloudLoaded) return;
  try {
    console.log("[AVB] Loading from cloud...");
    const res = await fetch(API_URL + "/latest", {
      headers: { "X-Access-Key": API_KEY }
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const json = await res.json();
    cloudData = json.record || {};
    cloudLoaded = true;
    console.log("[AVB] Cloud loaded OK. Keys:", Object.keys(cloudData));
  } catch (e) {
    console.error("[AVB] Cloud load FAILED:", e.message);
    try {
      const backup = localStorage.getItem("avb-cloud-backup");
      if (backup) {
        cloudData = JSON.parse(backup);
        console.log("[AVB] Loaded from localStorage backup");
      }
    } catch (e2) {}
    cloudLoaded = true;
  }
}

async function saveToCloud() {
  if (saving) return;
  saving = true;
  try {
    console.log("[AVB] Saving to cloud...", Object.keys(cloudData));
    const res = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Key": API_KEY
      },
      body: JSON.stringify(cloudData)
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    console.log("[AVB] Cloud save OK");
    try { localStorage.setItem("avb-cloud-backup", JSON.stringify(cloudData)); } catch (e) {}
  } catch (e) {
    console.error("[AVB] Cloud save FAILED:", e.message);
  }
  saving = false;
}

function debouncedSave() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(saveToCloud, 1200);
}

window.storage = {
  get: async function(key, _shared) {
    if (!cloudLoaded) await loadFromCloud();
    const val = cloudData[key];
    if (val !== undefined && val !== null) {
      return { key: key, value: val, shared: true };
    }
    return null;
  },
  set: async function(key, value, _shared) {
    if (!cloudLoaded) await loadFromCloud();
    cloudData[key] = value;
    debouncedSave();
    return { key: key, value: value, shared: true };
  },
  delete: async function(key, _shared) {
    delete cloudData[key];
    debouncedSave();
    return { key: key, deleted: true, shared: true };
  },
  list: async function(_prefix, _shared) {
    return { keys: Object.keys(cloudData), shared: true };
  }
};

async function start() {
  await loadFromCloud();
  ReactDOM.createRoot(document.getElementById('root')).render(
    React.createElement(React.StrictMode, null, React.createElement(App))
  );
}

start();
