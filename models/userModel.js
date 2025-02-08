const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const emailValidator = require("email-validator");

//database connection
const db_link =
  "mongodb+srv://admin:30Rm0SDcjdyMJP1y@cluster0.zs2x3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(db_link)
  .then(function (db) {
    //console.log(db);
    console.log("Database connected");
  })
  .catch(function (err) {
    console.log(err);
  });

//user schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: function () {
      return this.isNew; // Only required when creating a new user not requires when updating
    },
  },
  role: {
    type: String,
    enum: ["admin", "user", "restaurantowner", "deliveryperson"],
    default: "user",
  },
  profileImage: {
    type: String,
    default: "", ///default image from public folder
  },
  resetToken: String,
});

//we don't want to save the confirmPassword in the database
userSchema.pre("save", function () {
  this.confirmPassword = undefined; // if we do anything undefineed then it will not be stored in DB
});

//generating salt and hashing the password
userSchema.pre("save", function () {
  let salt = bcrypt.genSaltSync();
  let hashedString = bcrypt.hashSync(this.password, salt);
  //console.log(hashedString);
  this.password = hashedString;
});


//implementing reset token
userSchema.methods.createResetToken = function () {
  //creating unique token using npm crypto
  let resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = resetToken; // that will store on schema
  return resetToken;
};

//verifying reset token
userSchema.methods.resetPasswordHandler = function (password, confirmPassword) {
  this.password = password;
  this.confirmPassword = confirmPassword;
  this.resetToken = undefined;
};

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
