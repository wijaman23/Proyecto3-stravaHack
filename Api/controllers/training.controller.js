const Training = require("../models/training.model");
const createError = require("http-errors");

module.exports.create = (req, res, next) => {
  const training = req.body;
  training.owner = req.user.id;

  Training.create(training)
    .then((training) => res.status(201).json(training))
    .catch(next);
};

module.exports.list = (req, res, next) => {
  Training.find()
    .populate("owner", " name lastname email img")
    .populate({
      path: "comments",
      populate: { path: "user" },
    })
    .populate("kudo")
    .then((training) => res.status(200).json(training))
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  Training.deleteOne({ _id: req.training.id })
    .then(() => res.status(204).send())
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Training.findById(req.params.id)
    .populate("owner", " name lastname email img")
    .populate({
      path: "comments",
      populate: { path: "user" },
    })
    .populate("kudo")
    .then((training) => {
      if (training) {
        res.status(200).json(training);
      } else {
        next(createError(404, "Entrenamiento no encontrado"));
      }
    })
    .catch(next);
};

module.exports.userTraining = (req, res, next) => {
  const user = req.params.id;

  Training.find({ owner: user })
    .populate("owner", "name lastname email img")
    .populate({
      path: "comments",
      populate: { path: "user" },
    })
    .populate("kudo")
    .then((training) => {
      if (training) {
        res.status(200).json(training);
      } else if (training) {
        next(createError(403, "Peticion rechazada"));
      } else {
        next(createError(404, "Usuario no encontrado"));
      }
    })
    .catch((error) => next(error));
};
