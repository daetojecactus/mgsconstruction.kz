import React, { useContext, useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import "./Footer.scss";
import SocialList from "../SocialList/SocialList";
import { Link } from "react-router-dom";
import {
  ABOUT_ROUTE,
  HOME_ROUTE,
  OUR_PROJECT_ROUTE,
  SERVICES_ROUTE,
} from "../../Utils/consts";
import { fetchSocialLinks } from "../../http/socialAPI";
import HeaderData from "../Header/HeaderData";
import FooterData from "./FooterData";
import ContactsMapSectionData from "../../Sections/ContactsMapSection/ContactsMapSectionData";
import { useLanguage } from "../../Hooks/LanguageContext";

const Footer = () => {
  const apiKey =
    'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A2a44eb628a7acb8449a2c277d333f5cbf2ba6f90f7f097181facb7739866d1e7&amp;width=500&amp;height=400&amp;lang=ru_RU&amp;scroll=true"';

  // Обработчик перехода
  const handleGoTop = () => {
    // После клика, прокручиваем страницу к верху
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [socialLinks, setSocialLinks] = useState([]);
  const desiredPlatforms = ["phoneMain", "whatsapp", "mail"]; // Здесь указываются названия нужных платформ
  const { selectedLanguage, changeLanguage } = useLanguage();

  //загружаем соц сети
  useEffect(() => {
    fetchSocialLinks().then((data) => {
      setSocialLinks(data);
    });
  }, []);

  const filteredSocialLinks = socialLinks.filter((link) =>
    desiredPlatforms.includes(link.platform)
  );

  let phoneMain = "";
  let whatsapp = "";
  let mail = "";
  //получаем необходимые нам два номера телефона
  for (const link of filteredSocialLinks) {
    if (link.platform === "phoneMain") {
      phoneMain = link.url;
    } else if (link.platform === "whatsapp") {
      whatsapp = link.url;
    } else if (link.platform === "mail") {
      mail = link.url;
    }
  }

  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer-left">
          <div className="footer-left__left">
            <div className="footer-nav">
              <h4 className="footer-nav__caption">
                {FooterData[0].footerNav[selectedLanguage]}
              </h4>
              <ul className="footer-nav__list list-reset">
                <li className="footer-nav__item">
                  <Link
                    to={HOME_ROUTE}
                    className="footer-nav__link"
                    onClick={handleGoTop}
                  >
                    {HeaderData[0].headerMenuMain[selectedLanguage]}
                  </Link>
                </li>
                <li className="footer-nav__item">
                  <Link
                    to={ABOUT_ROUTE}
                    className="footer-nav__link"
                    onClick={handleGoTop}
                  >
                    {HeaderData[0].headerMenuAbout[selectedLanguage]}
                  </Link>
                </li>
                <li className="footer-nav__item">
                  <Link
                    to={OUR_PROJECT_ROUTE}
                    className="footer-nav__link"
                    onClick={handleGoTop}
                  >
                    {HeaderData[0].headerMenuProjects[selectedLanguage]}
                  </Link>
                </li>
                <li className="footer-nav__item">
                  <Link
                    to={SERVICES_ROUTE}
                    className="footer-nav__link"
                    onClick={handleGoTop}
                  >
                    {HeaderData[0].headerMenuServices[selectedLanguage]}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-construction">
              <p className="footer-construction__descr">
                © 2023, MGS construction
              </p>
            </div>
          </div>
          <div className="footer-left__right">
            <div className="footer-contacts">
              <h4 className="footer-contacts__caption">
                {HeaderData[0].headerMenuContacts[selectedLanguage]}
              </h4>
              <ul className="footer-contacts__list list-reset">
                <li className="footer-contacts__item">
                  <p className="footer-contacts__descr">
                    <a
                      href={`tel:${phoneMain}`}
                      className="footer-contacts__link"
                    >
                      {phoneMain}&nbsp;
                    </a>
                    –{" "}
                    {
                      ContactsMapSectionData[0].ContactsMapSectionDataClock[
                        selectedLanguage
                      ]
                    }
                  </p>
                </li>
                <li className="footer-contacts__item">
                  <p className="footer-contacts__descr">
                    <a
                      href={whatsapp}
                      className="footer-contacts__link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {phoneMain}&nbsp;
                    </a>
                    - WhatsApp
                  </p>
                </li>
                <li className="footer-contacts__item">
                  <p className="footer-contacts__descr">
                    {
                      ContactsMapSectionData[0].ContactsMapSectionDataCentr[
                        selectedLanguage
                      ]
                    }
                    :&nbsp;
                    <a
                      href={`mailto:${mail}`}
                      className="footer-contacts__link"
                    >
                      {mail}
                    </a>
                  </p>
                </li>
                <li className="footer-contacts__item">
                  <p className="footer-contacts__descr">
                    {
                      ContactsMapSectionData[0].ContactsMapSectionDataSales[
                        selectedLanguage
                      ]
                    }
                    :&nbsp;
                    <a
                      href={`mailto:${mail}`}
                      className="footer-contacts__link"
                    >
                      {mail}
                    </a>
                  </p>
                </li>
              </ul>
            </div>
            <div className="footer-social">
              <SocialList />
            </div>
          </div>
        </div>
        <div className="footer-right">
          <YMaps query={{ apikey: apiKey }} className="map">
            <div className="map__container">
              <Map
                defaultState={{ center: [43.347919, 77.009412], zoom: 17 }}
                className="map__map"
              >
                {/* Пример размещения маркера */}
                <Placemark geometry={[43.347919, 77.009412]} />
              </Map>
            </div>
          </YMaps>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
