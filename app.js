const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//middleware
app.use(express.json());
app.listen(3000);
app.use(cookieParser());


// mini application
const userRouter = require('./Routers/userRouter.js');
const authRouter = require('./Routers/authRouter.js');


//base route, router to use
app.use("/user", userRouter);
app.use("/auth", authRouter);





