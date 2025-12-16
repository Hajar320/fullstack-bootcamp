import React, { useState } from "react";

function Garage(props) {
  const [size] = useState(props.size);
  return (
    <div className="garageinfo">
      <h3>Who lives in my {size} Garage?</h3>
    </div>
  );
}
export default Garage;
