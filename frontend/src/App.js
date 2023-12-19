import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import AppRouter from "./Components/AppRouter/AppRouter";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { LanguageProvider } from "./Hooks/LanguageContext";

const App = observer(() => {

  return (
    <BrowserRouter>
      <LanguageProvider>
        <Header />
        <AppRouter />
        <Footer />
      </LanguageProvider>
    </BrowserRouter>
  );
});

export default App;
