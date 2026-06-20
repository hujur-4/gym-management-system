const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema(
  {
    goal: {
      type: String,
      required: true,
      unique: true,
      enum: ["Weight Loss", "Weight Gain", "Fitness"],
    },
    focus: { type: String },                // "Low calorie, high protein, less carbs"
    caloriesTarget: { type: Number },        // 2000
    proteinTarget: { type: String },         // "150 g"
    waterTarget: { type: String },           // "3 liters"
    meals: {
      breakfast: [{ type: String }],         // ["Oats + Eggs - 400 kcal"]
      lunch: [{ type: String }],
      dinner: [{ type: String }],
      snacks: [{ type: String }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Diet", dietSchema);