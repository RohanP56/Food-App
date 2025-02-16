const mongoose = require("mongoose");
require('dotenv').config();


//database connection
const db_link = process.env.DB_LINK;
mongoose
  .connect(db_link)
  .then(function (db) {
    //console.log(db);
    console.log("Database connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "Review is required"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Rating is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "userModel",
    required: [true, "User review must belong to a user"],
  },
  plan: {
    type: mongoose.Schema.ObjectId,
    ref: "planModel",
    required: [true, "Review must belong to a plan"],
  },
});

//populate the user and plan
reviewSchema.pre(/^find/, function (next) {
  //populate means add data from other schema to the current schema
  this.populate({
    path: "user",
    select: "name profileImage",
  }).populate("plan");
  next();
});

const reviewModel = mongoose.model("reviewModel", reviewSchema);
module.exports = reviewModel;
