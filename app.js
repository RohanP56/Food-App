const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userModel = require("./models/userModel");

//middleware
app.use(express.json());
app.listen(3000);
app.use(cookieParser());

/*let users = [
  {
    id: 1,
    name: "Rohan",
  },
  {
    id: 2,
    name: "Jasbir",
  },
  {
    id: 3,
    name: "Kartik",
  },
];*/

// mini application
const userRouter = express.Router();
const authRouter = express.Router();

//base route, router to use
app.use("/user", userRouter);
app.use("/auth", authRouter);

userRouter
  .route("/")
  .get(getUsers)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

//Route for cookies
userRouter.route("/getcookies").get(getCookies);
userRouter.route("/setcookies").get(setCookies);

userRouter.route("/:id").get(getUserById);

authRouter.route("/signup").get(getSignUp).post(postSignUp);

async function getUsers(req, res) {
  let allUsers = await userModel.find(); //find all users
  //let user = await userModel.findOne({name:"Rohan"}); //find one user
  res.json({ message: "List of all users", data: allUsers });
}

function getUserById(req, res) {
  //console.log(req.params.id);
  let paramId = req.params.id;
  let obj = {};
  for (let i = 0; i < users.length; i++) {
    if (users[i]["id"] == paramId) {
      obj = users[i];
    }
  }
  res.json({
    obj,
  });
}

function postUser(req, res) {
  users = req.body;
  req.json({
    message: "Data recived Successfully",
    user: req.body,
  });
}

function updateUser(req, res) {
  //console.log(req.body);
  let dataToBeUpdate = req.body;
  for (key in dataToBeUpdate) {
    users[key] = dataToBeUpdate[key];
  }
  res.json({
    message: "Data Updated Successfully",
  });
}

function deleteUser(req, res) {
  users = {};
  res.json({
    message: "Data Deleted Successfully",
  });
}

function getSignUp(req, res) {
  res.sendFile("/public/index.html", { root: __dirname });
}

function postSignUp(req, res) {
  let obj = req.body; // data will come as an object
  console.log("Object Recived from frontend: ", obj);
  res.json({
    message: "user signed up",
    data: obj,
  });
}

//cookies function implementation
function setCookies(req, res) {
  //res.setHeader("Set-Cookie", "isLoggedIn=true");  // here we set cookie manually
  res.cookie("isLoggedIn", true, {maxAge: 1000*60*60*24, secure: true, httpOnly: true});  // set cookie using cookie parser, this cookie will be active for 1 day
  res.send("Cookies set successfully");
}

function getCookies(req, res) {
  let cookies = req.cookies;
  console.log(req.cookies);
  res.send("Cookies recieved");
}
