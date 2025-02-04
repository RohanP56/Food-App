const express = require("express");
const userModel = require("../models/userModel");


const userRouter = express.Router(); //created user router

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

//cookies function implementation
function setCookies(req, res) {
  //res.setHeader("Set-Cookie", "isLoggedIn=true");  // here we set cookie manually
  res.cookie("isLoggedIn", true, {
    maxAge: 1000 * 60 * 60 * 24,
    secure: true,
    httpOnly: true,
  }); // set cookie using cookie parser, this cookie will be active for 1 day
  res.send("Cookies set successfully");
}

function getCookies(req, res) {
  let cookies = req.cookies;
  console.log(req.cookies);
  res.send("Cookies recieved");
}

module.exports = userRouter;
