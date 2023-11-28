const express = require("express")
const jsonwebtoken = require("jsonwebtoken")
const crypto = require("crypto")
const dotenv = require("dotenv")

// Load all environment variables 
dotenv.config();

// Get the public key from the environment variables
const publicKey = process.env.PUBLIC_KEY;

const app = express();
app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});