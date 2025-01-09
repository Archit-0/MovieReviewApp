import express from "express";
const Router = express.Router();

//middleware
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

// controller
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteComment,
  getTopMovies,
  getNewMovies,
  getRandomMovies,
} from "../controllers/movieController.js";

// public Router
Router.get("/all-movies", getAllMovies);
Router.get("/specific-movie/:id", getSpecificMovie);
Router.get("/new-movies", getNewMovies);
Router.get("/top-movies", getTopMovies);
Router.get("/random-movies", getRandomMovies);

// restricted Router
Router.post("/:id/reviews", authenticate, checkId, movieReview);

//admin Router
Router.post("/create-movie", authenticate, authorizeAdmin, createMovie);
Router.put("/update-movie/:id", authenticate, authorizeAdmin, updateMovie);
Router.delete("/delete-movie/:id", authenticate, authorizeAdmin, deleteMovie);
Router.delete("/delete-comment", authenticate, authorizeAdmin, deleteComment);

export default Router;
