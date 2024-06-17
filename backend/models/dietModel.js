const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dietSchema = new Schema(
  {
    food: {
      type: String,
      required: true,
      unique: true,
      lowercase:true
    },
    portion: { type: Number, required: true },
    macros: {
      name: String,
      weight: Number,
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
