const express = require("express");
const reviewRouter = express.Router();
const { protectRoute} = require("../controller/authController");
const { getAllReviews, getTop3Reviews, getPlanReviews, createReview, updateReview, deleteReview } = require("../controller/reviewController");

//get all reviews
reviewRouter
.route("/all")
.get(getAllReviews);

//top 3 reviews
reviewRouter
.route("/top3")
.get(getTop3Reviews);

//get plan reviews
reviewRouter
.route("/:id")
.get(getPlanReviews);


//create, update and delete review
reviewRouter.use(protectRoute); //These actions will be used by logged in user only
reviewRouter
.route("/crud/:plan")
.post(createReview)
.patch(updateReview)
.delete(deleteReview);




module.exports = reviewRouter;