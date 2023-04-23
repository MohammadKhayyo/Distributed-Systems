const mongoose = require("mongoose");
const validator = require("validator");
const id_validator = require("mongoose-id-validator");
var ActorSchema = new mongoose.Schema(
  {
    _id: {
      required: true,
      type: String,
      trim: true,
    },

    picture: {
      required: true,
      type: String,
      trim: true,
      validate(pictureURL) {
        if (!validator.isURL(pictureURL)) {
          throw new Error("Invalid Picture URL");
        }
      },
    },
    site: {
      type: String,
      required: true,
      trim: true,
      validate(siteURL) {
        if (!validator.isURL(siteURL)) {
          throw new Error("Invalid Site URL");
        }
      },
    },
  },
  { timestamps: true }
);
ActorSchema.plugin(id_validator);
const Actor = mongoose.model("actor", ActorSchema, "actors");
module.exports = Actor;
