import React from "react";
import AboutSection from "../../Sections/AboutSection/AboutSection";
import AdvantagesSection from "../../Sections/AdvantagesSection/AdvantagesSection";
import ApplicationSection from "../../Sections/ApplicationSection/ApplicationSection";
import HeroSection from "../../Sections/HeroSection/HeroSection";
import PartnersSection from "../../Sections/PartnersSection/PartnersSection";
import OurProjectsSliderSection from "../../Sections/OurProjectsSliderSection/OurProjectsSliderSection";
import { useLanguage } from "../../Hooks/LanguageContext";
import MainPageData from "./MainPageData";

const MainPage = () => {
  const { selectedLanguage } = useLanguage();

  return (
    <main>
      <HeroSection
        hero__bg="/images/hero_bg-main.png"
        hero_title_top={MainPageData[0].MainPageDataSubTitle[selectedLanguage]}
        hero_title_bottom={MainPageData[0].MainPageDataDate[selectedLanguage]}
        hero_descr_top={MainPageData[0].MainPageDataTitle[selectedLanguage]}
        hero_descr_bottom={MainPageData[0].MainPageDataDescr[selectedLanguage]}
      />
      <AboutSection />
      <OurProjectsSliderSection />
      <AdvantagesSection />
      <PartnersSection />
      <ApplicationSection />
    </main>
  );
};

export default MainPage;
