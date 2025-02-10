const mongoose = require("mongoose");

//database connection
const db_link =
  "mongodb+srv://admin:30Rm0SDcjdyMJP1y@cluster0.zs2x3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("Plan Database connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, "Plan name must be less than 20 characters"],
  },
  duration: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: [true, "Enter the price"],
  },
  ratingsAverage: {
    type: Number,
    max: 5,
    min: 1,
    default: 3,
  },

  discount: {
    type: Number,
    validate: [
      function () {
        return this.discount < 100;
      },
      "Discount must be less price",
    ],
  },

  numberOfReviews: {
    type: Number,
    default: 0,
  },

  averageReview: {
    type: Number,
    default: 0, // Default to 0 before any reviews
  },
});

// Function to update numberOfReviews and averageReview
planSchema.methods.updateReviews = async function (newReviewRating) {
  this.numberOfReviews += 1;
  //this.averageReview = newReviewRating;
  // Calculate new average review rating
  this.averageReview =
    (this.averageReview * (this.numberOfReviews - 1) + newReviewRating) /
    this.numberOfReviews;

  await this.save();
};

const planModel = mongoose.model("planModel", planSchema);
module.exports = planModel;
