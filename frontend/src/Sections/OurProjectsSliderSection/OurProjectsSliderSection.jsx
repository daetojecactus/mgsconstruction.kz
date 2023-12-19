import React, { useState, useEffect } from "react";
import "./OurProjectsSliderSection.scss";
import { Link } from "react-router-dom";
import { useLatestProjects } from "../../Hooks/useLatestProjects";
import { useLanguage } from "../../Hooks/LanguageContext";
import { PROJECT_ROUTE } from "../../Utils/consts";
import PaginationDot from "../../Components/PaginationDot/PaginationDot";
import PaginationString from "../../Components/PaginationString/PaginationString";
import OurProjectsSliderSectionData from "./OurProjectsSliderSectionData";


const OurProjectsSliderSection = () => {
  const { latestProjects, categories } = useLatestProjects();
  const { selectedLanguage } = useLanguage();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setCurrentCategory(categories[0]?.id);
    setActiveTab(0);
  }, [categories]);

  const handleCategoryClick = (categoryId, tabIndex) => {
    setCurrentCategory(categoryId);
    setActiveTab(tabIndex);
  };

  const handleNextTab = () => {
    setActiveTab((prevTab) =>
      prevTab === categories.length - 1 ? 0 : prevTab + 1
    );
  };

  const handlePrevTab = () => {
    setActiveTab((prevTab) =>
      prevTab === 0 ? categories.length - 1 : prevTab - 1
    );
  };

  const handlePageClick = (page) => {
    setActiveTab(page - 1);
  };

  const handleProjectClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="our-slider">
      <div className="our-slider__container container">
        <h2 className="our-slider__title">{OurProjectsSliderSectionData[0].OurProjectsSliderSectionDataTitle[selectedLanguage]}</h2>
        <div className="our-slider__content">
          <div className="our-slider__info">
            <p className="our-slider__text">
            {OurProjectsSliderSectionData[0].OurProjectsSliderSectionDataDescr[selectedLanguage]}
            </p>
            <ul className="our-slider__tabs">
              {categories.map((category, index) => (
                <li
                  key={category.id}
                  className={`our-slider__tab ${
                    index === activeTab ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick(category.id, index)}
                >
                  {JSON.parse(category.category).category[selectedLanguage]}
                </li>
              ))}
            </ul>
          </div>
          <div className="our-slider__projects">
            {latestProjects.map((project, index) => (
              <div
                key={project.id}
                className={`our-slider__project ${
                  index === activeTab ? "active" : "hidden"
                }`}
              >
                <div
                  className="our-slider__slider"
                  style={{
                    backgroundImage: `url(${
                      process.env.REACT_APP_API_URL + project.img
                    })`,
                  }}
                >
                  <div className="our-slider__bg">
                    <div className="our-slider__card">
                      <div className="our-slider__wrapper">
                        <div className="our-slider__btns">
                          <button
                            className="our-slider__arrow our-slider__arrow-prev btn-reset"
                            onClick={handlePrevTab}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="46"
                              height="8"
                              viewBox="0 0 46 8"
                              fill="none"
                            >
                              <path
                                d="M0.646446 3.64645C0.451183 3.84171 0.451183 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM46 3.5L1 3.5V4.5L46 4.5V3.5Z"
                              />
                            </svg>
                          </button>
                          <PaginationDot
                            pageCount={categories.length}
                            activePage={activeTab + 1}
                            onPageClick={handlePageClick}
                          />
                          <button
                            className="our-slider__arrow our-slider__arrow-next btn-reset"
                            onClick={handleNextTab}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="46"
                              height="8"
                              viewBox="0 0 46 8"
                              fill="none"
                            >
                              <path
                                d="M45.3536 4.35355C45.5488 4.15829 45.5488 3.84171 45.3536 3.64645L42.1716 0.464466C41.9763 0.269204 41.6597 0.269204 41.4645 0.464466C41.2692 0.659728 41.2692 0.976311 41.4645 1.17157L44.2929 4L41.4645 6.82843C41.2692 7.02369 41.2692 7.34027 41.4645 7.53553C41.6597 7.7308 41.9763 7.7308 42.1716 7.53553L45.3536 4.35355ZM0 4.5H45V3.5H0L0 4.5Z"
                              />
                            </svg>
                          </button>
                        </div>
                        <PaginationString
                          pageCount={categories.length}
                          activePage={activeTab + 1}
                          onPageClick={handlePageClick}
                        />
                      </div>
                      <h3 className="our-slider__caption">
                        {JSON.parse(project.name)[selectedLanguage]}
                      </h3>
                      <p className="our-slider__descr">
                        {JSON.parse(project.descr)[selectedLanguage].slice(
                          0,
                          100
                        )}
                        {JSON.parse(project.descr)[selectedLanguage].length >
                          100 && "..."}
                      </p>
                      <Link
                        className="our-slider__btn btn-reset"
                        to={`${PROJECT_ROUTE}/${project.id}`}
                        onClick={handleProjectClick}
                      >
                        {OurProjectsSliderSectionData[0].OurProjectsSliderSectionDataBtn[selectedLanguage]}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="8"
                          viewBox="0 0 26 8"
                          fill="none"
                        >
                          <path d="M25.3536 4.35355C25.5488 4.15829 25.5488 3.84171 25.3536 3.64645L22.1716 0.464466C21.9763 0.269204 21.6597 0.269204 21.4645 0.464466C21.2692 0.659728 21.2692 0.976311 21.4645 1.17157L24.2929 4L21.4645 6.82843C21.2692 7.02369 21.2692 7.34027 21.4645 7.53553C21.6597 7.7308 21.9763 7.7308 22.1716 7.53553L25.3536 4.35355ZM0 4.5H25V3.5H0V4.5Z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProjectsSliderSection;
