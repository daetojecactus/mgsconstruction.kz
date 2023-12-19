// import React, { useContext } from "react";
// import Select from "react-select";
// import { LanguageContext } from "../../Hooks/LanguageContext";

// const LanguageSwitcher = () => {
//   const { selectedLanguage, changeLanguage } = useContext(LanguageContext);

//   const languageOptions = [
//     { value: "ru", label: "RU" },
//     { value: "kz", label: "KZ" },
//     { value: "en", label: "EN" },
//     { value: "tr", label: "TR" },
//   ];

//   const handleLanguageChange = (selectedOption) => {
//     changeLanguage(selectedOption.value);
//   };

//   return (
//     <div className="language-switcher">
//       <Select
//         options={languageOptions}
//         value={languageOptions.find(
//           (option) => option.value === selectedLanguage
//         )}
//         onChange={handleLanguageChange}
//       />
//     </div>
//   );
// };

// export default LanguageSwitcher;


import React, { useContext } from "react";
import { LanguageContext } from "../../Hooks/LanguageContext";
import './LanguageSwitcher.scss'

const LanguageSwitcher = () => {
  const { selectedLanguage, changeLanguage } = useContext(LanguageContext);

  const languageOptions = [
    { value: "ru", label: "RU" },
    { value: "kz", label: "KZ" },
    { value: "en", label: "EN" },
    { value: "tr", label: "TR" },
  ];

  const handleLanguageChange = (language) => {
    changeLanguage(language);
  };

  return (
    <div className="language-switcher">
      {languageOptions.map((option) => (
        <span
          key={option.value}
          className={`language-switcher__option ${selectedLanguage === option.value ? "language-switcher__selected-option" : ""}`}
          onClick={() => handleLanguageChange(option.value)}
        >
          {option.label}
        </span>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
