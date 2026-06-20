const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    membershipType: { type: String, enum: ["Standard", "Premium", "VIP"], default: "Standard" },
    membershipStartDate: { type: Date },
    membershipEndDate: { type: Date },
    status: { type: String, enum: ["active", "inactive", "cancelled"], default: "active" },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
