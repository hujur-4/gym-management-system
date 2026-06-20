const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: String },
  reps: { type: String },
  rest: { type: String },
  difficulty: {
    type: String,
    enum: ["Easy", "Moderate", "Hard"],
  },
}, { _id: false });

const dayPlanSchema = new mongoose.Schema({
  day: { type: String, required: true },     // "Monday"
  focus: { type: String, required: true },   // "Chest + Triceps"
  exercises: [exerciseSchema],
}, { _id: false });

const workoutSchema = new mongoose.Schema(
  {
    goal: {
      type: String,
      required: true,
      unique: true,
      enum: ["Weight Loss", "Weight Gain", "Fitness"],
    },
    summary: { type: String },          // "Cardio heavy, HIIT, light weights"
    weeklyPlan: [dayPlanSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);