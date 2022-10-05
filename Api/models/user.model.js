const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const WORK_FACTOR = 10;
const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PW_PATTERN = /^.{8,}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: "Nombre es requerido",
      trim: true,
    },
    lastname: {
      type: String,
      required: "Apellidos son requeridos",
      trim: true,
    },
    email: {
      type: String,
      required: "Correo es requerido",
      trim: true,
      lowercase: true,
      unique: true,
      match: [EMAIL_PATTERN, "Correo invalido"],
    },
    password: {
      type: String,
      required: "Contraseña es requerida",
      match: [PW_PATTERN, "Contraseña mayor de 8 caracteres"],
    },
    city: {
      type: String,
    },
    img: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      validate: {
        validator: function (img) {
          try {
            new URL(img);
            return true;
          } catch (error) {
            return false;
          }
        },
        message: (img) => "Invalida URL",
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;

        return ret;
      },
    },
  }
);

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, WORK_FACTOR)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (passwordToMatch) {
  return bcrypt.compare(passwordToMatch, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
