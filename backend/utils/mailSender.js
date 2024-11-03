const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (to, subject, htmlContent) => {
  try {
    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE, // e.g., 'gmail'
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.MAIL_USER,   // Sender email
      to,                            // Recipient email
      subject,                       // Email subject
      html: htmlContent,             // HTML email content
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed");
  }
};

module.exports = mailSender;
