const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware для проверки токена и административного статуса
function checkAdmin(req, res, next) {
  const token = req.header("x-auth-token"); // Предполагается, что токен передается в заголовке запроса

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded.isAdmin) {
      return res.status(403).json({ error: "Access denied. Not an admin." });
    }

    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).json({ error: "Invalid token." });
  }
}

module.exports = checkAdmin;