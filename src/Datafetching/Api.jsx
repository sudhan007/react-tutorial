import axios from "axios";
import React, { useState } from "react";

function Api() {
  const [data, setData] = useState([]);

  function fetchData() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.warn(err));
  }

  function fetchAxios() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div>
        <h1>Api Fetching</h1>
        <button
          onClick={fetchData}
          style={{ padding: "10px 30px", fontSize: "20px" }}
        >
          Fetch data
        </button>{" "}
        <br /> <br />
        <button style={{ padding: "10px 30px", fontSize: "20px" }} onClick={fetchAxios}>fetch axios</button>
        {data.map((item) => {
          return (
            <p
              style={{
                border: "1px solid black",
                backgroundColor: "yellow",
                fontSize: "20px",
                padding: "15px",
                textAlign: "center",
              }}
              key={item.id}
            >
              {item.title}
            </p>
          );
        })}
      </div>
    </>
  );
}

export default Api;
