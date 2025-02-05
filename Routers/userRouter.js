const express = require("express");
const {protectRoute} = require("./authHelper");
const {getUsers, getUserById, postUser, updateUser, deleteUser} = require("../controller/userController");


const userRouter = express.Router(); //created user router

userRouter
  .route("/")
  .get(protectRoute, getUsers)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

//Route for cookies
userRouter.route("/getcookies").get(getCookies); 

userRouter.route("/setcookies").get(setCookies);

userRouter.route("/:id").get(getUserById);


//exporting userRouter
module.exports = userRouter;
