import { useState, useRef, useCallback } from "react";

const LOGO_B64 = "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fW5u7KeAMFMkbICe2QRXjH7In7Pt9+zX8LLnwnqGs2+uTy6pNqAubaBoVCukahdrMTkbDznvXt1FRzNKxbim7hXlT+DfiWf2g4/ES+MLYfDIab5DeGvK/fG62kebu2dM4ON/4V6rRSTsNq4h5rwv9m/9nW/+Bviv4oavea1batH4w1k6pDFBbtEbZS8zbGJY7j+9HIx0r3WimpNJpdROKbT7Hhuv/s732s/ta+Gvi+mtW8VhpOiyaW+lm3YyyMwmG8SbsAfvRxjsa4a8/YZsbv8AaqT4o/2zGvho3y63L4a8hsPqaxlRPu3bcbsSfdznIzg19V0VSqSWz6WJdOL6eZ4VY/s6X9p+1xqHxhOt2z6fdaGukjSvs7earAIN5k3Yx8nTHem/tP8A7OV/8fr74ez2Wt22jjwxraarKtxbtL9oUFDsXaw2n5epz1r3eijnldPsHJGzXc+XP2p/2J4f2ivHnh7xHaeIB4eMcA07XI1hZm1GyEqyCMFWGGHzjLZHKnHyiun+M/7M83xJ+JPwd8Q6Vqlnoum+Ab4XB09rZn86IPCVjjIYBMCHHIPUele+UUe0kra7B7OOum55j+0p8I7n46/BfxF4Is9Rh0m41QQhbyeIypHsmSQ5UEE5CEde9eReHPgh+0l4T8O6ZoemfGfwxDp2m2sVnaxv4TDlIo0CICxfJIAHJ619V0UKbirA4Ju5wnxi+Ht38Uvg/wCJvB6X8Vne6xpklj9tkiLIjsuC5QEEjPYGvPLX9k3S9X/ZU0z4OeKbuLUvsViII9Vt4NhhuFZmjnjViSCpbpnkbgeCa9+opKbSshuKbuzzr4CeCvFvw7+GmmeG/GXiG28U6lpq/Z4dUt4HiaWAAeWJAzMS6j5d2eQATzknyTxN+yf4u8K/FXxD4++D3xBj8H3viNvM1fR9X0/7dYzyZLGRRuBQ7iWxzgs2CAcV9QUUKbTb7g4JpLsfPf7P/wCy7qHw2+IniX4k+NfFp8afEDX4RbT3kVoLW2t4Rt+SOPJ7RxjPGAgAHUmp+0t+zR4q+L/xK8A+NPCXi3T/AAxqvhMTNA1/p7XYaR2UhtoYDACkYOetfR9FP2kubmF7OPLynh3wz8C/HXRPGdjeeNfifoPiTw3GsgudNsfDotJZSUIQiUMduG2k8cgYr3Giipb5tSkuXQKKKKkoKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q==";

const NAVY = "#333F48";
const STONE = "#B7B09C";
const STONE_LIGHT = "#F0EDE8";
const STONE_MID = "#DDD9D2";
const WHITE = "#FFFFFF";
const BG = "#F7F6F4";
const BORDER = "#E4E0DA";
const T1 = "#1A1F24";
const T2 = "#5C5A57";
const T3 = "#9A9690";

const PASS_BG = "#E8F0E8"; const PASS_BD = "#4A7C4A"; const PASS_T = "#1E4D1E";
const FAIL_BG = "#F5E8E5"; const FAIL_BD = "#A84232"; const FAIL_T = "#6B2318";
const NA_BG   = "#F0EDE8"; const NA_BD   = "#8A8278"; const NA_T   = "#4A4540";

const ITEMS = [
  ["1","Surface finish","Slab surface is smooth, trowelled to specification, free from ridges, tears, or trowel marks"],
  ["2","Level / fall","Surface level within tolerance (±10 mm) or correct fall to drainage where required per plans"],
  ["3","Cracks","No structural cracking present; any minor plastic shrinkage cracks within acceptable limits"],
  ["4","Edge profiles","Slab edges straight, formed to correct depth and profile, free from honeycombing or voids"],
  ["5","Rebate / step-downs","All rebates (garage, alfresco, wet areas) at correct depth and location per approved plans"],
  ["6","Holding down bolts","HD bolts correctly located, plumb, and at correct projection height per engineer's specification"],
  ["7","Service penetrations","All pipe and conduit penetrations in correct location; properly sealed around penetrations"],
  ["8","Cover to reinforcement","Reinforcement not visible at surface or edges; minimum cover maintained throughout"],
  ["9","Dimensional check","Slab dimensions (length, width, thickness) verified against approved drawings"],
];

