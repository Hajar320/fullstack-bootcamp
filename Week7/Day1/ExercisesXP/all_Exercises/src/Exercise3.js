import { Component } from "react";
import logo from "./logo.svg";
import "./Exercise3.css";

const style_header = {
  color: "white",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial",
};

class Exercise extends Component {
  render() {
    return (
      <div>
        <h1 style={style_header}>This is a Header</h1>
        <p className="para">This is a paragraph</p>
        <a href="https://www.example.com">This is a link</a>
        <h3>this is a form</h3>
        <form>
          <label>Enter your name</label>
          <div style={{ margin: "10px" }}>
            <input type="text" style={{ marginLeft: "10px" }} />
            <input type="submit" />
          </div>
        </form>
        <h2>this is an image</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#282c34",
            height: "50vh",
            width: "100vh",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="logo" style={{ height: "40vmin" }} />
          <h1 style={{ color: "#61dafb", fontSize: "60px" }}>React</h1>
        </div>
        <h3 style={{ marginTop: "40px" }}>this is a list</h3>
        <list style={{ display: "inline-block" }}>
          <ul>
            <li>Tea</li>
            <li>Coffee</li>
            <li>Milk</li>
          </ul>
        </list>
      </div>
    );
  }
}

export default Exercise;
