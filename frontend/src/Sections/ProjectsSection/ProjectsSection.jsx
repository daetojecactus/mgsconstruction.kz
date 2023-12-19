import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import ProjectsSectionList from "./ProjectsSectionComponents/ProjectsSectionList";
import { useProjects } from "../../Hooks/useProjects";
import { fetchProjects } from "../../http/projectAPI";
import "./ProjectsSection.scss";
import { fetchCategories } from "../../http/categoryAPI";
import { useLanguage, changeLanguage } from "../../Hooks/LanguageContext";
import ProjectPageData from "../../Pages/ProjectPage/ProjectPageData";

const ProjectsSection = observer(() => {
  const { project } = useContext(Context);
  const { selectedLanguage } = useLanguage();

  useEffect(() => {
    fetchCategories().then((data) => project.setCategories(data));
    fetchProjects().then((data) => {
    project.setProjects(data.rows);
    project.setTotalCount(data.count);
    });
    }, []);
    
useEffect(() => {
  console.log("Fetching projects with category:", project.selectedCategory);
  fetchProjects(project.selectedCategory, project.page, 3).then((data) => {
    project.setProjects(data.rows);
    project.setTotalCount(data.count);
    console.log("Fetched projects in ProjectsSection:", data);
  });
}, [project.page, project.selectedCategory]);


    console.log('project.selectedCategory.id', project.selectedCategory)

  return (
    <section className="our-projects">
      <div className="container our-projects__container">
        <h2 className="our-projects__title">{ProjectPageData[0].ProjectPageDataTitle[selectedLanguage]}</h2>
        <ProjectsSectionList />
      </div>
    </section>
  );
});

export default ProjectsSection;
