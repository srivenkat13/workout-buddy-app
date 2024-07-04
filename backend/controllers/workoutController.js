const { mongoose } = require("mongoose");
const Workout = require("../models/workoutModel");

const getWorkouts = async (req, res) => {
  const user_id = req.user._id
  const workouts = await Workout.find({user_id}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

const getAWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout id" });
  }
  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  const requiredFields = ["title", "reps", "load"];
  const emptyFields = [];

  requiredFields.forEach((field) => {
    if (!req.body[field]) {
      emptyFields.push(field);
    }
  });
  
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Fill in all the fields ", emptyFields });
  }
  try {
    const user_id = req.user._id
    const newWorkout = await Workout.create({ title, reps, load, user_id });
    res.status(200).json(newWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  getAWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
