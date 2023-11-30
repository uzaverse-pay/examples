const express = require("express");
const make_order_controller = require("../../controllers/payment/make_order.controller");
const make_order_routes = express.Router();

make_order_routes.post("/", make_order_controller.makeOrder);

module.exports = { make_order_routes };
