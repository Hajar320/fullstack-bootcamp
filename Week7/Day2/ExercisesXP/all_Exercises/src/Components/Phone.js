import React from "react";

function Phone() {
  const [brand] = React.useState("Samsung");
  const [model] = React.useState("Galaxy S20");
  const [color, setcolor] = React.useState("black");
  const [year] = React.useState(2020);
  const changeColor = () => {
    setcolor("blue");
  };
  return (
    <div className="phone">
      <h3>My phone is a {brand}</h3>
      <p>
        it is a {color} {model} from {year}
      </p>
      <button onClick={changeColor}>Change color</button>
    </div>
  );
}

export default Phone;
