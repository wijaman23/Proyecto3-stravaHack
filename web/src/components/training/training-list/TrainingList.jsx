import React, { useState, useEffect } from "react";
import * as trainingService from "../../../services/training-services";
import TrainingItem from "../training-item/TrainingItem";

function TrainingList() {
  const [training, setTraining] = useState([]);
  const [reload, setReload] = useState(false);

  const handleClickLike = (id) => {
    trainingService
      .setLike(id)
      .then((kudo) => {
        setReload(!reload);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    trainingService
      .getTraining()
      .then((training) => setTraining(training))
      .catch((error) => console.error(error));
  }, [reload]);

  return (
    <>
      {training
        .slice(0)
        .sort(training.createdAt)
        .reverse()
        .map((training) => (
          <div className="col mb-5" key={training.id}>
            <TrainingItem {...training} onHandleClickLike={handleClickLike} />
          </div>
        ))}
    </>
  );
}

export default TrainingList;
