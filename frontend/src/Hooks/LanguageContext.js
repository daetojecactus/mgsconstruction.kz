//Смена языка
import React, { createContext, useContext, useState } from "react";

// Создаем контекст
export const LanguageContext = createContext();

// Создаем провайдер контекста
export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("ru"); //по умолчанию стоит казахский язык

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Создаем хук для доступа к выбранному языку и функции смены языка
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
