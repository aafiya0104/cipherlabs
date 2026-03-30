import { useState } from "react";

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

export default FrequencyPanel;