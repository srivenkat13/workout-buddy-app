const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel");
const {
  createWorkout,
  getWorkouts,
  getAWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth)
router.get("/", getWorkouts);
router.get("/hello", (req, res) => {
  res.json({ msg: "Gello here" });
});
router.get("/:id", getAWorkout);
router.post("/", createWorkout);
router.delete("/:id", deleteWorkout);
router.patch("/:id", updateWorkout);

module.exports = router;
