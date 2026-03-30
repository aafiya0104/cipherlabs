import { useState, useEffect, useRef } from "react";
import { THEMES, TABS } from "../utils/constants";
import useAnimatedTheme from "../utils/tabs";
import CaesarPanel from "./CaesarCipher";
import FrequencyPanel from "./FrequencyAttack";
import AnagramPanel from "./AnagramFinder";
import LongestPanel from "./LongestWord";

function CipherLab() {
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

export default CipherLab;