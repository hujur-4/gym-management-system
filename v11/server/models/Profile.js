const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,        // one profile per user
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    height: {
      type: Number,        // in cm
      required: true,
    },
    weight: {
      type: Number,        // in kg
      required: true,
    },
    address: {
      type: String,
    },
    emergencyContact: {
      type: String,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    fitnessGoal: {
      type: String,
      enum: ["Weight Loss", "Weight Gain", "Fitness"],
    },
    photo: {
      type: String,        // stores image URL or base64
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);