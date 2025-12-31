import Greeting from "./Greeting";

function App() {
  return (
    <div>
      <Greeting name="Alice" messageCount={5} />
      <Greeting name="Bob" messageCount={2} />
    </div>
  );
}

export default App;
