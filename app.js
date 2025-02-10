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
const planRouter = require('./Routers/planRouter.js');
const reviewRouter = require('./Routers/reviewRouter.js');
//const authRouter = require('./routers/authRouter.js');


//base route, router to use
app.use("/user", userRouter);
app.use("/plans", planRouter);
app.use("/reviews", reviewRouter);
//app.use("/auth", authRouter);





