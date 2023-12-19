import React from "react";
import { Link } from "react-router-dom";
import "./AdminPageMain.scss";
import { observer } from "mobx-react-lite";
import { ALL_PROJECTS_ROUTE, CREATE_CATEGORY_ADMIN_ROUTE, CREATE_PROJECT_ADMIN_ROUTE, CREATE_SOCIAL_ADMIN_ROUTE, HOME_ROUTE } from "../../Utils/consts";

const AdminPageMain = observer(() => {
  return (
    <section className="admin-page" id="admin-page">
      <div className="container admin-page__container">
        <div className="admin-page__content">
          <h2 className="admin-page__title">Панель управления</h2>
          <ul className="admin-page__list list-reset">
            <li className="admin-page__item">
              <Link to={ALL_PROJECTS_ROUTE} className="admin-page__link">
                <div className="admin-card">
                  <h3 className="admin-card__title">Проекты</h3>
                </div>
              </Link>
            </li>
            <li className="admin-page__item">
              <Link to={CREATE_CATEGORY_ADMIN_ROUTE} className="admin-page__link">
                <div className="admin-card">
                  <h3 className="admin-card__title">Категории</h3>
                </div>
              </Link>
            </li>
            <li className="admin-page__item">
              <Link to={CREATE_SOCIAL_ADMIN_ROUTE} className="admin-page__link">
                <div className="admin-card">
                  <h3 className="admin-card__title">Соц. сети</h3>
                </div>
              </Link>
            </li>
            <li className="admin-page__item">
              <Link to={HOME_ROUTE} className="admin-page__link">
                <div className="admin-card">
                  <h3 className="admin-card__title">Вернуться на главную</h3>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
});

export default AdminPageMain;
