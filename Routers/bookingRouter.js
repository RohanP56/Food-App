const express = require("express");
const bookingRouter = express.Router();
const {protectRoute} = require("../controller/authController");
const {createSession} = require("../controller/bookingController");

bookingRouter.post("/createSession",protectRoute,createSession);
bookingRouter.get('/createSession', function(req, res){
    //sending html file for Frontend
    res.sendFile("R:/Projects/Food App/booking.html");
});

module.exports = bookingRouter;