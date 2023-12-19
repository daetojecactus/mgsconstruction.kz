import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { fetchOneProject } from "../../../http/projectAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../ProjectPage.scss";
import { useLanguage, changeLanguage } from "../../../Hooks/LanguageContext";
import ProjectPageData from "../ProjectPageData";

const ProjectPageSection = observer(() => {
  const { selectedLanguage } = useLanguage();
  const [project, setProject] = useState({});
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchOneProject(id).then((data) => {
      data.name = JSON.parse(data.name);
      data.stage = JSON.parse(data.stage);
      data.descr = JSON.parse(data.descr);
      setProject(data);
    });
  }, [id]);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  console.log(project);

  const [largeText, setLargeText] = useState(false);

  const toggleLargeText = (text) => {
    if (text.length > 100) {
      setLargeText(true);
    } else {
      setLargeText(false);
    }
  };

  return (
    <section className="project">
      <div
        className="project-intro"
        style={{
          backgroundImage: `url(${
            process.env.REACT_APP_API_URL + project.pageImg
          })`,
        }}
      >
        <div className="container project__container">
          <div className="project-intro__content">
            <p className="project-intro__subcaption">{ProjectPageData[0].ProjectPageDataProject[selectedLanguage]}</p>
            <h2 className="project-intro__caption">
              {project.name && project.name[selectedLanguage]}
            </h2>
          </div>
        </div>
      </div>
      <div className="container project__container">
        <div className="project-slider">
          <ul className="project-slider__list list-reset">
            {project.cards &&
              project.cards.map((card, id) => (
                <li className="project-slider__item" key={id}>
                  <button
                    className={`project-slider__tab btn-reset ${
                      id === activeTab ? "project-slider__tab--active" : ""
                    }`}
                    aria-label={card.title[selectedLanguage]}
                    onClick={() => handleTabChange(id)}
                  >
                    {/* {card.title[selectedLanguage]} */}
                    {JSON.parse(card.title)[selectedLanguage]}
                  </button>
                </li>
              ))}
          </ul>
          <div className="project-slider__content">
            {project.cards &&
              project.cards.map((card, id) => (
                <div
                  key={id}
                  className={`tab-content ${
                    id === activeTab ? "active-tab" : ""
                  }`}
                >
                  <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    slidesPerView={1}
                    spaceBetween={86}
                    loop={true}
                    speed={400}
                    // centeredSlides={true}
                    navigation
                  >
                    {card.images.map((image, imgIndex) => (
                      <SwiperSlide key={imgIndex}>
                        <div className="tab-content__content">
                          <div
                            className="tab-content__image"
                            style={{
                              backgroundImage: `url(${
                                process.env.REACT_APP_API_URL + image
                              })`,
                            }}
                          ></div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ))}
          </div>
        </div>
        <div className="project-info">
          {/* <div className="project-info__content">
            <div className="project-info__card project-info__card-name">
              <h3 className="project-info__title">Название:</h3>
              <p className="project-info__descr">
                {project.name && project.name[selectedLanguage]}
              </p>
            </div>
            <div className="project-info__card project-info__card-stage">
              <h3 className="project-info__title">Стадия:</h3>
              <p className="project-info__descr">
                {project.stage && project.stage[selectedLanguage]}
              </p>
            </div>
            {project.info &&
              project.info.map((infoItem, index) => (
                <div className="project-info__card" key={index}>
                  <h3 className="project-info__title">
                    {infoItem.title[selectedLanguage]}:
                  </h3>
                  <p className="project-info__descr">
                    {infoItem.description[selectedLanguage]}
                  </p>
                </div>
              ))}
          </div> */}

          <div className="project-info__content">
            <div
              className={`project-info__card project-info__card-name ${
                project.name && project.name[selectedLanguage]?.length > 70
                  ? "large"
                  : ""
              }`}
            >
              <h3 className="project-info__title">{ProjectPageData[0].ProjectPageDataName[selectedLanguage]}:</h3>
              <p className="project-info__descr">
                {project.name && project.name[selectedLanguage]}
              </p>
            </div>
            <div
              className={`project-info__card project-info__card-stage ${
                project.stage && project.stage[selectedLanguage]?.length > 70
                  ? "large"
                  : ""
              }`}
            >
              <h3 className="project-info__title">{ProjectPageData[0].ProjectPageDataStage[selectedLanguage]}:</h3>
              <p className="project-info__descr">
                {project.stage && project.stage[selectedLanguage]}
              </p>
            </div>
            {project.info &&
              project.info.map((infoItem, index) => (
                <div
                  className={`project-info__card ${
                    infoItem.description[selectedLanguage]?.length > 70
                      ? "large"
                      : ""
                  }`}
                  key={index}
                >
                  <h3 className="project-info__title">
                    {infoItem.title[selectedLanguage]}:
                  </h3>
                  <p className="project-info__descr">
                    {infoItem.description[selectedLanguage]}
                  </p>
                </div>
              ))}
          </div>

          <div className="project-info__card project-info__card-descr">
            <h3 className="project-info__title">{ProjectPageData[0].ProjectPageDataDescr[selectedLanguage]}:</h3>
            <p className="project-info__descr">
              {project.descr && project.descr[selectedLanguage]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ProjectPageSection;
