import React from "react";
import "./AdvantagesSection.scss";
import advantagesArray from "./AdvantagesSectionData";
import { useLanguage, changeLanguage } from "../../Hooks/LanguageContext";

const AdvantagesSection = () => {
  const { selectedLanguage, changeLanguage } = useLanguage(); //Язык

  const advantagesTitle = [
    {
      advantagesTitleTitle: {
        ru: "НАШИ ДОСТИЖЕНИЯ",
        en: "OUR ACHIEVEMENTS",
        kz: "БІЗДІҢ ЖЕТІСТІКТЕРІМІЗ",
        tr: "BAŞARILARIMIZ",
      },
    },
  ];

  return (
    <section className="advantages">
      <div className="container advantages__container">
        <h2 className="advantages__title">
          {advantagesTitle[0].advantagesTitleTitle[selectedLanguage]}
        </h2>
        <ul className="advantages__list list-reset">
          {advantagesArray.map((advantage) => (
            <li key={advantage.id} className="advantages__item">
              <div className="advantages__card">
                <h4 className="advantages__caption">
                  {advantage.title[selectedLanguage]}
                </h4>
                <p className="advantages__descr">
                  {advantage.descr[selectedLanguage]}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AdvantagesSection;
