require("dotenv").config();
const mongoose = require("mongoose");
const Workout = require("./models/Workout");
const Diet = require("./models/Diet");

const MONGO_URI = process.env.MONGO_URI;

const workoutData = [
  {
    goal: "Weight Gain",
    summary: "Heavy weights, compound movements",
    weeklyPlan: [
      {
        day: "Monday",
        focus: "Chest + Triceps",
        exercises: [
          { name: "Bench Press", sets: "4", reps: "8-10", rest: "90 sec", difficulty: "Hard" },
          { name: "Incline Press", sets: "3", reps: "10", rest: "75 sec", difficulty: "Moderate" },
          { name: "Dips", sets: "3", reps: "10-12", rest: "60 sec", difficulty: "Moderate" },
          { name: "Tricep Pushdown", sets: "3", reps: "12", rest: "45 sec", difficulty: "Easy" },
        ],
      },
      {
        day: "Tuesday",
        focus: "Back + Biceps",
        exercises: [
          { name: "Pull-ups", sets: "4", reps: "8-10", rest: "90 sec", difficulty: "Hard" },
          { name: "Barbell Rows", sets: "4", reps: "8-10", rest: "75 sec", difficulty: "Moderate" },
          { name: "Lat Pulldown", sets: "3", reps: "10-12", rest: "60 sec", difficulty: "Moderate" },
          { name: "Barbell Curls", sets: "3", reps: "10", rest: "45 sec", difficulty: "Easy" },
        ],
      },
      {
        day: "Wednesday",
        focus: "Rest / Light Stretching",
        exercises: [
          { name: "Stretching", sets: "-", reps: "15-20 min", rest: "-", difficulty: "Easy" },
        ],
      },
      {
        day: "Thursday",
        focus: "Legs",
        exercises: [
          { name: "Squats", sets: "4", reps: "8-10", rest: "90 sec", difficulty: "Hard" },
          { name: "Leg Press", sets: "3", reps: "10-12", rest: "75 sec", difficulty: "Moderate" },
          { name: "Lunges", sets: "3", reps: "12 each leg", rest: "60 sec", difficulty: "Moderate" },
          { name: "Calf Raises", sets: "3", reps: "15", rest: "45 sec", difficulty: "Easy" },
        ],
      },
      {
        day: "Friday",
        focus: "Shoulders",
        exercises: [
          { name: "Overhead Press", sets: "4", reps: "8-10", rest: "90 sec", difficulty: "Hard" },
          { name: "Lateral Raises", sets: "3", reps: "12", rest: "45 sec", difficulty: "Easy" },
          { name: "Rear Delt Fly", sets: "3", reps: "12", rest: "45 sec", difficulty: "Easy" },
        ],
      },
      {
        day: "Saturday",
        focus: "Full Body Light Session",
        exercises: [
          { name: "Light Weight Training", sets: "3", reps: "12-15", rest: "60 sec", difficulty: "Easy" },
        ],
      },
      {
        day: "Sunday",
        focus: "Rest",
        exercises: [],
      },
    ],
  },

  {
    goal: "Weight Loss",
    summary: "Cardio heavy, HIIT, light weights",
    weeklyPlan: [
      {
        day: "Monday",
        focus: "Cardio + HIIT",
        exercises: [
          { name: "Jogging", sets: "-", reps: "30 min", rest: "-", difficulty: "Moderate" },
          { name: "Jumping Jacks", sets: "3", reps: "20", rest: "30 sec", difficulty: "Easy" },
          { name: "HIIT Sprints", sets: "15-20 rounds", reps: "30 sec on / 30 sec off", rest: "-", difficulty: "Hard" },
        ],
      },
      {
        day: "Tuesday",
        focus: "Strength Training (Upper Body)",
        exercises: [
          { name: "Push-ups", sets: "3", reps: "15", rest: "45 sec", difficulty: "Moderate" },
          { name: "Dumbbell Rows", sets: "3", reps: "12", rest: "45 sec", difficulty: "Moderate" },
          { name: "Light Shoulder Press", sets: "3", reps: "12", rest: "45 sec", difficulty: "Easy" },
        ],
      },
      {
        day: "Wednesday",
        focus: "Cardio (Cycling/Swimming)",
        exercises: [
          { name: "Cycling", sets: "-", reps: "40 min", rest: "-", difficulty: "Moderate" },
        ],
      },
      {
        day: "Thursday",
        focus: "Strength Training (Lower Body)",
        exercises: [
          { name: "Bodyweight Squats", sets: "3", reps: "20", rest: "45 sec", difficulty: "Moderate" },
          { name: "Lunges", sets: "3", reps: "15 each leg", rest: "45 sec", difficulty: "Moderate" },
          { name: "Glute Bridges", sets: "3", reps: "15", rest: "30 sec", difficulty: "Easy" },
        ],
      },
      {
        day: "Friday",
        focus: "HIIT",
        exercises: [
          { name: "Burpees", sets: "4", reps: "15", rest: "30 sec", difficulty: "Hard" },
          { name: "Mountain Climbers", sets: "4", reps: "30 sec", rest: "30 sec", difficulty: "Hard" },
        ],
      },
      {
        day: "Saturday",
        focus: "Walking + Core",
        exercises: [
          { name: "Brisk Walking", sets: "-", reps: "45 min", rest: "-", difficulty: "Easy" },
          { name: "Plank", sets: "3", reps: "45 sec", rest: "30 sec", difficulty: "Moderate" },
        ],
      },
      {
        day: "Sunday",
        focus: "Rest / Light Walk",
        exercises: [
          { name: "Light Walking", sets: "-", reps: "20 min", rest: "-", difficulty: "Easy" },
        ],
      },
    ],
  },

  {
    goal: "Fitness",
    summary: "Mix of cardio + strength",
    weeklyPlan: [
      {
        day: "Monday",
        focus: "Chest + Triceps",
        exercises: [
          { name: "Bench Press", sets: "3", reps: "10", rest: "60 sec", difficulty: "Moderate" },
          { name: "Push-ups", sets: "3", reps: "15", rest: "45 sec", difficulty: "Moderate" },
          { name: "Dips", sets: "3", reps: "10", rest: "45 sec", difficulty: "Moderate" },
        ],
      },
      {
        day: "Tuesday",
        focus: "Cardio",
        exercises: [
          { name: "Jogging", sets: "-", reps: "25 min", rest: "-", difficulty: "Moderate" },
        ],
      },
      {
        day: "Wednesday",
        focus: "Back + Biceps",
        exercises: [
          { name: "Pull-ups", sets: "3", reps: "8-10", rest: "60 sec", difficulty: "Moderate" },
          { name: "Barbell Rows", sets: "3", reps: "10", rest: "60 sec", difficulty: "Moderate" },
          { name: "Dumbbell Curls", sets: "3", reps: "12", rest: "45 sec", difficulty: "Easy" },
        ],
      },
      {
        day: "Thursday",
        focus: "Core + Abs",
        exercises: [
          { name: "Hanging Leg Raises", sets: "3", reps: "12", rest: "45 sec", difficulty: "Hard" },
          { name: "Cable Crunches", sets: "3", reps: "15", rest: "45 sec", difficulty: "Moderate" },
          { name: "Plank", sets: "3", reps: "45 sec", rest: "30 sec", difficulty: "Moderate" },
          { name: "Russian Twists", sets: "3", reps: "20", rest: "30 sec", difficulty: "Moderate" },
        ],
      },
      {
        day: "Friday",
        focus: "Shoulders + Legs",
        exercises: [
          { name: "Overhead Press", sets: "3", reps: "10", rest: "60 sec", difficulty: "Moderate" },
          { name: "Lateral Raises", sets: "3", reps: "12", rest: "45 sec", difficulty: "Easy" },
          { name: "Squats", sets: "3", reps: "12", rest: "60 sec", difficulty: "Moderate" },
        ],
      },
      {
        day: "Saturday",
        focus: "Mixed Cardio + Strength",
        exercises: [
          { name: "Cycling", sets: "-", reps: "20 min", rest: "-", difficulty: "Moderate" },
          { name: "Bodyweight Circuit", sets: "3 rounds", reps: "Squats, Push-ups, Lunges", rest: "60 sec", difficulty: "Moderate" },
        ],
      },
      {
        day: "Sunday",
        focus: "Rest / Stretching",
        exercises: [
          { name: "Stretching", sets: "-", reps: "15-20 min", rest: "-", difficulty: "Easy" },
        ],
      },
    ],
  },
];

