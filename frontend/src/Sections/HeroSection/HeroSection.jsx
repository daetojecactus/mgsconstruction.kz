import React from "react";
import "./HeroSection.scss";
import { Link } from "react-router-dom";
import { SERVICES_ROUTE } from "../../Utils/consts";
import HeroSectionData from "./HeroSectionData";
import { useLanguage } from "../../Hooks/LanguageContext";

const HeroSection = ({
  hero__bg,
  hero_title_top,
  hero_title_bottom,
  hero_descr_top,
  hero_descr_bottom,
}) => {
  const { selectedLanguage } = useLanguage();

  return (
    <section className="hero" style={{ backgroundImage: `url(${hero__bg})` }}>
      <div className="hero__bg">
        <div className="container hero__container">
          <div className="hero__content">
            <div className="hero__top">
              <div className="hero__date">
                <p className="hero__date-top">{hero_title_top}</p>
                <p className="hero__date-down">{hero_title_bottom}</p>
              </div>
            </div>
            <div className="hero__bottom">
              <h1 className="hero__title">{hero_descr_top}</h1>
              <p className="hero__subtitle">{hero_descr_bottom}</p>
            </div>
          </div>
          <div className="hero__cards">
            <ul className="list-reset hero__list">
              <li className="hero__item">
                <div className="hero-card">
                  <div
                    className="hero-card__bg"
                    style={{ backgroundImage: "url(/images/services-1.png)" }}
                  ></div>
                  <h3 className="hero-card__caption">
                    {HeroSectionData[0].HeroSectionDataTitle1[selectedLanguage]}
                  </h3>
                  <Link
                    to={SERVICES_ROUTE}
                    className="btn-reset hero-card__btn"
                  >
                    {HeroSectionData[0].HeroSectionDataBtn[selectedLanguage]}
                  </Link>
                </div>
              </li>
              <li className="hero__item">
                <div className="hero-card">
                  <div
                    className="hero-card__bg"
                    style={{ backgroundImage: "url(/images/services-2.png)" }}
                  ></div>
                  <h3 className="hero-card__caption">
                    {HeroSectionData[0].HeroSectionDataTitle2[selectedLanguage]}
                  </h3>
                  <Link
                    to={SERVICES_ROUTE}
                    className="btn-reset hero-card__btn"
                  >
                    {HeroSectionData[0].HeroSectionDataBtn[selectedLanguage]}
                  </Link>
                </div>
              </li>
              {/* <li className="hero__item">
                <div className="hero-card">
                  <div
                    className="hero-card__bg"
                    style={{ backgroundImage: "url(/images/hero-3.png)" }}
                  ></div>
                  <h3 className="hero-card__caption">
                    {HeroSectionData[0].HeroSectionDataTitle3[selectedLanguage]}
                  </h3>
                  <Link
                    to={SERVICES_ROUTE}
                    className="btn-reset hero-card__btn"
                  >
                    {HeroSectionData[0].HeroSectionDataBtn[selectedLanguage]}
                  </Link>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
