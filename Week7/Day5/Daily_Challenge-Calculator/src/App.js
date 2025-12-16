import React, { useState } from "react";
import "./App.css";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const operations = [
    { value: "add", symbol: "+", name: "Addition" },
    { value: "subtract", symbol: "-", name: "Subtraction" },
    { value: "multiply", symbol: "×", name: "Multiplication" },
    { value: "divide", symbol: "÷", name: "Division" },
  ];

  const calculate = () => {
    // Reset error
    setError("");

    // Validate inputs
    if (num1 === "" || num2 === "") {
      setError("Please enter both numbers");
      return;
    }

    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      setError("Please enter valid numbers");
      return;
    }

    let calculatedResult;
    let operationSymbol = operations.find(
      (op) => op.value === operation
    )?.symbol;

    switch (operation) {
      case "add":
        calculatedResult = n1 + n2;
        break;
      case "subtract":
        calculatedResult = n1 - n2;
        break;
      case "multiply":
        calculatedResult = n1 * n2;
        break;
      case "divide":
        if (n2 === 0) {
          setError("Cannot divide by zero");
          return;
        }
        calculatedResult = n1 / n2;
        break;
      default:
        calculatedResult = n1 + n2;
    }

    // Round to 4 decimal places if needed
    calculatedResult = Math.round(calculatedResult * 10000) / 10000;

    setResult(calculatedResult);

    // Add to history
    const newHistoryItem = {
      id: Date.now(),
      expression: `${n1} ${operationSymbol} ${n2}`,
      result: calculatedResult,
      timestamp: new Date().toLocaleTimeString(),
    };

    setHistory((prev) => [newHistoryItem, ...prev.slice(0, 4)]); // Keep last 5 items
  };

  const clearAll = () => {
    setNum1("");
    setNum2("");
    setResult("");
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      calculate();
    }
  };

  const formatNumber = (value) => {
    return value === "" ? "" : parseFloat(value);
  };

  return (
    <div className="app-container">
      <div className="calculator-card">
        <header className="calculator-header">
          <h1 className="calculator-title">Calculator</h1>
          <p className="calculator-subtitle">
            Enter two numbers and select an operation
          </p>
        </header>

        <div className="calculator-body">
          {/* Input Fields */}
          <div className="input-group">
            <div className="input-wrapper">
              <label className="input-label">First Number</label>
              <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                onKeyPress={handleKeyPress}
                className="number-input"
                placeholder="Enter first number"
                step="any"
              />
            </div>

            <div className="operation-selector">
              <label className="input-label">Operation</label>
              <div className="operation-buttons">
                {operations.map((op) => (
                  <button
                    key={op.value}
                    className={`operation-btn ${operation === op.value ? "active" : ""}`}
                    onClick={() => setOperation(op.value)}
                    title={op.name}
                  >
                    {op.symbol}
                  </button>
                ))}
              </div>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                className="operation-select"
              >
                {operations.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-wrapper">
              <label className="input-label">Second Number</label>
              <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                onKeyPress={handleKeyPress}
                className="number-input"
                placeholder="Enter second number"
                step="any"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {/* Result Display */}
          <div className="result-container">
            <div className="result-label">Result</div>
            <div className="result-display">
              {result !== "" ? (
                <div className="result-value">
                  <span className="expression">
                    {formatNumber(num1) || "?"}
                    {operations.find((op) => op.value === operation)?.symbol}
                    {formatNumber(num2) || "?"}
                    <span className="equals"> = </span>
                  </span>
                  <span className="result-number">{result}</span>
                </div>
              ) : (
                <div className="result-placeholder">
                  Result will appear here
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button onClick={calculate} className="calculate-btn">
              <span className="btn-icon">+</span>
              Calculate
            </button>
            <button onClick={clearAll} className="clear-btn">
              <span className="btn-icon">×</span>
              Clear All
            </button>
          </div>

          {/* Calculation History */}
          {history.length > 0 && (
            <div className="history-section">
              <h3 className="history-title">Recent Calculations</h3>
              <div className="history-list">
                {history.map((item) => (
                  <div key={item.id} className="history-item">
                    <div className="history-expression">{item.expression}</div>
                    <div className="history-result">= {item.result}</div>
                    <div className="history-time">{item.timestamp}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="instructions">
            <h3>How to use:</h3>
            <ol>
              <li>Enter two numbers in the input fields</li>
              <li>Select an operation (+, -, ×, ÷)</li>
              <li>Click "Calculate" or press Enter</li>
              <li>View the result above</li>
            </ol>
            <div className="shortcuts">
              <kbd>Tab</kbd> to navigate • <kbd>Enter</kbd> to calculate •{" "}
              <kbd>Esc</kbd> to clear
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
