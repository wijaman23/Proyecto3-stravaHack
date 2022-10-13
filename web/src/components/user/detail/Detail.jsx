import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import * as trainingService from "../../../services/training-services";
import { Link } from "react-router-dom";

function Detail() {
  const { user } = useContext(AuthContext);
  const [training, setTraining] = useState([]);
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    trainingService
      .userTraining(user.id)
      .then((training) => setTraining(training))
      .catch((error) => console.error(error));
  }, [user.id]);

  function sumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  let d = new Date();
  let da = new Date();
  let dSemana = sumarDias(d, -7);
  let dAño = sumarDias(da, -365);

  function sum(training, style) {
    let sum = 0;

    for (let i = 0; i < training.length; i++) {
      sum = sum + (training[i].typesports === style ? training[i].distance : 0);
      console.log(training[i].typesports)
    }
    return sum;
  }

  function changeHours(mins) {
    let hrs = Math.floor(mins / 60);
    let min = mins % 60;
    min = min < 10 ? "0" + min : min;
    return `${hrs}h:${min}min`;
  }

  return (
    <div>
      <div className="d-flex flex-column container" style={{ marginTop: 70 }}>
        <div className="mt-5 mb-5">
          <h2 style={{ fontSize: 34, fontWeight: 700 }}>Mi perfil</h2>
        </div>
        <div>
          <img
            src={user.img}
            alt="img"
            style={{ width: 160 }}
            className="mb-2 rounded-circle border border-white border-5"
          />
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <h5 style={{ fontSize: 27, fontWeight: 500 }}>
              {user.name} {user.lastname}
            </h5>
          </div>
          <div>
            <div className="d-flex align-items-center flex-column bg-white rounded-2 p-4 mb-5">
              <h5>Total actividades</h5>
              <h5 style={{ fontSize: 60, fontWeight: 500 }}>
                {training.length}
              </h5>
            </div>
          </div>
          <div className="d-flex align-items-center flex-column bg-white rounded-2 p-4 mb-5">
            <div>
              <h5>Mis stadisticas</h5>
            </div>
            <div></div>
            <div className="mt-2 d-flex flex-column p-3">
              <div className="d-flex justify-content-center">
                <button
                  className={
                    toggleState === 1 ? "bg-light mx-1" : "bg-white mx-1"
                  }
                  onClick={() => toggleTab(1)}
                >
                  <img
                    src="https://i.ibb.co/LgyLwtd/11.png"
                    alt="zapas"
                    style={{ width: 40 }}
                  />
                </button>
                <button
                  className={
                    toggleState === 2 ? "bg-light rounded" : "bg-white rounded"
                  }
                  onClick={() => toggleTab(2)}
                >
                  <img
                    src="https://i.ibb.co/nf3SCCr/33.png"
                    alt="natacion"
                    style={{ width: 40 }}
                  />
                </button>
                <button
                  className={
                    toggleState === 3
                      ? "bg-light rounded mx-1"
                      : "bg-white rounded mx-1"
                  }
                  onClick={() => toggleTab(3)}
                >
                  <img
                    src="https://i.ibb.co/1Rdw7BY/22.png"
                    alt="bici"
                    style={{ width: 40 }}
                  />
                </button>
              </div>
              <div className="d-flex mb-3 justify-content-center mt-4">
                <h5 style={{ fontSize: 12, fontWeight: 300 }}>TOTALES</h5>
              </div>
              <div>
                <div className={toggleState === 1 ? "d-block" : "d-none"}>
                  <div className="d-flex">
                    <div className="me-5">
                      <h5 className="me-2">Distancia</h5>
                      <h5 className="me-2">Horas</h5>
                      <h5 className="me-2">Altitud</h5>
                    </div>
                    <div className="">
                      <h5>{sum(training, "natacion")} m</h5>
                      <h5>{sum(training, "carrera")} m</h5>
                      <h5>{sum(training, "ciclismo")} m</h5>
                    </div>
                  </div>
                </div>
                <div className={toggleState === 2 ? "d-block" : "d-none"}>
                  <div className="d-flex mb-3 justify-content-center">
                    <h5> {sum(training, "natacion", "altitude")} m</h5>
                  </div>
                  <div className="d-flex mb-3 justify-content-center">
                    <h5></h5>
                  </div>
                  <hr />
                  <div>
                    <div className="d-flex mb-3 justify-content-center">
                      <h5 style={{ fontSize: 12, fontWeight: 300 }}>
                        ESTE AÑO
                      </h5>
                    </div>
                    <div className="d-flex mb-3 justify-content-center">
                      <h5> {sum(training, "natacion", dAño)} m</h5>
                    </div>
                  </div>
                </div>
                <div className={toggleState === 3 ? "d-block" : "d-none"}>
                  <div className="d-flex mb-3 justify-content-center">
                    <h5> {sum(training, "ciclismo", dSemana)} Km</h5>
                  </div>
                  <div className="d-flex mb-3 justify-content-center">
                    <h5></h5>
                  </div>
                  <hr />
                  <div>
                    <div className="d-flex mb-3 justify-content-center">
                      <h5 style={{ fontSize: 12, fontWeight: 300 }}>
                        ESTE AÑO
                      </h5>
                    </div>
                    <div className="d-flex mb-3 justify-content-center">
                      <h5> {sum(training, "ciclismo", dAño)} Km</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
