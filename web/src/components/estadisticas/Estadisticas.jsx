import React, { useContext, useEffect, useState } from "react";
import * as trainingService from "../../services/training-services";
import { AuthContext } from "../../contexts/AuthContext";

function Estadisticas() {
  const [training, setTraining] = useState([]);

  useEffect(() => {
    trainingService
      .userTraining(user.id)
      .then((training) => {
        setTraining(training.distance)
      })
      .catch((error) => console.error(error));
  }, []);


  const { user } = useContext(AuthContext);

  return (
    <div className="border mt-4 d-flex flex-column p-3 bg-light rounded">
      <div>
        <button>Bici</button>
      </div>
      <div>
        <h5>ESTA SEMANA</h5>
        <h5>{(training?.length > 0) ? training.distance : "0"} Km</h5>
      </div>
      <div>ICONO</div>
      <div>
        <div>0h0m</div>
        <div>0M</div>
      </div>
      <hr />
      <div>
        <h5>ESTE AÑO</h5>
        <h5>0 Km</h5>
      </div>
    </div>
  );
}

export default Estadisticas;
