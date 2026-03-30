import { useState, useEffect, useRef } from "react";

const THEMES = {
  caesar: {
    bg1: "#e2dcff",
    bg2: "#ffd6f0",
    bg3: "#d4f0ff",
    bgBase: "#f0eeff",
    shadow1: "#c9b8ff",
    shadow2: "#b8a6f0",
    shadow3: "#a594e0",
    btnFrom: "#8b5cf6",
    btnTo: "#ec4899",
    btnShadow: "#6d28d9",
    accent: "#9580d0",
    inputBg: "#f5f0ff",
    inputBorder: "#ddd4ff",
    inputShadow: "#c4b5fd",
    focusBorder: "#a78bfa",
    focusShadow: "#7c3aed",
    focusRing: "rgba(167,139,250,0.2)",
    divider: "#e9d5ff",
    outputBorder: "#e9d5ff",
    outputText: "#5b21b6",
    titleColor: "#2d1b69",
    iconFrom: "#a78bfa",
    iconTo: "#ec4899",
    iconShadow: "#7c3aed",
    copyColor: "#a78bfa",
    copyBg: "#ede9fe",
    copyShadow: "#c4b5fd",
    freqBar: "#a78bfa",
  },
  frequency: {
    bg1: "#d4f5e9",
    bg2: "#d0f0ff",
    bg3: "#fffbd0",
    bgBase: "#eefaf4",
    shadow1: "#9fe8c8",
    shadow2: "#7dd8b0",
    shadow3: "#5ec898",
    btnFrom: "#10b981",
    btnTo: "#0ea5e9",
    btnShadow: "#059669",
    accent: "#5daa8a",
    inputBg: "#f0fdf8",
    inputBorder: "#a7f3d0",
    inputShadow: "#6ee7b7",
    focusBorder: "#34d399",
    focusShadow: "#059669",
    focusRing: "rgba(52,211,153,0.2)",
    divider: "#a7f3d0",
    outputBorder: "#a7f3d0",
    outputText: "#065f46",
    titleColor: "#064e3b",
    iconFrom: "#34d399",
    iconTo: "#0ea5e9",
    iconShadow: "#059669",
    copyColor: "#059669",
    copyBg: "#d1fae5",
    copyShadow: "#6ee7b7",
    freqBar: "#10b981",
  },
  anagram: {
    bg1: "#ffecd4",
    bg2: "#ffe0f0",
    bg3: "#fff3cc",
    bgBase: "#fff8f0",
    shadow1: "#ffc89a",
    shadow2: "#ffb07a",
    shadow3: "#ff9a5a",
    btnFrom: "#f97316",
    btnTo: "#ec4899",
    btnShadow: "#c2410c",
    accent: "#c07040",
    inputBg: "#fff7ed",
    inputBorder: "#fed7aa",
    inputShadow: "#fdba74",
    focusBorder: "#fb923c",
    focusShadow: "#c2410c",
    focusRing: "rgba(251,146,60,0.2)",
    divider: "#fed7aa",
    outputBorder: "#fed7aa",
    outputText: "#7c2d12",
    titleColor: "#431407",
    iconFrom: "#fb923c",
    iconTo: "#f43f5e",
    iconShadow: "#c2410c",
    copyColor: "#ea580c",
    copyBg: "#ffedd5",
    copyShadow: "#fdba74",
    freqBar: "#f97316",
  },
  longest: {
    bg1: "#dbeafe",
    bg2: "#e0e7ff",
    bg3: "#f0f9ff",
    bgBase: "#eef4ff",
    shadow1: "#bfdbfe",
    shadow2: "#a5c4fd",
    shadow3: "#8baefb",
    btnFrom: "#3b82f6",
    btnTo: "#6366f1",
    btnShadow: "#1d4ed8",
    accent: "#5070c0",
    inputBg: "#eff6ff",
    inputBorder: "#bfdbfe",
    inputShadow: "#93c5fd",
    focusBorder: "#60a5fa",
    focusShadow: "#1d4ed8",
    focusRing: "rgba(96,165,250,0.2)",
    divider: "#bfdbfe",
    outputBorder: "#bfdbfe",
    outputText: "#1e3a8a",
    titleColor: "#1e3a8a",
    iconFrom: "#60a5fa",
    iconTo: "#818cf8",
    iconShadow: "#1d4ed8",
    copyColor: "#2563eb",
    copyBg: "#dbeafe",
    copyShadow: "#93c5fd",
    freqBar: "#3b82f6",
  },
};