function compressImage(file, maxW = 1200, quality = 0.75) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

const f = {
  wrap: { fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif", background: BG, minHeight: "100vh", color: T1 },
  bar: { background: NAVY, color: WHITE, padding: "12px 16px", position: "sticky", top: 0, zIndex: 50 },
  barRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  barLabel: { fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.55, fontWeight: 500 },
  barTitle: { fontSize: 16, fontWeight: 600, marginTop: 2, letterSpacing: "-0.01em" },
  barBtn: { background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: WHITE, padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer", touchAction: "manipulation", fontFamily: "inherit" },
  progWrap: { height: 2, background: "rgba(255,255,255,0.15)", marginTop: 10 },
  progFill: (pct) => ({ height: 2, background: STONE, width: pct + "%" , transition: "width 0.3s" }),
  progTxt: { fontSize: 11, opacity: 0.55, paddingTop: 5, paddingBottom: 10 },
  body: { padding: "20px 16px 48px" },
  logoWrap: { textAlign: "center", marginBottom: 28, paddingTop: 4 },
  logoImg: { width: "100%", maxWidth: 240, height: "auto" },
  tagline: { fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: STONE, marginTop: 6, fontWeight: 500 },
  card: { background: WHITE, borderRadius: 12, border: "1px solid " + BORDER, padding: "18px 16px", marginBottom: 12 },
  cardH: { fontSize: 11, fontWeight: 600, color: STONE, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 },
  field: { marginBottom: 12 },
  flabel: { display: "block", fontSize: 11, fontWeight: 600, color: T3, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 },
  finput: { width: "100%", padding: "12px 14px", fontSize: 14, border: "1.5px solid " + BORDER, borderRadius: 8, background: BG, color: T1, outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
  startBtn: { width: "100%", padding: 16, background: NAVY, color: WHITE, border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", touchAction: "manipulation", fontFamily: "inherit", letterSpacing: "0.02em" },
  icard: (r) => ({
    background: WHITE, borderBottom: "1px solid " + BORDER, padding: "16px",
    borderLeft: r === "PASS" ? "3px solid " + PASS_BD : r === "FAIL" ? "3px solid " + FAIL_BD : r === "NA" ? "3px solid " + NA_BD : "3px solid transparent",
  }),
  inum: { fontSize: 11, color: T3, fontWeight: 600, marginBottom: 3, letterSpacing: "0.04em" },
  iname: { fontSize: 15, fontWeight: 600, marginBottom: 4, color: T1, letterSpacing: "-0.01em" },
  ireq: { fontSize: 13, color: T2, lineHeight: 1.6, marginBottom: 14 },
  btnRow: { display: "flex", gap: 8, marginBottom: 14 },
  rbtn: (v, sel) => ({
    flex: 1, padding: "13px 4px", borderRadius: 8, fontSize: 13, fontWeight: 600,
    cursor: "pointer", touchAction: "manipulation", fontFamily: "inherit",
    border: sel === v
      ? ("1.5px solid " + (v === "PASS" ? PASS_BD : v === "FAIL" ? FAIL_BD : NA_BD))
      : ("1.5px solid " + BORDER),
    background: sel === v
      ? (v === "PASS" ? PASS_BG : v === "FAIL" ? FAIL_BG : NA_BG)
      : BG,
    color: sel === v
      ? (v === "PASS" ? PASS_T : v === "FAIL" ? FAIL_T : NA_T)
      : T3,
    display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
  }),
  notesLabel: { fontSize: 11, fontWeight: 600, color: T3, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5, display: "block" },
  textarea: { width: "100%", padding: "11px 12px", fontSize: 13, lineHeight: 1.6, border: "1.5px solid " + BORDER, borderRadius: 8, background: BG, color: T1, resize: "none", minHeight: 72, outline: "none", boxSizing: "border-box", fontFamily: "inherit", marginBottom: 12 },
  photoSection: { marginTop: 4 },
  photoBtn: { display: "inline-flex", alignItems: "center", gap: 8, background: STONE_LIGHT, border: "1.5px solid " + STONE_MID, borderRadius: 8, padding: "9px 14px", fontSize: 13, fontWeight: 600, color: NAVY, cursor: "pointer", touchAction: "manipulation" },
  photosRow: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 },
  thumbWrap: { position: "relative", display: "inline-block" },
  thumb: { width: 72, height: 72, objectFit: "cover", borderRadius: 8, border: "1.5px solid " + BORDER, display: "block" },
  thumbDel: { position: "absolute", top: -7, right: -7, width: 22, height: 22, background: NAVY, border: "2px solid " + WHITE, borderRadius: "50%", color: WHITE, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", touchAction: "manipulation" },
  sgrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 },
  sc: { background: WHITE, border: "1px solid " + BORDER, borderRadius: 12, padding: 14, textAlign: "center" },
  sv: (c) => ({ fontSize: 30, fontWeight: 700, color: c, letterSpacing: "-0.02em" }),
  sl: { fontSize: 10, color: T3, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginTop: 2 },
  verdict: (pass) => ({ borderRadius: 10, padding: "15px 16px", marginBottom: 18, border: "1.5px solid " + (pass ? PASS_BD : FAIL_BD), background: pass ? PASS_BG : FAIL_BG }),
  vl: (pass) => ({ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 3, color: pass ? PASS_T : FAIL_T }),
  vr: (pass) => ({ fontSize: 17, fontWeight: 700, color: pass ? PASS_T : FAIL_T, letterSpacing: "-0.01em" }),
  mcrd: { background: WHITE, border: "1px solid " + BORDER, borderRadius: 12, padding: "4px 16px", marginBottom: 18 },
  mrow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: "1px solid " + BORDER, fontSize: 13 },
  mrowLast: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", fontSize: 13 },
  mk: { color: T3, fontWeight: 500, fontSize: 12 },
  mv: { fontWeight: 600, textAlign: "right", maxWidth: "60%", fontSize: 13 },
  ecrd: { background: WHITE, border: "1.5px solid " + STONE_MID, borderRadius: 12, padding: "18px 16px", marginBottom: 14 },
  ecrdH: { fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 3, letterSpacing: "-0.01em" },
  ecrdSub: { fontSize: 12, color: T2, marginBottom: 14, lineHeight: 1.6 },
  genBtn: { width: "100%", padding: 15, background: NAVY, color: WHITE, border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", touchAction: "manipulation", fontFamily: "inherit", marginBottom: 10 },
  saveBtn: { width: "100%", padding: 14, background: STONE, color: WHITE, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", touchAction: "manipulation", fontFamily: "inherit", marginBottom: 10 },
  restartBtn: { width: "100%", padding: 13, background: "transparent", color: T2, border: "1.5px solid " + BORDER, borderRadius: 10, fontSize: 14, cursor: "pointer", touchAction: "manipulation", fontFamily: "inherit", marginBottom: 32 },
  ficard: { background: FAIL_BG, borderRadius: 8, padding: 13, marginBottom: 8, border: "1px solid " + FAIL_BD },
  fiNum: { fontSize: 10, color: FAIL_T, opacity: 0.7, fontWeight: 600, marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.06em" },
  fiName: { fontSize: 14, fontWeight: 600, color: FAIL_T },
  fiNote: { fontSize: 12, color: FAIL_T, marginTop: 4, lineHeight: 1.5, opacity: 0.85 },
  fiPhotos: { display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 },
  fiThumb: { width: 52, height: 52, objectFit: "cover", borderRadius: 6, border: "1px solid " + FAIL_BD },
  divider: { borderBottom: "1px solid " + BORDER, marginBottom: 16 },
  secH: { fontSize: 11, fontWeight: 700, color: T3, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 },
};

export default function App() {
  const [screen, setScreen] = useState("setup");
  const [meta, setMeta] = useState({ addr: "", job: "", ins: "", sup: "", sub: "" });
  const [savedMeta, setSavedMeta] = useState({});
  const [results, setResults] = useState({});
  const [notes, setNotes] = useState({});
  const [photos, setPhotos] = useState({});
  const fileRefs = useRef({});

  const done = Object.keys(results).length;
  const pct = Math.round(done / ITEMS.length * 100);

  const start = () => {
    const sm = { ...meta, date: new Date().toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" }), time: new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" }) };
    setSavedMeta(sm);
    setScreen("check");
  };

  const setR = useCallback((num, val) => setResults(r => ({ ...r, [num]: val })), []);

  const addPhotos = useCallback(async (num, files) => {
    const compressed = await Promise.all(Array.from(files).map(f => compressImage(f)));
    setPhotos(p => ({ ...p, [num]: [...(p[num] || []), ...compressed] }));
  }, []);

  const removePhoto = useCallback((num, idx) => {
    setPhotos(p => ({ ...p, [num]: p[num].filter((_, i) => i !== idx) }));
  }, []);

  const counts = () => {
    let p = 0, f = 0, na = 0, fi = [];
    ITEMS.forEach(([num, nm]) => {
      const r = results[num];
      if (r === "PASS") p++;
      else if (r === "FAIL") { f++; fi.push({ num, nm, note: notes[num] || "", ph: photos[num] || [] }); }
      else if (r === "NA") na++;
    });
    return { p, f, na, fi, out: ITEMS.length - p - f - na };
  };

  const generateEmail = () => {
    const { p, f, na, fi, out } = counts();
    const verdict = f === 0 && out === 0 ? "PASSED" : "REQUIRES RECTIFICATION";
    const subj = encodeURIComponent("Slab – Post Pour QA Inspection | " + savedMeta.addr + " | " + savedMeta.date);
    let body = "PACIFIC BLUE BUILDING\nSlab – Post Pour QA Inspection\n" + "=".repeat(44) + "\n\n";
    body += "Address:       " + savedMeta.addr + "\nJob Number:    " + savedMeta.job + "\nDate / Time:   " + savedMeta.date + ", " + savedMeta.time + "\nInspector:     " + savedMeta.ins + "\nSupervisor:    " + savedMeta.sup + "\nSubcontractor: " + savedMeta.sub + "\n\n";
    body += "OVERALL RESULT: " + verdict + "\n";
    body += "Pass: " + p + "  |  Fail: " + f + "  |  N/A: " + na + "  |  Outstanding: " + out + "\n" + "-".repeat(44) + "\n\n";
    if (fi.length) {
      body += "ITEMS REQUIRING RECTIFICATION\n\n";
      fi.forEach(x => { body += "[Item " + x.num + "] " + x.nm + "\n"; if (x.note) body += "  Note: " + x.note + "\n"; if (x.ph.length) body += "  Photos: " + x.ph.length + " image(s) — see attached PDF report\n"; body += "\n"; });
    }
    body += "\nPlease find the full inspection report (with photos) attached as a PDF.\n\nGenerated by Pacific Blue Building QA System.";
    window.location.href = "mailto:?subject=" + subj + "&body=" + encodeURIComponent(body);
  };

  const savePDF = () => {
    const { p, f, na, fi, out } = counts();
    const allPass = f === 0 && out === 0;
    const verdict = allPass ? "PASSED" : "REQUIRES RECTIFICATION";
    const vBg = allPass ? PASS_BG : FAIL_BG;
    const vCol = allPass ? PASS_T : FAIL_T;
    const vBd = allPass ? PASS_BD : FAIL_BD;

    let itemRows = "";
    ITEMS.forEach(([num, nm, rq]) => {
      const r = results[num] || "—";
      const nt = notes[num] || "";
      const ph = photos[num] || [];
      const rBg = r === "PASS" ? PASS_BG : r === "FAIL" ? FAIL_BG : r === "NA" ? NA_BG : "#fff";
      const rCol = r === "PASS" ? PASS_T : r === "FAIL" ? FAIL_T : r === "NA" ? NA_T : "#333";
      const photoHtml = ph.length ? '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">' + ph.map(src => '<img src="' + src + '" style="width:100%;max-width:480px;height:auto;border-radius:6px;border:1px solid #ddd;display:block;">').join("") + "</div>" : "";
      itemRows += '<tr><td style="padding:12px 14px;vertical-align:top;border-bottom:1px solid #e8e4de;">' +
        '<div style="font-size:10px;font-weight:700;color:#9A9690;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:3px;">Item ' + num + '</div>' +
        '<div style="font-size:13px;font-weight:700;color:#1A1F24;margin-bottom:4px;">' + nm + '</div>' +
        '<div style="font-size:12px;color:#5C5A57;line-height:1.55;margin-bottom:' + (nt || ph.length ? "8px" : "0") + '">' + rq + '</div>' +
        (nt ? '<div style="font-size:12px;color:#333;background:#f7f6f4;padding:8px 10px;border-radius:6px;border-left:3px solid #B7B09C;margin-bottom:' + (ph.length ? "8px" : "0") + '">' + nt + '</div>' : '') +
        photoHtml +
        '</td>' +
        '<td style="padding:12px 14px;vertical-align:top;text-align:center;border-bottom:1px solid #e8e4de;width:60px;">' +
        '<span style="display:inline-block;background:' + rBg + ';color:' + rCol + ';font-weight:700;font-size:11px;padding:4px 8px;border-radius:6px;border:1px solid ' + (r === "PASS" ? PASS_BD : r === "FAIL" ? FAIL_BD : r === "NA" ? NA_BD : "#ccc") + ';">' + r + '</span>' +
        '</td></tr>';
    });

    const html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Pacific Blue – Slab Post Pour QA</title>' +
      '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">' +
      '<style>*{box-sizing:border-box;}body{font-family:Poppins,Arial,sans-serif;margin:0;padding:0;background:#fff;color:#1A1F24;}' +
      '.hdr{background:#333F48;padding:20px 28px;display:flex;justify-content:space-between;align-items:center;}' +
      '.hdr img{height:36px;}' +
      '.hdr-right{text-align:right;color:rgba(255,255,255,0.6);font-size:11px;line-height:1.6;}' +
      '.body{padding:24px 28px;}' +
      '.meta{display:grid;grid-template-columns:1fr 1fr;gap:6px 28px;background:#F7F6F4;padding:14px 16px;border-radius:8px;margin-bottom:16px;font-size:12px;}' +
      '.meta-row{display:flex;gap:6px;}.meta-label{color:#9A9690;font-weight:500;white-space:nowrap;}.meta-val{font-weight:600;}' +
      '.verdict{padding:13px 16px;border-radius:8px;margin-bottom:16px;border:1.5px solid ' + vBd + ';background:' + vBg + ';}' +
      '.vl{font-size:10px;text-transform:uppercase;letter-spacing:0.1em;font-weight:700;color:' + vCol + ';margin-bottom:2px;}' +
      '.vr{font-size:18px;font-weight:700;color:' + vCol + ';}' +
      '.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px;}' +
      '.stat{background:#F7F6F4;padding:12px;border-radius:8px;text-align:center;}.stat-v{font-size:22px;font-weight:700;}.stat-l{font-size:10px;color:#9A9690;text-transform:uppercase;letter-spacing:0.07em;margin-top:2px;}' +
      'table{width:100%;border-collapse:collapse;}' +
      '.sigs{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:40px;}' +
      '.sig{border-top:1px solid #333;padding-top:6px;font-size:11px;color:#666;}' +
      '.footer{margin-top:24px;padding-top:12px;border-top:1px solid #E4E0DA;font-size:10px;color:#9A9690;text-align:center;}' +
      '@media print{body{padding:0;}button{display:none!important;}}</style></head><body>' +
      '<div class="hdr"><img src="data:image/jpeg;base64,' + LOGO_B64 + '" alt="Pacific Blue Building"><div class="hdr-right"><div>Slab – Post Pour QA Inspection</div><div>' + savedMeta.date + ' · ' + savedMeta.time + '</div></div></div>' +
      '<div class="body">' +
      '<div class="meta">' +
        '<div class="meta-row"><span class="meta-label">Address:</span><span class="meta-val">' + savedMeta.addr + '</span></div>' +
        '<div class="meta-row"><span class="meta-label">Job Number:</span><span class="meta-val">' + savedMeta.job + '</span></div>' +
        '<div class="meta-row"><span class="meta-label">Inspector:</span><span class="meta-val">' + savedMeta.ins + '</span></div>' +
        '<div class="meta-row"><span class="meta-label">Supervisor:</span><span class="meta-val">' + savedMeta.sup + '</span></div>' +
        '<div class="meta-row"><span class="meta-label">Subcontractor:</span><span class="meta-val">' + savedMeta.sub + '</span></div>' +
      '</div>' +
      '<div class="verdict"><div class="vl">Overall result</div><div class="vr">' + verdict + '</div></div>' +
      '<div class="stats">' +
        '<div class="stat"><div class="stat-v" style="color:' + PASS_T + '">' + p + '</div><div class="stat-l">Pass</div></div>' +
        '<div class="stat"><div class="stat-v" style="color:' + FAIL_T + '">' + f + '</div><div class="stat-l">Fail</div></div>' +
        '<div class="stat"><div class="stat-v" style="color:' + NA_T + '">' + na + '</div><div class="stat-l">N/A</div></div>' +
        '<div class="stat"><div class="stat-v">' + out + '</div><div class="stat-l">Outstanding</div></div>' +
      '</div>' +
      '<table><thead><tr style="background:#333F48;color:#fff;"><th style="padding:10px 14px;font-size:11px;text-align:left;font-weight:600;letter-spacing:0.04em;">Inspection item</th><th style="padding:10px 14px;font-size:11px;text-align:center;font-weight:600;letter-spacing:0.04em;width:60px;">Result</th></tr></thead><tbody>' + itemRows + '</tbody></table>' +
      '<div class="sigs"><div class="sig">Inspector signature &amp; date</div><div class="sig">Supervisor signature &amp; date</div></div>' +
      '<div class="footer">Pacific Blue Building · Design. Construct. Immerse · This report was generated by the Pacific Blue QA inspection system</div>' +
      '</div>' +
      '<script>window.onload=function(){window.print();}<\/script></body></html>';

    const w = window.open("", "_blank");
    w.document.write(html);
    w.document.close();
  };

  // ── SETUP SCREEN ──
  if (screen === "setup") return (
    <div style={f.wrap}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ background: NAVY, height: 8 }} />
      <div style={f.body}>
        <div style={f.logoWrap}>
          <img src={"data:image/jpeg;base64," + LOGO_B64} alt="Pacific Blue Building" style={f.logoImg} />
          <div style={f.tagline}>Quality Assurance Inspection</div>
        </div>

        <div style={f.card}>
          <div style={f.cardH}>Job details</div>
          {[["addr","Lot / Address","e.g. 14 Sunrise Ct, Noosa"],["job","Job number","e.g. PB-2024-047"]].map(([k,l,p]) => (
            <div key={k} style={f.field}>
              <label style={f.flabel}>{l}</label>
              <input style={f.finput} value={meta[k]} onChange={e => setMeta(m => ({...m,[k]:e.target.value}))} placeholder={p} />
            </div>
          ))}
        </div>

        <div style={f.card}>
          <div style={f.cardH}>Personnel</div>
          {[["ins","Inspector","e.g. Josh M"],["sup","Supervisor","e.g. Brett K"],["sub","Subcontractor / Concretor","e.g. Sunshine Coast Concrete"]].map(([k,l,p]) => (
            <div key={k} style={f.field}>
              <label style={f.flabel}>{l}</label>
              <input style={f.finput} value={meta[k]} onChange={e => setMeta(m => ({...m,[k]:e.target.value}))} placeholder={p} />
            </div>
          ))}
        </div>

        <button style={f.startBtn} onClick={start}>Begin inspection →</button>
      </div>
    </div>
  );

  // ── CHECKLIST SCREEN ──
  if (screen === "check") {
    const { p, f: fl, na } = counts();
    return (
      <div style={f.wrap}>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <div style={f.bar}>
          <div style={f.barRow}>
            <div>
              <div style={f.barLabel}>Pacific Blue Building</div>
              <div style={f.barTitle}>Slab – Post Pour QA</div>
            </div>
            <button style={f.barBtn} onClick={() => setScreen("sum")}>Finish ›</button>
          </div>
          <div style={f.progWrap}><div style={f.progFill(pct)} /></div>
          <div style={f.progTxt}>{done} of {ITEMS.length} items · {fl} fail · {p} pass</div>
        </div>

        {ITEMS.map(([num, nm, rq]) => {
          const sel = results[num];
          const ph = photos[num] || [];
          return (
            <div key={num} style={f.icard(sel)}>
              <div style={f.inum}>Item {num}</div>
              <div style={f.iname}>{nm}</div>
              <div style={f.ireq}>{rq}</div>

              <div style={f.btnRow}>
                {["PASS","FAIL","NA"].map(v => (
                  <button key={v} style={f.rbtn(v, sel)} onClick={() => setR(num, v)}>
                    {v === "PASS" ? "✓ Pass" : v === "FAIL" ? "✗ Fail" : "— N/A"}
                  </button>
                ))}
              </div>

              <label style={f.notesLabel}>Notes</label>
              <textarea
                style={f.textarea}
                placeholder="Add notes for this item…"
                value={notes[num] || ""}
                onChange={e => setNotes(n => ({...n,[num]:e.target.value}))}
              />

              <div style={f.photoSection}>
                <label style={f.notesLabel}>Photos</label>
                {ph.length > 0 && (
                  <div style={f.photosRow}>
                    {ph.map((src, i) => (
                      <div key={i} style={f.thumbWrap}>
                        <img src={src} alt="" style={f.thumb} />
                        <button style={f.thumbDel} onClick={() => removePhoto(num, i)}>×</button>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ marginTop: ph.length ? 10 : 0 }}>
                  <label style={f.photoBtn}>
                    📷 Add photo
                    <input type="file" accept="image/*" capture="environment" multiple style={{ display: "none" }}
                      onChange={e => { addPhotos(num, e.target.files); e.target.value = ""; }} />
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // ── SUMMARY SCREEN ──
  if (screen === "sum") {
    const { p, f: fl, na, fi, out } = counts();
    const allPass = fl === 0 && out === 0;
    return (
      <div style={f.wrap}>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <div style={f.bar}>
          <div style={f.barRow}>
            <div>
              <div style={f.barLabel}>Pacific Blue Building</div>
              <div style={f.barTitle}>Inspection Summary</div>
            </div>
            <button style={f.barBtn} onClick={() => setScreen("check")}>‹ Back</button>
          </div>
        </div>

        <div style={f.body}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 3 }}>Inspection complete</div>
          <div style={{ fontSize: 13, color: T2, marginBottom: 20 }}>{savedMeta.addr} · {savedMeta.date}</div>

          <div style={f.sgrid}>
            <div style={f.sc}><div style={f.sv(PASS_T)}>{p}</div><div style={f.sl}>Pass</div></div>
            <div style={f.sc}><div style={f.sv(FAIL_T)}>{fl}</div><div style={f.sl}>Fail</div></div>
            <div style={f.sc}><div style={f.sv(NA_T)}>{na}</div><div style={f.sl}>N/A</div></div>
            <div style={f.sc}><div style={f.sv(T1)}>{out}</div><div style={f.sl}>Outstanding</div></div>
          </div>

          <div style={f.verdict(allPass)}>
            <div style={f.vl(allPass)}>Overall result</div>
            <div style={f.vr(allPass)}>{allPass ? "Passed — ready for next stage" : fl > 0 ? fl + " item" + (fl > 1 ? "s" : "") + " require rectification" : out + " item" + (out > 1 ? "s" : "") + " outstanding"}</div>
          </div>

          {fi.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={f.secH}>Items requiring rectification</div>
              {fi.map(x => (
                <div key={x.num} style={f.ficard}>
                  <div style={f.fiNum}>Item {x.num}</div>
                  <div style={f.fiName}>{x.nm}</div>
                  {x.note && <div style={f.fiNote}>{x.note}</div>}
                  {x.ph.length > 0 && <div style={f.fiPhotos}>{x.ph.map((s, i) => <img key={i} src={s} alt="" style={f.fiThumb} />)}</div>}
                </div>
              ))}
            </div>
          )}

          <div style={f.mcrd}>
            {[["Address", savedMeta.addr],["Job number", savedMeta.job],["Inspector", savedMeta.ins],["Supervisor", savedMeta.sup],["Subcontractor", savedMeta.sub],["Date / time", savedMeta.date + ", " + savedMeta.time]].map(([k, v], i, arr) => (
              <div key={k} style={i < arr.length - 1 ? f.mrow : f.mrowLast}>
                <span style={f.mk}>{k}</span><span style={f.mv}>{v}</span>
              </div>
            ))}
          </div>

          <div style={f.ecrd}>
            <div style={f.ecrdH}>Send &amp; save report</div>
            <div style={f.ecrdSub}>Save the PDF report first (with full-size photos embedded), then generate the email — Outlook will open with the subject and summary pre-filled, ready for you to attach the PDF.</div>
            <button style={f.saveBtn} onClick={savePDF}>① Save PDF report</button>
            <button style={f.genBtn} onClick={generateEmail}>② Generate email in Outlook</button>
          </div>

          <button style={f.restartBtn} onClick={() => { setResults({}); setNotes({}); setPhotos({}); setScreen("setup"); }}>Start new inspection</button>
        </div>
      </div>
    );
  }
}
