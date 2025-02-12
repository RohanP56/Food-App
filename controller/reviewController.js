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
};

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
};

//get reviews by plan id
module.exports.getPlanReviews = async function getPlanReviews(req, res) {
  try {
    let planid = req.params.id;
    let reviews = await reviewModel.find();
    reviews = reviews.filter((review) => review.plan._id == planid);
    if (reviews) {
      return res.status(200).json({
        message: "Plan reviews retrieved",
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
};

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
      review: req.body.review,
      rating: req.body.rating,
      user: req.body.user,
      plan: planId,
    });

    plan.ratingsAverage = (plan.ratingsAverage + req.body.rating) / 2;
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
};

//update review
module.exports.updateReview = async function updateReview(req, res) {
  try {
    let planid = req.params.id;
    // review id from frontend
    let id = req.body.id;
    let dataToUpdate = req.body;
    let keys = [];
    for (let key in dataToUpdate) {
      if(key == 'id'){
        continue;
      }
      keys.push(key);
    }
    let review = await reviewModel.findById(id);
    for(let i=0;i<keys.length;i++){
      review[keys[i]] = dataToUpdate[keys[i]];
    }
    await review.save();
    return res.status(200).json({
      message: "Review updated",
      data: review,
    });
  }
  catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//delete review
module.exports.deleteReview = async function deleteReview(req, res) {
  try {
    const palnid = req.params.id;
    // review id from frontend
    let id = req.body.id;
    let review = await reviewModel.findByIdAndDelete(id);
    if (review) {
      return res.status(200).json({
        message: "Review deleted",
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
};
