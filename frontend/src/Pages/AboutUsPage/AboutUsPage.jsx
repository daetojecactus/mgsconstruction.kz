import React from "react";
import "./AboutUsPage.scss";
import HeroSection from "../../Sections/HeroSection/HeroSection";
import KnowledgeSection from "../../Sections/KnowledgeSection/KnowledgeSection";
import StridesSection from "../../Sections/StridesSection/StridesSection";
import OurContactsSection from "../../Sections/OurContactsSection/OurContactsSection";
import ApplicationSection from "../../Sections/ApplicationSection/ApplicationSection";
import AboutUsPageData from "./AboutUsPageData";
import { useLanguage } from "../../Hooks/LanguageContext";

const AboutUsPage = () => {

  const { selectedLanguage } = useLanguage();

  return (
    <main className="about-page">
      <HeroSection
        hero__bg="/images/hero_bg-main.png"
        hero_title_top=""
        hero_title_bottom={AboutUsPageData[0].AboutUsPageDataTitle[selectedLanguage]}
        hero_descr_top={AboutUsPageData[0].AboutUsPageDataSubTitle[selectedLanguage]}
        hero_descr_bottom={AboutUsPageData[0].AboutUsPageDataDescr[selectedLanguage]}
      />
      <KnowledgeSection />
      <StridesSection />
      <OurContactsSection />
      <ApplicationSection />
    </main>
  );
};

export default AboutUsPage;
