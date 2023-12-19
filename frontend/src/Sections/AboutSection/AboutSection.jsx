import React from "react";
import "./AboutSection.scss";
import { Link } from "react-router-dom";
import { ABOUT_ROUTE } from "../../Utils/consts";
import { useLanguage, changeLanguage } from "../../Hooks/LanguageContext";
import AboutSectionData from "./AboutSectionData";

const AboutSection = () => {

  const { selectedLanguage, changeLanguage } = useLanguage(); //Язык

  return (
    <section className="about">
      <div className="container about__container">
        <div className="about-us">
          <div
            className="about-us__bg"
            style={{ backgroundImage: "url(/images/about-us-1.png)" }}
          ></div>
          <div className="about-us__content">
            <h2 className="about-us__title">{AboutSectionData[0].AboutSectionDataAboutTitle[selectedLanguage]}</h2>
            <p className="about-us__descr">
            {AboutSectionData[0].AboutSectionDataAboutDescr[selectedLanguage]}
            </p>
            <Link to={ABOUT_ROUTE} className="about-us__link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="22"
                viewBox="0 0 24 22"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.41053 0H10.1053L13.6421 1.9831L17.2421 0H24V3.59437L13.6421 9.29578L3.91579 3.84225V6.63099H5.30526L13.2 11.093L5.30526 15.6789H0.505263V21.5042H5.11579V22H0V6.63099H3.41053V0ZM0.505263 12.5803V9.66761L2.96842 11.1549L0.505263 12.5803Z"
                  fillOpacity="0.5"
                />
                <path
                  d="M5.62105 15.9887V21.8761L13.4526 17.4141V14.2535L22.1684 9.29578H24V4.15211L13.8947 9.72958V11.2789L5.62105 15.9887Z"
                  fillOpacity="0.5"
                />
              </svg>{" "}
              <span className="about-us__link--text">{AboutSectionData[0].AboutSectionDataAboutBtn[selectedLanguage]}</span>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13 0H7.98645L0.315121 4.40816L7.98645 8.87755H13V0ZM10.1006 4.40816L12.5168 5.81633V3L10.1006 4.40816Z"
                />
                <path
                  d="M12.5641 9.36735H12.9869V12H8.09416L0 7.65306V7.04082L8.09416 11.449H12.5641V9.36735Z"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="about-cards about-cards--1">
          <div
            className="about-cards__bg"
            style={{ backgroundImage: "url(/images/about-us-2.png)" }}
          ></div>
          <div className="about-cards__content">
            <div className="about-cards__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="62"
                height="62"
                viewBox="0 0 62 62"
                fill="none"
              >
                <mask id="path-1-inside-1_13_273" fill="white">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M31 4C45.9117 4 58 16.0883 58 31C58 45.9117 45.9117 58 31 58C16.0883 58 4 45.9117 4 31C4 16.0883 16.0883 4 31 4ZM31 0C48.1208 0 62 13.8792 62 31C62 48.1208 48.1208 62 31 62C13.8792 62 0 48.1208 0 31C0 13.8792 13.8792 0 31 0ZM24 43.1244L45 31L24 18.8756L24 43.1244Z"
                  />
                </mask>
                <path
                  d="M45 31L47 34.4641L53 31L47 27.5359L45 31ZM24 43.1244H20V50.0526L26 46.5885L24 43.1244ZM24 18.8756L26 15.4115L20 11.9474V18.8756H24ZM62 31C62 13.8792 48.1208 0 31 0V8C43.7025 8 54 18.2974 54 31H62ZM31 62C48.1208 62 62 48.1208 62 31H54C54 43.7025 43.7025 54 31 54V62ZM0 31C0 48.1208 13.8792 62 31 62V54C18.2975 54 8 43.7025 8 31H0ZM31 0C13.8792 0 0 13.8792 0 31H8C8 18.2974 18.2975 8 31 8V0ZM66 31C66 11.67 50.33 -4 31 -4V4C45.9117 4 58 16.0883 58 31H66ZM31 66C50.33 66 66 50.33 66 31H58C58 45.9117 45.9117 58 31 58V66ZM-4 31C-4 50.33 11.67 66 31 66V58C16.0883 58 4 45.9117 4 31H-4ZM31 -4C11.67 -4 -4 11.67 -4 31H4C4 16.0883 16.0883 4 31 4V-4ZM43 27.5359L22 39.6603L26 46.5885L47 34.4641L43 27.5359ZM22 22.3397L43 34.4641L47 27.5359L26 15.4115L22 22.3397ZM28 43.1244L28 18.8756H20L20 43.1244H28Z"
                  fill="#007BC2"
                  mask="url(#path-1-inside-1_13_273)"
                />
              </svg>
            </div>
            <div className="about-cards__info">
              <h3 className="about-cards__caption">{AboutSectionData[0].AboutSectionDataCard1Title[selectedLanguage]}</h3>
              <p className="about-cards__descr">
              {AboutSectionData[0].AboutSectionDataCard1Descr[selectedLanguage]}
              </p>
            </div>
          </div>
        </div>
        <div className="about-cards about-cards--2">
          <div
            className="about-cards__bg"
            style={{ backgroundImage: "url(/images/about-us-3.png)" }}
          ></div>
          <div className="about-cards__content">
            <div className="about-cards__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="62"
                height="62"
                viewBox="0 0 62 62"
                fill="none"
              >
                <g clipPath="url(#clip0_13_270)">
                  <path
                    d="M60.1836 4.47479H52.2274C52.2562 3.59355 52.2723 2.70711 52.2723 1.81641C52.2723 0.813126 51.4587 0 50.4559 0H11.5441C10.5413 0 9.72771 0.813126 9.72771 1.81641C9.72771 2.70711 9.74379 3.59355 9.77264 4.47479H1.81641C0.813126 4.47479 0 5.28792 0 6.2912C0 14.43 2.12718 22.1086 5.98941 27.9131C9.80717 33.6513 14.8926 36.9426 20.3863 37.2628C21.6318 38.618 22.9482 39.723 24.3195 40.5659V48.639H21.2723C17.5884 48.639 14.5918 51.6361 14.5918 55.3195V58.3667H14.4627C13.4594 58.3667 12.6463 59.1803 12.6463 60.1831C12.6463 61.1864 13.4594 61.9995 14.4627 61.9995H47.5373C48.5406 61.9995 49.3537 61.1864 49.3537 60.1831C49.3537 59.1803 48.5406 58.3667 47.5373 58.3667H47.4082V55.3195C47.4082 51.6361 44.4116 48.639 40.7277 48.639H37.6805V40.5659C39.0518 39.7235 40.3687 38.618 41.6142 37.2628C47.1074 36.9426 52.1928 33.6513 56.0111 27.9131C59.8733 22.1086 62 14.43 62 6.2912C62 5.28792 61.1869 4.47479 60.1836 4.47479ZM9.01392 25.9008C5.82811 21.1134 3.95636 14.8515 3.67113 8.1076H9.97557C10.6307 16.3978 12.5767 24.0608 15.6183 30.1434C16.1026 31.1121 16.6092 32.0274 17.1348 32.8892C14.1136 31.7483 11.3175 29.3633 9.01392 25.9008ZM43.7754 55.3195V58.3672H18.2246V55.3195C18.2246 53.6393 19.5916 52.2718 21.2723 52.2718H40.7277C42.4084 52.2718 43.7754 53.6393 43.7754 55.3195ZM34.0477 48.639H27.9523V42.1444C28.9509 42.4074 29.9683 42.5441 31 42.5441C32.0317 42.5441 33.0491 42.4074 34.0477 42.1444V48.639ZM35.1725 37.8229C35.0907 37.8565 35.0122 37.8971 34.937 37.9421C33.6532 38.5807 32.3339 38.9113 31 38.9113C29.6665 38.9113 28.3478 38.5807 27.0645 37.943C26.9883 37.8971 26.9093 37.8565 26.8265 37.8219C25.4023 37.0689 24.0243 35.9317 22.7212 34.4375C22.6526 34.3395 22.5755 34.2492 22.4899 34.1669C21.1961 32.631 19.979 30.7417 18.8674 28.5185C15.5293 21.8428 13.6013 13.0649 13.3818 3.63281H48.6182C48.3982 13.0649 46.4702 21.8432 43.1326 28.5185C42.021 30.7417 40.8039 32.631 39.5106 34.1669C39.4245 34.2492 39.3465 34.34 39.2784 34.4379C37.9752 35.9327 36.5968 37.0693 35.1725 37.8229ZM52.9861 25.9008C50.6825 29.3633 47.8864 31.7483 44.8652 32.8892C45.3908 32.0274 45.8974 31.1121 46.3817 30.1434C49.4233 24.0608 51.3688 16.3978 52.0244 8.1076H58.3289C58.0436 14.8515 56.1719 21.1134 52.9861 25.9008Z"
                    fill="#007BC2"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_13_270">
                    <rect width="62" height="62" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="about-cards__info">
              <h3 className="about-cards__caption">{AboutSectionData[0].AboutSectionDataCard2Title[selectedLanguage]}</h3>
              <p className="about-cards__descr">
              {AboutSectionData[0].AboutSectionDataCard2Descr[selectedLanguage]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
