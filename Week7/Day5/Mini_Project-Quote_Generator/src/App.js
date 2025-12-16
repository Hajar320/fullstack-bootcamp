import "./App.css";
import { useState } from "react";
import quotes from "./quotes";

function App() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [usedQuotes, setUsedQuotes] = useState([0]);

  // Color palettes with harmonious combinations
  const colorPalettes = [
    { bg: "#FFE8D6", btn: "#6e3c20ff" },
    { bg: "#A5A58D", btn: "#769518ff" },
    { bg: "#FFCDB2", btn: "#E5989B" },
    { bg: "#B5838D", btn: "#6D6875" },
    { bg: "#83C5BE", btn: "#006D77" },
    { bg: "#FFDDD2", btn: "#E29578" },
    { bg: "#264653", btn: "#2A9D8F" },
    { bg: "#E9C46A", btn: "#F4A261" },
    { bg: "#2A9D8F", btn: "#264653" },
    { bg: "#F4A261", btn: "#E76F51" },
  ];

  const [currentColors, setCurrentColors] = useState(colorPalettes[0]);

  const getRandomQuote = () => {
    // Get random quote
    const availableQuotes = quotes
      .map((_, index) => index)
      .filter((index) => !usedQuotes.includes(index));

    if (availableQuotes.length === 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
      setUsedQuotes([randomIndex]);
    } else {
      const randomIndex =
        availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
      setCurrentQuote(quotes[randomIndex]);
      setUsedQuotes((prev) => [...prev, randomIndex]);
    }

    // Get random color palette
    const randomPalette =
      colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    setCurrentColors(randomPalette);
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: currentColors.bg,
        color: currentColors.text,
        transition: "all 0.5s ease",
      }}
    >
      <div className="quote-container">
        <h1 className="quote-text" style={{ color: currentColors.bg }}>
          "{currentQuote.quote}"
        </h1>
        <p className="quote-author" style={{ color: currentColors.bg }}>
          - {currentQuote.author}
        </p>
      </div>

      <button
        onClick={getRandomQuote}
        style={{
          padding: "12px 24px",
          backgroundColor: currentColors.bg,
          color: "#fff",
          borderColor: "darkgrey",
          borderWidth: "5px",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "20px",
          fontWeight: "bold",
          transition: "all  0.3s ease",
        }}
      >
        Get Random Quote
      </button>
    </div>
  );
}

export default App;
