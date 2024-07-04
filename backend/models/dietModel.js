const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dietSchema = new Schema(
  {
    food: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    portion: {
      type: Number,
      required: true,
    },
    macros: {
      name: {
        type: String,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//create a case-insensitive index
dietSchema.index(
  { food: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

module.exports = mongoose.model("Diet", dietSchema);
