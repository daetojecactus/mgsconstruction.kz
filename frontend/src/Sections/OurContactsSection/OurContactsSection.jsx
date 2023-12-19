import React, { useContext, useEffect, useState } from "react";
import "./OurContactsSection.scss";
import { fetchSocialLinks } from "../../http/socialAPI";
import OurContactsSectionData from "./OurContactsSectionData";
import { useLanguage } from "../../Hooks/LanguageContext";

const OurContactsSection = () => {
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
    <section className="our-contacts">
      <div className="our-contacts__container container">
        <div className="our-contacts__content">
          <h2 className="our-contacts__title">
            {
              OurContactsSectionData[0].OurContactsSectionDataTitle[
                selectedLanguage
              ]
            }
          </h2>
          <div className="our-contacts__info">
            <p className="our-contacts__descr">
              {
                OurContactsSectionData[0].OurContactsSectionDataDescr[
                  selectedLanguage
                ]
              }
            </p>
            <a href={`mailto:${mail}`} className="our-contacts__link">
              {mail}
            </a>
          </div>
          <p className="our-contacts__descr">
            {
              OurContactsSectionData[0].OurContactsSectionDataAnd[
                selectedLanguage
              ]
            }
          </p>
          <div className="our-contacts__info">
            <p className="our-contacts__descr">
              {
                OurContactsSectionData[0].OurContactsSectionDataDescrSecond[
                  selectedLanguage
                ]
              }
            </p>
            <div className="our-contacts__phones">
              <a
                href={whatsapp}
                className="our-contacts__link"
                target="_blank"
                rel="noreferrer"
              >
                {phoneMain} (Whatsapp)
              </a>
              <a href={`tel:${phoneMain}`} className="our-contacts__link">
                {phoneMain}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurContactsSection;
