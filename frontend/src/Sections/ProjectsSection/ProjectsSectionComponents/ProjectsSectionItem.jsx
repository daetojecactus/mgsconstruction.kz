import React from "react";
import { useNavigate } from "react-router-dom";
import { PROJECT_ROUTE } from "../../../Utils/consts";
import { useLanguage, changeLanguage } from "../../../Hooks/LanguageContext";
import { observer } from "mobx-react-lite";
import ProjectPageData from "../../../Pages/ProjectPage/ProjectPageData";

const ProjectsSectionItem = observer(({ project }) => {
  const navigate = useNavigate();
  const { selectedLanguage, changeLanguage } = useLanguage();

  // Преобразуем JSON-строки в объекты
  const parsedName = JSON.parse(project.name);
  const parsedStage = JSON.parse(project.stage);
  const parsedDescr = JSON.parse(project.descr);

  // console.log(project.id)

  const maxChars = window.innerWidth >= 1200 ? 100 : 45;

  return (
    <li className="our-projects__item">
      <div className="card">
        <div
          className="card__intro"
          style={{
            backgroundImage: `url(${
              process.env.REACT_APP_API_URL + project.img
            })`,
          }}
        ></div>
        <div className="card__info">
          <h3 className="card__title">{ProjectPageData[0].ProjectPageDataProject[selectedLanguage]} №{project.id}</h3>
          <ul className="card__info-list list-reset">
            <li className="card__info-item">
              <h4 className="card__info-caption">{ProjectPageData[0].ProjectPageDataName[selectedLanguage]}:</h4>
              <p className="card__info-descr">{parsedName[selectedLanguage]}</p>
            </li>
            <li className="card__info-item">
              <h4 className="card__info-caption">{ProjectPageData[0].ProjectPageDataStage[selectedLanguage]}:</h4>
              <p className="card__info-descr">
                {parsedStage[selectedLanguage]}
              </p>
            </li>
            <li className="card__info-item">
              <h4 className="card__info-caption">{ProjectPageData[0].ProjectPageDataDescr[selectedLanguage]}:</h4>
              <p className="card__info-descr">
                {parsedDescr[selectedLanguage].slice(0, maxChars)}{" "}
                {/* Ограничение в 100 символов */}
                {parsedDescr[selectedLanguage].length > maxChars && "..."}{" "}
                {/* Добавление многоточия, если текст обрезан */}
              </p>
            </li>
          </ul>
        </div>
        <button
          className="card__btn btn-reset"
          onClick={() => navigate(PROJECT_ROUTE + "/" + project.id)}
        >
         {ProjectPageData[0].ProjectPageDataBtn[selectedLanguage]}
        </button>
      </div>
    </li>
  );
});

export default ProjectsSectionItem;
