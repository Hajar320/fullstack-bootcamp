import react, { useEffect } from "react";

function Color() {
  const [color, setColor] = react.useState("red");
  useEffect(() => {
    alert("useEffect reached");
  });
  const changeColor = () => {
    setColor("yellow");
  };
  const FavoriteColor = () => {
    setColor("blue");
  };
  return (
    <div className="color">
      <h3>My Favorite Color is {color} </h3>
      <button onClick={changeColor}>Change color</button>
      <button onClick={FavoriteColor}>My Favorite Color</button>
    </div>
  );
}
export default Color;
