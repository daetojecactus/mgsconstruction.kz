// OurProjectsSlider.js

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import "swiper/css/scrollbar";
import { PROJECT_ROUTE } from "../../Utils/consts";

const OurProjectsSlider = ({ projects, selectedLanguage, handleProjectClick, currentCategory }) => {
    const filteredProjects = projects.filter(
      (project) =>
        !currentCategory || project.projectCategoryId === currentCategory
    );
  
    return (
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        allowTouchMove={true}
      >
        {filteredProjects.map((project) => (
          <SwiperSlide key={project.id}>
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
                  <h3 className="our-slider__caption">
                    {JSON.parse(project.name)[selectedLanguage]}
                  </h3>
                  <p className="our-slider__descr">
                    {JSON.parse(project.descr)[selectedLanguage].slice(0, 100)}
                    {JSON.parse(project.descr)[selectedLanguage].length > 100 &&
                      "..."}
                  </p>
                </div>
                <Link
                  className="our-slider__btn btn-reset"
                  to={`${PROJECT_ROUTE}/${project.id}`}
                  onClick={handleProjectClick}
                >
                  УЗНАТЬ ПОДРОБНЕЕ
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
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };
export default OurProjectsSlider;
