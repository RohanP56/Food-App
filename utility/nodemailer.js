const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports.sendMail = async function sendMail(str, data) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "rp3003857@gmail.com",
      pass: "dltt nyde dzpt mczf",
    },
  });

  var Osubject, Ohtml;

  if (str == "signup") {
    Osubject = `Welcome to Food App ${data.name}`;
    Ohtml = `<h1>Welcome to FoodApp.com</h1>
    Have a great day!
    Here are your details--
    Name: ${data.name}
    Email: ${data.email}`;
  } 
  else if (str == "forgetpassword") {
    Osubject = `Reset Password`;
    Ohtml = `
    <h1>Reset Password</h1>
    Here is your link to set new password!
    ${data.resetPasswordLink}`;
  }

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Food App 🍕" <rp3003857@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: Osubject, // Subject line
    //text: "Hello world?", // plain text body
    html: Ohtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};
