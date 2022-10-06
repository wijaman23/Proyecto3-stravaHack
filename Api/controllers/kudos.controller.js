const Kudos = require("../models/kudo.model");

module.exports.kudos = (req, res, next) => {
  const detail = {
    user: req.user.id,
    training: req.params.id,
  };

  Kudos.findOne(detail)
    .then((kudo) => {
      if (kudo) {
        return Kudos.deleteOne(detail);
      } else {
        return Kudos.create(detail);
      }
    })
    .then(() => Kudos.count(detail))
    .then((kudos) => res.json({ kudos }))
    .catch(next);
};