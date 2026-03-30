import { useState } from "react";

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

export default CaesarPanel;

