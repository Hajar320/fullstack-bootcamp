import React, { useRef, useState, useEffect } from "react";

function CharacterCounter() {
  // useRef to reference the input element
  const inputRef = useRef(null);

  // State to track character count
  const [charCount, setCharCount] = useState(0);

  // Event handler for input changes
  const handleInputChange = () => {
    // Get character count directly from the input reference
    if (inputRef.current) {
      const currentLength = inputRef.current.value.length;
      setCharCount(currentLength);
    }
  };

  // Clear input handler
  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setCharCount(0);
      inputRef.current.focus();
    }
  };

  // Focus on input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Inline styles
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "2rem auto",
      padding: "2rem",
      backgroundColor: "#f8f9fa",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
      color: "#333",
      textAlign: "center",
      marginBottom: "1rem",
    },
    description: {
      color: "#666",
      textAlign: "center",
      marginBottom: "2rem",
    },
    inputWrapper: {
      marginBottom: "2rem",
    },
    inputLabel: {
      display: "block",
      marginBottom: "0.5rem",
      fontWeight: "600",
      color: "#444",
    },
    textInput: {
      width: "100%",
      padding: "1rem",
      fontSize: "1rem",
      border: "2px solid #ddd",
      borderRadius: "6px",
      resize: "vertical",
      fontFamily: "inherit",
      transition: "border-color 0.3s",
    },
    counterDisplay: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      marginBottom: "2rem",
      backgroundColor: "white",
      padding: "1.5rem",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    },
    counterItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    counterValue: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#4a6cf7",
    },
    warning: {
      color: "#e74c3c",
    },
    buttons: {
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      marginTop: "2rem",
    },
    button: {
      padding: "0.75rem 1.5rem",
      fontSize: "1rem",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "all 0.3s",
    },
    clearButton: {
      backgroundColor: "#e74c3c",
      color: "white",
    },
    clearButtonDisabled: {
      backgroundColor: "#ecf0f1",
      color: "#bdc3c7",
      cursor: "not-allowed",
    },
    focusButton: {
      backgroundColor: "#3498db",
      color: "white",
    },
    info: {
      marginTop: "2rem",
      padding: "1rem",
      backgroundColor: "#e8f4fd",
      borderRadius: "6px",
      fontSize: "0.9rem",
      color: "#2c3e50",
    },
    code: {
      backgroundColor: "#f1f1f1",
      padding: "2px 4px",
      borderRadius: "4px",
      fontFamily: "monospace",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Character Counter</h1>
      <p style={styles.description}>
        Type in the text box below. The counter updates in real-time using
        useRef!
      </p>

      <div style={styles.inputWrapper}>
        <label htmlFor="text-input" style={styles.inputLabel}>
          Enter your text:
        </label>
        <textarea
          id="text-input"
          ref={inputRef}
          onChange={handleInputChange}
          placeholder="Start typing here..."
          style={styles.textInput}
          rows="4"
        />
      </div>

      <div style={styles.counterDisplay}>
        <div style={styles.counterItem}>
          <span>Characters:</span>
          <span
            style={{
              ...styles.counterValue,
              ...(charCount > 100 ? styles.warning : {}),
            }}
          >
            {charCount}
          </span>
        </div>

        <div style={styles.counterItem}>
          <span>Remaining (max 200):</span>
          <span
            style={{
              ...styles.counterValue,
              ...(200 - charCount < 50 ? styles.warning : {}),
            }}
          >
            {200 - charCount}
          </span>
        </div>
      </div>

      <div style={styles.buttons}>
        <button
          onClick={handleClear}
          style={{
            ...styles.button,
            ...(charCount === 0
              ? styles.clearButtonDisabled
              : styles.clearButton),
          }}
          disabled={charCount === 0}
        >
          Clear Text
        </button>

        <button
          onClick={() => inputRef.current && inputRef.current.focus()}
          style={{ ...styles.button, ...styles.focusButton }}
        >
          Focus Input
        </button>
      </div>

      <div style={styles.info}>
        <p>
          <strong>How it works:</strong> The{" "}
          <span style={styles.code}>useRef</span> hook creates a reference to
          the input element. When you type,{" "}
          <span style={styles.code}>onChange</span> fires, and we get the
          character count from{" "}
          <span style={styles.code}>inputRef.current.value.length</span>
        </p>
        <p>
          <strong>Character count:</strong> {charCount}
        </p>
        <p>
          <strong>Input reference exists:</strong>{" "}
          {inputRef.current ? "Yes ✓" : "No"}
        </p>
      </div>
    </div>
  );
}

export default CharacterCounter;
