const crypto = require("crypto");
const dotenv = require("dotenv");
const signature_constants = require("../../constants/SIGNATURE");
const singature_public_key = require("../../constants/PUBLIC_KEY");

// Load all envirronement variables
dotenv.config();

// Get the public key from the environment variables
const publicKey = process.env.PUBLIC_KEY;

const verifyPaymentSignature = (payload, signature, publicKey) => {
  if (!signature) {
    return [false, signature_constants.SIGNATURE_NOT_PROVIDED];
  }

  try {
    // Decode the signature from base64
    const signatureBytes = Buffer.from(signature, "base64");

    // Serialize the payload to JSON
    const payloadJson = JSON.stringify(payload);

    // Verify the signature using the public key
    const verified = crypto.verify(
      "sha256",
      Buffer.from(payloadJson),
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST,
      },
      signatureBytes
    );

    if (verified) {
      return [true, signature_constants.SIGNATURE_VERIFICATION_SUCCED];
    } else {
      return [false, signature_constants.SIGNATURE_VERIFICATION_FAILED];
    }
  } catch (error) {
    console.log(error);
    return [false, singature_public_key.LOAD_ERROR];
  }
};

module.exports = { verifyPaymentSignature };
