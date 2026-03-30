import { useState } from "react";

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

export default LongestPanel;
