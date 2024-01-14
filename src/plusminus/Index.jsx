import React, { useState } from "react";

function Index() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>
        <h1>Increament Decreament</h1>
        <div style={{ marginTop: "20px" }}>
          <button
            style={{ padding: "10px 20px", backgroundColor: "lightcyan" }}
          >
            Plus +
          </button>
          <span>{count}</span>
          <button>Minus -</button>
        </div>
      </div>
    </div>
  );
}

export default Index;
