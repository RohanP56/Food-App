const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");
require("dotenv").config();
const JWT_KEY = process.env.JWT_KEY; // Use environment variables

// Signup Controller
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
        let isMatch = await bcrypt.compare(data.password, user.password);
        if (isMatch) {
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
        console.log("payload: ", payload);
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        console.log("req.id: ", req.id);
        console.log("req.role: ", req.role);
        next();
      } else {
        return res.json({
          message: "Please, login again",
        });
      }
    } else {
      res.json({
        message: "Please, login to access this page",
      });
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

//forget password
module.exports.forgetpassword = async function forgetpassword(req, res) {
  let { email } = req.body;
  try {
    let user = await userModel.findOne({ email: email });

    if (user) {
      //createResetToken is used to create a new token
      const resetToken = user.createResetToken();
      //http://localhost:3000/resetPassword/${resetToken} --> reset password link will look like this
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}/resetPassword/${resetToken}`;
      //send email to user
      //nodemailer ---> Do it later
    } else {
      return res.json({
        message: "Please signup first",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//reset password
module.exports.resetpassword = async function resetpassword(req, res) {
  try {
    const { token } = req.params.token;
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      //resetPasswordHandler will upadte users password in database
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      return res.json({
        message: "Password reset successfully, please login again",
      });
    } else {
      return res.json({
        message: "Invalid token",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }

};
