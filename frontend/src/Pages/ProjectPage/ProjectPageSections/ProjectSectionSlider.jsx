import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { useProjects } from "../../../Hooks/useProjects";
import { useLanguage } from "../../../Hooks/LanguageContext";
import { PROJECT_ROUTE } from "../../../Utils/consts";
import ProjectPageData from "../../../Pages/ProjectPage/ProjectPageData";

const ProjectSectionSlider = observer(() => {
  const { selectedLanguage } = useLanguage();
  const { projects } = useProjects(10);

  const [shuffledProjects, setShuffledProjects] = useState([]);

  useEffect(() => {
    const shuffledArray = shuffleArray(projects);
    setShuffledProjects(shuffledArray);
  }, [projects]);

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const [hoveredProjectIndex, setHoveredProjectIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredProjectIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredProjectIndex(null);
  };

  // Обработчик перехода к проекту
  const handleProjectClick = () => {
    // После клика, прокручиваем страницу к верху
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="project-show">
      <div className="project-show__container container">
        <h3 className="project-show__title">{ProjectPageData[0].ProjectPageDataOther[selectedLanguage]}</h3>
        <div className="project-show__content">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={4}
            spaceBetween={20}
            autoPlay={true}
            loop={true}
            speed={400}
            navigation
            breakpoints={{
              1420: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1000: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              300: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            }}
          >
            {shuffledProjects.map((project, index) => (
              <SwiperSlide key={index}>
                <Link
                  to={`${PROJECT_ROUTE}/${project.id}`}
                  onClick={handleProjectClick}
                >
                  <div
                    className="project-show__slide"
                    style={{
                      backgroundImage: `url(${
                        process.env.REACT_APP_API_URL + project.img
                      })`,
                    }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className={`project-show__hover ${
                        hoveredProjectIndex === index ? "active" : ""
                      }`}
                    >
                      <h4 className="project-show__hover--title">
                        {JSON.parse(project.name)[selectedLanguage].slice(
                          0,
                          30
                        )}
                        {JSON.parse(project.name)[selectedLanguage].length >
                          30 && "..."}
                      </h4>
                      <p className="project-show__hover--descr">
                        {JSON.parse(project.descr)[selectedLanguage].slice(
                          0,
                          50
                        )}
                        {JSON.parse(project.descr)[selectedLanguage].length >
                          50 && "..."}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
});

export default ProjectSectionSlider;
