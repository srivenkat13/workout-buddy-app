const { mongoose } = require("mongoose");
const Diet = require("../models/dietModel");

const getAllDiets = async (req, res) => {
  const diets = await Diet.find({}).sort({ createdAt: -1 });
  res.status(200).json(diets);
};

const getADiet = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such diet id" });
  }
  const diet = await Diet.findById(id);

  if (!diet) {
    return res.status(404).json({ error: "No such diet plan found" });
  }

  res.status(200).json(diet);
};

const createDiet = async (req, res) => {
  const { food, portion, macros } = req.body;
  const requiredFields = ["food", "portion"];
  const emptyFields = [];

  requiredFields.forEach((field) => {
    if (!req.body[field]) {
      emptyFields.push(field);
    }
  });
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Fill in all the fields", emptyFields });
  }
  try {
    const result = await Diet.create({ food, portion, macros });
    return res.status(201).json(result);
  } catch (error) {
    //  to handle a case duplicate entries
    if (error.code === 11000) {
      res
        .status(409)
        .json({ error: "Duplicate Entry: Food Name Must be unique" });
    } else {
      res.status(400).json({ error: `Error in adding diet plan`, error });
    }

    //  code: 'ERR_HTTP_HEADERS_SENT' this error occured when I sent 2 responses to one request
  }
};

const updateDiet = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such diet id" });
  }
  const diet = await Diet.findByIdAndUpdate(id, { ...req.body }, { new: true });
  if (!diet) {
    return res.status(404).json({ error: "No such diet plan found" });
  }

  res.status(200).json(diet);
};

const deleteDiet = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such diet ID" });
  }

  const diet = await Diet.findOneAndDelete({ _id: id });

  if (!diet) {
    return res.status(404).json({ error: "No such diet" });
  }

  res.status(200).json(diet);
};

module.exports = { getAllDiets, getADiet, createDiet, updateDiet, deleteDiet };
