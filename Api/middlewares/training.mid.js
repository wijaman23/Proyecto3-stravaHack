const Training = require("../models/training.model");
const Comment = require("../models/comment.model");
const createError = require("http-errors");

module.exports.isOwnedByUser = (req, res, next) => {
  const { id } = req.params;
  Training.findById(id)
    .then((training) => {
      if (training?.owner == req.user?.id) {
        req.training = training;
        next();
      } else if (training) {
        next(createError(403, "Peticion rechazada"));
      } else {
        next(createError(404, "Entrenamiento no encontrado"));
      }
    })
    .catch(next);
};

module.exports.isCommentOwnedByUser = (req, res, next) => {
  const { commentId } = req.params;

  Comment.findById(commentId)
    .then((comment) => {
      if (comment) {
        if (comment.user == req.user.id) {
          req.comment = comment;
          next();
        } else {
          next(createError(403, "Peticion rechazada"));
        }
      } else {
        next(createError(404, "Entrenamiento no encontrado"));
      }
    })
    .catch(next);
};