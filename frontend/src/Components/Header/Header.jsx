import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./Header.scss";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useLanguage, changeLanguage } from "../../Hooks/LanguageContext";
import SocialList from "../SocialList/SocialList";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import { fetchSocialLinks } from "../../http/socialAPI";
import HeaderData from "./HeaderData";
import { Link } from "react-router-dom";
import { HOME_ROUTE } from "../../Utils/consts";

const Header = observer(() => {
  const { selectedLanguage, changeLanguage } = useLanguage(); //Язык
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние для меню

  // Функция для открытия/закрытия меню
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [socialLinks, setSocialLinks] = useState([]);
  const desiredPlatforms = ["phoneMain"]; // Здесь указываются названия нужных платформ

  useEffect(() => {
    fetchSocialLinks().then((data) => {
      setSocialLinks(data);
    });
  }, []);

  const filteredSocialLinks = socialLinks.filter((link) =>
    desiredPlatforms.includes(link.platform)
  );

  //  console.log("filteredSocialLinks", filteredSocialLinks);
  // Обработчик перехода к проекту
  const handleProjectClick = () => {
    // После клика, прокручиваем страницу к верху
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="header">
      <div className="header__container container">
        <div className="header__menu">
          <button
            className="btn-reset header__menu-btn"
            onClick={toggleMenu} // Обработчик нажатия на кнопку "МЕНЮ"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="17"
              viewBox="0 0 33 17"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0.75C0 0.335786 0.335786 0 0.75 0H23.0833C23.4975 0 23.8333 0.335786 23.8333 0.75C23.8333 1.16421 23.4975 1.5 23.0833 1.5H0.750001C0.335787 1.5 0 1.16421 0 0.75ZM0 8.08333C0 7.66912 0.335786 7.33333 0.75 7.33333H32.25C32.6642 7.33333 33 7.66912 33 8.08333C33 8.49755 32.6642 8.83333 32.25 8.83333H0.749999C0.335786 8.83333 0 8.49755 0 8.08333ZM0.75 14.6667C0.335786 14.6667 0 15.0025 0 15.4167C0 15.8309 0.335786 16.1667 0.749999 16.1667H26.75C27.1642 16.1667 27.5 15.8309 27.5 15.4167C27.5 15.0025 27.1642 14.6667 26.75 14.6667H0.75Z"
              />
            </svg>
            <span className="header__menu-btn--span">
              {HeaderData[0].headerMenuMenu[selectedLanguage]}
            </span>
          </button>
        </div>
        {filteredSocialLinks.map((link) => (
          <div className="header__contact" key={link.id}>
            <a href={`tel:${link.url}`} className="header__contact-link">
              {link.url}
            </a>
          </div>
        ))}

        <div className="header__logo">
          <Link
            to={HOME_ROUTE}
            className="header__logo-link"
            onClick={handleProjectClick}
          >
            <img
              src="/images/logo.png"
              alt="Логотип"
              className="header__logo-image"
            />
          </Link>
        </div>
        <div className="header__social">
          <SocialList />
        </div>
        <LanguageSwitcher
          selectedLanguage={selectedLanguage}
          onChange={changeLanguage}
        />
      </div>
      <HeaderMenu isOpen={isMenuOpen} onClose={toggleMenu} />
    </header>
  );
});

export default Header;
