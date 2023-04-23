const express = require("express"),
  movieRoutes = require("./movies");

const router = express.Router();

router.get("/movies/:id", movieRoutes.read_movies_by_ID);
router.get("/movies", movieRoutes.read_movies);
router.post("/movies", movieRoutes.create_movies);
router.put("/movies/:id", movieRoutes.update_movie);
router.put("/movies/:id/actor/:name", movieRoutes.AddActorToMovie);
router.delete("/movies/:id/actor/:name", movieRoutes.deleteActorFromMovie);
router.delete("/movies/:id", movieRoutes.delete_movie);
router.get("/actors", movieRoutes.getActors);
router.post("/actor/:name", movieRoutes.AddActor);
module.exports = router;
