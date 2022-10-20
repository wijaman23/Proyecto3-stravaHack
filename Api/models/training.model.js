const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const typeSports = require("../data/typeSports");
const maps = require("../data/maps")

const trainingSchema = new Schema(
  {
    title: {
      type: String,
      required: "Titulo es requerido",
      trim: true,
      minLength: [5, `Titulo debe ser mayor que 5 caracteres`],
      maxLength: [80, `Titulo debe ser menor que 80 caracteres`],
    },
    description: {
      type: String,
      required: "Descripcion es requerida",
      trim: true,
    },
    distance: {
      type: Number,
      required: "Distancia es requerida",
    },
    duration: {
      type: Number,
      required: "Duracion es requerida",
    },
    altitude: {
      type: Number,
    },
    typesports: {
      type: String,
      enum: typeSports.map((typeSport) => typeSport.value),
    },
    maps: {
      type: String,
      enum: maps.map((map) => map.value),
    },
    owner: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

trainingSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "training",
});

trainingSchema.virtual("kudo", {
  ref: "Kudo",
  localField: "_id",
  foreignField: "training",
  count: true,
});

const Training = mongoose.model("Training", trainingSchema);
module.exports = Training;
