import logo from "./logo.svg";
import "./App.css";
import UserFavoriteAnimals from "./UserFavoriteAnimals";
import Exercise from "./Exercise3";

const myelement = <h1>I Love JSX!</h1>;
const sum = 5 + 5;
function Exercise1() {
  return (
    <div className="EX1">
      <h1 style={{ color: "teal" }}>Exercise1</h1>
      {myelement}
      <p> React is {sum} times better with JSX</p>
    </div>
  );
}

const user = {
  firstName: "Bob",
  lastName: "Dylan",
  favAnimals: ["Horse", "Turtle", "Elephant", "Monkey"],
};
function Exercise2() {
  return (
    <div>
      <h1 style={{ color: "teal" }}>Exercise2</h1>
      <h3>{user.firstName}</h3>
      <h3>{user.lastName}</h3>
      <UserFavoriteAnimals animals={user.favAnimals} />
    </div>
  );
}
function Exercise3() {
  return (
    <div>
      <h1 style={{ color: "teal" }}>Exercise3</h1>
      <Exercise />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {Exercise1()}
      {Exercise2()}
      {Exercise3()}
    </div>
  );
}

export default App;
