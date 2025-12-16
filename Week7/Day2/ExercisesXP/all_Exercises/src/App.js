import "./App.css";
import Car from "./Components/Car";
import Events from "./Components/Events";
import Phone from "./Components/Phone";
import Color from "./Components/Color";

function App() {
  const carinfo = { name: "Ford", model: "Mustang" };

  return (
    <div className="App">
      <header className="App-header">
        <h2 className="ex">Exercise1</h2>
        <Car name={carinfo.name} color="BLACK" model={carinfo.model} />
        <h2 className="ex">Exercise2</h2>
        <Events />
        <h2 className="ex">Exercise3</h2>
        <Phone />
        <h2 className="ex">Exercise4</h2>
        <Color />
      </header>
    </div>
  );
}

export default App;
