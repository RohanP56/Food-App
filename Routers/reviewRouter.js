const express = require("express");
const reviewRouter = express.Router();
const { protectRoute} = require("../controller/authController");

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


//create review
reviewRouter.use(protectRoute) //These actions will be used by logged in user only
reviewRouter
.route("/crud")
.post(createReview);


//update and delete review
reviewRouter
.route("/crud/:id")
.patch(updateReview)
.delete(deleteReview);




module.exports = reviewRouter;