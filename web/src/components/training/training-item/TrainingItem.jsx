import React, { useContext } from "react";
import { BiComment, BiCommentX } from "react-icons/bi";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function singular(kudo) {
  if (kudo.length === 0) {
    return "¡Sé el primero en otorgar kudos!";
  } else if (kudo === 1) {
    return `${kudo.length} Kudo`;
  } else {
    return `${kudo.length} Kudos`;
  }
}

function handleComment(comment) {
  return comment.length > 0 ? (
    <BiComment style={{ fontSize: "20px" }} />
  ) : (
    <BiCommentX style={{ fontSize: "20px" }} />
  );
}

function handleAltitude(altitude) {
  return altitude ? "Desnivel positivo " : "Ritmo";
}

function handleAltitudeValue(altitude, distance, duration) {
  return altitude
    ? `${altitude} m`
    : `${((100 * duration) / distance).toFixed(2)} /100 m`;
}

function handleStyleSport(typesports) {
  switch (typesports) {
    case "ciclismo":
      return (
        <img
          src="https://i.ibb.co/1Rdw7BY/22.png"
          alt="bici"
          style={{ width: 60 }}
        />
      );
    case "natacion":
      return (
        <img
          src="https://i.ibb.co/nf3SCCr/33.png"
          alt="nata"
          style={{ width: 50 }}
        />
      );
    default:
      return (
        <img
          src="https://i.ibb.co/LgyLwtd/11.png"
          alt="carre"
          style={{ width: 50 }}
        />
      );
  }
}

function changeHours(mins) {
  let hrs = Math.floor(mins / 60);
  let min = mins % 60;
  min = min < 10 ? "0" + min : min;
  return `${hrs}h:${min}min`;
}

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

function TrainingItem({
  title,
  distance,
  duration,
  altitude,
  typesports,
  maps,
  owner,
  comments,
  kudo,
  createdAt,
  id,
  onHandleClickLike,
}) {
  const { user } = useContext(AuthContext);

  if (!owner)
    return (
      <center>
        <div className="mt-5 p-5 bg-white">
          <h1 className="mt-5 p-5">Loading</h1>
        </div>
      </center>
    );

  return (
    <div
      className="d-flex flex-column mt-4 p-3 border rounded"
      style={{ backgroundColor: "white" }}
    >
      <div className="d-flex">
        <Link
          to={`/user/${owner.id}/training`}
          className="text-decoration-none text-reset link-primary"
        >
          <img
            className="rounded-circle"
            src={owner.img}
            alt={title}
            style={{ width: 40, height: 40 }}
          />
        </Link>
        <div className="ms-4 d-flex flex-column">
          <h6 style={{ fontSize: 15, fontWeight: 500 }}>
            <Link
              to={`/user/${owner.id}/training`}
              className="text-decoration-none text-reset link-danger"
            >
              {owner.name} {owner.lastname}
            </Link>
          </h6>
          <h6 style={{ fontSize: 12, fontWeight: 300 }}>
            {timeFormat(createdAt)}
          </h6>
        </div>
      </div>
      <div>
        <div className="d-flex align-items-center">
          <div>{handleStyleSport(typesports)}</div>
          <div className="ms-2 mt-2">
            <Link
              to={`/training/${id}`}
              className="text-decoration-none text-reset link-danger"
            >
              <p style={{ fontSize: 25, fontWeight: 500 }}>{title}</p>
            </Link>
          </div>
        </div>
        <div className="d-flex">
          <div className="px-3 border-end">
            <h6
              className="text-secondary"
              style={{ fontSize: 13, fontWeight: 300 }}
            >
              Distancia
            </h6>
            <h3 style={{ fontSize: 20, fontWeight: 400 }}>
              {distance} {typesports === "natacion" ? "m" : "Km"}
            </h3>
          </div>
          <div className="px-4 border-end">
            <h6
              className="text-secondary "
              style={{ fontSize: 13, fontWeight: 300 }}
            >
              Hora
            </h6>
            <h3 style={{ fontSize: 20, fontWeight: 400 }}>
              {changeHours(duration)}
            </h3>
          </div>
          <div className="ms-4">
            <h6
              className="text-secondary"
              style={{ fontSize: 13, fontWeight: 300 }}
            >
              {handleAltitude(altitude)}
            </h6>
            <h3 style={{ fontSize: 20, fontWeight: 400 }}>
              {handleAltitudeValue(altitude, distance, duration)}
            </h3>
          </div>
        </div>
      </div>
      {typesports === "natacion" ? (
        ""
      ) : (
        <div className="mt-4 mb-3">
          <img src={maps} alt={title} style={{ width: 500, height: 200 }} />
        </div>
      )}
      <div className="d-flex justify-content-between mt-2">
        <div className="mt-1" style={{ fontSize: 12, fontWeight: 300 }}>
          {singular(kudo)}
        </div>
        <div className="d-flex ">
          <div className="d-flex me-1">
            <span
              onClick={() => onHandleClickLike(id)}
              style={{ cursor: "pointer" }}
              className="me-2"
            >
              {kudo.find((kudo) => kudo["user"] === user.id) ? (
                <motion.div
                  className="box"
                  animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 360, 0],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                  }}
                >
                  <AiTwotoneLike
                    style={{ fontSize: "20px", color: "rgb(252, 82, 0)" }}
                  />
                </motion.div>
              ) : (
                <AiOutlineLike style={{ fontSize: "20px" }} />
              )}
            </span>

            <Link
              to={`/training/${id}`}
              className="text-decoration-none text-reset link-danger"
            >
              <span className="mt-2 me-2 position-relative">
                {handleComment(comments)}
                {comments.length > 0 ? (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                    style={{ backgroundColor: "rgb(252, 82, 0)" }}
                  >
                    {comments.length}
                  </span>
                ) : (
                  ""
                )}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

TrainingItem.defaultProps = {
  kudo: 0,
};

export default TrainingItem;
