const signature_constants = require("../../constants/SIGNATURE");
const verifyPaymentSignature = require("./signature");

const signatureCall = (request, result) => {
  const payload = request.body;
  const signature = request.headers[signature_constants.SIGNATURE_HEADER];

  const [isValid, message] = verifyPaymentSignature(payload, signature);

  result.json({ isValid, message });
};

module.exports = { signatureCall };
