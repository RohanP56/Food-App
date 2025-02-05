//let flag = false;  // it denotes user logged-in or not
const jwt = require('jsonwebtoken');
const JWT_KEY = require("../secrets.js");



//This middleware will check if the user is logged in or not
function protectRoute(req, res, next) {
  if (req.cookies.login) {
    let isVerified = jwt.verify(req.cookies.login, JWT_KEY);

    if(isVerified){
      next();
    }
    else{
      return res.json({
        message: "User not verified",
      });
    }

  } else {
    return res.json({
      message: "Please, login to access this page",
    });
  }
}

module.exports = { protectRoute };
