import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../index";
import SocialList from "../SocialList/SocialList";
import "./HeaderMenu.scss";
import { Link } from "react-router-dom";
import {
  ABOUT_ROUTE,
  CONTACTS_ROUTE,
  HOME_ROUTE,
  OUR_PROJECT_ROUTE,
  PROJECT_ROUTE,
  SERVICES_ROUTE,
} from "../../Utils/consts";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../../Hooks/useProjects";
import { useLanguage } from "../../Hooks/LanguageContext";
import { fetchProjects } from "../../http/projectAPI";
import { fetchCategories } from "../../http/categoryAPI";
import { fetchSocialLinks } from "../../http/socialAPI";
import HeaderData from "../Header/HeaderData";
import ContactsMapSectionData from "../../Sections/ContactsMapSection/ContactsMapSectionData";

const HeaderMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { selectedLanguage, changeLanguage } = useLanguage();

  //Переход на главную страницу
  const handleGoMain = () => {
    navigate(HOME_ROUTE);
    onClose();
  };
  //Переход на страницу услуг
  const handleGoServices = () => {
    navigate(SERVICES_ROUTE);
    onClose();
  };
  //Переход на страницу о нас
  const handleGoAbout = () => {
    navigate(ABOUT_ROUTE);
    onClose();
  };
  //Переход на страницу проектов
  const handleGoOurProjects = () => {
    navigate(OUR_PROJECT_ROUTE);
    onClose();
  };
  //Переход на страницу контактов
  const handleGoContacts = () => {
    navigate(CONTACTS_ROUTE);
    onClose();
  };
  //получаем проекты с контекста
  const { project } = useContext(Context);
  //выгружаем проекты для меню
  const { projects: allProjects } = useProjects(
    // project.selectedCategory.id,
    // project.page,
    project.limitHeader
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
  //переход на последний проект
  const handleGoLastProjects = () => {
    if (latestProject) {
      navigate(`${PROJECT_ROUTE}/${latestProject.id}`);
      onClose();
    }
  };
  // Добавим хук для получения списка категорий
  const { categories, setSelectedCategoryId } = useProjects();
  //переход на страницу проектов с выбранным фильтром
  const GoFilterCategories = (categoryId) => {
    project.setSelectedCategory(categoryId);
    setSelectedCategoryId(categoryId);
    navigate(OUR_PROJECT_ROUTE);
    onClose();
  };

  const [socialLinks, setSocialLinks] = useState([]);
  const desiredPlatforms = ["phoneKZ", "phoneRU", 'whatsapp', 'mail', 'phoneMain']; // Здесь указываются названия нужных платформ

  //загружаем соц сети
  useEffect(() => {
    fetchSocialLinks().then((data) => {
      setSocialLinks(data);
    });
  }, []);

  const filteredSocialLinks = socialLinks.filter((link) =>
    desiredPlatforms.includes(link.platform)
  );

  let phoneKZ = "";
  let phoneRU = "";
  let phoneMain = "";
  let whatsapp = "";
  let mail = "";
  //получаем необходимые нам два номера телефона
  for (const link of filteredSocialLinks) {
    if (link.platform === "phoneKZ") {
      phoneKZ = link.url;
    } else if (link.platform === "phoneRU") {
      phoneRU = link.url;
    } else if (link.platform === "whatsapp") {
      whatsapp = link.url;
    } else if (link.platform === "mail") {
      mail = link.url;
    } else if (link.platform === "phoneMain") {
      phoneMain = link.url;
    }
  }

  return (
    <div className={`header-menu ${isOpen ? "open" : ""}`}>
      <div className="header-menu__container container">
        <div className="header-menu__content">
          <div className="menu-top">
            <button onClick={onClose} className="menu-top__btn btn-reset">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.7991 10.6777L20.5772 2.89949L18.4559 0.778174L10.6777 8.55635L2.89956 0.778174L0.77824 2.89949L8.55641 10.6777L0.778239 18.4558L2.89956 20.5772L10.6777 12.799L18.4559 20.5772L20.5772 18.4558L12.7991 10.6777Z"
                  // fill="white"
                />
              </svg>
            </button>
            <div className="menu-top__contacts">
              <div className="menu-top__contact">
                <a href={`tel:${phoneKZ}`} className="menu-top__link">
                  {phoneKZ}
                </a>
                <p className="menu-top__city">
                  {HeaderData[0].headerMenuKZ[selectedLanguage]}
                </p>
              </div>
              <div className="menu-top__contact menu-top__contact--2">
                <a href={`tel:${phoneRU}`} className="menu-top__link">
                  {phoneRU}
                </a>
                <p className="menu-top__city">
                  {HeaderData[0].headerMenuRUS[selectedLanguage]}
                </p>
              </div>
            </div>

            <div className="menu-top__social">
              <SocialList />
            </div>
          </div>
          <div className="menu-bottom">
            <button
              onClick={handleGoMain}
              className="header-menu__title btn-reset header-menu__title--btn"
            >
              {HeaderData[0].headerMenuMain[selectedLanguage]}
            </button>
            <div className="menu-bottom__content">
              <div className="menu-bottom__combine">
                <div className="menu-about">
                  <h3 className="menu-about__title header-menu__title">
                    {HeaderData[0].headerMenuAbout[selectedLanguage]}
                  </h3>
                  <ul className="menu-about__list list-reset">
                    <li className="menu-about__item">
                      <button
                        onClick={handleGoServices}
                        className="menu-about__link header-menu__link btn-reset"
                      >
                        {HeaderData[0].headerMenuServices[selectedLanguage]}
                      </button>
                    </li>
                    <li className="menu-about__item">
                      <button
                        onClick={handleGoAbout}
                        className="menu-about__link header-menu__link btn-reset"
                      >
                        {HeaderData[0].headerMenuAbout[selectedLanguage]}
                      </button>
                    </li>
                    <li className="menu-about__item">
                      <button
                        onClick={handleGoContacts}
                        className="menu-about__link header-menu__link btn-reset"
                      >
                        {HeaderData[0].headerMenuContacts[selectedLanguage]}
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="menu-projects">
                  <h3
                    className="menu-projects__title header-menu__title"
                    onClick={handleGoOurProjects}
                  >
                    {HeaderData[0].headerMenuProjects[selectedLanguage]}
                  </h3>
                  <ul className="menu-projects__list list-reset">
                    {allProjects.map((project) => (
                      <li className="menu-projects__item" key={project.id}>
                        <Link
                          to={`${PROJECT_ROUTE}/${project.id}`}
                          className="menu-projects__link header-menu__link"
                          onClick={onClose}
                        >
                          {JSON.parse(project.name)[selectedLanguage]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="menu-contactsmobile">
                  <h4 className="menu-contactsmobile__caption">
                    {HeaderData[0].headerMenuContacts[selectedLanguage]}
                  </h4>
                  <ul className="menu-contactsmobile__list list-reset">
                    <li className="menu-contactsmobile__item">
                      <p className="menu-contactsmobile__descr">
                        <a
                          href={`tel:${phoneMain}`}
                          className="menu-contactsmobile__link"
                        >
                          {phoneMain}
                        </a>
                        –{" "}
                        {
                          ContactsMapSectionData[0].ContactsMapSectionDataClock[
                            selectedLanguage
                          ]
                        }
                      </p>
                    </li>
                    <li className="menu-contactsmobile__item">
                      <p className="menu-contactsmobile__descr">
                        <a
                          href={whatsapp}
                          className="menu-contactsmobile__link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {phoneMain}
                        </a>
                        - WhatsApp
                      </p>
                    </li>
                    <li className="menu-contactsmobile__item">
                      <p className="menu-contactsmobile__descr">
                        {
                          ContactsMapSectionData[0].ContactsMapSectionDataCentr[
                            selectedLanguage
                          ]
                        }
                        :
                        <a
                          href={`mailto:${mail}`}
                          className="menu-contactsmobile__link"
                        >
                          {mail}
                        </a>
                      </p>
                    </li>
                    <li className="menu-contactsmobile__item">
                      <p className="menu-contactsmobile__descr">
                        {
                          ContactsMapSectionData[0].ContactsMapSectionDataSales[
                            selectedLanguage
                          ]
                        }
                        :
                        <a
                          href={`mailto:${mail}`}
                          className="menu-contactsmobile__link"
                        >
                          {mail}
                        </a>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="menu-category">
                <h3 className="menu-category__title header-menu__title">
                  {HeaderData[0].headerMenuIndustry[selectedLanguage]}
                </h3>
                <ul className="menu-category__list list-reset">
                  {categories.map((category) => (
                    <li className="menu-category__item" key={category.id}>
                      <button
                        onClick={() => GoFilterCategories(category.id)}
                        className="menu-category__link header-menu__link btn-reset"
                      >
                        {
                          JSON.parse(category.category).category[
                            selectedLanguage
                          ]
                        }
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="menu-last">
                <h3 className="menu-last__title header-menu__title">
                  {HeaderData[0].headerMenuLastProject[selectedLanguage]}
                </h3>
                {latestProject && (
                  <div
                    className="menu-last__image"
                    style={{
                      backgroundImage: `url(${
                        process.env.REACT_APP_API_URL + latestProject.img
                      })`,
                    }}
                    onClick={handleGoLastProjects}
                  ></div>
                )}
                {latestProject && (
                  <p className="menu-last__descr">
                    {JSON.parse(latestProject.descr)[selectedLanguage].slice(
                      0,
                      100
                    )}{" "}
                    {/* Ограничение в 100 символов */}
                    {JSON.parse(latestProject.descr)[selectedLanguage].length >
                      100 && "..."}{" "}
                    {/* Добавление многоточия, если текст обрезан */}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
