import { createTransport } from "nodemailer";

import "dotenv/config.js";
// Log the environment variables
console.log("EMAIL_USER:", process.env.EMAIL_USER); // Check if EMAIL_USER is loaded
console.log("EMAIL_PASS:", process.env.EMAIL_PASS); // Check if EMAIL_PASS is loaded

const mailer = createTransport({
  service: "gmail",
  port: 465,
  //host: process.env.EMAIL_HOST,
  // port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: "campuslinkuor@gmail.com",
    pass: "hyrvqezseltfuqxa",
  },
});

export default mailer;
