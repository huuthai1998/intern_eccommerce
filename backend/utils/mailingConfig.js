const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

async function sendVerificationEmail(email, url) {
  let info = await transporter.sendMail({
    from: "Nguyen Huu Thai <huuthai1998@gmail.com>",
    to: email,
    subject: "AWARE email verification",
    html: `<p>Thank you for signing up for AWARE. Please click on this link to verify your email</p><a href=${url}>${url}</a>`,
  });
  console.log("Message sent: %s", info.messageId);
}

async function resetPasswordEmail(email, url) {
  let info = await transporter.sendMail({
    from: "Nguyen Huu Thai <huuthai1998@gmail.com>",
    to: email,
    subject: "AWARE reset password",
    html: `<p>Please click on this link to reset your password</p><a href=${url}>${url}</a>`,
  });
  console.log("Message sent: %s", info.messageId);
}

async function orderConfirmationEmail(email, subTotal, product) {
  let info = await transporter.sendMail({
    from: "Nguyen Huu Thai <huuthai1998@gmail.com>",
    to: email,
    subject: "AWARE order confirmation",
    html: `<p>Thank you for shopping with us. You ordered "${product}"</p> <br /> The order total is : $${subTotal}`,
  });
  console.log("Message sent: %s", info.messageId);
}

module.exports = {
  sendVerificationEmail,
  resetPasswordEmail,
  orderConfirmationEmail,
};
