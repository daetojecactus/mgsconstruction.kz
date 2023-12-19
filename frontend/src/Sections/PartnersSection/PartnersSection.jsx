import React from "react";
import "./PartnersSection.scss";
import partnersArray from './PartnersSectionData'
import { useLanguage, changeLanguage } from "../../Hooks/LanguageContext";

const PartnersSection = () => {

  const { selectedLanguage, changeLanguage } = useLanguage(); //Язык

  const PartnersSectionTitle = [
    {
      PartnersSectionTitleTitle: {
        ru: "ПАРТНЕРЫ",
        en: "PARTNERS",
        kz: "СЕРІКТЕСТЕР",
        tr: "ORTAKLAR",
      },
    },
  ];

  return (
    <section className="partners">
      <div className="partners__container container">
        <h2 className="partners__title">{PartnersSectionTitle[0].PartnersSectionTitleTitle[selectedLanguage]}</h2>
        <ul className="partners__list list-reset">
          {partnersArray.map((partner) => (
            <li key={partner.id} className="partners__item">
              <img
                src={partner.img}
                alt={partner.title}
                className="partners__image"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PartnersSection;
