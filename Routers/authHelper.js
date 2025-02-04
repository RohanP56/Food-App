//let flag = false;  // it denotes user logged-in or not

//This middleware will check if the user is logged in or not
function protectRoute(req, res, next) {
  if (req.cookies.isLoggedIn) {
    next();
  } else {
    return res.json({
      message: "Please, login to access this page",
    });
  }
}

module.exports = { protectRoute };
