import { useState } from "react";

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

export default AnagramPanel;
