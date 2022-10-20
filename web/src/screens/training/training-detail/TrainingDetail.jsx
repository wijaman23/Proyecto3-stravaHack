import { RiDeleteBinFill } from "react-icons/ri";
import React, { useState, useEffect, useContext } from "react";
import * as trainingService from "../../../services/training-services";
import Footer from "../../../components/footer/Footer";
import NavBarPage from "../../../components/navbar-page/NavBarPage";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../contexts/AuthContext";

function TrainingDetail() {
  const [training, setTraining] = useState([]);
  const [reload, setReload] = useState(false);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched" });

  const handleCreateCommentSubmit = (data) => {
    trainingService
      .createComment(id, data)
      .then((comment) => {
        setReload(!reload);
        reset();
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          const { errors } = error.response.data;
          Object.keys(error.response.data.errors).forEach((error) => {
            setError(error, { message: errors[error].message });
          });
        }
      });
  };

  const handleDeleteCommentSubmit = (comment) => {
    trainingService
      .deleteComment(id, comment)
      .then((comment) => {
        setReload(!reload);
        console.log("entra");
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    trainingService
      .detailTraining(id)
      .then((training) => setTraining(training))
      .catch((error) => console.error(error));
  }, [reload]);

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

    return (
      dayNew +
      " de " +
      b +
      " de " +
      time.slice(0, 4) +
      " a las " +
      time.slice(11, 16) +
      "h"
    );
  }

  function changeHours(mins) {
    let hrs = Math.floor(mins / 60);
    let min = mins % 60;
    min = min < 10 ? "0" + min : min;
    return `${hrs}h:${min}min`;
  }

  if (!training.owner)
    return (
      <center>
        <div className="mt-5 p-5 bg-white">
          <h1 className="mt-5 p-5">Loading</h1>
        </div>
      </center>
    );

  return (
    <div className="bg-white">
      <NavBarPage />
      <div className="d-flex flex-column container" style={{ marginTop: 70 }}>
        <div className="mt-5 ps-4 pt-2">
          <h5 style={{ fontSize: 25, fontWeight: 600 }}>
            {training.owner.name} - {training.typesports}
          </h5>
        </div>
        <div className="d-flex">
          <div className="d-flex py-3 pe-5 ps-3">
            <div>
              <img
                src={training.owner.img}
                alt="user"
                style={{ width: 120 }}
                className="rounded-circle me-2"
              />
            </div>
            <div className="ms-2 pe-5">
              <h6 style={{ fontSize: 15, fontWeight: 300 }}>
                {timeFormat(training.createdAt)}
              </h6>
              <h5 style={{ fontSize: 30, fontWeight: 500 }}>
                {training.title}
              </h5>
            </div>
          </div>
          <div>
            <div className="p-3 d-flex ms-3">
              <div>
                <h5 style={{ fontSize: 30, fontWeight: 300 }}>
                  {training.distance}
                  {training.typesport === "natacion" ? "m" : "Km"}
                </h5>
                <h5 style={{ fontSize: 15, fontWeight: 300 }}>Distancia</h5>
              </div>
              <div className="mx-4">
                <h5 style={{ fontSize: 30, fontWeight: 300 }}>
                  {changeHours(training.duration)}
                </h5>
                <h5 style={{ fontSize: 15, fontWeight: 300 }}>Duración</h5>
              </div>
              {training.typesport === "natacion" ? (
                ""
              ) : (
                <div>
                  <h5 style={{ fontSize: 30, fontWeight: 300 }}>
                    {training.altitude}m
                  </h5>
                  <h5 style={{ fontSize: 15, fontWeight: 300 }}>Altitud</h5>
                </div>
              )}
            </div>
            <div className="d-flex p-3 d-flex ms-3 ">
              <div className="me-4">
                <h5 style={{ fontSize: 30, fontWeight: 300 }}>
                  {((training.distance * training.duration) / 6).toFixed(2)}w
                </h5>
                <h5 style={{ fontSize: 15, fontWeight: 300 }}>Potencia</h5>
              </div>
              <div>
                <h5 style={{ fontSize: 30, fontWeight: 300 }}>
                  {(
                    training.duration *
                    70 *
                    (training.distance / training.duration)
                  ).toFixed(2)}
                  kj
                </h5>
                <h5 style={{ fontSize: 15, fontWeight: 300 }}>
                  Rendimiento <br></br> energético
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="border p-2 mb-2 rounded-3">
          {training?.comments?.map((comment) => (
            <div
              key={comment.id}
              className="d-flex m-2 border-bottom justify-content-between py-2 rounded 2"
              style={{ backgroundColor: "rgba(252, 82, 0,0.03)" }}
            >
              <div className="d-flex">
                <img
                  src={comment.user.img}
                  alt="user"
                  style={{ height: 50 }}
                  className="rounded-circle mx-2 my-3"
                />
                <div className="me-5 my-3">
                  <div className="d-flex">
                    <h5
                      className="ms-2"
                      style={{ fontSize: 12, fontWeight: 700 }}
                    >
                      {comment.user.name} {comment.user.lastname} -
                    </h5>
                    <h5 style={{ fontSize: 10, fontWeight: 300 }}>
                      Creado el {timeFormat(comment.createdAt)}
                    </h5>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p
                      className="ms-2"
                      style={{ fontSize: 15, fontWeight: 300 }}
                    >
                      {comment.text}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 me-2 p-2 ">
                {comment.user.email === user.email ? (
                  <button
                    style={{ border: "none", background: "none", padding: 0 }}
                    type="submit"
                    onClick={() => handleDeleteCommentSubmit(comment.id)}
                  >
                    <RiDeleteBinFill />
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
          <div className="ms-4 mt-4">
            <form onSubmit={handleSubmit(handleCreateCommentSubmit)}>
              <div>
                <div className="input-group mb-1 " style={{ width: 650 }}>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.text ? "is-invalid" : ""
                    }`}
                    placeholder="Introduce tu comentario"
                    {...register("text", {
                      min: {
                        value: 5,
                        message: "Minimo 5 caracteres",
                      },
                    })}
                  />
                  {errors.text && (
                    <div className="invalid-feedback">
                      {errors.text.message}
                    </div>
                  )}
                </div>
              </div>
              <button
                className="btn btn-outline-success mt-2 mb-2 me-3"
                style={{ width: 80 }}
                type="submit"
                disabled={!isValid}
              >
                Publicar
              </button>
            </form>
          </div>
        </div>
        <div className="d-flex mt-5 mb-5">
          <img className="img-fluid w-50" src={training.maps} alt="mapa" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TrainingDetail;
