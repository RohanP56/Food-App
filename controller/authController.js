const express = require("express");
const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const JWT_KEY = require("../secrets.js");

//signup controller
module.exports.signup = async function signup(req, res) {
  try {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    if (user) {
      res.json({
        message: "user signed up",
        data: user,
      });
    } else {
      res.json({
        message: "error while signup",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//login controller
module.exports.login = async function login(req, res) {
  try {
    let data = req.body;

    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        if (user.password === data.password) {
          let uid = user["_id"];
          let token = jwt.sign({ payload: uid }, JWT_KEY);
          res.cookie("login", token, { httpOnly: true });
          return res.json({
            message: "User has logged in",
            userDetails: data,
          });
        } else {
          return res.json({
            message: "Wrong Credentials",
          });
        }
      } else {
        return res.json({
          message: "User not found",
        });
      }
    } else {
      return res.json({
        message: "Email is required",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//isAuthorized controller -> check if the user is authorized to access the resource
module.exports.isAuthorized = function isAuthorized(roles) {
  return function (req, res, next) {
    if (roles.includes(req.role) == true) {
      //check if the user role is in the roles array then only call the next middleware
      next();
    } else {
      res.status(401).json({
        message: "operation not allowed",
      });
    }
  };
};

//This middleware will check if the user is logged in or not
module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    let token;
    if (req.cookies.login) {

      token = req.cookies.login;
      let payload = jwt.verify(token, JWT_KEY);
      if (payload) {
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        next();
      } else {
        return res.json({
          message: "Please, login again",
        });
      }

    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
}
