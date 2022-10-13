import React, { useContext, useEffect, useState } from "react";
import * as trainingService from "../../services/training-services";
import { AuthContext } from "../../contexts/AuthContext";

function Estadisticas() {
  const [training, setTraining] = useState([]);
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    trainingService
      .userTraining(user.id)
      .then((training) => {
        setTraining(training);
      })
      .catch((error) => console.error(error));
  }, []);

  const { user } = useContext(AuthContext);

  //Funcion para filtrar fecha
  function sumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }
  let d = new Date();
  let da = new Date();
  let dSemana = sumarDias(d, -7);
  let dAño = sumarDias(da, -365);

  function sum(training, style, time) {
    let sum = 0;

    for (let i = 0; i < training.length; i++) {
      if (new Date(training[i].createdAt) > time) {
        sum =
          sum + (training[i].typesports === style ? training[i].distance : 0);
      }
    }
    return sum;
  }

  function hours(training, style, time) {
    let sum = 0;
    for (let i = 0; i < training.length; i++) {
      if (new Date(training[i].createdAt) > time) {
        sum =
          sum + (training[i].typesports === style ? training[i].duration : 0);
      }
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
    <div
      className="border mt-4 d-flex flex-column p-3 rounded"
      style={{ backgroundColor: "white" }}
    >
      <div className="d-flex justify-content-center">
        <button
          className={
            toggleState === 1
              ? "bg-light rounded mx-1"
              : "bg-white rounded mx-1"
          }
          onClick={() => toggleTab(1)}
        >
          <img
            src="https://i.ibb.co/LgyLwtd/11.png"
            alt="zapas"
            style={{ width: 80 }}
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
            style={{ width: 80 }}
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
            style={{ width: 80 }}
          />
        </button>
      </div>
      <div className="d-flex mb-3 justify-content-center mt-4">
        <h5 style={{ fontSize: 12, fontWeight: 300 }}>ESTA SEMANA</h5>
      </div>
      <div>
        <div className={toggleState === 1 ? "d-block" : "d-none"}>
          <div className="d-flex mb-3 justify-content-center">
            <h5> {sum(training, "carrera", dSemana)} Km</h5>
          </div>
          <div className="d-flex mb-3 justify-content-center align-items-center">
            <div>
              <h5>
                {changeHours(hours(training, "carrera", dSemana))}{" "}
              </h5>
            </div>
          </div>
          <hr />
          <div>
            <div className="d-flex mb-3 justify-content-center">
              <h5 style={{ fontSize: 12, fontWeight: 300 }}>ESTE AÑO</h5>
            </div>
            <div className="d-flex mb-3 justify-content-center">
              <h5> {sum(training, "carrera", dAño)} Km</h5>
            </div>
          </div>
        </div>
        <div className={toggleState === 2 ? "d-block" : "d-none"}>
          <div className="d-flex mb-3 justify-content-center">
            <h5> {sum(training, "natacion", dSemana)} m</h5>
          </div>
          <div className="d-flex mb-3 justify-content-center">
            <h5> {changeHours(hours(training, "natacion", dSemana))} </h5>
          </div>
          <hr />
          <div>
            <div className="d-flex mb-3 justify-content-center">
              <h5 style={{ fontSize: 12, fontWeight: 300 }}>ESTE AÑO</h5>
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
            <h5> {changeHours(hours(training, "ciclismo", dSemana))} </h5>
          </div>
          <hr />
          <div>
            <div className="d-flex mb-3 justify-content-center">
              <h5 style={{ fontSize: 12, fontWeight: 300 }}>ESTE AÑO</h5>
            </div>
            <div className="d-flex mb-3 justify-content-center">
              <h5> {sum(training, "ciclismo", dAño)} Km</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Estadisticas;
