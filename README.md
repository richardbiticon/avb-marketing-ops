[README.md](https://github.com/user-attachments/files/26638166/README.md)
# AVB Marketing Ops

Internal marketing operations dashboard for All Volleyball.

## Setup

```bash
npm install
npm run dev
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Login

Password: `avb2026`

## Cloud Sync (so all devices share the same data)

By default, data saves to your browser only (localStorage). To sync across all devices:

1. Go to [jsonbin.io](https://jsonbin.io) and create a free account
2. After login, go to **API Keys** in the sidebar. Copy your **X-Access-Key**
3. Click **Create a Bin**, paste this as the content: `{"data":{}}`
4. After creating, copy the **Bin ID** from the URL (looks like `682f...`)
5. Open `src/main.jsx` and paste your values:

```js
const JSONBIN_KEY = "your-x-access-key-here";
const JSONBIN_BIN = "your-bin-id-here";
```

6. Commit and redeploy. Done. All devices now share the same IDS notes, checkboxes, and progress.

## Features

- **Planning** - Strategy documents with IDS (Identify, Discuss, Solve) framework
- **3 Offer Framings** - Welcome Back, Early Lock-In, Spring Cleaning with toggle comparison
- **Interactive IDS** - Checkable discussion points, notes, solution tracking
- **Persistent Storage** - Auto-saves to cloud (JSONBin) or localStorage as fallback
- **Cross-device sync** - Same data on phone, laptop, any browser (with JSONBin configured)

## Tech

- React 18 + Vite
- Lucide React icons
- Google Fonts (Archivo Black, DM Sans, JetBrains Mono)
- JSONBin.io for cloud persistence (free tier)
