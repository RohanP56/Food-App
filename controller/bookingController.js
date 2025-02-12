// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51QrVInDA9RkwJyVxPy4v0P7lBNLkPJlBMnrsJsMmIyn4c4gJ5vfKwOnmdLyYbXAJEx3l7ti5q9rsXsfwutSPEiXp00WqCYXSeU"
);

const planModel = require("../models/planModel");
const userModel = require("../models/userModel");


module.exports.createSession = async function createSession(req, res) {
  try {
    let userId = req.id;
    let planId = req.params.id;

    let user = await userModel.findById(userId);
    let plan = await planModel.findById(planId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user.email,
      client_reference_id: plan.id,
      line_items: [
        {
          name: plan.name,
          description: plan.description,
          amount: plan.price * 100,
          currency: "inr",
          quantity: 1,
        },
      ],

      success_url: `${req.protocol}://${req.get("host")}/profile`,  // redirectsuccess page or home page
      cancel_url: `${req.protocol}://${req.get("host")}/profile`,   // redirect cancel page or home page
    });

    res.status(200).json({
      status: "success",
      session,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
