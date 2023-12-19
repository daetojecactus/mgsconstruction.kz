import React, { useContext, useEffect, useState } from "react";
import "./AllProjectsAdminPage.scss";
import { ImBin, ImCog, ImPlus, ImHome } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import {
  ADMIN_ROUTE,
  CREATE_PROJECT_ADMIN_ROUTE,
  EDIT_PROJECT_ADMIN_ROUTE,
  HOME_ROUTE,
} from "../../Utils/consts";
import { Context } from "../../index";
import { fetchProjects, deleteProject } from "../../http/projectAPI";
import { deleteCard, fetchCardsByProjectId } from "../../http/cardAPI";
import { useLanguage, changeLanguage } from "../../Hooks/LanguageContext";
import { observer } from "mobx-react-lite";
import { useProjects } from "../../Hooks/useProjects";

const AllProjectsAdminPage = observer(() => {
  const navigate = useNavigate();

  const { selectedLanguage } = useLanguage();

  const handleGoAdmin = () => {
    navigate(ADMIN_ROUTE);
  };

  const handleGoCreateProject = () => {
    navigate(CREATE_PROJECT_ADMIN_ROUTE);
  };

  const { project } = useContext(Context);

  const { projects: allProjects } = useProjects(
    // project.selectedCategory.id,
    // project.page,
    project.limitAll
  );
  //последний проект
  const [latestProject, setLatestProject] = useState(null);
  //загружаем и сортируем проекты для выгрузки
  useEffect(() => {
    if (allProjects.length > 0) {
      // Сортируем проекты по убыванию id и берем первый элемент
      const lastProject = allProjects.sort((a, b) => b.id - a.id)[0];
      setLatestProject(lastProject);
    }
  }, [allProjects]);


  const handleDeleteProject = async (projectId) => {
    // Подтверждающий алерт
    const confirmDelete = window.confirm("Вы действительно хотите удалить проект?");
    
    if (confirmDelete) {
      try {
        // Удаление проекта
        await deleteProject(projectId);
  
        // Удаление карточек, связанных с проектом
        const cards = await fetchCardsByProjectId(projectId);
        for (const card of cards) {
          await deleteCard(card.id);
        }
  
        // Проект и связанные с ним карточки успешно удалены
        // Обновите список проектов
        const updatedProjects = project.projects.filter((p) => p.id !== projectId);
        project.setProjects(updatedProjects);
  
        // Алерт после удаления проекта
        alert("Проект удален");
      } catch (error) {
        console.error("Error deleting project and cards:", error);
      }
    }
  };

  const handleEditProject = (projectId) => {
    // Переход на страницу редактирования проекта
    navigate(`${EDIT_PROJECT_ADMIN_ROUTE}/${projectId}`);
  };

  return (
    <section className="all-projects">
      <div className="all-projects__container container">
        <h2 className="all-projects__title">Ваши проекты</h2>
        <div className="all-projects__content">
          <div className="all-projects__wrapper">
            <button
              className="all-projects__btn-home all-projects__btn btn-reset"
              onClick={handleGoAdmin}
            >
              <ImHome className="all-projects__btn-icon" />
              На главную
            </button>
            <button
              className="all-projects__btn all-projects__btn-add btn-reset"
              onClick={handleGoCreateProject}
            >
              <ImPlus className="all-projects__btn-icon" />
              Добавить
            </button>
          </div>
          <ul className="all-projects__list list-reset">
            {allProjects.map((project) => (
                <li className="all-projects__item" key={project.id}>
                  <div className="all-projects__card">
                    <div className="all-projects__intro">
                      <h3 className="all-projects__caption">
                        {JSON.parse(project.name)[selectedLanguage].slice(
                          0,
                          20
                        )}{" "}
                        {/* Ограничение в 20 символов */}
                        {JSON.parse(project.name)[selectedLanguage].length >
                          20 && "..."}{" "}
                        {/* Добавление многоточия, если текст обрезан */}
                      </h3>
                      <div className="all-projects__buttons">
                        <button className="all-projects__edit btn-reset" onClick={() => handleEditProject(project.id)}>
                          <ImCog className="all-projects__edit-icon" />
                        </button>
                        <button className="all-projects__delete btn-reset" onClick={() => handleDeleteProject(project.id)}>
                          <ImBin className="all-projects__delete-icon"/>
                        </button>
                      </div>
                    </div>
                    <div
                      className="all-projects__image"
                      style={{
                        backgroundImage: `url(${
                          process.env.REACT_APP_API_URL + project.img
                        })`,
                      }}
                    ></div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
});

export default AllProjectsAdminPage;
