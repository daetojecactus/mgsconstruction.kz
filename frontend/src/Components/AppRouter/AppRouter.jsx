import React from "react";
import { Routes, Route } from "react-router-dom";
import { adminRoutes, publicRoutes } from "../../routes";

const AppRouter = ({ selectedLanguage }) => {
  const isAuthenticated = () => !!localStorage.getItem("token"); // Проверяем, есть ли токен в localStorage

  return (
    <Routes>
      {isAuthenticated() &&
      adminRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} exact />
      ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} exact />
      ))}
    </Routes>
  );
};

export default AppRouter;
