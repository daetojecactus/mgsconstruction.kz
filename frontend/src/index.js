import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./normalize.css";
import "./settings.scss";
import ProjectStore from "./Store/projectStore";

export const Context = createContext(null);
const projectStore = new ProjectStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider value={{ project: projectStore }}>
    <App />
  </Context.Provider>
);
