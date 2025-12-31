import React, { useState } from "react";

const Counter: React.FC = () => {
  // Counter value: number
  const [count, setCount] = useState<number>(0);

  // Last action: string | null (optional initially)
  const [lastAction, setLastAction] = useState<string | null>(null);

  // Increment function
  const increment = () => {
    setCount((prev) => prev + 1);
    setLastAction("Incremented");
  };

  // Decrement function
  const decrement = () => {
    setCount((prev) => prev - 1);
    setLastAction("Decremented");
  };

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      {lastAction && <p>Last action: {lastAction}</p>}
    </div>
  );
};

export default Counter;
