const userModel = require("../models/userModel");



module.exports.getUsers = async function getUsers(req, res) {
  let allUsers = await userModel.find(); //find all users
  //let user = await userModel.findOne({name:"Rohan"}); //find one user
  res.json({ message: "List of all users", data: allUsers });
}

module.exports.getUserById = async function getUserById(req, res) {
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

module.exports.postUser = async function postUser(req, res) {
  users = req.body;
  req.json({

    message: "Data recived Successfully",
    user: req.body,
  });
}

module.exports.updateUser = async function updateUser(req, res) {
  //console.log(req.body);
  let dataToBeUpdate = req.body;

  for (key in dataToBeUpdate) {
    users[key] = dataToBeUpdate[key];
  }
  res.json({
    message: "Data Updated Successfully",
  });
}

module.exports.deleteUser = async function deleteUser(req, res) {
  users = {};
  res.json({

    message: "Data Deleted Successfully",
  });
}
