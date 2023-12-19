// mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_MAIL, // Замените на вашу почту
    pass: process.env.MAIL_PASSWORD, // Замените на пароль от вашей почты
  },
});

const sendMail = (data) => {
  const { guestName, guestPhone, guestEmail, selectedRegion, selectedCity, guestComment } = data;

  const mailOptions = {
    from: process.env.MAIL_MAIL_FROM, // Замените на вашу почту
    to: process.env.MAIL_MAIL, // Замените на адрес, куда нужно отправлять заявки
    subject: "Новая заявка",
    html: `
      <p>Имя: ${guestName}</p>
      <p>Телефон: ${guestPhone}</p>
      <p>Email: ${guestEmail}</p>
      <p>Область: ${selectedRegion.label}</p>
      <p>Город: ${selectedCity.label}</p>
      <p>Комментарий: ${guestComment}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendMail;
