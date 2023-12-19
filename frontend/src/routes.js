import AdminPageMain from "./AdminPages/AdminPageMain/AdminPageMain";
import AllProjectsAdminPage from "./AdminPages/AllProjectsAdminPage/AllProjectsAdminPage";
import CreateCategoryAdminPage from "./AdminPages/CreateCategoryAdminPage/CreateCategoryAdminPage";
import CreateProjectAdminPage from "./AdminPages/CreateProjectAdminPage/CreateProjectAdminPage";
import CreateSocialAdminPage from "./AdminPages/CreateSocialAdminPage/CreateSocialAdminPage";
import EditProjectAdminPage from "./AdminPages/EditProjectAdminPage/EditProjectAdminPage";
import AboutUsPage from "./Pages/AboutUsPage/AboutUsPage";
import ContactsPage from "./Pages/ContactsPage/ContactsPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import MainPage from "./Pages/MainPage/MainPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import OurProjectsPage from "./Pages/OurProjectsPage/OurProjectsPage";
import ProjectPage from "./Pages/ProjectPage/ProjectPage";
import ServicesPage from "./Pages/ServicesPage/ServicesPage";
import {
  ABOUT_ROUTE,
  ADMIN_ROUTE,
  ALL_PROJECTS_ROUTE,
  CONTACTS_ROUTE,
  CREATE_CATEGORY_ADMIN_ROUTE,
  CREATE_PROJECT_ADMIN_ROUTE,
  CREATE_SOCIAL_ADMIN_ROUTE,
  EDIT_PROJECT_ADMIN_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  NOTFOUND_ROUTE,
  OUR_PROJECT_ROUTE,
  PROJECT_ROUTE,
  SERVICES_ROUTE,
} from "./Utils/consts";

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: <AdminPageMain />,
  },
  {
    path: ALL_PROJECTS_ROUTE,
    Component: <AllProjectsAdminPage />,
  },
  {
    path: CREATE_PROJECT_ADMIN_ROUTE,
    Component: <CreateProjectAdminPage />,
  },
  {
    path: EDIT_PROJECT_ADMIN_ROUTE + "/:id",
    Component: <EditProjectAdminPage />,
  },
  {
    path: CREATE_CATEGORY_ADMIN_ROUTE,
    Component: <CreateCategoryAdminPage />,
  },
  {
    path: CREATE_SOCIAL_ADMIN_ROUTE,
    Component: <CreateSocialAdminPage />,
  },
];

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: <MainPage />,
  },
  {
    path: SERVICES_ROUTE,
    Component: <ServicesPage />,
  },
  {
    path: ABOUT_ROUTE,
    Component: <AboutUsPage />,
  },
  {
    path: CONTACTS_ROUTE,
    Component: <ContactsPage />,
  },
  {
    path: LOGIN_ROUTE,
    Component: <LoginPage />,
  },
  {
    path: PROJECT_ROUTE + "/:id",
    Component: <ProjectPage />,
  },
  {
    path: OUR_PROJECT_ROUTE,
    Component: <OurProjectsPage />,
  },
  {
    path: NOTFOUND_ROUTE,
    Component: <NotFoundPage />,
  },
];
