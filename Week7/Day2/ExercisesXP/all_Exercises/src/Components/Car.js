import React, { useState } from "react";
import Garage from "./Garage";

function Car(props) {
  const [color] = useState(props.color);
  return (
    <div className="carinfo">
      <Garage size="Small" />
      <p>name : {props.name}</p>
      <p>
        model : {color} {props.model}
      </p>
    </div>
  );
}
export default Car;
