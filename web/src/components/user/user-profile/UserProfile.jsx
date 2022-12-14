import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import * as trainingService from "../../../services/training-services";
import { Link } from "react-router-dom";
import { TbMapPin } from "react-icons/tb";
import './UserProfile.css';
import { FaSpinner } from 'react-icons/fa';

function UserProfile() {
  const { user } = useContext(AuthContext);
  const [training, setTraining] = useState([]);
  const [userdata, setUserdata] = useState([]);

  useEffect(() => {
    trainingService
      .userTraining(user.id)
      .then((training) => setTraining(training))
      .catch((error) => console.error(error));
    trainingService
      .detailUsers(user.id)
      .then((userdata) => setUserdata(userdata))
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
  if (!userdata.img)
    return (
      <center>
        <div className="mt-5 p-5 bg-white">
          <FaSpinner icon="spinner" className="spinner" style={{ fontSize: 100}} />
        </div>
      </center>
    );

  return (
    <div
      className="border mt-4 d-flex flex-column p-3 rounded"
      style={{ backgroundColor: "white" }}
    >
      <div className="d-flex justify-content-center">
        <img
          src={userdata.img}
          alt="imagen"
          style={{ width: 150, height: 150}}
          className="rounded-circle"
        />
      </div>
      <Link
        to={`/user/${user.id}/training`}
        className="text-decoration-none text-reset link-primary"
      >
        <div className="mt-3 d-flex ms-4">
          <h5 style={{ fontSize: 20, fontWeight: 700 }}>
            {userdata.name} {userdata.lastname}
          </h5>
        </div>
      </Link>
      <div>
        <h5 className="ms-4" style={{ fontSize: 15, fontWeight: 300 }}>
          {userdata.city ? <TbMapPin className="me-1" /> : ""}
          {userdata.city ? userdata.city : ""}
        </h5>
      </div>
      <hr />
      <div>
        <h6 className="mb-3 mt-2" style={{ fontSize: 13, fontWeight: 500 }}>
          ??ltima actividad
        </h6>
        <h5 style={{ fontSize: 15, fontWeight: 700 }}>
          {training.length > 0 ? (
            training[lastTrain].title
          ) : (
            <p style={{ fontSize: 12, fontWeight: 300 }}>
              Registra tu primera actividad
            </p>
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
