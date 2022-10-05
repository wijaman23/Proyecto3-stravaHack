const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    text: {
      type: String,
      required: 'Texto es requerido',
      trim: true,
      minLength: [5, `El comentario debe ser mayor que 5 caracteres`],
      maxLength: [80, `El comentario debe ser menor que 80 caracteres`],
    },
    user: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    training: {
      ref: "Training",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);



const Comment = mongoose.model("Comment", schema);
module.exports = Comment;
