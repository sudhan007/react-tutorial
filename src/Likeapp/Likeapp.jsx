import React, { useEffect, useState } from "react";

function Likeapp() {
  const [like, setLike] = useState(0);

  useEffect(() => {
    const getLike = localStorage.getItem("like");
    if (getLike) {
      setLike(parseInt(getLike));
    }
  });

  const handleLike = () => {
    setLike(like + 1);
    localStorage.setItem("like", like + 1);
  };

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Like App</h1>
        <div style={{ textAlign: "center", paddingTop: "40px" }}>
          <img
            src='https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D'
            alt=''
          />
          <br />
          <h2>
            total Likes :<span style={{ color: "green" }}>{like}</span>
          </h2>
          <br />
          <button
            style={{
              color: "red",
              marginTop: "10px",
              padding: "10px 40px",
              fontSize: "30px",
              backgroundColor: "lightblue",
              cursor: "pointer",
            }}
            onClick={handleLike}
          >
            Like
          </button>
        </div>
      </div>
    </>
  );
}

export default Likeapp;
