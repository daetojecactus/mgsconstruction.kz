const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserController {
  async login(req, res, next) {
    const { username, password } = req.body;
    try {
      const adminUsername = process.env.ADMIN_USERNAME;
      const adminPassword = process.env.ADMIN_PASSWORD;
      const SECRET_KEY = process.env.SECRET_KEY;

      if (username === adminUsername && password === adminPassword) {
        // После успешной авторизации, установите административный статус пользователю
        const user = { username: adminUsername, isAdmin: true };
        const token = jwt.sign(user, SECRET_KEY, {
          expiresIn: "1h",
        });
        res.json({ token });
      } else {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
}

module.exports = new UserController();
