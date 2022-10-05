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
    .populate("owner", "name email")
    .then((training) => res.json(training))
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  Training.deleteOne({ _id: req.training.id })
    .then(() => res.status(204).send())
    .catch(next);
};

module.exports.like = (req, res, next) => {
  const detail = {
    user: req.user.id,
    training: req.params.id,
  };

  Like.findOne(detail)
    .then((like) => {
      if (like) {
        return Like.deleteOne(detail);
      } else {
        return Like.create(detail);
      }
    })
    .then(() => Like.count(detail))
    .then((likes) => res.json({ likes }))
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Training.findById(req.params.id)
    .populate("owner", "name email")
    .populate({
      path:"comments",
      populate: {path: "user"}
    })
    .then((training) => {
      if (training) {
        res.json(training);
      } else {
        next(createError(404, "Entrenamiento no encontrado"));
      }
    })
    .catch(next);
};
