import React, { Component } from "react";

class Child extends Component {
  componentWillUnmount() {
    alert("Child component is unmounted!");
    console.log("Child component unmounted");
  }

  render() {
    return (
      <div
        style={{
          padding: "20px",
          margin: "20px 0",
          backgroundColor: "#e3f2fd",
          border: "2px solid #2196f3",
          borderRadius: "5px",
        }}
      >
        <h1>Hello World!</h1>
        <p>I am the Child component</p>
      </div>
    );
  }
}

class Color extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "red",
      show: true,
    };
  }

  // Part I: shouldComponentUpdate
  shouldComponentUpdate(nextProps, nextState) {
    // Return true to allow updates, false to prevent updates
    console.log("shouldComponentUpdate called");
    console.log("Current color:", this.state.color);
    console.log("Next color:", nextState.color);

    // If you return false here, updates won't happen
    return true; // Change to false to see the effect
  }

  // Part III: getSnapshotBeforeUpdate
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("in getSnapshotBeforeUpdate");
    console.log("Previous color:", prevState.color);
    console.log("Current color:", this.state.color);

    // Return value will be passed to componentDidUpdate
    return {
      previousColor: prevState.color,
      currentColor: this.state.color,
    };
  }

  // Part II: componentDidUpdate
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("after update");
    console.log("Previous color was:", prevState.color);
    console.log("Current color is:", this.state.color);

    if (snapshot) {
      console.log("Snapshot data:", snapshot);
    }
  }

  // This runs after the component is mounted
  componentDidMount() {
    console.log("Component mounted with color:", this.state.color);

    // Timer to change color to yellow after mount
    this.timer = setTimeout(() => {
      console.log("Timer fired - changing color to yellow");
      this.setState({ color: "yellow" });
    }, 3000); // Change after 3 seconds
  }

  // Clean up timer
  componentWillUnmount() {
    console.log("Component unmounting");
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  changeColor = () => {
    this.setState({ color: "yellow" });
  };

  FavoriteColor = () => {
    this.setState({ color: "blue" });
  };

  // Function to hide the Child component
  deleteChild = () => {
    console.log("Deleting Child component...");
    this.setState({ show: false });
  };

  // Function to show the Child component again
  showChild = () => {
    console.log("Showing Child component...");
    this.setState({ show: true });
  };

  render() {
    console.log("render called with color:", this.state.color);

    return (
      <div className="color">
        <h3>My Favorite Color is {this.state.color}</h3>
        <button onClick={this.changeColor}>Change color to Yellow</button>
        <button onClick={this.FavoriteColor}>My Favorite Color (Blue)</button>

        <hr />

        {/* Conditionally render Child component */}
        <div style={{ margin: "20px 0" }}>
          <h3>Child Component Control</h3>
          <p>Child component is: {this.state.show ? "VISIBLE" : "HIDDEN"}</p>

          <button onClick={this.deleteChild} disabled={!this.state.show}>
            Delete Child Component
          </button>

          <button onClick={this.showChild} disabled={this.state.show}>
            Show Child Component
          </button>
        </div>

        {/* Render Child component only if show is true */}
        {this.state.show && <Child />}
      </div>
    );
  }
}

export default Color;
