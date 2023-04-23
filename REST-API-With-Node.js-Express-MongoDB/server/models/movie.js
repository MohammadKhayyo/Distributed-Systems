const mongoose = require("mongoose");
const id_validator = require("mongoose-id-validator");
const validator = require("validator");
const Actor = require("./actor.js");

var MovieSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
      validate(date) {
        if (
          !validator.isDate(date, "DD/MM/YYYY") &&
          !validator.isDate(date, "D/MM/YYYY") &&
          !validator.isDate(date, "D/M/YYYY") &&
          !validator.isDate(date, "DD/M/YYYY")
        )
          throw new Error("Invalid Date");
      },
    },
    director: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    picture: {
      type: String,
      required: true,
      trim: true,
      validate(picture) {
        if (!validator.isURL(picture)) {
          throw new Error("Invalid Picture URL");
        }
      },
    },
    isSeries: {
      type: Boolean,
      default: false,
    },
    series_details: {
      type: [Number],
      default: [],
    },
    actors: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);
MovieSchema.plugin(id_validator);

const Movie = mongoose.model("movie", MovieSchema, "movies");

module.exports = Movie;
