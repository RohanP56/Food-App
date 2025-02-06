const express = require("express");
const {getUser, getAllUser, updateUser, deleteUser, } = require("../controller/userController");
const { signup, login, isAuthorized, protectRoute } = require("../controller/authController");

const app = express();
const userRouter = express.Router(); //created user router

//user can update and delete their own profile
userRouter.route("/:id")
.patch(updateUser)
.delete(deleteUser);

//signup route
userRouter
.route("/signup")
.post(signup);

//login route
userRouter
.route("/login")
.post(login);


//if a person is logged in then only he can access the userProfile
app.use(protectRoute);
userRouter
.route("/userProfile")
.get(getUser);


//All user only can be access by "Admin"
app.use(isAuthorized(["admin"]));
userRouter
.route("")
.get(getAllUser);



//exporting userRouter
module.exports = userRouter;
