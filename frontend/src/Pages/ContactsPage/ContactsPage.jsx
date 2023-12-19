import React from "react";
import "./ContactsPage.scss";
import HeroSection from "../../Sections/HeroSection/HeroSection";
import ContactsMapSection from "../../Sections/ContactsMapSection/ContactsMapSection";
import ApplicationSection from "../../Sections/ApplicationSection/ApplicationSection";
import ContactsPageData from "./ContactsPageData";
import { useLanguage } from "../../Hooks/LanguageContext";

const ContactsPage = () => {

  const { selectedLanguage } = useLanguage();

  return (
    <main className="contacts-page">
      <HeroSection
        hero__bg="/images/hero_bg-main.png"
        hero_title_top=""
        hero_title_bottom={ContactsPageData[0].ContactsPageDataTitle[selectedLanguage]}
        hero_descr_top={ContactsPageData[0].ContactsPageDataSubTitle[selectedLanguage]}
        hero_descr_bottom={ContactsPageData[0].ContactsPageDataDescr[selectedLanguage]}
      />
      <ContactsMapSection />
      <ApplicationSection />
    </main>
  );
};

export default ContactsPage;
