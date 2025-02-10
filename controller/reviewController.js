const reviewModel = require("../models/reviewModel");
const planModel = require("../models/planModel");


//get all reviews
module.exports.getAllReviews = async function getAllReviews(req, res) {
  try {
    const reviews = await reviewModel.find();
    if (reviews) {

      return res.status(200).json({
        message: "Reviews retrieved",
        data: reviews,
      });
    } else {
      return res.status(404).json({
        message: "No reviews found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

//get top 3 reviews
module.exports.getTop3Reviews = async function getTop3Reviews(req, res) {
  try {
    const reviews = await reviewModel.find().sort({ rating: -1 }).limit(3);
    if (reviews) {
      return res.status(200).json({
        message: "Top 3 reviews retrieved",
        data: reviews,
      });
    } else {
      return res.status(404).json({
        message: "No reviews found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

//get reviews by plan id
module.exports.getReviewsByPlanId = async function getReviewsByPlanId(req, res) {
  try {
    const id = req.params.id;
    const review = await reviewModel.findById({ planId: id });
    if (review) {
      return res.status(200).json({

        message: "Review retrieved",
        data: review,
      });
    } else {
      return res.status(404).json({
        message: "Review not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }

}

//create review
module.exports.createReview = async function createReview(req, res) {
  try {
    const planId = req.params.plan;
    let plan = await planModel.findById(planId);
    if (!plan) {
        return res.status(404).json({
          message: "Plan not found",
        });
      }
    let review = await reviewModel.create({
      planId: planId,
      ...req.body,
      rating: req.body.rating,
    });
    plan.reviews.push(review._id);
    await plan.updateReviews(review.rating);//update the numberOfReviews and averageReview
    await plan.save();
    return res.status(200).json({
      message: "Review created",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }

}

//update review
module.exports.updateReview = async function updateReview(req, res) {
  try {
    const reviewId = req.params.id;
    const review = await reviewModel.findByIdAndUpdate(reviewId, req.body, { new: true });
    if (review) {
      return res.status(200).json({
        message: "Review updated",
        data: review,
      });
    } else {
      return res.status(404).json({
        message: "Review not Updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}   

//delete review
module.exports.deleteReview = async function deleteReview(req, res) {
  try {
    const reviewId = req.params.id;
    const review = await reviewModel.findByIdAndDelete(reviewId);
    if (review) {
      return res.status(200).json({
        message: "Review deleted",
        data: review,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
