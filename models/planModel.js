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
    validate: [function () {
      return this.discount < 100;
    }, "Discount must be less price"],
  },
});

const planModel = mongoose.model("planModel", planSchema);
module.exports = planModel;

/*IIFE function to create a plan just for testing
(async function createPlan(){
    let planObj = {
        name: "SuperMeal",
        duration: 30,
        price: 1000,
        rating: 4.5,
        discount: 10,
    }
    const doc = new planModel(planObj);
    await doc.save();
})();
*/





