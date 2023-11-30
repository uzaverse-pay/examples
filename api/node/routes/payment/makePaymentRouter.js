const express = require("express");
const make_payment = require("./make_payment.routes");
const payments_routes = express.Router();

payments_routes.use('/', make_payment)

module.exports = { make_payment };
