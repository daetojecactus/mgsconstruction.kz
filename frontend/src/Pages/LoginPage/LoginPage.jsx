import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../http/userAPI";
import { ADMIN_ROUTE } from "../../Utils/consts";
import "./LoginPage.scss";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await login(username, password);
      console.log("Logged in user:", user);
      // Вход успешен, выполните перенаправление на другую страницу,
      navigate(ADMIN_ROUTE);
    } catch (error) {
      console.error("Error logging in:", error);
      // Обработайте ошибку входа здесь
    }
  };

  return (
    <section className="login">
      <div className="login__container container">
        <div className="login__content">
          <div className="login-intro">
            <img src="/images/logo.png" alt="Логотип" className="login-intro__logo" />
            <h2 className="login-intro__title">Войти в панель управления</h2>
          </div>
          <div className="login-form">
            <label
              htmlFor="login-form__input--username"
              className="login-form__label"
            >
              Пользователь
            </label>
            <input
              id="login-form__input--username"
              className="login-form__input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label
              htmlFor="login-form__input--password"
              className="login-form__label"
            >
              Пароль
            </label>
            <input
              id="login-form__input--password"
              className="login-form__input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="login-form__wrapper">
            <button className="login-form__btn btn-reset" onClick={handleLogin}>
              Войти
            </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
