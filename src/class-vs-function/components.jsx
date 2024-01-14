import React from "react";
import ClassComponents from "./class";
import Function from "./function";

function Components() {
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          textTransform: "capitalize",
          color: "red",
        }}
      >
        functional components vs class components
      </h1>

      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <ClassComponents props='i am in class component' />
        <Function props='i am in function component' />
      </div>
    </>
  );
}

export default Components;
