const express = require("express");
const {
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
  updateUserProfileImage,
} = require("../controller/userController");
const multer = require("multer");
const {
  signup,
  login,
  isAuthorized,
  protectRoute,
  forgetpassword,
  resetpassword,
  logout,
} = require("../controller/authController");

const app = express();
const userRouter = express.Router(); //created user router

//user can update and delete their own profile
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

//signup route
userRouter.route("/signup").post(signup);

//login route
userRouter.route("/login").post(login);

//upload image using multer

//set up file uplaod destination and filename
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, `user-${Date.now()}.jpeg`);
  },
});

//filter for the file type
const filter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    // if file type is image then it will be uploaded
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload a valid image"), false);
  }
};

//upload using multer
const upload = multer({
  storage: multerStorage,
  fileFilter: filter,
});

//if a person is logged in then only he can access the userProfile
userRouter.use(protectRoute);
userRouter.route("/userProfile").get(getUser);

//upload image route
userRouter.post("/ProfileImage", upload.single("photo"), updateUserProfileImage);

userRouter.get("/ProfileImage", (req, res) => {
  res.sendFile("R:/Projects/Food App/multer.html");
});

//All user only can be access by "Admin"
userRouter.use(isAuthorized(["admin"]));
userRouter.route("/").get(getAllUser);

//forgot password route
userRouter.route("/forgetPassword").post(forgetpassword);

//reset password route
userRouter.route("/resetPassword/:token").post(resetpassword);

//logout route
userRouter.route("/logout").get(logout);

//exporting userRouter
module.exports = userRouter;
