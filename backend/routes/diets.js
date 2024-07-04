const express = require("express");
const router = express.Router();
const Diet = require("../models/dietModel");
const {
  createDiet,
  getAllDiets,
  getADiet,
  updateDiet,
  deleteDiet,
} = require("../controllers/dietController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth)
router.get("/", getAllDiets);
router.get("/:id", getADiet);
router.post("/", createDiet);
router.patch("/:id", updateDiet);
router.delete("/:id", deleteDiet);

module.exports = router;
