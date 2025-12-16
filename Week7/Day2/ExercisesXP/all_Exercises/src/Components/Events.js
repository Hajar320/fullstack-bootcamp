import React from "react";

const clickMe = () => alert("I was clicked!");

function handleKeyDown(event) {
  if (event.key === "Enter") {
    alert("The ENTER key was pressed,your input is : " + event.target.value);
  }
}

function Events() {
  const [isToggleOn, setIsToggleOn] = React.useState("true");
  const handleToggle = () => {
    setIsToggleOn((prevState) => !prevState);
  };
  return (
    <div className="events">
      <button onClick={clickMe}>Click Me!</button>
      <input
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Press the ENTER Key"
      />
      <button onClick={handleToggle}>{isToggleOn ? "ON" : "OFF"}</button>
    </div>
  );
}
export default Events;
