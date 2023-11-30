const express = require("express");
const dotenv = require("dotenv");

// Load all envirronement variables
dotenv.config();

// Get the uzaversePaymentUrl from the environment variables
const uzaversePaymentUrl = process.env.UZAVERSE_PAY_PAYMENT_URL;

const makePayment = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(response_code.INTERNAL_SERVER_ERROR).json({
      statusCode: response_code.INTERNAL_SERVER_ERROR,
      httpStatus: response_statut.INTERNAL_SERVER_ERROR,
      message: "Internal server error, please try again",
    });
  }
};

module.exports = { makePayment };
