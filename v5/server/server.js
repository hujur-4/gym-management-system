const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");
const Member = require("./models/Member"); // create this model file as described
const jwt=require("jsonwebtoken");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuration
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Missing MONGO_URI in .env. Set MONGO_URI and restart.");
  process.exit(1);
}

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Server is Running");
});

// --- Auth Routes ---

// Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
    const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET, 
            { expiresIn: "1d" }    
    );
    res.status(200).json({
      message: "Login Successful",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
      token 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Register Route
app.post("/api/register", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ fullname, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// --- Member CRUD Routes ---

// Create member
app.post("/api/members", async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    console.error("Create member error:", err);
    res.status(400).json({ message: err.message });
  }
});

// Get all members
app.get("/api/members", async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    console.error("Get members error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get single member
app.get("/api/members/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (err) {
    console.error("Get member error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update member
app.put("/api/members/:id", async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (err) {
    console.error("Update member error:", err);
    res.status(400).json({ message: err.message });
  }
});

// Delete member
app.delete("/api/members/:id", async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Member deleted" });
  } catch (err) {
    console.error("Delete member error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully:", mongoose.connection.name);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  });

// Global error handlers
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});