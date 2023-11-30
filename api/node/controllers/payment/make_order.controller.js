const express = require("express");
const bodyParser = require("body-parser");
const signatureCall = require("../../helpers/payment/singature_call");
const response_code = require("../../constants/RESPONSE_CODE");
const response_statut = require("../../constants/RESPONSE_STATUT");

const makeOrder = async (req, res) => {
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

module.exports = { makeOrder };
