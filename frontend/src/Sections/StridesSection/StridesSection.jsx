import React from "react";
import stridesArray from "./StridesSectionData";
import { useLanguage, changeLanguage } from "../../Hooks/LanguageContext";
import './StridesSection.scss'

const StridesSection = () => {
  const { selectedLanguage, changeLanguage } = useLanguage(); //Язык

  return (
    <section className="strides">
      <div className="strides__container container">
        <ul className="strides__list list-reset">
          {stridesArray.map((strides) => (
            <li key={strides.id} className="strides__item">
              <div className="strides__card">
                <h4 className="strides__caption">
                  {strides.title[selectedLanguage]}
                </h4>
                <p className="strides__descr">
                  {strides.descr[selectedLanguage]}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default StridesSection;