const dietData = [
  {
    goal: "Weight Gain",
    focus: "High calorie, high protein, more carbs",
    caloriesTarget: 2950,
    proteinTarget: "140 g",
    waterTarget: "3-4 liters",
    meals: {
      breakfast: ["Oats + Milk + Banana - 600 kcal", "4 Eggs + Bread - 500 kcal"],
      lunch: ["Rice + Chicken - 700 kcal"],
      dinner: ["Paneer + Chapati - 600 kcal"],
      snacks: ["Peanut Butter Sandwich - 400 kcal", "Milk Before Bed - 150 kcal"],
    },
  },
  {
    goal: "Weight Loss",
    focus: "Low calorie, high protein, less carbs",
    caloriesTarget: 1950,
    proteinTarget: "154 g",
    waterTarget: "3 liters",
    meals: {
      breakfast: ["Oats + Eggs - 400 kcal"],
      lunch: ["Chicken + Salad - 500 kcal"],
      dinner: ["Fish + Vegetables - 500 kcal"],
      snacks: ["Fruit - 150 kcal", "Greek Yogurt - 200 kcal", "Protein Shake - 200 kcal"],
    },
  },
  {
    goal: "Fitness",
    focus: "Balanced macros, clean eating",
    caloriesTarget: 2400,
    proteinTarget: "130-150 g",
    waterTarget: "3 liters",
    meals: {
      breakfast: ["Oats + Eggs + Fruit - 450 kcal"],
      lunch: ["Brown Rice + Chicken + Vegetables - 600 kcal"],
      dinner: ["Grilled Fish/Paneer + Salad + Chapati - 550 kcal"],
      snacks: ["Greek Yogurt - 150 kcal", "Mixed Nuts - 170 kcal", "Protein Shake - 200 kcal"],
    },
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

    for (const w of workoutData) {
      await Workout.findOneAndUpdate({ goal: w.goal }, w, { upsert: true, new: true });
      console.log(`Workout seeded: ${w.goal}`);
    }

    for (const d of dietData) {
      await Diet.findOneAndUpdate({ goal: d.goal }, d, { upsert: true, new: true });
      console.log(`Diet seeded: ${d.goal}`);
    }

    console.log("Seeding complete ✅");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();