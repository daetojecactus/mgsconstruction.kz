import React from "react";
import "./ServicesPage.scss";
import HeroSection from "../../Sections/HeroSection/HeroSection";
import ServicesSection from "../../Sections/ServicesSection/ServicesSection";
import ApplicationSection from "../../Sections/ApplicationSection/ApplicationSection";
import ServicesPageData from "./ServicesPageData";
import { useLanguage } from "../../Hooks/LanguageContext";

const ServicesPage = () => {

  const { selectedLanguage } = useLanguage();

  return (
    <main className="services">
      <HeroSection
        hero__bg="/images/hero_bg-main.png"
        hero_title_top=""
        hero_title_bottom={ServicesPageData[0].ServicesPageDataTitle[selectedLanguage]}
        hero_descr_top={ServicesPageData[0].ServicesPageDataSubTitle[selectedLanguage]}
        hero_descr_bottom={ServicesPageData[0].ServicesPageDataDescr[selectedLanguage]}
      />
      <ServicesSection />

      <ApplicationSection />
    </main>
  );
};

export default ServicesPage;
