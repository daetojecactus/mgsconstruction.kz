import React from "react";
import { Link } from "react-router-dom";
import { HOME_ROUTE } from "../../Utils/consts";
import './NotFoundPage.scss'

const NotFoundPage = () => {
  return (
    <section className="not-found">
      <div className="not-found__container container">
        <div className="not-found__content">
          <h2 className="not-found__title">Страница не найдена!</h2>
          <p className="not-found__descr">
            Страница устарела, была удалена или не существовала вовсе
          </p>
          <Link to={HOME_ROUTE} className="not-found__link">
            Вернуться на главную
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
