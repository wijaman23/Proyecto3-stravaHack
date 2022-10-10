import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import * as trainingService from "../../../services/training-services";

function UserProfile() {
  const { user } = useContext(AuthContext);
  const [training, setTraining] = useState([]);

  useEffect(() => {
    trainingService
      .userTraining(user.id)
      .then((training) => setTraining(training))
      .catch((error) => console.error(error));
  }, [user.id]);

  const lastTrain = training.length - 1;

  function timeFormat(time) {
    let dayNew;
    const a = time.slice(5, 7);
    const day = time.slice(8, 10);

    if (day.slice(0, 1) === "0") {
      dayNew = day.slice(1, 2);
    } else {
      dayNew = day;
    }

    let month = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    let b = month[a - 1];

    return dayNew + " de " + b + " de " + time.slice(0, 4);
  }

  return (
    <div className="border mt-4 d-flex flex-column p-3 bg-light rounded">
      <div className="d-flex justify-content-center">
        <img
          src={user.img}
          alt="imagen"
          style={{ width: 100, borderRadius: 50 }}
        />
      </div>
      <div className="mt-3">
        <h5 style={{ fontSize: 20, fontWeight: 700 }}>
          {user.name} {user.lastname}
        </h5>
      </div>
      <hr />
      <div>
        <h6 className="mb-3 mt-2" style={{ fontSize: 13, fontWeight: 500 }}>
          Última actividad
        </h6>
        <h5 style={{ fontSize: 15, fontWeight: 700 }}>
          {training.length > 0 ? (
            training[lastTrain].title
          ) : (
            <h4 style={{ fontSize: 12, fontWeight: 300 }} >Registra tu primera actividad</h4>
          )}
        </h5>
        <div style={{ fontSize: 13, fontWeight: 300 }}>
          {training.length > 0 && timeFormat(training[lastTrain].createdAt)}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
