import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendEmail = async (options) => {
  if (!options.to) {
    return res.status(404).json({ message: "Recipent email is missing" });
  }
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `Your App <${process.env.EMAIL_USERNAME}>`,
    to: options.to,
    subject: options.subject,
    text: options.message,
  };

  await transport.sendMail(mailOptions);
};

export default sendEmail;
