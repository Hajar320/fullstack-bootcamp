import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverMessage: "", // For GET response
      postResponse: "", // For POST response
      inputValue: "", // For form input
      loading: false,
    };
  }

  // Part I: componentDidMount for GET request
  componentDidMount() {
    this.fetchHelloMessage();
  }

  // Fetch GET message from server
  fetchHelloMessage = async () => {
    try {
      const response = await fetch("/api/hello");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      this.setState({ serverMessage: data.message });
    } catch (error) {
      console.error("Error fetching hello message:", error);
      this.setState({
        serverMessage: "Failed to load message from server",
      });
    }
  };

  // Part II: Handle form input change
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  // Part II: Handle form submission (POST request)
  handleSubmit = async (e) => {
    e.preventDefault();

    const { inputValue } = this.state;

    if (!inputValue.trim()) {
      alert("Please enter something to send!");
      return;
    }

    this.setState({ loading: true });

    try {
      const response = await fetch("/api/world", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post: inputValue }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      this.setState({
        postResponse: data.message,
        loading: false,
      });
    } catch (error) {
      console.error("Error sending POST request:", error);
      this.setState({
        postResponse: "Failed to send data to server",
        loading: false,
      });
    }
  };

  render() {
    const { serverMessage, postResponse, inputValue, loading } = this.state;

    return (
      <div className="App">
        {/* Part I: Display GET message */}
        <header className="App-header">
          <h1>{serverMessage || "Loading..."}</h1>
        </header>

        {/* Part II: Form for POST request */}
        <div className="form-container">
          <h2>Post to Server:</h2>

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                value={inputValue}
                onChange={this.handleInputChange}
                placeholder="Type your message here..."
                className="form-input"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading || !inputValue.trim()}
            >
              {loading ? "Sending..." : "Submit!"}
            </button>
          </form>

          {/* Display POST response */}
          {postResponse && (
            <div className="response-container">
              <h3>Server Response:</h3>
              <p className="response-message">{postResponse}</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="instructions">
          <h3>How it works:</h3>
          <ol>
            <li>The header shows a GET request response from Express</li>
            <li>Type a message in the input field</li>
            <li>Click "Submit!" to send a POST request</li>
            <li>See the server's response below</li>
            <li>Check your terminal for server logs</li>
          </ol>
        </div>
      </div>
    );
  }
}

export default App;
