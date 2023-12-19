import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchOneProject } from "../../http/projectAPI";
import ProjectPageSection from "./ProjectPageSections/ProjectPageSection";
import "./ProjectPage.scss";
import ProjectSectionSlider from "./ProjectPageSections/ProjectSectionSlider";
import ApplicationSection from "../../Sections/ApplicationSection/ApplicationSection";
// import { fetchOneProject } from '../../http/projectAPI';

const ProjectPage = () => {
  return (
    <main className="this-project">
      <ProjectPageSection />
      <ProjectSectionSlider />
      <ApplicationSection />
    </main>
  );
};

export default ProjectPage;
