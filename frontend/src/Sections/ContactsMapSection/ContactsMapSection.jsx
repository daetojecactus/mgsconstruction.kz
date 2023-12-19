import React, { useContext, useEffect, useState } from "react";
import "./ContactsMapSection.scss";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { fetchSocialLinks } from "../../http/socialAPI";
import ContactsMapSectionData from "./ContactsMapSectionData";
import { useLanguage } from "../../Hooks/LanguageContext";

const ContactsMapSection = () => {
  const apiKey =
    'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A2a44eb628a7acb8449a2c277d333f5cbf2ba6f90f7f097181facb7739866d1e7&amp;width=500&amp;height=400&amp;lang=ru_RU&amp;scroll=true"';

  const [socialLinks, setSocialLinks] = useState([]);
  const desiredPlatforms = ["phoneMain", "whatsapp", "mail"]; // Здесь указываются названия нужных платформ
  const { selectedLanguage } = useLanguage();

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
    <section className="contacts-map">
      <div className="contacts-map__container container">
        <div className="contacts-map__content">
          <div className="contacts-map__contacts">
            <h3 className="contacts-map__title">{ContactsMapSectionData[0].ContactsMapSectionDataTitle[selectedLanguage]}</h3>

            <ul className="contacts-map__ist list-reset">
              <li className="contacts-map__item">
                <a
                  href={`tel:${phoneMain}`}
                  className="contacts-map__link contacts-map__link--phone"
                >
                  {phoneMain}
                </a>
                <h4 className="contacts-map__caption">– {ContactsMapSectionData[0].ContactsMapSectionDataClock[selectedLanguage]}</h4>
              </li>
              <li className="contacts-map__item">
                <a
                  href={whatsapp}
                  className="contacts-map__link contacts-map__link--phone"
                  target="_blank"
                  rel="noreferrer"
                >
                  {phoneMain}
                </a>
                <h4 className="contacts-map__caption">– WhatsApp</h4>
              </li>
              <li className="contacts-map__item">
                <h4 className="contacts-map__caption">{ContactsMapSectionData[0].ContactsMapSectionDataCentr[selectedLanguage]}:</h4>
                <a href={`mailto:${mail}`} className="contacts-map__link">
                  {mail}
                </a>
              </li>
              <li className="contacts-map__item">
                <h4 className="contacts-map__caption">{ContactsMapSectionData[0].ContactsMapSectionDataSales[selectedLanguage]}:</h4>
                <a href={`mailto:${mail}`} className="contacts-map__link">
                  {mail}
                </a>
              </li>
              <li className="contacts-map__item">
                <h4 className="contacts-map__caption">{ContactsMapSectionData[0].ContactsMapSectionDataCentr[selectedLanguage]}:</h4>
                <a href={`mailto:${mail}`} className="contacts-map__link">
                  {mail}
                </a>
              </li>
              <li className="contacts-map__item">
                <h4 className="contacts-map__caption">{ContactsMapSectionData[0].ContactsMapSectionDataSales[selectedLanguage]}:</h4>
                <a href={`mailto:${mail}`} className="contacts-map__link">
                  {mail}
                </a>
              </li>
            </ul>
          </div>
          <div className="contacts-map__map">
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
      </div>
    </section>
  );
};

export default ContactsMapSection;
