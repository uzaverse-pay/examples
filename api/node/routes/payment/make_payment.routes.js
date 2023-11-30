const express = require("express");
const make_payment_controller = require("../../controllers/payment/make_payment.controller");
const make_payment_routes = express.Router();

make_payment_routes.post("/", make_payment_controller.makePayment);

module.exports = { make_payment_routes };
