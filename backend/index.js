require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
//const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const checkAdminMiddleware = require("./middleware/checkAdminMiddleware");
const path = require("path");
const sendMail = require("./mail");
const { notFoundHandler, errorHandler } = require('./middleware/Handler');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);


app.post("/submit-form", (req, res) => {
  const formData = req.body;

  // Валидация и сохранение данных в базу данных, если нужно

  // Отправка уведомления на почту
  sendMail(formData);

  res.json({ success: true });
});

  
// Обработка ошибок, последний Middleware
app.use(errorHandler);
app.use(notFoundHandler);


const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
