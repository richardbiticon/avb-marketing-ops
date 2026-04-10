import { useState, useEffect, useCallback, useRef } from "react";
import { Lock, LayoutDashboard, Megaphone, BarChart3, Palette, Mail, Package, Users, Map, Settings, LogOut, Check, Plus, ChevronDown, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

/* ── STORAGE ── */
const PW = "avb2026";
const SK = { auth: "avb-a4", ids: "avb-i4" };

async function sG(k) {
  try { const r = await window.storage.get(k, true); return r ? JSON.parse(r.value) : null; } catch { return null; }
}
async function sS(k, v) {
  try { await window.storage.set(k, JSON.stringify(v), true); } catch (e) { console.error(e); }
}

/* ── TOKENS ── */
const C = {
  bg: "#080808", red: "#c4342d", gold: "#d4a843", green: "#2d6b4f",
  ink: "#0a0a0a", paper: "#f5f0e8", paperDk: "#e8e0d2", muted: "#6b6358", borderP: "#c8bfb0"
};
const F = { d: "'Archivo Black',sans-serif", b: "'DM Sans',sans-serif", m: "'JetBrains Mono',monospace" };

/* ── LOGO ── */
function Logo({ s = 48 }) {
  return (
    <svg width={s} height={s * 0.78} viewBox="0 0 120 94" fill="none">
      <path d="M28 86L58 10L72 48" stroke="white" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 86L80 10L94 48" stroke={C.red} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="76" cy="26" r="10" fill="white" stroke={C.bg} strokeWidth="2" />
    </svg>
  );
}

/* ── CHECKBOX ── */
function Chk({ c, on, s = 18 }) {
  return (
    <div
      onClick={(e) => { e.stopPropagation(); on(!c); }}
      style={{
        width: s, height: s, borderRadius: 4, border: `2px solid ${c ? C.green : C.red}`,
        background: c ? C.green : "transparent", cursor: "pointer", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", marginTop: 2
      }}
    >
      {c && <Check size={s - 6} color="white" strokeWidth={3} />}
    </div>
  );
}

/* ── IDS DATA ── */
function makeIDS() {
  return [
    { id: "i1", title: "Is There a Play in Building Structured Offers for Teams?", checked: false,
      identify: "Can we meaningfully move the needle by creating packaged, time-based offers for teams? How does urgency-based outreach land with directors who know us as family-owned and service-first?",
      discuss: [
        { id: "d1a", text: "Relationship-driven business. Does a limited-time offer strengthen or conflict with our identity?", checked: false, notes: "" },
        { id: "d1b", text: "Service play with a deadline vs noise. Where is the line?", checked: false, notes: "" },
        { id: "d1c", text: "Directors talk at tournaments. If manufactured, word spreads.", checked: false, notes: "" },
        { id: "d1d", text: "Competitors are pitching. Not reaching out = losing by default.", checked: false, notes: "" },
        { id: "d1e", text: "Can this feel like good news, not marketing? That is the bar.", checked: false, notes: "", hl: true },
        { id: "d1f", text: "Realistic conversion needed? 200 contacts = how many quotes?", checked: false, notes: "" },
        { id: "d1g", text: "LTV: automate a customer sheet with total orders in an hour?", checked: false, notes: "" },
        { id: "d1h", text: "20 clubs at $15-30K = $300-600K. Compounds over 2-3 years.", checked: false, notes: "" },
        { id: "d1i", text: "Downside of trying: few days. Not trying: revenue left every season.", checked: false, notes: "" },
        { id: "d1j", text: "Version two if this works?", checked: false, notes: "" },
      ], solve: "" },
    { id: "i2", title: "Can We Ship This in One Workday?", checked: false,
      identify: "Can the team build the entire first push in one dedicated day? Building a team muscle as much as the campaign.",
      discuss: [
        { id: "d2a", text: "Team cadence goal. Black Friday was last time. This is next.", checked: false, notes: "" },
        { id: "d2b", text: "Richard maps workflow before the day. Every task, owner, asset.", checked: false, notes: "" },
        { id: "d2c", text: "Teaser: 4 sentences. Ryan builds in 30 min.", checked: false, notes: "" },
        { id: "d2d", text: "Email 2 goes Week 2. Full week to finalize after teaser.", checked: false, notes: "" },
        { id: "d2e", text: "Alvin: assets. Jerico: pages. Ryan: Redo. Richard: QA.", checked: false, notes: "" },
        { id: "d2f", text: "AI, Claude, N8N heavily involved.", checked: false, notes: "" },
        { id: "d2g", text: "Budget: $300-500. Flag to Andrew.", checked: false, notes: "" },
        { id: "d2h", text: "Blocker: Andrew confirms discounts, inventory, timelines.", checked: false, notes: "" },
        { id: "d2i", text: "Worst: teaser buys a week. Best: full sequence by EOD.", checked: false, notes: "" },
        { id: "d2j", text: "Proves the muscle. Repeatable.", checked: false, notes: "" },
      ], solve: "" },
    { id: "i3", title: "Can We Improve CustomFuze Alongside This?", checked: false,
      identify: "How much play to improve ordering experience and use as another USP?",
      discuss: [
        { id: "d3a", text: "Top 3 pain points? Load times, mockups, roster upload?", checked: false, notes: "" },
        { id: "d3b", text: "Anything fixable in 1-2 weeks? Call it out.", checked: false, notes: "" },
        { id: "d3c", text: "Cosmetic improvements signal investment.", checked: false, notes: "" },
        { id: "d3d", text: "Jerico: branded flow for this campaign.", checked: false, notes: "" },
        { id: "d3e", text: "Scope creep risk. Keep decoupled.", checked: false, notes: "" },
        { id: "d3f", text: "Every CF improvement benefits future campaigns.", checked: false, notes: "" },
      ], solve: "" },
    { id: "i4", title: "Reactivation Only or Acquire New Clubs?", checked: false,
      identify: "Past customers (free email) vs also new clubs (paid).",
      discuss: [
        { id: "d4a", text: "Email to past costs nothing. First move.", checked: false, notes: "" },
        { id: "d4b", text: "Acquisition needs paid. Different framing.", checked: false, notes: "" },
        { id: "d4c", text: "If reactivation works, strong enough for cold.", checked: false, notes: "" },
        { id: "d4d", text: "Test now, adapt acquisition June-July.", checked: false, notes: "" },
        { id: "d4e", text: "Spring Cleaning works for cold audiences.", checked: false, notes: "" },
        { id: "d4f", text: "Past list size? 12mo vs 2-3yr vs 4-5yr?", checked: false, notes: "" },
      ], solve: "" },
    { id: "i5", title: "How Do We Measure This?", checked: false,
      identify: "What numbers by August 1 = win, learning, or miss?",
      discuss: [
        { id: "d5a", text: "Minimum: sends, opens, clicks, quotes, orders, revenue.", checked: false, notes: "" },
        { id: "d5b", text: "Set bar before launch.", checked: false, notes: "" },
        { id: "d5c", text: "Attribution: email to rep call to order?", checked: false, notes: "" },
        { id: "d5d", text: "Tag excess SKUs for tracking.", checked: false, notes: "" },
        { id: "d5e", text: "Multiple angles = separate tracking.", checked: false, notes: "" },
        { id: "d5f", text: "First 10 responses > any dashboard.", checked: false, notes: "" },
      ], solve: "" },
    { id: "i6", title: "What Happens After July 31?", checked: false,
      identify: "Follow-up if works, learnings if not, remaining inventory.",
      discuss: [
        { id: "d6a", text: "Seasonal vs annual vs inventory-tied?", checked: false, notes: "" },
        { id: "d6b", text: "Partial: what variable to change?", checked: false, notes: "" },
        { id: "d6c", text: "Backup for remaining excess?", checked: false, notes: "" },
        { id: "d6d", text: "Post-commit = 2027-2028 retention.", checked: false, notes: "" },
        { id: "d6e", text: "Survey: what worked, what almost stopped you?", checked: false, notes: "" },
      ], solve: "" },
    { id: "i7", title: "Channels: Redo, Zoho, Phone, Text?", checked: false,
      identify: "Redo primary. Also Brett's Zoho, phone, text?",
      discuss: [
        { id: "d7a", text: "Redo scales, costs nothing. Foundation.", checked: false, notes: "" },
        { id: "d7b", text: "Brett's Zoho: personal > marketing email.", checked: false, notes: "" },
        { id: "d7c", text: "Phone top accounts. Email warms, call closes.", checked: false, notes: "" },
        { id: "d7d", text: "Text only for existing relationships.", checked: false, notes: "" },
        { id: "d7e", text: "Track opens, follow up openers.", checked: false, notes: "" },
        { id: "d7f", text: "Layered: Redo all, Zoho 20-30, phone 10.", checked: false, notes: "" },
        { id: "d7g", text: "Threshold: < X requests in 2 weeks, add calls.", checked: false, notes: "" },
      ], solve: "" },
  ];
}

const OFFERS = [
  { name: 'The "Welcome Back" Package', angle: "Loyalty. You've ordered. Here's your reward.", items: [
    { n: "01", t: "25% off entire CustomFuze", tag: "Core" }, { n: "02", t: "FREE backpack per player. 857 in stock", tag: "Excess" },
    { n: "03", t: "FREE kneepads per player. 888 pairs", tag: "Excess" }, { n: "04", t: "FREE practice shorts. 2,600+ pairs", tag: "Excess" },
    { n: "05", t: "FREE Spirit Wear Store + 15% off" }, { n: "06", t: "30-40% off select shoes", tag: "Excess" },
    { n: "07", t: "Locked pricing 2 seasons" }, { n: "08", t: "Priority production. Guaranteed delivery" }
  ], foot: "EXCESS = from overstock at zero cost" },
  { name: "Early Lock-In 2026-2027", angle: "Urgency. Best price, first in line.", items: [
    { n: "01", t: "25% off CustomFuze before July 31", tag: "Early", g: true }, { n: "02", t: "First-in-line production" },
    { n: "03", t: "2-season price lock" }, { n: "04", t: "Bonus gear: backpack + kneepads + shorts", tag: "Excess" },
    { n: "05", t: "30-40% off shoes. Lock-in only", tag: "Excess" }, { n: "06", t: "Spirit Wear Store before first practice" }
  ], foot: "EARLY = exclusive before July 31" },
  { name: "AVB Spring Cleaning", angle: "Transparent. $100K in gear. Your club benefits.", items: [
    { n: "01", t: "Up to 50% off overstock", tag: "Excess" }, { n: "02", t: "Buy-more-save-more 20/25/30%" },
    { n: "03", t: "Free gear bundle with CustomFuze order", tag: "Excess" }, { n: "04", t: "Shoe blowout 30-50% off", tag: "Excess" },
    { n: "05", t: "Free Spirit Wear Store during sale" }
  ], foot: "Current season, brand new, full warranty." }
];

/* ── DISCUSS ITEM ── */
function DItem({ item, onC, onN }) {
  const [ex, setEx] = useState(false);
  return (
    <div style={{ background: item.checked ? "#f0f7f3" : C.paper, border: `1px solid ${item.checked ? "#b8e0c8" : C.borderP}`, marginBottom: 8, borderRadius: 6, overflow: "hidden" }}>
      <div onClick={() => setEx(!ex)} style={{ padding: "12px 16px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 12, userSelect: "none" }}>
        <Chk c={item.checked} on={onC} />
        <div style={{ flex: 1, fontSize: 13.5, color: item.checked ? C.green : "#3a352e", lineHeight: 1.55 }}>
          {item.hl ? <span style={{ background: "linear-gradient(180deg,transparent 40%,#b8f0c8 40%,#b8f0c8 88%,transparent 88%)", padding: "0 2px" }}>{item.text}</span> : item.text}
        </div>
        <ChevronDown size={12} color="#aaa" style={{ transform: ex ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", marginTop: 4, flexShrink: 0 }} />
      </div>
      {ex && (
        <div onClick={(e) => e.stopPropagation()} style={{ padding: "0 16px 14px 46px" }}>
          <div style={{ fontSize: 11, color: "#aaa", fontStyle: "italic", marginBottom: 6 }}>Notes added after the call</div>
          <textarea value={item.notes} onChange={(e) => onN(e.target.value)} onClick={(e) => e.stopPropagation()}
            placeholder="Type notes..." style={{ width: "100%", minHeight: 44, padding: "10px 12px", border: `1px dashed ${C.borderP}`, background: "white", fontFamily: F.b, fontSize: 12.5, color: C.ink, resize: "vertical", borderRadius: 4 }} />
        </div>
      )}
    </div>
  );
}

/* ── IDS CARD ── */
function IDSCard({ card, onU, ix }) {
  const [op, setOp] = useState(ix === 0);
  const [tab, setTab] = useState(0);
  const [np, setNp] = useState("");
  const cc = card.discuss.filter((d) => d.checked).length;
  const tc = card.discuss.length;
  const pct = tc > 0 ? (cc / tc) * 100 : 0;

  function add() {
    if (!np.trim()) return;
    onU({ ...card, discuss: [...card.discuss, { id: card.id + "-" + Date.now(), text: np.trim(), checked: false, notes: "" }] });
    setNp("");
  }

  return (
    <div style={{ background: "white", border: `1px solid ${card.checked ? "#b8e0c8" : C.borderP}`, marginBottom: 14, borderRadius: 8, overflow: "hidden", boxShadow: op ? "0 4px 20px rgba(0,0,0,0.08)" : "none" }}>
      <div onClick={() => setOp(!op)} style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, userSelect: "none" }}>
        <Chk c={card.checked} on={(v) => onU({ ...card, checked: v })} s={22} />
        <div style={{ fontFamily: F.d, fontSize: 20, color: card.checked ? C.green : C.red, width: 28, flexShrink: 0 }}>{ix + 1}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: F.d, fontSize: 14, color: card.checked ? C.green : C.ink }}>{card.title}</div>
          {!op && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
              <div style={{ flex: 1, maxWidth: 120, height: 3, background: C.paperDk, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: pct === 100 ? C.green : C.red, transition: "width 0.3s" }} />
              </div>
              <span style={{ fontFamily: F.m, fontSize: 9, color: "#aaa" }}>{cc}/{tc}</span>
            </div>
          )}
        </div>
        <ChevronDown size={16} color="#bbb" style={{ transform: op ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s" }} />
      </div>
      {op && (
        <>
          <div style={{ height: 3, background: C.paperDk }}><div style={{ width: `${pct}%`, height: "100%", background: pct === 100 ? C.green : C.red, transition: "width 0.3s" }} /></div>
          <div style={{ display: "flex", borderBottom: `2px solid ${C.paperDk}`, background: "#faf6f0" }}>
            {["Identify", "Discuss", "Solve"].map((t, i) => (
              <div key={t} onClick={(e) => { e.stopPropagation(); setTab(i); }}
                style={{ padding: "11px 22px", fontFamily: F.d, fontSize: 12, cursor: "pointer", color: tab === i ? C.red : "#aaa", borderBottom: tab === i ? `3px solid ${C.red}` : "3px solid transparent", marginBottom: -2, userSelect: "none" }}>
                {t}{i === 1 && <span style={{ fontFamily: F.m, fontSize: 9, color: "#ccc", marginLeft: 6 }}>{cc}/{tc}</span>}
              </div>
            ))}
          </div>
          {tab === 0 && <div style={{ padding: "20px 24px", fontSize: 14, color: "#3a352e", lineHeight: 1.65 }}>{card.identify}</div>}
          {tab === 1 && (
            <div style={{ padding: "16px 20px" }}>
              {card.discuss.map((d, di) => (
                <DItem key={d.id} item={d}
                  onC={(v) => onU({ ...card, discuss: card.discuss.map((x, j) => j === di ? { ...x, checked: v } : x) })}
                  onN={(v) => onU({ ...card, discuss: card.discuss.map((x, j) => j === di ? { ...x, notes: v } : x) })} />
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                <input value={np} onChange={(e) => setNp(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") add(); }}
                  onClick={(e) => e.stopPropagation()} placeholder="Add discussion point..."
                  style={{ flex: 1, padding: "11px 14px", border: `1px dashed ${C.borderP}`, background: "white", fontFamily: F.b, fontSize: 13, color: C.ink, borderRadius: 4 }} />
                <button onClick={(e) => { e.stopPropagation(); add(); }}
                  style={{ padding: "11px 18px", background: C.red, color: "white", border: "none", fontFamily: F.m, fontSize: 10, letterSpacing: 1, cursor: "pointer", borderRadius: 4, display: "flex", alignItems: "center", gap: 4 }}>
                  <Plus size={12} />Add
                </button>
              </div>
            </div>
          )}
          {tab === 2 && (
            <div style={{ padding: "20px 24px" }}>
              <div style={{ fontSize: 12, color: "#aaa", fontStyle: "italic", marginBottom: 10 }}>Solution notes added after the call</div>
              <textarea value={card.solve} onChange={(e) => onU({ ...card, solve: e.target.value })} onClick={(e) => e.stopPropagation()}
                placeholder="Type solution notes..." style={{ width: "100%", minHeight: 100, padding: "14px 16px", border: `1px dashed ${C.borderP}`, background: "white", fontFamily: F.b, fontSize: 13.5, color: C.ink, resize: "vertical", borderRadius: 4, lineHeight: 1.6 }} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ── OFFER TABS ── */
function OfferTabs() {
  const [a, setA] = useState(0);
  const o = OFFERS[a];
  const tabs = ["Welcome Back", "Early Lock-In", "Spring Cleaning"];

  return (
    <div style={{ padding: "40px 48px", borderBottom: `1px solid ${C.borderP}` }}>
      <div style={{ fontFamily: F.m, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: C.red, marginBottom: 6 }}>04 - The Offer</div>
      <h2 style={{ fontFamily: F.d, fontSize: 24, marginBottom: 16, color: C.ink }}>3 Ways to Frame This</h2>
      <div style={{ display: "flex", borderBottom: `2px solid ${C.ink}` }}>
        {tabs.map((t, i) => (
          <div key={t} onClick={() => setA(i)} style={{
            padding: "12px 20px", fontFamily: F.m, fontSize: 11, letterSpacing: 1, cursor: "pointer",
            background: a === i ? C.ink : C.paperDk, color: a === i ? C.gold : C.muted,
            border: a === i ? `2px solid ${C.ink}` : `2px solid ${C.borderP}`, borderBottom: "none", marginRight: -1,
            fontWeight: a === i ? 700 : 400, textTransform: "uppercase", userSelect: "none",
            borderRadius: i === 0 ? "6px 0 0 0" : i === 2 ? "0 6px 0 0" : 0
          }}>{t}</div>
        ))}
      </div>
      <div style={{ background: "linear-gradient(135deg,#1a1a1a,#0a0a0a)", color: "white", border: "2px solid #333", borderTop: "none" }}>
        <div style={{ padding: "28px 36px 16px" }}>
          <div style={{ fontFamily: F.d, fontSize: 22, marginBottom: 4 }}>{o.name}</div>
          <div style={{ fontSize: 13, color: "#888", fontStyle: "italic" }}>{o.angle}</div>
        </div>
        {o.items.map((it, i) => (
          <div key={i} style={{ padding: "12px 36px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 14, alignItems: "baseline" }}>
            <span style={{ fontFamily: F.m, fontSize: 11, color: C.gold, flexShrink: 0 }}>{it.n}</span>
            <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.5 }}>
              <strong style={{ color: "white" }}>{it.t}</strong>
              {it.tag && <span style={{ display: "inline-block", background: it.g ? C.green : C.red, color: "white", fontFamily: F.m, fontSize: 8, letterSpacing: 1, padding: "2px 7px", marginLeft: 6, verticalAlign: "middle", textTransform: "uppercase" }}>{it.tag}</span>}
            </div>
          </div>
        ))}
        <div style={{ padding: "14px 36px", background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ color: "#555", fontSize: 11, fontFamily: F.m, margin: 0 }}>{o.foot}</p>
        </div>
      </div>
    </div>
  );
}

/* ── STATIC HTML SECTIONS ── */
const STATIC_01_03 = `<div style="background:#0a0a0a;color:#f5f0e8;padding:56px 48px 44px;position:relative"><div style="position:absolute;bottom:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#c4342d,#d4a843,#c4342d)"></div><div style="font-family:${F.m};font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#d4a843;margin-bottom:14px">Internal Strategy - All Volleyball</div><h1 style="font-family:${F.d};font-size:48px;line-height:1.05;letter-spacing:-1px;margin-bottom:16px;color:white">The <span style="color:#c4342d">"Welcome Back"</span><br>Revival Push</h1><p style="font-size:16px;color:#a09888;max-width:580px;line-height:1.55;margin:0">Early lock-in offer for past team/club customers. $103K excess inventory. 2026-2027 vendor decisions.</p><div style="margin-top:28px;display:flex;gap:28px;font-family:${F.m};font-size:11px;color:#666;letter-spacing:1px;flex-wrap:wrap"><span>April 2026</span><span>Teams &amp; Clubs</span><span>Email</span><span style="font-style:italic;color:#555">Potentially Ads</span></div></div><div style="padding:40px 48px;border-bottom:1px solid #c8bfb0"><div style="font-family:${F.m};font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c4342d;margin-bottom:6px">01 - The Plan</div><h2 style="font-family:${F.d};font-size:24px;margin-bottom:16px;color:#0a0a0a">What We're Proposing</h2><p style="font-size:15px;color:#3a352e;margin-bottom:14px;max-width:700px">$103K excess, 65% team essentials. Bundle as free add-ons. Early commit deal for 2026-2027.</p><div style="display:grid;grid-template-columns:repeat(4,1fr);border:2px solid #0a0a0a;margin:24px 0"><div style="padding:20px 16px;text-align:center;border-right:2px solid #0a0a0a"><div style="font-family:${F.d};font-size:32px;color:#c4342d;line-height:1;margin-bottom:4px">$103K</div><div style="font-family:${F.m};font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#6b6358">Excess</div></div><div style="padding:20px 16px;text-align:center;border-right:2px solid #0a0a0a"><div style="font-family:${F.d};font-size:32px;color:#c4342d;line-height:1;margin-bottom:4px">5,857</div><div style="font-family:${F.m};font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#6b6358">Units</div></div><div style="padding:20px 16px;text-align:center;border-right:2px solid #0a0a0a"><div style="font-family:${F.d};font-size:32px;color:#c4342d;line-height:1;margin-bottom:4px">65</div><div style="font-family:${F.m};font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#6b6358">SKUs</div></div><div style="padding:20px 16px;text-align:center"><div style="font-family:${F.d};font-size:32px;color:#c4342d;line-height:1;margin-bottom:4px">65%</div><div style="font-family:${F.m};font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#6b6358">Team</div></div></div><div style="background:#0a0a0a;color:#f5f0e8;padding:28px 32px;margin:24px 0;position:relative"><div style="position:absolute;left:0;top:0;bottom:0;width:4px;background:#c4342d"></div><div style="font-family:${F.d};font-size:17px;margin-bottom:14px;color:#d4a843">Two Big Ideas</div><div style="display:flex;gap:16px;margin-bottom:14px"><div style="font-family:${F.d};font-size:28px;color:#c4342d;line-height:1;width:32px;flex-shrink:0">1</div><div style="color:#c8bfb0;font-size:14px;line-height:1.65">Bundle excess as free player add-ons. $16.87/backpack, $45-65 perceived.</div></div><div style="display:flex;gap:16px"><div style="font-family:${F.d};font-size:28px;color:#c4342d;line-height:1;width:32px;flex-shrink:0">2</div><div style="color:#c8bfb0;font-size:14px;line-height:1.65">Early commitment, July 31 deadline. Free gear + discounts + priority production.</div></div></div><p style="font-size:15px;color:#3a352e;margin-bottom:14px"><strong>Best case:</strong> Influx of orders, inventory cleared, cash flow.</p><p style="font-size:15px;color:#3a352e;margin-bottom:0"><strong>Worst case:</strong> Low traction. Re-engaged customers, moved inventory, zero risk.</p></div><div style="padding:40px 48px;border-bottom:1px solid #c8bfb0"><div style="font-family:${F.m};font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c4342d;margin-bottom:6px">02 - Inventory</div><h2 style="font-family:${F.d};font-size:24px;margin-bottom:16px;color:#0a0a0a">What We're Sitting On</h2><table style="width:100%;border-collapse:collapse;font-size:13px"><thead><tr><th style="background:#0a0a0a;color:#f5f0e8;padding:10px 14px;text-align:left;font-family:${F.m};font-size:9px;letter-spacing:1.5px;text-transform:uppercase">Item</th><th style="background:#0a0a0a;color:#f5f0e8;padding:10px 14px;text-align:left;font-family:${F.m};font-size:9px;letter-spacing:1.5px">Units</th><th style="background:#0a0a0a;color:#f5f0e8;padding:10px 14px;text-align:left;font-family:${F.m};font-size:9px;letter-spacing:1.5px">Cost</th><th style="background:#0a0a0a;color:#f5f0e8;padding:10px 14px;text-align:left;font-family:${F.m};font-size:9px;letter-spacing:1.5px">Play</th></tr></thead><tbody><tr><td style="padding:10px 14px;border-bottom:1px solid #c8bfb0"><strong>Backpacks</strong></td><td style="padding:10px 14px;border-bottom:1px solid #c8bfb0;font-family:${F.m};font-weight:700;font-size:12px">1,128</td><td style="padding:10px 14px;border-bottom:1px solid #c8bfb0;font-family:${F.m};font-weight:700;font-size:12px;color:#c4342d">$21.8K</td><td style="padding:10px 14px;border-bottom:1px solid #c8bfb0">Free w/ packages. $16.87/bag.</td></tr><tr><td style="padding:10px 14px;border-bottom:1px solid #c8bfb0"><strong>Shorts</strong></td><td style="padding:10px 14px;border-bottom:1px solid #c8bfb0;font-family:${F.m};font-weight:700;font-size:12px">2,623</td><td style="padding:10px 14px;border-bottom:1px solid #c8bfb0;font-family:${F.m};font-weight:700;font-size:12px;color:#c4342d">$32.0K</td><td style="padding:10px 14px;border-bottom:1px solid #c8bfb0">Free practice shorts.</td></tr><tr><td style="padding:10px 14px;border-bottom:1px solid #c8bfb0"><strong>Kneepads</strong></td><td style="padding:10px 14px;border-bottom:1px solid #c8bfb0;font-family:${F.m};font-weight:700;font-size:12px">888</td><td style="padding:10px 14px;border-bottom:1px solid #c8bfb0;font-family:${F.m};font-weight:700;font-size:12px;color:#c4342d">$9.0K</td><td style="padding:10px 14px;border-bottom:1px solid #c8bfb0">Free w/ packages.</td></tr><tr><td style="padding:10px 14px;border-bottom:1px solid #c8bfb0"><strong>Shoes</strong></td><td style="padding:10px 14px;border-bottom:1px solid #c8bfb0;font-family:${F.m};font-weight:700;font-size:12px">427</td><td style="padding:10px 14px;border-bottom:1px solid #c8bfb0;font-family:${F.m};font-weight:700;font-size:12px;color:#c4342d">$22.4K</td><td style="padding:10px 14px;border-bottom:1px solid #c8bfb0">30-40% team discount.</td></tr><tr><td style="padding:10px 14px"><strong>Other</strong></td><td style="padding:10px 14px;font-family:${F.m};font-weight:700;font-size:12px">791</td><td style="padding:10px 14px;font-family:${F.m};font-weight:700;font-size:12px;color:#c4342d">$8.3K</td><td style="padding:10px 14px">Socks, sleeves, balls.</td></tr></tbody></table><div style="background:#2d6b4f;color:white;padding:24px 28px;margin:20px 0"><div style="font-family:${F.d};font-size:16px;margin-bottom:8px;color:#a8e6c8">The Math</div><p style="color:rgba(255,255,255,0.88);font-size:14px;line-height:1.6;margin:0">~$30-35/player bonus cost. $80-100+ perceived. 50 teams = ~$18K moved, $150-250K+ revenue.</p></div></div><div style="padding:40px 48px;border-bottom:1px solid #c8bfb0"><div style="font-family:${F.m};font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c4342d;margin-bottom:6px">03 - The Buyer</div><h2 style="font-family:${F.d};font-size:24px;margin-bottom:16px;color:#0a0a0a">Who We're Targeting</h2><div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:20px 0"><div style="background:#e8e0d2;padding:18px 20px"><div style="font-family:${F.d};font-size:13px;margin-bottom:6px;color:#1a3a5c">#1 Fear</div><div style="font-size:13px;color:#6b6358">Ordering late. No uniforms at first tournament.</div></div><div style="background:#e8e0d2;padding:18px 20px"><div style="font-family:${F.d};font-size:13px;margin-bottom:6px;color:#1a3a5c">#1 Desire</div><div style="font-size:13px;color:#6b6358">One vendor, one invoice. Everything handled.</div></div><div style="background:#e8e0d2;padding:18px 20px"><div style="font-family:${F.d};font-size:13px;margin-bottom:6px;color:#1a3a5c">Budget</div><div style="font-size:13px;color:#6b6358">Gear = 15-25% of $2.2-10.5K/season.</div></div><div style="background:#e8e0d2;padding:18px 20px"><div style="font-family:${F.d};font-size:13px;margin-bottom:6px;color:#1a3a5c">Timeline</div><div style="font-size:13px;color:#6b6358">Lock May-July. Scramble Aug-Oct.</div></div></div><p style="font-size:15px;color:#3a352e;margin-bottom:14px"><strong>Director:</strong> Budget, reliability, organized to board.</p><p style="font-size:15px;color:#3a352e;margin-bottom:0"><strong>Coach:</strong> Quality, identity. "Use these guys again."</p></div>`;

/* ── TIERS DATA ── */
const TIERS = [
  { n: "Single Team", r: "8-15 players", it: ["20% off CF", "Free backpack", "Free kneepads", "10% off equipment", "Spirit store"], b: [0] },
  { n: "Mid-Size Club", r: "3-10 teams", it: ["25% off CF", "Backpack+kneepads+shorts", "Spirit store +15%", "30% off shoes", "2-season lock", "Account manager", "Priority production"], b: [0, 3, 4], f: true },
  { n: "Large Club", r: "10+ teams", it: ["30% off CF", "Mid-size plus:", "40% off shoes", "Free training balls", "Profit-share", "Design consult", "Senior exec"], b: [0, 2, 3] }
];

/* ── DOCUMENT VIEW ── */
function DocView({ onBack }) {
  const [cards, setCards] = useState(makeIDS);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [last, setLast] = useState("");
  const st = useRef(null);

  useEffect(() => { sG(SK.ids).then((d) => { if (d && d.c) setCards(d.c); setLoaded(true); }); }, []);

  const save = useCallback((nc) => {
    if (st.current) clearTimeout(st.current);
    st.current = setTimeout(async () => { setSaving(true); await sS(SK.ids, { c: nc }); setLast(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })); setSaving(false); }, 800);
  }, []);

  async function manualSave() {
    setSaving(true);
    await sS(SK.ids, { c: cards });
    setLast(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    setSaving(false);
  }

  function upd(i, u) { const nc = cards.map((c, j) => j === i ? u : c); setCards(nc); save(nc); }

  if (!loaded) return <div style={{ padding: 80, textAlign: "center" }}><Loader2 size={20} color="#aaa" className="spin" /></div>;

  const tc = cards.reduce((a, c) => a + c.discuss.filter((d) => d.checked).length, 0);
  const tt = cards.reduce((a, c) => a + c.discuss.length, 0);
  const cd = cards.filter((c) => c.checked).length;

  return (
    <div style={{ background: C.paper, minHeight: "100vh" }}>
      <div style={{ padding: "12px 48px", background: "white", borderBottom: `1px solid ${C.borderP}`, display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 20 }}>
        <div onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", color: C.muted, fontSize: 13, padding: "6px 12px", borderRadius: 6 }}>
          <ChevronLeft size={16} />Back
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ fontFamily: F.m, fontSize: 10, color: saving ? "#aaa" : last ? C.green : "#ccc", letterSpacing: 1, marginRight: 12 }}>{saving ? "SAVING..." : last ? `SAVED ${last}` : "Not saved yet"}</div>
        <button onClick={manualSave} disabled={saving} style={{
          padding: "8px 20px", background: saving ? "#999" : C.green, color: "white", border: "none",
          borderRadius: 8, fontFamily: F.m, fontSize: 11, letterSpacing: 1, cursor: saving ? "default" : "pointer",
          display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s", fontWeight: 700
        }}>
          {saving ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <Check size={13} />}
          {saving ? "Saving" : "Save"}
        </button>
      </div>

      <div dangerouslySetInnerHTML={{ __html: STATIC_01_03 }} />
      <OfferTabs />

      {/* 05 TIERS */}
      <div style={{ padding: "40px 48px", borderBottom: `1px solid ${C.borderP}` }}>
        <div style={{ fontFamily: F.m, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: C.red, marginBottom: 6 }}>05 - Tiers</div>
        <h2 style={{ fontFamily: F.d, fontSize: 24, marginBottom: 16, color: C.ink }}>Scaled by Club Size</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, margin: "24px 0" }}>
          {TIERS.map((t, i) => (
            <div key={i} style={{ border: `2px solid ${t.f ? C.red : C.borderP}`, padding: 20, position: "relative", background: t.f ? "#fdf7f5" : "white", borderRadius: 4 }}>
              {t.f && <div style={{ position: "absolute", top: -10, left: 14, background: C.red, color: "white", fontFamily: F.m, fontSize: 9, letterSpacing: 2, padding: "2px 10px" }}>MOST CLUBS</div>}
              <div style={{ fontFamily: F.d, fontSize: 15, marginBottom: 3 }}>{t.n}</div>
              <div style={{ fontFamily: F.m, fontSize: 11, color: C.muted, marginBottom: 14 }}>{t.r}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {t.it.map((x, j) => <li key={j} style={{ padding: "5px 0", borderBottom: j < t.it.length - 1 ? `1px solid ${C.borderP}` : "none", fontSize: 13, color: "#3a352e" }}>{t.b && t.b.includes(j) ? <strong style={{ color: C.red }}>{x}</strong> : x}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", border: `2px solid ${C.ink}`, margin: "24px 0" }}>
          {[["~$180", "Per player"], ["~$2,400", "Per team"], ["$9-14K", "6-team club"]].map(([n, l], i) => (
            <div key={i} style={{ padding: "20px 16px", textAlign: "center", borderRight: i < 2 ? `2px solid ${C.ink}` : "none" }}>
              <div style={{ fontFamily: F.d, fontSize: 32, color: C.red, lineHeight: 1, marginBottom: 4 }}>{n}</div>
              <div style={{ fontFamily: F.m, fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: C.muted }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 06 IDS */}
      <div style={{ padding: "40px 48px", borderBottom: `1px solid ${C.borderP}` }}>
        <div style={{ fontFamily: F.m, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: C.red, marginBottom: 6 }}>06 - IDS</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ fontFamily: F.d, fontSize: 24, color: C.ink, margin: 0 }}>Identify, Discuss, Solve</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 100, height: 6, background: C.paperDk, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${tt > 0 ? (tc / tt) * 100 : 0}%`, height: "100%", background: C.green, transition: "width 0.3s" }} />
            </div>
            <span style={{ fontFamily: F.m, fontSize: 10, color: "#aaa" }}>{tc}/{tt} pts</span>
          </div>
        </div>
        {cards.map((c, i) => <IDSCard key={c.id} card={c} ix={i} onU={(u) => upd(i, u)} />)}
        <div style={{ marginTop: 12, fontSize: 14, color: "#3a352e" }}><strong>Team:</strong> Jerico (pages), Alvin (design), Ryan (email).</div>
      </div>

      <div style={{ background: C.ink, color: "#555", padding: "28px 48px", fontFamily: F.m, fontSize: 10, letterSpacing: 1 }}>All Volleyball, Inc. / Internal / April 2026</div>
    </div>
  );
}

/* ── TILES ── */
const TILE_DATA = [
  { id: "dashboard", label: "Dashboard", desc: "Performance overview", icon: LayoutDashboard, locked: true },
  { id: "campaigns", label: "Campaigns", desc: "Active campaigns", icon: Megaphone, locked: true },
  { id: "analytics", label: "Analytics", desc: "Deep dive metrics", icon: BarChart3, locked: true },
  { id: "creative", label: "Creative Hub", desc: "Assets & designs", icon: Palette, locked: true },
  { id: "email", label: "Email & Flows", desc: "Sequences & automations", icon: Mail, locked: true },
  { id: "inventory", label: "Inventory", desc: "Stock & movement", icon: Package, locked: true },
  { id: "planning", label: "Planning", desc: "Strategy & pushes", icon: Map, locked: false },
  { id: "team", label: "Team", desc: "Tasks & assignments", icon: Users, locked: true },
  { id: "settings", label: "Settings", desc: "Account & integrations", icon: Settings, locked: true },
];

/* ── MAIN APP ── */
export default function App() {
  const [auth, setAuth] = useState(false);
  const [view, setView] = useState("home");
  const [checking, setChecking] = useState(true);
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hov, setHov] = useState(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => { sG(SK.auth).then((d) => { if (d && d.ok) setAuth(true); setChecking(false); }); }, []);
  useEffect(() => { if (!checking) setTimeout(() => setMounted(true), 100); }, [checking]);

  async function login() {
    if (!pw) return;
    setPwLoading(true);
    setTimeout(async () => {
      if (pw === PW) { setAuth(true); await sS(SK.auth, { ok: true }); }
      else { setPwErr(true); setPwLoading(false); }
    }, 600);
  }

  async function logout() { setAuth(false); setView("home"); setMounted(false); setPw(""); await sS(SK.auth, { ok: false }); setTimeout(() => setMounted(true), 100); }

  if (checking) {
    return <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}><Loader2 size={20} color="#333" style={{ animation: "spin 1s linear infinite" }} /><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;
  }

  const styles = `
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes tileIn{from{opacity:0;transform:scale(0.9) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
    @keyframes pulseGlow{0%,100%{box-shadow:0 0 20px rgba(196,52,45,0.12)}50%{box-shadow:0 0 40px rgba(196,52,45,0.25)}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @keyframes slideR{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:${C.bg};font-family:${F.b};overflow-x:hidden}
    ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#333;border-radius:3px}
    textarea:focus,input:focus{outline:none}
  `;

  /* ── LOGIN ── */
  if (!auth) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", fontFamily: F.b }}>
        <style>{styles}</style>
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(196,52,45,0.2) 0%,transparent 70%)", filter: "blur(100px)", top: "30%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <div style={{ width: 400, padding: "56px 48px", background: "rgba(18,18,18,0.85)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", borderRadius: 22, border: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 1, opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Logo s={68} />
            <div style={{ fontFamily: F.d, fontSize: 12, color: "#555", letterSpacing: 5, textTransform: "uppercase", marginTop: 18 }}>Marketing Operations</div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <input type="password" value={pw} onChange={(e) => { setPw(e.target.value); setPwErr(false); }} onKeyDown={(e) => e.key === "Enter" && login()} placeholder="Password"
              style={{ width: "100%", padding: "16px 20px", background: "rgba(255,255,255,0.03)", border: `1px solid ${pwErr ? "rgba(196,52,45,0.6)" : "rgba(255,255,255,0.08)"}`, borderRadius: 12, color: "white", fontFamily: F.b, fontSize: 15, letterSpacing: 1 }} />
            {pwErr && <div style={{ color: C.red, fontSize: 12, marginTop: 8, fontFamily: F.m }}>Incorrect password</div>}
          </div>
          <button onClick={login} disabled={pwLoading || !pw} style={{ width: "100%", padding: "16px 0", background: pwLoading || !pw ? "rgba(196,52,45,0.4)" : C.red, color: "white", border: "none", borderRadius: 12, fontFamily: F.d, fontSize: 14, cursor: pwLoading || !pw ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {pwLoading && <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />}{pwLoading ? "Signing in" : "Sign In"}
          </button>
        </div>
      </div>
    );
  }

  /* ── TILE GRID ── */
  if (view === "home") {
    const hr = new Date().getHours();
    const greet = hr < 12 ? "morning" : hr < 18 ? "afternoon" : "evening";
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", fontFamily: F.b, color: "white" }}>
        <style>{styles}</style>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(196,52,45,0.05) 0%,transparent 70%)", filter: "blur(100px)", top: "-10%", right: "-5%" }} />
        <div style={{ padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}><Logo s={34} /><div><div style={{ fontFamily: F.d, fontSize: 13, letterSpacing: 1 }}>All Volleyball</div><div style={{ fontFamily: F.m, fontSize: 8, color: "#444", letterSpacing: 2, textTransform: "uppercase" }}>Marketing Ops</div></div></div>
          <div onClick={logout} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "8px 16px", borderRadius: 8, color: "#666" }}><LogOut size={14} /><span style={{ fontSize: 12, fontFamily: F.m, letterSpacing: 1 }}>Sign out</span></div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 10, padding: "0 40px 60px" }}>
          <div style={{ textAlign: "center", marginBottom: 52, opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(10px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
            <div style={{ fontFamily: F.d, fontSize: 30, marginBottom: 8 }}>Good {greet}</div>
            <div style={{ fontSize: 15, color: "#666" }}>What are we working on today?</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, maxWidth: 570 }}>
            {TILE_DATA.map((t, i) => {
              const Icon = t.icon;
              const active = !t.locked;
              const isHov = hov === t.id;
              return (
                <div key={t.id} onClick={() => active && setView("plan")} onMouseEnter={() => setHov(t.id)} onMouseLeave={() => setHov(null)}
                  style={{
                    width: 178, height: 178, borderRadius: 22, position: "relative", cursor: active ? "pointer" : "default",
                    background: active ? (isHov ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)") : "rgba(255,255,255,0.012)",
                    border: `1px solid ${active ? (isHov ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.05)") : "rgba(255,255,255,0.025)"}`,
                    boxShadow: active && isHov ? "0 16px 48px rgba(0,0,0,0.5)" : active ? "0 8px 32px rgba(0,0,0,0.3)" : "none",
                    transform: active && isHov ? "translateY(-8px) scale(1.03)" : "translateY(0) scale(1)",
                    transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                    animation: mounted ? `tileIn 0.55s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.06}s both` : "none",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, overflow: "hidden"
                  }}>
                  {active && <div style={{ position: "absolute", inset: 0, borderRadius: 22, animation: "pulseGlow 3s ease-in-out infinite", pointerEvents: "none" }} />}
                  {t.locked && <div style={{ position: "absolute", top: 14, right: 14 }}><Lock size={11} color="#333" /></div>}
                  <div style={{ width: 54, height: 54, borderRadius: 15, background: active ? "linear-gradient(135deg,#c4342d,#e8453e)" : "rgba(255,255,255,0.025)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: active ? "0 6px 20px rgba(196,52,45,0.3)" : "none" }}>
                    <Icon size={24} color={active ? "white" : "#333"} strokeWidth={1.5} />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: active ? "white" : "#555", marginBottom: 2 }}>{t.label}</div>
                    <div style={{ fontFamily: F.m, fontSize: 9, color: active ? "#666" : "#333", letterSpacing: 0.5 }}>{t.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 52, fontFamily: F.m, fontSize: 9, color: "#222", letterSpacing: 3, textTransform: "uppercase", opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease 1.2s" }}>Built by the AVB Marketing Team · v1.0</div>
        </div>
      </div>
    );
  }

  /* ── PLANNING HUB ── */
  if (view === "plan") {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, color: "white", position: "relative", overflow: "hidden", fontFamily: F.b }}>
        <style>{styles}</style>
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(196,52,45,0.04) 0%,transparent 70%)", filter: "blur(80px)", top: "15%", right: "-5%" }} />
        <div style={{ padding: "20px 40px", display: "flex", alignItems: "center", gap: 16, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div onClick={() => setView("home")} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", color: "#555", fontSize: 13, padding: "6px 14px", borderRadius: 8 }}><ChevronLeft size={16} />Home</div>
          <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.06)" }} />
          <span style={{ fontFamily: F.m, fontSize: 11, color: "#444", letterSpacing: 1 }}>Planning</span>
        </div>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "56px 40px", animation: "slideR 0.45s cubic-bezier(0.16,1,0.3,1)" }}>
          <div style={{ fontFamily: F.d, fontSize: 34, marginBottom: 8 }}>Planning</div>
          <div style={{ fontSize: 15, color: "#666", marginBottom: 36 }}>Strategy documents, offer plans, and campaign pushes.</div>
          <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 36 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
            <div style={{ padding: "28px 24px", borderRadius: 14, background: "rgba(255,255,255,0.012)", border: "1px solid rgba(255,255,255,0.025)", opacity: 0.4 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}><Plus size={20} color="#333" /><span style={{ fontFamily: F.m, fontSize: 8, letterSpacing: 2, color: "#333", textTransform: "uppercase", background: "rgba(255,255,255,0.04)", padding: "3px 10px", borderRadius: 6 }}>Coming soon</span></div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#555", marginBottom: 4 }}>Create New</div>
              <div style={{ fontSize: 12, color: "#333" }}>Start a new strategy document</div>
            </div>
            <div onClick={() => setShowList(true)} onMouseEnter={() => setHov("m")} onMouseLeave={() => setHov(null)}
              style={{ padding: "28px 24px", borderRadius: 14, cursor: "pointer", background: hov === "m" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.025)", border: `1px solid ${hov === "m" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"}`, transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}><Map size={20} color={C.red} /><span style={{ fontFamily: F.m, fontSize: 9, color: C.green, background: "rgba(45,107,79,0.15)", padding: "3px 12px", borderRadius: 8, letterSpacing: 1 }}>1 active</span></div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "white", marginBottom: 4 }}>Manage</div>
              <div style={{ fontSize: 12, color: "#666" }}>View and edit existing plans</div>
            </div>
          </div>
          {showList && (
            <div style={{ animation: "fadeUp 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
              <div style={{ fontFamily: F.m, fontSize: 10, letterSpacing: 3, color: "#333", textTransform: "uppercase", marginBottom: 16 }}>Active Plans</div>
              <div onClick={() => setView("doc")} onMouseEnter={() => setHov("d")} onMouseLeave={() => setHov(null)}
                style={{ padding: "28px 32px", borderRadius: 14, cursor: "pointer", background: hov === "d" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)", border: `1px solid ${hov === "d" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)"}`, boxShadow: hov === "d" ? "0 12px 40px rgba(0,0,0,0.3)" : "none", transform: hov === "d" ? "translateY(-3px)" : "translateY(0)", transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)", display: "flex", alignItems: "center", gap: 24 }}>
                <div style={{ width: 58, height: 58, borderRadius: 16, background: `linear-gradient(135deg,${C.red},${C.gold})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 6px 20px rgba(196,52,45,0.25)" }}><Map size={26} color="white" strokeWidth={1.5} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>The April 2026 Revival Push</div>
                  <div style={{ fontSize: 13, color: "#666" }}>Teams & Clubs reactivation · Excess inventory · Early lock-in</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                  <span style={{ fontFamily: F.m, fontSize: 9, letterSpacing: 1, color: C.green, background: "rgba(45,107,79,0.15)", padding: "4px 14px", borderRadius: 10, textTransform: "uppercase" }}>Active</span>
                  <ChevronRight size={18} color="#444" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── DOCUMENT ── */
  if (view === "doc") {
    return (
      <div style={{ fontFamily: F.b }}>
        <style>{styles}</style>
        <DocView onBack={() => setView("plan")} />
      </div>
    );
  }

  return null;
}
