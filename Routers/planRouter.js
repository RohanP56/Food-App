const express = require("express");
const app = express();
const planRouter = express.Router();
const { protectRoute, isAuthorized } = require("../controller/authController");
const { getAllPlans, getPlan, createPlan, updatePlan, deletePlan, top3Plan } = require("../controller/planContoller");

//for all plans
planRouter
.route("/allPlans")
.get(getAllPlans);

//for one particular plan   ----> Logged in user can access this
planRouter.use(protectRoute); //this middleware will check if the user is logged in or not
planRouter
.route("/plan/:id")
.get(getPlan);

//for create, update, delete plan only can be used by admin or restaurant owner
planRouter.use(isAuthorized(["admin", "restaurantOwner"]));
planRouter
.route("/crudPlan")
.post(createPlan);

planRouter
.route("/crudPlan/:id")
.patch(updatePlan)
.delete(deletePlan);


//for top 3 plans
planRouter
.route("/top3")
.get(top3Plan); 


module.exports = planRouter;
