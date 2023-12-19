import React from "react";
import "./ServicesSection.scss";
import servicesArray from "./ServicesSectionData";
import { useLanguage, changeLanguage } from "../../Hooks/LanguageContext";

const ServicesSection = () => {
  const { selectedLanguage, changeLanguage } = useLanguage(); //Язык

  return (
    <section className="services-content">
      <div className="services-content__container container">
        <ul className="services-content__list list-reset">
          {servicesArray.map((service) => (
            <li key={service.id} className="services-content__item">
              <div className="services-card">
                <div className="services-card__wrapper">
                <h3 className="services-card__title">
                  {service.title[selectedLanguage]}
                </h3>
                </div>
                <div className="services-card__content">
                  <div className="services-card__image">
                    <div
                      className="services-card__picture"
                      style={{
                        backgroundImage: `url(${service.img})`,
                      }}
                    ></div>
                  </div>
                  <div className="services-card__info">
                    <div
                      className="services-card__bg"
                      style={{
                        backgroundImage: `url(${service.bg})`,
                      }}
                    ></div>
                    <div className="services-card__box">
                    <p className="services-card__descr">
                      {service.descr[selectedLanguage]}
                    </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ServicesSection;
