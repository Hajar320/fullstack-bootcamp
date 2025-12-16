import React from "react";
import "./App.css";
import ErrorBoundary from "./ErrorBoundary";
import Color from "./Color";

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  handleClick = () => {
    this.setState((prevState) => {
      const newCounter = prevState.counter + 1;

      // Throw error when counter reaches 5
      if (newCounter >= 5) {
        throw new Error("I crashed!");
      }

      return { counter: newCounter };
    });
  };

  render() {
    return (
      <div onClick={this.handleClick}>
        <h1>{this.state.counter}</h1>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <h2 className="ex">Exercise 1</h2>
      <p>
        <b>
          Click on the numbers to increase the counters.
          <br />
          The counter is programmed to throw error when it reaches 5. This
          simulates a JavaScript error in a component.
        </b>
      </p>
      <hr />
      <div>
        <ErrorBoundary>
          <p>
            These two counters are inside the same error boundary. If one
            crashes, the error boundary will replace both of them.
          </p>
          <BuggyCounter />
          <BuggyCounter />
        </ErrorBoundary>
        <hr />
        <p>
          These two counters are each inside of their own error boundary. So if
          one crashes, the other is not affected.
        </p>
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
        <hr />
        <p>
          This counter is not inside of boundary. So if crashes, all other
          components are deleted.
        </p>
        <BuggyCounter />
      </div>
      <h2 className="ex">Exercise 2 / 3</h2>
      <Color />
    </div>
  );
}

export default App;
