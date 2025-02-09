const planModel = require("../models/planModel");


//for all plans
module.exports.getAllPlans = async function getAllPlans(req, res) {
  try {
    let plans = await planModel.find();
    if (plans) {
      return res.status(200).json({
        message: "All plans retrieved successfully",
        data: plans,
      });
    } else {
      return res.status(404).json({
        message: "No plans found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      //message: "Internal server error",
      message: error.message,
    });
  }
};

//for one particular plan
module.exports.getPlan = async function getPlan(req, res) {
  try {
    let id = req.params.id;
    let plan = await planModel.findById(id);
    if (plan) {
      return res.status(200).json({
        message: "Plan retrieved successfully",
        data: plan,
      });

    } else {
        return res.status(404).json({
        message: "Plan not found",
      });
    }

  } catch (error) {
    return res.status(500).json({
      //message: "Internal server error",
      message: error.message,
    });
  }
};

//for create plan
module.exports.createPlan = async function createPlan(req, res) {
  try {
    let planData = req.body;
    let createdPlan = await planModel.create(planData);
    return res.status(201).json({
      message: "Plan created successfully",
      data: createdPlan,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

//for update plan
module.exports.updatePlan = async function updatePlan(req, res) {
  try {
    let id = req.params.id;
    let dataToBeUpdated = req.body;
    let keys = [];
    for (let key in dataToBeUpdated) {  
      if (dataToBeUpdated[key] !== undefined) {
        keys.push(key);
      }
    }
    let plan = await planModel.findById(id);
    for (let key of keys) {
      plan[key] = dataToBeUpdated[key];
    }
    await plan.save();
    return res.status(200).json({
      message: "Plan updated successfully",
      data: plan,
    });
  } 
  catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

//for delete plan
module.exports.deletePlan = async function deletePlan(req, res) {
  try {
    let id = req.params.id;
    let deletedPlan = await planModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Plan deleted successfully",
      data: deletedPlan,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}


//for top 3 plans
module.exports.top3Plan = async function top3Plan(req, res) {
  try {
    let plans = await planModel.find().sort({ ratingsAverage: -1 }).limit(3);
    return res.status(200).json({
      message: "Top 3 plans retrieved successfully",
      data: plans,

    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
