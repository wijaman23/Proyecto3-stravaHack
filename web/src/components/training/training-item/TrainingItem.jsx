import React, { useContext } from "react";
import { FaBicycle, FaSwimmer } from "react-icons/fa";
import { BiLike, BiComment, BiCommentX } from "react-icons/bi";
import { GiRunningShoe } from "react-icons/gi";
import { AuthContext } from "../../../contexts/AuthContext";

function singular(kudo) {
  if (kudo === 0) {
    return "¡Sé el primero en otorgar kudos!"
  } else if (kudo === 1) {
    return `${kudo} Kudo`
  } else {
    return `${kudo} Kudos`
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
    ? `${altitude} Km`
    : `${((distance * duration) / 60).toFixed(2)} /100 m`;
}

function handleStyleSport(typeSports) {
  switch (typeSports) {
    case "ciclismo":
      return <FaBicycle style={{ fontSize: "40px" }} />;
    case "natacion":
      return <FaSwimmer style={{ fontSize: "40px" }} />;
    default:
      return <GiRunningShoe style={{ fontSize: "40px" }} />;
  }
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
  typeSports,
  map,
  owner,
  comments,
  kudo,
  createdAt,
  id,
  onHandleClickLike,
}) 
{
  const { user } = useContext(AuthContext);

  return (
    <div className="d-flex flex-column mt-4 p-3 border bg-light rounded">
      <div className="d-flex">
        <img
          className=" rounded-5"
          src={owner.img}
          alt={title}
          style={{ maxWidth: 40, maxHeight: 40 }}
        />
        <div className="ms-4 d-flex flex-column">
          <h6 style={{ fontSize: 15, fontWeight: 500 }}>
            {owner.name} {owner.lastname}
          </h6>
          <h6 style={{ fontSize: 12, fontWeight: 300 }}>
            {timeFormat(createdAt)}
          </h6>
        </div>
      </div>
      <div className="d-flex">
        <div style={{ width: 20}}>{handleStyleSport(typeSports)}</div>
        <div>
          <div className="ms-4 my-3">
            <h2 style={{ fontSize: 20, fontWeight: 500 }}>{title}</h2>
          </div>
          <div className="d-flex">
            <div className="px-4 border-end">
              <h6
                className="text-secondary"
                style={{ fontSize: 13, fontWeight: 300 }}
              >
                Distancia
              </h6>
              <h3 style={{ fontSize: 20, fontWeight: 400 }}>{distance} Km</h3>
            </div>
            <div className="px-4 border-end">
              <h6
                className="text-secondary "
                style={{ fontSize: 13, fontWeight: 300 }}
              >
                Hora
              </h6>
              <h3 style={{ fontSize: 20, fontWeight: 400 }}>{duration} min</h3>
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
      </div>
      <div className="mt-4 mb-3">
        <img src={map} alt={title} style={{ width: 500, height: 200 }} />
      </div>
      <div className="d-flex justify-content-between">
        <div className="mt-1" style={{ fontSize: 12, fontWeight: 300 }}>
          {singular(kudo)}
        </div>
        <div className="d-flex">
          <div>
            <button
              className="btn btn-light"
              onClick={() => onHandleClickLike(id)}
            >
            {(kudo.user === user.id) ?
              <BiLike style={{ fontSize: "20px", color: "red" }} /> :
              <BiLike style={{ fontSize: "20px"}} />}
            </button>
          </div>
          <div className="mt-2 me-2">{handleComment(comments)}</div>
        </div>
      </div>
    </div>
  );
}

TrainingItem.defaultProps = {
  kudo: 0,
};

export default TrainingItem;
