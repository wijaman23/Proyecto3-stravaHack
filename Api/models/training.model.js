const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const typeSports = require("../data/typeSports");

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
    typeSports: {
      type: String,
      required: "Tipo de deporte is requerido",
      enum: typeSports.map((typeSport) => typeSport.value),
      trim: true,
    },
    map: {
      type: String,
      default:
        "https://newspack-hipertextual.s3.amazonaws.com/wp-content/uploads/2020/04/hipertextual-mas-facil-durante-cuarentena-google-maps-muestra-que-restaurantes-envian-domicilio-2020815281.jpg",
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
