import React from "react";

function NameChange() {
  function nameChanger() {
    // const names = ["jhon", "peter", "jane", "josh", "kane", "mark"];
    const prices = [10, 20, 30, 40, 50];
    const number = Math.floor(Math.random() * prices.length);
    console.log(number);
    console.log(prices[number]);
    return prices[number];
  }

  const name = "sudhan";
  //map function
  const randomNames = [
    "Oliver Thompson",
    "Mia Rodriguez",
    "Oliver Thompson",
    "Ethan Walker",
    "Aria Martinez",
    "Oliver Thompson",
    "Liam Harris",
    "Oliver Thompson",
    "Sofia Turner",
    "Noah Wilson",
    "Ava Lewis",
    "Jackson Parker",
    "Harper Wright",
  ];

  return (
    <>
      <h4>{name}</h4>

      <div>
        <h1 style={{ textAlign: "center" }}>
          {/* refresh time name change  */}
          my name is <span style={{ color: "blue" }}>{nameChanger()}</span>
        </h1>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>Map function</h2>

        {randomNames.map((name) => (
          <li
            style={{ color: "red", fontSize: "20px", marginTop: "10px" }}
            key={name}
          >
            {name}
          </li>
        ))}

        <h2>Filter function</h2>

        {randomNames
          .filter((name) => name.startsWith("O"))
          .map((name) => (
            <li
              style={{ color: "red", fontSize: "20px", marginTop: "10px" }}
              key={name}
            >
              {name}
            </li>
          ))}
      </div>
    </>
  );
}

export default NameChange;
