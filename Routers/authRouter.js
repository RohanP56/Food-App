const express = require("express");
const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
const JWT_KEY = require("../secrets.js")
const {protectRoute} = require("./authHelper");

const authRouter = express.Router();

authRouter.route("/signup").get(getSignUp).post(postSignUp);
authRouter.route("/login").post(loginUser);

function getSignUp(req, res) {
  console.log("get signup called");
  next();
  //res.sendFile("/public/index.html", { root: __dirname });
}

async function postSignUp(req, res) {
  let dataObj = req.body; // data will come as an object
  let user = await userModel.create(dataObj);
  res.json({
    message: "user signed up",
    data: obj,
  });
}

async function loginUser(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        //bcypt --> Compare the password
        if (user.password === data.password) {
          let uid = user['_id'];  // unique ID of the user
          let token = jwt.sign({payload: uid}, JWT_KEY);
          res.cookie("login", token, {httpOnly: true}); //cookie is set

          return res.json({
            message: "User has logged in",

            userDetails: data,
          });
        } else {
          return res.json({
            message: "Wrong Password",
          });
        }
      } else {
        return res.json({
          message: "user not found",
        });
      }
    } else {
      return res.json({
        message: "Empty field found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: error,
    });
  }
}

module.exports = authRouter;
