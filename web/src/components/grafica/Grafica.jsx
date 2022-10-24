import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { AuthContext } from "../../contexts/AuthContext";
import * as trainingService from "../../services/training-services";

ChartJS.register(ArcElement, Tooltip, Legend);

function Grafica() {
  const { user } = useContext(AuthContext);
  const [training, setTraining] = useState([]);

  let natacion = 0;
  let carrera = 0;
  let ciclismo = 0;

  useEffect(() => {
    trainingService
      .userTraining(user.id)
      .then((training) => setTraining(training))
      .catch((error) => console.error(error));
  }, [user.id]);

  training.map((training) =>
    training.typesports === "natacion" ? (natacion += 1) : 0
  );
  training.map((training) =>
    training.typesports === "ciclismo" ? (ciclismo += 1) : 0
  );
  training.map((training) =>
    training.typesports === "carrera" ? (carrera += 1) : 0
  );

  const data = {
    labels: ["Natacion", "Carrera", "Ciclismo"],
    datasets: [
      {
        label: "# of Votes",
        data: [natacion, carrera, ciclismo],
        backgroundColor: [
          "rgba(252, 82, 0, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(252, 82, 0, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-3 mt-4 border rounded">
      <h5>Porcentaje</h5>
      <Pie data={data} />
    </div>
  );
}

export default Grafica;
