const express = require("express");
const make_order_routes = require("./make_order.routes");
const orders_route = express.Router();

orders_route.use('/', make_order_routes)

module.exports = { make_order_routes };
