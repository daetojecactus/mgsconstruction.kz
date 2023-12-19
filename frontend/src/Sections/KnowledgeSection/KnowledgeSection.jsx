import React from "react";
import "./KnowledgeSection.scss";
import knowledgeArray from "./KnowledgeSectionData";
import { useLanguage, changeLanguage } from "../../Hooks/LanguageContext";

const KnowledgeSection = () => {
  const { selectedLanguage, changeLanguage } = useLanguage(); //Язык

  return (
    <section className="knowledge-content">
      <div className="knowledge-content__container container">
        <ul className="knowledge-content__list list-reset">
          {knowledgeArray.map((knowledge) => (
            <li key={knowledge.id} className="knowledge-content__item">
              <div className="knowledge-card">
                <div className="knowledge-card__wrapper">
                  <h3 className="knowledge-card__title">
                    {knowledge.title[selectedLanguage]}
                  </h3>
                </div>
                <div className="knowledge-card__content">
                  <div className="knowledge-card__image">
                    <div
                      className="knowledge-card__picture"
                      style={{
                        backgroundImage: `url(${knowledge.img})`,
                      }}
                    ></div>
                  </div>
                  <div className="knowledge-card__info">
                    <div
                      className="knowledge-card__bg"
                      style={{
                        backgroundImage: `url(${knowledge.bg})`,
                      }}
                    ></div>
                    <div className="knowledge-card__box">
                      <p className="knowledge-card__descr">
                        {knowledge.descr[selectedLanguage]}
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

export default KnowledgeSection;
