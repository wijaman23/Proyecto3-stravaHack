import React, { useState, useEffect, useContext } from "react";
import * as trainingService from "../../services/training-services";
import { AuthContext } from "../../contexts/AuthContext"

function Amigos() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    trainingService
      .getUsers()
      .then((users) => setUsers(users))
      .catch((error) => console.error(error));
  }, []);

  function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  return (
    <div
      className="d-flex flex-column mt-4 p-3 border rounded"
      style={{ backgroundColor: "white" }}
    >
      <div>
        <h5 className="mb-4">Amigos sugeridos</h5>
      </div>
      {shuffle(Array.from(users))
        .slice(0, 4)
        .map((friend) => (
          friend.id === user.id ? "" :
          <div key={friend.id} className="d-flex mb-4">
            <div className="d-flex align-items-center ">
              <img
                src={friend.img}
                alt="user"
                style={{ width: 50 }}
                className="rounded-circle me-2"
              />
            </div>
            <div>
              <h5 style={{ fontSize: 15, fontWeight: 400 }}>
                {friend.name} {friend.lastname}
              </h5>
              <h5
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: "rgb(252, 82, 0)",
                }}
              >
                {" "}
                Ver amigo{" "}
              </h5>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Amigos;