const TABS = [
  { id: "caesar", icon: "🔐", label: "Caesar" },
  { id: "frequency", icon: "📊", label: "Frequency" },
  { id: "anagram", icon: "🔤", label: "Anagram" },
  { id: "longest", icon: "📏", label: "Longest" },
];

function useAnimatedTheme(activeTab) {
  const [theme, setTheme] = useState(THEMES[activeTab]);
  const [fading, setFading] = useState(false);
  const prev = useRef(activeTab);

  useEffect(() => {
    if (prev.current === activeTab) return;
    prev.current = activeTab;
    setFading(true);
    const t = setTimeout(() => {
      setTheme(THEMES[activeTab]);
      setFading(false);
    }, 90);
    return () => clearTimeout(t);
  }, [activeTab]);

  return { theme, fading };
}

function CaesarPanel() {
  const [text, setText] = useState("");
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState("encrypt");
  const [output, setOutput] = useState("");
  const [ran, setRan] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value;
    setText(value);
    setRan(false);
  };

  const handleKeyChange = (e) => {
    let key = e.target.value;
    setShift(Number(key));
    setRan(false);
  };

  const handleToggle = (e) => {
    setMode(e.target.value);
    setRan(false);
  };

  const handleEncryptDecrypt = (text, shift, mode) => {
    let result = "";

    shift = Number(shift);
    shift = ((shift % 26) + 26) % 26;

    for (let i = 0; i < text.length; i++) {
      let char = text[i];

      if (!/[a-zA-Z]/.test(char)) {
        result += char;
        continue;
      }

      let base = char >= "a" && char <= "z" ? 97 : 65;
      let charCode = char.charCodeAt(0) - base;

      if (mode === "encrypt") {
        charCode = (charCode + shift) % 26;
      } else {
        charCode = (charCode - shift + 26) % 26;
      }

      result += String.fromCharCode(charCode + base);
    }

    return result;
  };

  const run = () => {
    let cleanedText = text.trim().replace(/[^a-zA-Z]/g, "");

    if (!cleanedText) return;

    const result = handleEncryptDecrypt(cleanedText, shift, mode);
    console.log(result);
    setOutput(result);
    setRan(true);
  };

  return (
    <>
      <div className="field-group">
        <div className="field-label">Your message</div>
        <textarea
          className="inp"
          rows={3}
          placeholder="Type something..."
          value={text}
          onChange={handleChange}
        />
      </div>
      <div className="row-2col">
        <div className="field-group">
          <div className="field-label">Shift key</div>
          <input
            className="inp"
            type="number"
            min={1}
            max={25}
            value={shift}
            onChange={handleKeyChange}
          />
        </div>
        <div className="field-group">
          <div className="field-label">Mode</div>
          <select className="inp sel" value={mode} onChange={handleToggle}>
            <option value="encrypt">Encode</option>
            <option value="decrypt">Decode</option>
          </select>
        </div>
      </div>
      <button className="run-btn" onClick={run}>
        {mode === "encrypt" ? "Encrypt →" : "Decrypt →"}
      </button>
      {ran && output && (
        <>
          <div className="divider" />
          <div className="field-group">
            <div className="out-header">
              <div className="field-label" style={{ marginBottom: 0 }}>
                {mode === "encrypt" ? "Encrypted" : "Decrypted"}
              </div>
              <button
                className="copy-btn"
                onClick={() => navigator.clipboard.writeText(output)}
              >
                Copy
              </button>
            </div>
            <div className="out-box">
              <div className="out-text">{output}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ─── TODO: implement frequency analysis ──────────────────────────────────────
function FrequencyPanel() {
  const [text, setText] = useState(
    "Wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj.",
  );
  const [result, setResult] = useState(null);

  const run = () => {
    // TODO: implement frequency analysis
    // setResult({ sorted, total, guessShift, decoded, max });
  };

  return (
    <>
      <div className="field-group">
        <div className="field-label">Ciphertext to analyze</div>
        <textarea
          className="inp"
          rows={3}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setResult(null);
          }}
        />
      </div>
      <button className="run-btn" onClick={run}>
        Analyze Frequencies →
      </button>
      {result && (
        <>
          <div className="divider" />
          <div className="row-3col">
            {[
              ["Letters", result.total],
              ["Unique", result.sorted.length],
              ["Shift", result.guessShift],
            ].map(([l, v]) => (
              <div className="stat-card" key={l}>
                <div className="stat-val">{v}</div>
                <div className="stat-lbl">{l}</div>
              </div>
            ))}
          </div>
          <div className="field-group">
            <div className="field-label">Top frequencies</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {result.sorted.slice(0, 6).map(({ c, f }) => (
                <div
                  key={c}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 13,
                      fontWeight: 700,
                      width: 16,
                    }}
                  >
                    {c}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 8,
                      background: "var(--inputBorder)",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: 8,
                        background: "var(--freqBar)",
                        borderRadius: 4,
                        width: `${Math.round((f / result.max) * 100)}%`,
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--accent)",
                      minWidth: 28,
                      textAlign: "right",
                    }}
                  >
                    {Math.round((f / result.total) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="field-group">
            <div className="out-header">
              <div className="field-label" style={{ marginBottom: 0 }}>
                Guessed decryption
              </div>
              <button
                className="copy-btn"
                onClick={() => navigator.clipboard.writeText(result.decoded)}
              >
                Copy
              </button>
            </div>
            <div className="out-box">
              <div className="out-text">{result.decoded}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ─── TODO: implement sliding window anagram finder ────────────────────────────
function AnagramPanel() {
  const [text, setText] = useState("cbaebaabcdabcd");
  const [pattern, setPattern] = useState("abc");
  const [result, setResult] = useState(null);

  const run = () => {
    // TODO: implement anagram finder
    // setResult({ matches, k: pattern.length });
  };

  const matchSet = result
    ? new Set(
        result.matches.flatMap((s) =>
          Array.from({ length: result.k }, (_, i) => s + i),
        ),
      )
    : new Set();

  return (
    <>
      <div className="field-group">
        <div className="field-label">Text to search in</div>
        <input
          className="inp"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setResult(null);
          }}
          placeholder="Search text..."
        />
      </div>
      <div className="field-group">
        <div className="field-label">Find anagrams of</div>
        <input
          className="inp"
          value={pattern}
          onChange={(e) => {
            setPattern(e.target.value);
            setResult(null);
          }}
          placeholder="Pattern..."
        />
      </div>
      <button className="run-btn" onClick={run}>
        Find Anagrams →
      </button>
      {result && (
        <>
          <div className="divider" />
          <div className="field-group">
            <div className="field-label">
              {result.matches.length
                ? `${result.matches.length} match${result.matches.length > 1 ? "es" : ""} at: ${result.matches.join(", ")}`
                : "No anagrams found"}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginTop: 10,
              }}
            >
              {text.split("").map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "monospace",
                    fontSize: 13,
                    fontWeight: 700,
                    borderRadius: 8,
                    border: `2px solid ${matchSet.has(i) ? "var(--focusBorder)" : "var(--inputBorder)"}`,
                    background: matchSet.has(i)
                      ? "var(--inputBg)"
                      : "transparent",
                    color: matchSet.has(i)
                      ? "var(--titleColor)"
                      : "var(--accent)",
                    transition: "all 0.2s",
                  }}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ─── TODO: implement decode + longest word finder ─────────────────────────────
function LongestPanel() {
  const [encoded, setEncoded] = useState(
    "Wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj",
  );
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState(null);

  const run = () => {
    // TODO: implement decode + longest word logic
    // setResult({ decoded, maxWord, maxLen, wordCount, words });
  };

  return (
    <>
      <div className="field-group">
        <div className="field-label">Encoded sentence</div>
        <textarea
          className="inp"
          rows={3}
          value={encoded}
          onChange={(e) => {
            setEncoded(e.target.value);
            setResult(null);
          }}
        />
      </div>
      <div className="field-group">
        <div className="field-label">Decode with shift</div>
        <input
          className="inp"
          type="number"
          min={1}
          max={25}
          value={shift}
          onChange={(e) => {
            setShift(e.target.value);
            setResult(null);
          }}
        />
      </div>
      <button className="run-btn" onClick={run}>
        Find Longest Word →
      </button>
      {result && (
        <>
          <div className="divider" />
          <div className="row-3col">
            {[
              ["Words", result.wordCount],
              ["Longest", result.maxLen + " ch"],
              ["Winner", `"${result.maxWord}"`],
            ].map(([l, v]) => (
              <div className="stat-card" key={l}>
                <div
                  className="stat-val"
                  style={{ fontSize: v.length > 7 ? 13 : 20 }}
                >
                  {v}
                </div>
                <div className="stat-lbl">{l}</div>
              </div>
            ))}
          </div>
          <div className="field-group">
            <div className="field-label">Decoded — longest highlighted</div>
            <div className="out-box" style={{ lineHeight: 1.9 }}>
              {result.words.map((w, i) => (
                <span key={i}>
                  {w.toLowerCase() === result.maxWord.toLowerCase() ? (
                    <mark
                      style={{
                        background: "var(--inputBorder)",
                        color: "var(--titleColor)",
                        borderRadius: 4,
                        padding: "1px 4px",
                        fontWeight: 800,
                      }}
                    >
                      {w}
                    </mark>
                  ) : (
                    <span style={{ color: "var(--outputText)" }}>{w}</span>
                  )}
                  {i < result.words.length - 1 ? " " : ""}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default function CipherLab() {
  const [activeTab, setActiveTab] = useState("caesar");
  const { theme: t, fading } = useAnimatedTheme(activeTab);

  const v = {
    "--accent": t.accent,
    "--inputBg": t.inputBg,
    "--inputBorder": t.inputBorder,
    "--inputShadow": t.inputShadow,
    "--focusBorder": t.focusBorder,
    "--focusShadow": t.focusShadow,
    "--focusRing": t.focusRing,
    "--dividerColor": t.divider,
    "--outputBorder": t.outputBorder,
    "--outputText": t.outputText,
    "--titleColor": t.titleColor,
    "--copyColor": t.copyColor,
    "--copyBg": t.copyBg,
    "--copyShadow": t.copyShadow,
    "--freqBar": t.freqBar,
    "--btnFrom": t.btnFrom,
    "--btnTo": t.btnTo,
    "--btnShadow": t.btnShadow,
    "--iconFrom": t.iconFrom,
    "--iconTo": t.iconTo,
    "--iconShadow": t.iconShadow,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; width: 100%; font-family: 'Nunito', sans-serif; }

        .page {
          min-height: 100vh; min-width: 100vw;
          display: flex; align-items: center; justify-content: center;
          padding: 2rem; background-attachment: fixed;
          transition: background 0.65s ease, opacity 0.1s ease;
        }

        .card {
          width: 100%; max-width: 420px;
          background: #fff; border-radius: 32px;
          padding: 18px 30px 24px;
          display: flex; flex-direction: column; gap: 16px;
          border: 2px solid rgba(255,255,255,0.9);
          position: relative;
          transition: box-shadow 0.55s ease;
        }
        .card::before {
          content: ''; position: absolute; inset: 2px; border-radius: 30px;
          background: linear-gradient(160deg, rgba(255,255,255,0.8) 0%, transparent 60%);
          pointer-events: none; z-index: 1;
        }
        .card > * { position: relative; z-index: 2; }

        .tabs-row {
          display: grid; grid-template-columns: repeat(4, 1fr);
          border-radius: 18px; overflow: hidden;
          border: 2px solid var(--inputBorder);
          transition: border-color 0.55s ease;
        }
        .tab-btn {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 3px; padding: 8px 4px;
          font-family: 'Nunito', sans-serif; font-size: 11px; font-weight: 800;
          border: none; cursor: pointer;
          transition: background 0.45s ease, color 0.45s ease;
          background: var(--inputBg); color: var(--accent);
          border-right: 1px solid var(--inputBorder);
        }
        .tab-btn:last-child { border-right: none; }
        .tab-icon { font-size: 14px; line-height: 1; }
        .tab-btn.on {
          background: linear-gradient(135deg, var(--btnFrom), var(--btnTo));
          color: #fff;
        }
        .tab-btn:not(.on):hover { filter: brightness(0.97); }

        .title-row { display: flex; align-items: center; justify-content: center; gap: 12px; }
        .icon-box {
          width: 44px; height: 44px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0;
          background: linear-gradient(135deg, var(--iconFrom), var(--iconTo));
          box-shadow: 0 3px 0 var(--iconShadow);
          transition: background 0.55s ease, box-shadow 0.55s ease;
        }
        .card-title {
          font-size: 20px; font-weight: 900; letter-spacing: -0.3px;
          color: var(--titleColor); transition: color 0.55s ease;
        }

        .field-label {
          font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;
          margin-bottom: 9px; color: var(--accent); transition: color 0.55s ease;
        }
        .field-group { display: flex; flex-direction: column; gap: 0; }

        .panel-inner { display: flex; flex-direction: column; gap: 16px; }

        .inp {
          width: 100%; font-family: 'Nunito', sans-serif;
          font-size: 14px; font-weight: 600; color: var(--titleColor);
          background: var(--inputBg); border: 2px solid var(--inputBorder); border-radius: 16px;
          padding: 12px 16px; outline: none; resize: none; appearance: none; -webkit-appearance: none;
          box-shadow: 0 3px 0 var(--inputShadow), inset 0 2px 4px rgba(0,0,0,0.03);
          transition: background 0.45s ease, border-color 0.45s ease, box-shadow 0.3s ease, transform 0.15s ease;
        }
        .inp::placeholder { color: var(--inputShadow); font-weight: 600; }
        .inp:focus {
          border-color: var(--focusBorder); background: #fff;
          box-shadow: 0 3px 0 var(--focusShadow), 0 0 0 3px var(--focusRing), inset 0 2px 4px rgba(0,0,0,0.03);
          transform: translateY(-1px);
        }
        .sel {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px;
        }

        .row-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .row-3col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }

        .run-btn {
          width: 100%; padding: 14px 0;
          font-family: 'Nunito', sans-serif; font-size: 15px; font-weight: 900;
          color: #fff; border: none; border-radius: 18px; cursor: pointer; letter-spacing: 0.3px;
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, var(--btnFrom), var(--btnTo));
          box-shadow: 0 4px 0 var(--btnShadow);
          transition: background 0.55s ease, box-shadow 0.55s ease, transform 0.15s ease;
        }
        .run-btn::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 50%;
          background: rgba(255,255,255,0.12); border-radius: 18px 18px 0 0; pointer-events: none;
        }
        .run-btn:hover { transform: translateY(-2px); filter: brightness(1.05); }
        .run-btn:active { transform: translateY(3px); box-shadow: 0 1px 0 var(--btnShadow); }

        .divider {
          height: 1.5px; border-radius: 99px;
          background: linear-gradient(90deg, transparent, var(--dividerColor), transparent);
          transition: background 0.55s ease;
        }

        .out-box {
          background: var(--inputBg); border: 2px solid var(--outputBorder);
          border-radius: 16px; padding: 16px 18px; min-height: 52px;
          box-shadow: inset 0 2px 5px rgba(0,0,0,0.03);
          animation: popIn 0.28s cubic-bezier(0.34,1.56,0.64,1);
          transition: background 0.45s ease, border-color 0.45s ease;
        }
        .out-text {
          font-size: 14px; font-weight: 700; word-break: break-all; line-height: 1.7;
          color: var(--outputText); transition: color 0.45s ease;
        }
        .out-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 9px; }

        .copy-btn {
          font-family: 'Nunito', sans-serif; font-size: 11px; font-weight: 800;
          border: none; border-radius: 8px; padding: 4px 12px; cursor: pointer;
          color: var(--copyColor); background: var(--copyBg); box-shadow: 0 2px 0 var(--copyShadow);
          transition: background 0.45s ease, color 0.45s ease, transform 0.15s;
        }
        .copy-btn:hover { filter: brightness(0.95); transform: translateY(-1px); }
        .copy-btn:active { transform: translateY(1px); box-shadow: none; }

        .stat-card {
          background: var(--inputBg); border-radius: 14px; padding: 14px 8px;
          text-align: center; border: 2px solid var(--inputBorder);
          transition: background 0.45s ease, border-color 0.45s ease;
        }
        .stat-val { font-size: 20px; font-weight: 900; color: var(--titleColor); transition: color 0.45s ease; }
        .stat-lbl { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent); margin-top: 4px; }

        @keyframes popIn {
          from { transform: scale(0.96); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
        .panel-in { animation: panelSlide 0.22s cubic-bezier(0.34,1.3,0.64,1); }
        @keyframes panelSlide {
          from { transform: translateY(6px); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
      `}</style>

      <div
        className="page"
        style={{
          ...v,
          background: `
            radial-gradient(ellipse at 20% 20%, ${t.bg1} 0%, transparent 55%),
            radial-gradient(ellipse at 80% 80%, ${t.bg2} 0%, transparent 55%),
            radial-gradient(ellipse at 60% 10%, ${t.bg3} 0%, transparent 45%),
            ${t.bgBase}
          `,
          opacity: fading ? 0.82 : 1,
        }}
      >
        <div
          className="card"
          style={{
            boxShadow: `
              0 2px 0 ${t.shadow1},
              0 4px 0 ${t.shadow2},
              0 8px 0 ${t.shadow3},
              0 14px 0 ${t.shadow3}38,
              0 22px 40px ${t.shadow3}22
            `,
          }}
        >
          <div className="tabs-row">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn${activeTab === tab.id ? " on" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="title-row">
            <div className="icon-box">
              {TABS.find((x) => x.id === activeTab)?.icon}
            </div>
            <div className="card-title">
              {
                {
                  caesar: "Caesar Cipher",
                  frequency: "Freq. Attack",
                  anagram: "Anagram Finder",
                  longest: "Longest Word",
                }[activeTab]
              }
            </div>
          </div>

          <div className="divider" />

          <div key={activeTab} className="panel-in">
            <div className="panel-inner">
              {activeTab === "caesar" && <CaesarPanel />}
              {activeTab === "frequency" && <FrequencyPanel />}
              {activeTab === "anagram" && <AnagramPanel />}
              {activeTab === "longest" && <LongestPanel />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
