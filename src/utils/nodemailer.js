import nodemailer from "nodemailer";
import { NODEMAILER_PASSWORD, NODEMAILER_USER } from "../config/app.config.js";

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASSWORD,
  },
});

const sendEmail = ({ to, subject, html, attachments }) => {
  const mailOptions = {
    from: NODEMAILER_USER,
    to,
    subject,
    html,
    attachments,
  };

  return transport.sendMail(mailOptions);
};

export default sendEmail;
