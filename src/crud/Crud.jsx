import axios from "axios";
import React, { useEffect, useState } from "react";

function Crud() {
  const [users, setUsers] = useState([]);
  const [name, setname] = useState("");
  console.log(name);

  const fetchData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data));
  };

  useEffect(() => {
    fetchData();
    console.log(users);
  }, []);

  const postData = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/users", { name })
      .then((res) => setUsers([...users, res.data]));
    fetchData();
  };

  //   const updateData = () => {
  //     axios
  //       .put(`https://jsonplaceholder.typicode.com/users/${1}`, { name: name })
  //       .then((res) => setUsers(res.data));
  //   };

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => setUsers(users.filter((user) => user.id !== id)));
  };

  return (
    <div>
      <input
        type='text'
        value={name}
        onChange={(e) => setname(e.target.value)}
        style={{ padding: "10px 20px" }}
      />
      &nbsp;
      <button onClick={postData} style={{ padding: "10px 20px" }}>
        Add
      </button>
      {/* <button onClick={updateData} style={{ padding: "10px 20px" }}>
        Update
      </button> */}
      <div>
        {users.map((user, index) => {
          return (
            <>
              <p
                style={{
                  width: "50%",
                  border: "1px solid black",
                  padding: "10px",
                  fontSize: "20px",
                }}
                key={index}
              >
                {user.name}
              </p>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </>
          );
        })}
        {/* {users.name} */}
      </div>
    </div>
  );
}

export default Crud;
