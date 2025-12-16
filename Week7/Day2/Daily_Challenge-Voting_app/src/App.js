import "./App.css";
import { useState } from "react";

function App() {
  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaSript", votes: 0 },
    { name: "Java", votes: 0 },
  ]);

  const handleVote = (index) => {
    setLanguages(
      languages.map((language, i) =>
        i === index ? { ...language, votes: language.votes + 1 } : language
      )
    );
  };

  return (
    <div className="App">
      <h1>Vote Your Language</h1>
      {languages.map((language, index) => (
        <div className="language" key={index}>
          <div>{language.votes}</div>
          <div>{language.name}</div>
          <button onClick={() => handleVote(index)}>Click Here</button>
        </div>
      ))}
    </div>
  );
}

export default App;
