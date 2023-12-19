import React, { useContext } from "react";
import { useProjects } from "../../Hooks/useProjects";
import { useLanguage } from "../../Hooks/LanguageContext";
import { observer } from "mobx-react-lite";
import "./CategoriesBarSection.scss";
import { Context } from "../../index";

const CategoriesBarSection = observer(() => {
  const { selectedLanguage, changeLanguage } = useLanguage();
  const { projects, categories, selectedCategoryId, setSelectedCategoryId } = useProjects(); // Обновлено

  const { project } = useContext(Context);

  const handleCategoryClick = (categoryId) => {
    project.setSelectedCategory(categoryId);
    setSelectedCategoryId(categoryId);
  };

  return (
    <section className="categories-bar">
      <div className="categories-bar__container container">
        <ul className="categories-bar__list list-reset">
          {project.categories.map((category) => (
            <li key={category.id} className="categories-bar__item">
              <button
                className={`categories-bar__btn btn-reset ${selectedCategoryId === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {JSON.parse(category.category).category[selectedLanguage]}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});

export default CategoriesBarSection;
