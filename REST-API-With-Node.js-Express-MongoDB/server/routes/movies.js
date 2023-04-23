const fs = require("fs");
var validator = require("validator");
const Movie = require("../models/movie.js");
const Actor = require("../models/actor.js");
db = require("../DB/mongoose.js");
const validate_Movie_Details = (Body_Request, res, Must_Field) => {
  /**
   * Executes validation on all movie's provided details in the body request.
   */
  let i = 0;
  let Body_Request_Key = Object.keys(Body_Request);
  let boolean_llegal_fields = false;
  let illegalFields = "Illegal fields:\n";
  let check_missed_fields = false;
  let missedFields = "Missed required fields:\n";
  let checkInputs = false;
  let wrongInputs = "Wrong Inputs:\n";
  let finalErrorString = "";
  Body_Request_Key.forEach((key) => {
    i++;
    if (!Must_Field.includes(key)) {
      boolean_llegal_fields = true;
      illegalFields += ` : ${i}) ${key}\n`;
    }
  });
  i = 0;
  Must_Field.forEach((key) => {
    i++;
    if (!Body_Request_Key.includes(key)) {
      check_missed_fields = true;
      missedFields += ` : ${i}) ${key}\n`;
    }
  });
  let name = Body_Request.name;
  let director = Body_Request.director;
  let rating = Body_Request.rating;
  let isSeries = Body_Request.isSeries;
  let picture = Body_Request.picture;
  let date = Body_Request.date;
  let series_details = Body_Request.series_details;
  i = 0;
  i++;
  if (typeof name !== "string") {
    checkInputs = true;
    wrongInputs += ` : ${i}) name must be String\n`;
  }
  i++;
  if (typeof director !== "string") {
    checkInputs = true;
    wrongInputs += ` : ${i}) director must be String\n`;
  }
  i++;
  if (
    isNaN(rating) ||
    typeof rating === "boolean" ||
    rating < 1 ||
    rating > 5
  ) {
    checkInputs = true;
    wrongInputs += `: ${i}) rating must be number between 1 to 5\n`;
  }
  i++;
  if (typeof isSeries !== "boolean") {
    checkInputs = true;
    wrongInputs += ` : ${i}) isSeries must be boolean\n`;
  }
  i++;
  //check for URL to be valid
  if (!Body_Request.picture || !validator.isURL(picture)) {
    checkInputs = true;
    wrongInputs += ` : ${i}) picture must be valid url\n`;
  }
  // check date to be of valid format
  i++;
  if (
    !validator.isDate(date, "DD/MM/YYYY") &&
    !validator.isDate(date, "D/MM/YYYY") &&
    !validator.isDate(date, "D/M/YYYY") &&
    !validator.isDate(date, "DD/M/YYYY")
  ) {
    checkInputs = true;
    wrongInputs += ` : ${i}) date must be with the format DD/MM/YYYY\n`;
  }
  if (!Array.isArray(series_details)) {
    // must provide an array
    checkInputs = true;
    wrongInputs += `: *) series_details must be array\n`;
  } else {
    if (isSeries === false && series_details.length !== 0) {
      checkInputs = true;
      wrongInputs += ` : *) series_details must be empty array\n`;
    }
    if (isSeries === true && series_details.length === 0) {
      checkInputs = true;
      wrongInputs += ` : *) series_details can not br empty array\n`;
    }
    series_details.forEach((series_number) => {
      if (
        isNaN(series_number) ||
        typeof series_number === "boolean" ||
        series_number < 0
      ) {
        checkInputs = true;
        wrongInputs += ` : *) The value in the array series_details must be Integer\n`;
      }
    });
  }
  if (boolean_llegal_fields) {
    finalErrorString += illegalFields + "\n";
  }
  if (check_missed_fields) {
    finalErrorString += missedFields + "\n";
  }
  if (checkInputs) {
    finalErrorString += wrongInputs + "\n";
  }
  if (boolean_llegal_fields || check_missed_fields || checkInputs) {
    return res.status(400).send(finalErrorString);
  }
  return "Fixed";
};
const validateCreateActor = (Body_Request_actors, res, Must_Field) => {
  let name = Body_Request_actors.name;
  let picture = Body_Request_actors.picture;
  let site = Body_Request_actors.site;

  let actors_field = Object.keys(Body_Request_actors);
  let boolean_llegal_fields = false;
  let illegalFields = "Illegal fields:\n";

  let check_missed_fields = false;
  let missedFields = "Missed required fields:\n";

  let checkInputs = false;
  let wrongInputs = "Wrong Inputs:\n";

  let finalErrorString = "";
  let i = 0;
  actors_field.forEach((key) => {
    if (!Must_Field.includes(key)) {
      boolean_llegal_fields = true;
      illegalFields += `: ${i}) ${key}\n`;
    }
  });
  i = 0;
  Must_Field.forEach((key) => {
    if (!actors_field.includes(key)) {
      check_missed_fields = true;
      missedFields += `: ${i}) ${key}\n`;
    }
  });
  i = 0;
  if (!Body_Request_actors.name || typeof name !== "string") {
    checkInputs = true;
    wrongInputs += `: ${i}) name must be string\n`;
  }

  i++;
  if (!Body_Request_actors.picture || !validator.isURL(picture)) {
    checkInputs = true;
    wrongInputs += `: ${i}) picture must be valid url\n`;
  }
  i++;
  if (!Body_Request_actors.site || !validator.isURL(site)) {
    checkInputs = true;
    wrongInputs += `: ${i}) site must be valid url\n`;
  }
  if (boolean_llegal_fields) {
    finalErrorString += illegalFields + "\n";
  }
  if (checkInputs) {
    finalErrorString += wrongInputs + "\n";
  }
  if (check_missed_fields) {
    finalErrorString += missedFields + "\n";
  }
  if (boolean_llegal_fields || check_missed_fields || checkInputs) {
    return res.status(400).send(finalErrorString);
  }
  return "Fixed";
};
module.exports = {
  //READ
  read_movies: async function (_req, _res) {
    /**
     * Fetches all movies from the movies.js file
     */
    let Save_movie = {};
    let Save_actor = {};
    let movies = await Movie.find().lean();
    for (let i = 0; i < movies.length; i++) {
      Save_actor = {};
      const movie = await Movie.findOne({ _id: movies[i]._id }).lean();
      movie["id"] = movie["_id"];
      delete movie["_id"];
      const actors = await Actor.find().where("_id").in(movie.actors).exec();
      for (let j = 0; j < actors.length; j++) {
        const actor = await Actor.findOne({ _id: actors[j]._id }).lean();
        actor["name"] = actor["_id"];
        delete actor["_id"];
        Save_actor[`${actor["name"]}`] = actor;
      }
      movie.actors = Save_actor;
      Save_movie[`${movie["id"]}`] = movie;
    }
    return _res.status(200).send(Save_movie);
  },
  // CREATE
  create_movies: async function (req, res) {
    /**
     * Creates new movie with provided details. Validates that the movie details are of the correct type,
     * and that the provided movieID does not already exist.
     */
    let Body_Request;
    let id_Body_Request;
    Body_Request = req.body;
    if (!Body_Request.id)
      return res
        .status(400)
        .send(`Bad Request Error. Missing required field (id)`);
    id_Body_Request = Body_Request.id;
    delete Body_Request["id"];
    let isMovieExists = await Movie.findOne({ _id: id_Body_Request })
      .select("_id")
      .lean();
    if (isMovieExists)
      return res
        .status(400)
        .send(`Movie with ID ${id_Body_Request} already exists!`);
    let Must_Field = [
      "name",
      "picture",
      "director",
      "date",
      "rating",
      "isSeries",
      "series_details",
    ];
    if (validate_Movie_Details(Body_Request, res, Must_Field) !== "Fixed")
      return;
    Body_Request._id = id_Body_Request;
    const movie = new Movie(Body_Request);
    movie
      .save()
      .then((new_movie) => res.status(201).send(new_movie))
      .catch((e) => res.status(400).send(e));
  },
  // UPDATE
  update_movie: async function (req, res) {
    /**
     * Updates movie fields. Validates movieID exists, and that the other required fields are valid input.
     */
    const movieId = req.params["id"];
    let Body_Request;
    Body_Request = req.body[movieId] ? req.body[movieId] : req.body;
    if (Body_Request.id) {
      if (Body_Request.id !== movieId)
        return res.status(400).send(`Movie ID Mismatch!`);
    }
    let isMovieExists = await Movie.findOne({ _id: movieId })
      .select("_id")
      .lean();
    if (!isMovieExists) {
      return res.status(404).send(`Movie with ID ${movieId} Not Found`);
    }
    let Must_Field = [
      "id",
      "name",
      "picture",
      "director",
      "date",
      "rating",
      "isSeries",
      "series_details",
    ];
    if (validate_Movie_Details(Body_Request, res, Must_Field) !== "Fixed")
      return;
    // const arr = [
    //   "name",
    //   "picture",
    //   "director",
    //   "date",
    //   "rating",
    //   "isSeries",
    //   "series_details",
    // ];
    // let wantedKey = Object.keys(Body_Request);
    // let movie = Movie.findOne({ _id: movieId });
    // wantedKey.forEach((key) => {
    //   if (arr.includes(key)) {
    //     movie[key] = Body_Request[key];
    //   }
    // });
    Body_Request["_id"] = movieId;
    delete Body_Request["id"];
    Movie.findByIdAndUpdate(Body_Request["_id"], Body_Request, {
      new: true,
      runValidators: true,
    })
      .then((movie) => {
        if (!movie) {
          return res.status(404).send("NOT FOUND MOVIE");
        } else {
          res.status(200).send(movie);
        }
      })
      .catch((e) => res.status(400).send(e));
  },
  // DELETE
  delete_movie: async function (req, res) {
    /**
     * Deletes movie from movies.js. Validates that movieID exists.
     */
    const movieId = req.params["id"];
    let isMovieExists = await Movie.findOne({ _id: movieId })
      .select("_id")
      .lean();
    if (!isMovieExists)
      return res.status(404).send(`Movie with ID ${movieId} does not exist!`);
    await Movie.deleteOne({ _id: movieId });
    res.status(200).send(`movie id:${movieId} removed`);
  },
  AddActorToMovie: async function (req, res) {
    /**
     * Adds actor under movie with the given movieID. Validates that the movie exists.
     */
    const movieId = req.params["id"];
    let isMovieExists = await Movie.findOne({ _id: movieId })
      .select("_id")
      .lean();
    if (!isMovieExists) {
      return res.status(404).send(`Movie with ID ${movieId} Not Found`);
    }
    let Body_Request;
    const ActorName = req.params["name"];
    Body_Request = req.body[ActorName] ? req.body[ActorName] : req.body;
    let Must_Field = ["name", "picture", "site"];
    if (validateCreateActor(Body_Request, res, Must_Field) !== "Fixed") return;
    if (Body_Request.name) {
      if (Body_Request.name !== ActorName)
        return res.status(400).send(`Actor Name Mismatch!`);
    }
    // let movie = await Movie.findOne({ _id: movieId }).lean();
    let result = 0;
    Movie.findOne({ _id: movieId })
      .lean()
      .exec(async function (_err, movie) {
        const actorsJSONArray = await Actor.find()
          .where("_id")
          .in(movie.actors)
          .exec();
        for (let i = 0; i < actorsJSONArray.length; i++) {
          if (
            actorsJSONArray[i]._id.trim().toLowerCase() ===
            ActorName.trim().toLowerCase()
          ) {
            result = -1;
            break;
          }
        }
        if (result === -1) {
          return res
            .status(400)
            .send(`Actor with name ${ActorName} already exists!`);
        }
        let isActorExists = await Actor.findOne({ _id: ActorName })
          .select("_id")
          .lean();
        if (!isActorExists) {
          const new_actor = new Actor({
            _id: ActorName,
            picture: Body_Request.picture,
            site: Body_Request.site,
          });
          await new_actor.save().catch((e) => res.status(400).send(e));
        }
        actorsJSONArray.push(ActorName);
        movie.actors.push(ActorName);
        Movie.findByIdAndUpdate(movieId, movie, {
          // new: true,
          runValidators: true,
        })
          .then((movie1) => {
            if (!movie1) {
              return res.status(404).send("NOT FOUND MOVIE");
            } else {
              return res.status(200).send(movie1);
            }
          })
          .catch((e) => {
            console.log(e);
            res.status(400).send(e);
          });
      });
  },
  read_movies_by_ID: async function (req, res) {
    /**
     * Receives movieID and fetches the requested movie. Validates that the movieID exists.
     */
    const movieId = req.params["id"];
    let isMovieExists = await Movie.findOne({ _id: movieId })
      .select("_id")
      .lean();
    if (!isMovieExists) {
      return res.status(404).send(`Movie with ID ${movieId} does not exist!`);
    }
    let Save_movie = {};
    let Save_actor = {};
    Movie.findOne({ _id: movieId })
      .lean()
      .exec(async function (err, movie) {
        const actors = await Actor.find().where("_id").in(movie.actors).exec();
        for (let j = 0; j < actors.length; j++) {
          const actor = await Actor.findOne({ _id: actors[j]._id })
            .lean()
            .exec();
          actor["name"] = actor["_id"];
          delete actor["_id"];
          Save_actor[`${actor["name"]}`] = actor;
        }
        movie.actors = Save_actor;
        movie["id"] = movie["_id"];
        delete movie["_id"];
        Save_movie[`${movie["id"]}`] = movie;
        return res.status(200).send(Save_movie);
      });
  },
  deleteActorFromMovie: async function (req, res) {
    /**
     * Deletes actor from movie. Validates that actorID and movieID exist.
     */
    const movieId = req.params["id"];
    const ActorName = req.params["name"];
    let isMovieExists = await Movie.findOne({ _id: movieId })
      .select("_id")
      .lean();
    if (!isMovieExists)
      return res.status(404).send(`Movie with ID ${req.body.id} Not Found`);
    let movie = await Movie.findOne({ _id: movieId }).lean();
    let result = 0;
    let new_actors = [];
    for (let i = 0; i < movie.actors.length; i++) {
      if (
        movie.actors[i].trim().toLowerCase() === ActorName.trim().toLowerCase()
      ) {
        result = 1;
      } else {
        new_actors.push(movie.actors[i]);
      }
    }
    if (result === 0) {
      return res
        .status(404)
        .send(`Actor with name ${ActorName} does not exist!`);
    }
    movie.actors = new_actors;
    Movie.findByIdAndUpdate(movieId, movie, { new: true, runValidators: true })
      .then((movie) => {
        if (!movie) {
          return res.status(404).send();
        } else {
          res.status(200).send(`Media id: ${movieId} updated`);
        }
      })
      .catch((e) => res.status(400).send(e));
  },
  getActors: async function (req, res) {
    let Save_actor = {};
    let actors = await Actor.find().lean();
    for (let j = 0; j < actors.length; j++) {
      const actor = await Actor.findOne({ _id: actors[j]._id }).lean().exec();
      actor["name"] = actor["_id"];
      delete actor["_id"];
      Save_actor[`${actor["name"]}`] = actor;
    }
    return res.status(200).send(Save_actor);
  },
  AddActor: async function (req, res) {
    const ActorName = req.params["name"];
    Body_Request = req.body[ActorName] ? req.body[ActorName] : req.body;
    let Must_Field = ["name", "picture", "site"];
    if (validateCreateActor(Body_Request, res, Must_Field) !== "Fixed") return;
    if (Body_Request.name) {
      if (Body_Request.name !== ActorName)
        return res.status(400).send(`Actor Name Mismatch!`);
    }
    let isActorExists = await Actor.findOne({ _id: ActorName })
      .select("_id")
      .lean();
    if (!isActorExists) {
      const new_actor = new Actor({
        _id: ActorName,
        picture: Body_Request.picture,
        site: Body_Request.site,
      });
      await new_actor.save().catch((e) => res.status(400).send(e));
    } else {
      return res
        .status(400)
        .send(`Actor with name ${ActorName} already exists!`);
    }
    return res.status(201).send({
      name: ActorName,
      picture: Body_Request.picture,
      site: Body_Request.site,
    });
  },
};
