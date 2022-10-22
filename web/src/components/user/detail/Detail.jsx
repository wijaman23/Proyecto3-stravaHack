import React, { useState, useEffect, useContext } from "react";
import * as trainingService from "../../../services/training-services";
import { useParams } from "react-router-dom";
import Footer from "../../footer/Footer";
import Carousel from "react-bootstrap/Carousel";
import { GrSwim } from "react-icons/gr";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../../contexts/AuthContext";
import { TbMapPin } from "react-icons/tb";
import "./Detail.css"

function Detail() {
  const [training, setTraining] = useState([]);
  const [user, setUser] = useState();
  const { id } = useParams();
  const [toggleState, setToggleState] = useState(1);
  const [reload, setReload] = useState(false);
  const authContext = useContext(AuthContext);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    trainingService
      .userTraining(id)
      .then((training) => setTraining(training))
      .catch((error) => console.error(error));
    trainingService
      .detailUsers(id)
      .then((user) => setUser(user), console.log(user))
      .catch((error) => console.error(error));
  }, [reload]);

  const handleDeleteTrainingSubmit = (idTraining) => {
    trainingService
      .deleteTraining(idTraining)
      .then((comment) => {
        setReload(!reload);
      })
      .catch((error) => console.error(error));
  };

  function sumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  const d = new Date();
  const dSemana = sumarDias(d, -21);

  function sumDistance(training, style) {
    let sum = 0;

    for (let i = 0; i < training.length; i++) {
      sum = sum + (training[i].typesports === style ? training[i].distance : 0);
    }
    return sum;
  }

  function sumDistanceSemana(training, style, time) {
    let sum = 0;

    for (let i = 0; i < training.length; i++) {
      if (new Date(training[i].createdAt) > time) {
        sum =
          sum + (training[i].typesports === style ? training[i].distance : 0);
      }
    }
    return sum;
  }

  function sumAltitude(training, style) {
    let sum = 0;

    for (let i = 0; i < training.length; i++) {
      sum = sum + (training[i].typesports === style ? training[i].altitude : 0);
    }
    return sum;
  }

  function sumAltitudeSemana(training, style, time) {
    let sum = 0;

    for (let i = 0; i < training.length; i++) {
      if (new Date(training[i].createdAt) > time) {
        sum =
          sum + (training[i].typesports === style ? training[i].altitude : 0);
      }
    }
    return sum;
  }

  function sumDuration(training, style) {
    let sum = 0;

    for (let i = 0; i < training.length; i++) {
      sum = sum + (training[i].typesports === style ? training[i].duration : 0);
    }
    return sum;
  }

  function sumDurationSemana(training, style, time) {
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

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="d-flex flex-column container" style={{ marginTop: 70 }}>
        <div className="ms-5">
          <div className="ms-5 d-flex">
            <div className="mt-4">
              <img
                src={user.img}
                alt="img"
                style={{ width: 160 }}
                className="mb-2 ms-5 mt-5 rounded-circle border border-white border-5"
              />
            </div>
            <div>
              <Carousel>
                <Carousel.Item
                  interval={4000}
                  className="d-flex align-items-center"
                >
                  <img
                    style={{ width: 800 }}
                    className="p-4 ms-5"
                    src="https://esmtb.com/wp-content/uploads/2015/10/strava1.jpg"
                    alt="img"
                  />
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                  <img
                    style={{ width: 800 }}
                    className="p-4 ms-5"
                    src="https://esmtb.com/wp-content/uploads/2015/10/strava3.jpg"
                    alt="img"
                  />
                </Carousel.Item>
                <Carousel.Item interval={4000}>
                  <img
                    style={{ width: 800 }}
                    className="p-4 ms-5"
                    src="https://esmtb.com/wp-content/uploads/2015/10/strava4.jpg"
                    alt="img"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-evenly col-11">
          <div>
            <div className="d-flex">
              <div>
                <div>
                  <div>
                    <h5
                      className="me-5"
                      style={{ fontSize: 27, fontWeight: 500 }}
                    >
                      {user.name} {user.lastname}
                    </h5>
                  </div>
                  <h5 style={{ fontSize: 15, fontWeight: 300 }}>
                    {user.city ? <TbMapPin className="me-1" /> : ""}
                    {user.city ? user.city : ""}
                  </h5>
                </div>
              </div>

              <div className="d-flex align-items-center flex-column bg-white rounded-2 p-4 mb-5 border border-2">
                <h5 style={{ fontSize: 18, fontWeight: 350 }}>
                  Actividades Totales
                </h5>
                <h5 style={{ fontSize: 60, fontWeight: 500 }}>
                  {training.length}
                </h5>
              </div>
            </div>
            <div>
              <div>
                {training
                  .slice(0)
                  .reverse()
                  .map((training) => (
                    <div
                      className="col-12 mb-3 p-3 rounded-3 border bg-white position-relative"
                      key={training.id}
                    >
                      <div
                        className="position-absolute top-0 start-100 translate-middle"
                        style={{
                          height: 20,
                          width: 20,
                        }}
                      >
                        {training.owner.email === authContext.user.email ? (
                          <button
                            style={{
                              border: "none",
                              background: "none",
                              padding: 0,
                            }}
                            type="submit"
                            onClick={() =>
                              handleDeleteTrainingSubmit(training.id)
                            }
                          >
                            <TiDelete style={{ fontSize: 25, color: "rgb(252, 82, 0)" }} />
                          </button>
                        ) : (
                          <div className="me-4"></div>
                        )}
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="mx-3">
                          <Link
                            to={`/training/${training.id}`}
                            className="text-decoration-none text-reset link-danger"
                          >
                            <h3 style={{ fontSize: 18, fontWeight: 500 }}>
                              {training.title}
                            </h3>
                          </Link>

                          <p style={{ fontSize: 14, fontWeight: 300 }}>
                            {training.description}
                          </p>
                        </div>
                        <div className="d-flex align-items-center">
                          <div>
                            {training.typesports === "natacion" ? (
                              <div className="me-4">
                                <GrSwim style={{ fontSize: 80 }} />{" "}
                              </div>
                            ) : (
                              <img
                                src={training.maps}
                                alt="img"
                                style={{ maxWidth: 150, height: 80 }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div
            className="d-flex align-items-center ms-5 flex-column bg-white rounded-2 p-4 mb-5 border border-2"
            style={{ height: 460 }}
          >
            <div>
              <h5 style={{ fontSize: 25, fontWeight: 400 }}>
                Mis estadisticas
              </h5>
            </div>
            <div className="mt-2 d-flex flex-column p-3">
              <div className="d-flex justify-content-center">
                <button
                  className={
                    toggleState === 1
                      ? "btnActive mx-1"
                      : "bg-white mx-1"
                  }
                  onClick={() => toggleTab(1)}
                >
                  <img
                    src="https://i.ibb.co/LgyLwtd/11.png"
                    alt="zapas"
                    style={{ width: 40, color: "white" }}
                  />
                </button>
                <button
                  className={
                    toggleState === 2
                      ? "bg-warning bg-grdient"
                      : "bg-white rounded"
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
                      ? "bg-warning bg-grdient rounded mx-1"
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
              <div className="d-flex mb-2 mt-2 justify-content-center mt-4">
                <h5 style={{ fontSize: 14, fontWeight: 500 }}>Totales</h5>
              </div>
              <div>
                <div className={toggleState === 1 ? "d-block" : "d-none"}>
                  <div className="d-flex">
                    <div className="me-5">
                      <h5
                        className="me-2"
                        style={{ fontSize: 17, fontWeight: 400 }}
                      >
                        Distancia
                      </h5>
                      <h5
                        className="me-2"
                        style={{ fontSize: 17, fontWeight: 400 }}
                      >
                        Altitud
                      </h5>
                      <h5
                        className="me-2"
                        style={{ fontSize: 17, fontWeight: 400 }}
                      >
                        Horas
                      </h5>
                    </div>
                    <div>
                      <h5 style={{ fontSize: 17, fontWeight: 300 }}>
                        {sumDistance(training, "carrera")} Km
                      </h5>
                      <h5 style={{ fontSize: 17, fontWeight: 300 }}>
                        {sumAltitude(training, "carrera")} m
                      </h5>
                      <h5 style={{ fontSize: 17, fontWeight: 300 }}>
                        {changeHours(sumDuration(training, "carrera"))}
                      </h5>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex mb-2 mt-2 justify-content-center mt-4">
                    <h5 style={{ fontSize: 14, fontWeight: 500 }}>
                      Ultimas 4 semanas
                    </h5>
                  </div>
                  <div className="d-flex">
                    <div className="me-5">
                      <h5
                        className="me-2"
                        style={{ fontSize: 17, fontWeight: 400 }}
                      >
                        Distancia
                      </h5>
                      <h5
                        className="me-2"
                        style={{ fontSize: 17, fontWeight: 400 }}
                      >
                        Altitud
                      </h5>
                      <h5
                        className="me-2"
                        style={{ fontSize: 17, fontWeight: 400 }}
                      >
                        Horas
                      </h5>
                    </div>
                    <div>
                      <h5 style={{ fontSize: 17, fontWeight: 300 }}>
                        {sumDistanceSemana(training, "carrera", dSemana)} Km
                      </h5>
                      <h5 style={{ fontSize: 17, fontWeight: 300 }}>
                        {sumAltitudeSemana(training, "carrera", dSemana)} m
                      </h5>
                      <h5 style={{ fontSize: 17, fontWeight: 300 }}>
                        {changeHours(
                          sumDurationSemana(training, "carrera", dSemana)
                        )}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className={toggleState === 2 ? "d-block" : "d-none"}>
                  <div className="d-flex">
                    <div className="me-5">
                      <h5
                        className="me-2"
                        style={{ fontSize: 17, fontWeight: 400 }}
                      >
                        Distancia
                      </h5>
                      <h5
                        className="me-2"
                        style={{ fontSize: 17, fontWeight: 400 }}
                      >
                        Horas
                      </h5>
                    </div>
                    <div className="">
                      <h5 style={{ fontSize: 17, fontWeight: 300 }}>
                        {sumDistance(training, "natacion")} m
                      </h5>
                      <h5 style={{ fontSize: 17, fontWeight: 300 }}>
                        {changeHours(sumDuration(training, "natacion"))}
                      </h5>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex mb-2 mt-2 justify-content-center mt-4">
                    <h5 style={{ fontSize: 14, fontWeight: 500 }}>
                      Ultimas 4 semanas
                    </h5>
                  </div>
                  <div className="d-flex">
                    <div className="me-5">
                      <h5
                        className="me-2"
                        style={{ fontSize: 17, fontWeight: 400 }}
                      >
                        Distancia
                      </h5>
                      <h5
                        className="me-2"
                        style={{ fontSize: 17, fontWeight: 400 }}
                      >
                        Horas
                      </h5>
                    </div>
                    <div>
                      <h5 style={{ fontSize: 17, fontWeight: 300 }}>
                        {sumDistanceSemana(training, "natacion", dSemana)} Km
                      </h5>
                      <h5 style={{ fontSize: 17, fontWeight: 300 }}>
                        {changeHours(
                          sumDurationSemana(training, "natacion", dSemana)
                        )}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className={toggleState === 3 ? "d-block" : "d-none"}>
                  <div className="d-flex">
                    <div className="me-5">
                      <h5
                        className="me-2"
                        style={{ fontSize: 17, fontWeight: 400 }}
                      >
                        Distancia
                      </h5>
                      <h5
                        className="me-2"
                        style={{ fontSize: 17, fontWeight: 400 }}
                      >
                        Altitud
                      </h5>
                      <h5
                        className="me-2"
                        style={{ fontSize: 17, fontWeight: 400 }}
                      >
                        Horas
                      </h5>
                    </div>
                    <div className="">
                      <h5 style={{ fontSize: 17, fontWeight: 300 }}>
                        {sumDistance(training, "ciclismo")} Km
                      </h5>
                      <h5 style={{ fontSize: 17, fontWeight: 300 }}>
                        {sumAltitude(training, "ciclismo")} m
                      </h5>
                      <h5 style={{ fontSize: 17, fontWeight: 300 }}>
                        {changeHours(sumDuration(training, "ciclismo"))}
                      </h5>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex mb-2 mt-2 justify-content-center mt-4">
                    <h5 style={{ fontSize: 14, fontWeight: 500 }}>
                      Ultimas 4 semanas
                    </h5>
                  </div>
                  <div className="d-flex">
                    <div className="me-5">
                      <h5
                        className="me-2"
                        style={{ fontSize: 17, fontWeight: 400 }}
                      >
                        Distancia
                      </h5>
                      <h5
                        className="me-2"
                        style={{ fontSize: 17, fontWeight: 400 }}
                      >
                        Altitud
                      </h5>
                      <h5
                        className="me-2"
                        style={{ fontSize: 17, fontWeight: 400 }}
                      >
                        Horas
                      </h5>
                    </div>
                    <div className="">
                      <h5 style={{ fontSize: 17, fontWeight: 300 }}>
                        {sumDistanceSemana(training, "ciclismo", dSemana)} Km
                      </h5>
                      <h5 style={{ fontSize: 17, fontWeight: 300 }}>
                        {sumAltitudeSemana(training, "ciclismo", dSemana)} m
                      </h5>
                      <h5 style={{ fontSize: 17, fontWeight: 300 }}>
                        {changeHours(
                          sumDurationSemana(training, "ciclismo", dSemana)
                        )}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
}

export default Detail;
