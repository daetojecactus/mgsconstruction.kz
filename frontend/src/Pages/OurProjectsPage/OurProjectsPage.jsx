import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Pagination from "../../Components/Pagination/Pagination";
import ProjectsSection from "../../Sections/ProjectsSection/ProjectsSection";
import "./ProjectsPage.scss";
import { useTranslation } from "react-i18next";
import ApplicationSection from "../../Sections/ApplicationSection/ApplicationSection";
import HeroSection from "../../Sections/HeroSection/HeroSection";
import CategoriesBarSection from "../../Sections/CategoriesBarSection/CategoriesBarSection";

const OurProjectsPage = observer(() => {
  return (
    <main className="main">
      <HeroSection
        hero__bg="/images/hero_bg_projects.png"
        hero_title_top="наши"
        hero_title_bottom="ПРОЕКТЫ"
      />
      <CategoriesBarSection/>
      <ProjectsSection />
      <Pagination />
      <ApplicationSection />
    </main>
  );
});

export default OurProjectsPage;
