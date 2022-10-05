const Comment = require("../models/comment.model");

module.exports.create = (req, res, next) => {
  Comment.create({
    text: req.body.text,
    training: req.params.id,
    user: req.user.id,
  })
    .then((comment) => res.status(201).json(comment))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Comment.deleteOne({ _id: req.comment.id })
    .then(() => res.status(204).send())
    .catch(next);
};