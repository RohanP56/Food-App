const userModel = require("../models/userModel");

//fetch one user by id
module.exports.getUser = async function getUser(req, res) {
  let id = req.params.id;
  let user = await userModel.findById(id); //find one user by id
  if (user) {
    return res.json(user);
  } else {
    return res.json({
      message: "User not found",
    });
  }
};

//update user by id
module.exports.updateUser = async function updateUser(req, res) {
  try {
    let id = req.params.id;
    let dataToBeUpdate = req.body;
    let user = await userModel.findById(id);
    if (user) {
      let keys = [];
      for (let key in dataToBeUpdate) {
        keys.push(key);
      }
      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToBeUpdate[keys[i]];
      }
      const updatedData = await user.save();
      res.json({
        message: "Data Updated Successfully",
        data: user,
      });
    } else {
      res.json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.json({
      message: "Error in updating data",
      error: error,
    });
  }
};


//delete user by id
module.exports.deleteUser = async function deleteUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id);
    if(user){
      res.json({
        message: "Data Deleted Successfully",
        data: user,
      });
    }else{
      res.json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};


// get all users
module.exports.getAllUser = async function getAllUser(req, res) {
  try {
    let users = await userModel.find();
    if(users){
      res.json({
        message: "List of all users",
        data: users,
      })
    }else{
      res.json({
        message: "No users found",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};


//update user profile image
module.exports.updateUserProfileImage = async function updateUserProfileImage(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.findById(id);
    if(user){
      user.profileImage = req.file.path;
      await user.save();
      res.json({
        message: "Profile image updated successfully",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
}


/*
module.exports.postUser = async function postUser(req, res) {
  users = req.body;
  req.json({

    message: "Data recived Successfully",
    user: req.body,
  });
}*/




