const createError = require("http-errors");
const User = require("../models/user.model");

module.exports.profile = (req, res, next) => {
  res.json(req.user);
};

module.exports.register = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(
          createError(400, {
            message: "Validacion usuario fallida",
            errors: { email: { message: "Usuario ya registrado" } },
          })
        );
      } else {
        return User.create(req.body).then((user) => res.status(201).json(user));
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  function invalidAuthError() {
    next(
      createError(400, {
        message: "User validation failed",
        errors: { email: { message: "Usuario o contraseña invalidas" } },
      })
    );
  }

  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        invalidAuthError();
      } else {
        return user.checkPassword(password).then((match) => {
          if (match) {
            req.session.userId = user.id;
            res.status(201).json(user);
          } else {
            invalidAuthError();
          }
        });
      }
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  req.session = null;
  res.status(204).send();
};

module.exports.list = (req, res, next) => {
  User.find()
    .populate("kudo")
    .then((user) => res.json(user))
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  User.findById(req.params.id)
  .populate({
    path: "kudo",
    populate: { path: "user" },
  })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        next(createError(404, "Usuario no encontrado"));
      }
    })
    .catch(next);
};

module.exports.edit = (req, res, next) => {
  const data = req.body;
  const user = Object.assign(req.user, data);
  user
    .save()
    .then((user) => res.json(user))
    .catch(next);
};
