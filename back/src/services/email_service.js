require('dotenv').config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendOTP = async(otp, email) => {
    transporter.sendMail(
        {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Tour login code for WorkNest",
          text: `Tour login code for WorkNest: ${otp}`,
        },
        (err, info) => {
          if (err) {
            throw new Error(`Email sending error: ${err}`);
          }
          console.log("Email sended:", info.response);
        }
    );
}
