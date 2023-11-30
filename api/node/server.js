const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "./.env") });

// project imports
const response_code = require("../../constants/RESPONSE_CODE");
const response_statut = require("../../constants/RESPONSE_STATUT");
const orders = require("../node/routes/payment/makeOrderRouter");
const payments = require("../node/routes/payment/makePaymentRouter");

const app = express();

app.use(cors());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// routes 
app.use("/makeOrder", orders);
app.use("/makePayment", payments);

app.all("*", (req, res) => {
  res.status(response_code.NOT_FOUND).json({
    statusCode: response_code.NOT_FOUND,
    httpStatus: response_statut.NOT_FOUND,
    message: "Error Route not Found",
    result: [],
  });
});