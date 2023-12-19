// import React, { useContext, useEffect } from "react";
// import { observer } from "mobx-react-lite";
// import { Context } from "../../../index";
// import ProjectsSectionItem from "./ProjectsSectionItem";
// import { fetchProjects } from "../../../http/projectAPI";
// import Pagination from "../../../Components/Pagination/Pagination";

// const ProjectsSectionList = observer(() => {
//   const { project } = useContext(Context);

//   useEffect(() => {
//     fetchProjects(project.page, 3)
//       .then((projects) => {
//         // Отсортируйте проекты по дате создания в порядке убывания
//         projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//         project.setProjects(projects);
//         project.setTotalCount(projects.count)
//         console.log("projects in FetchProjects", project.projects);
//       })
//       .catch((error) => {
//         console.error("Error fetching projects:", error);
//       });
//   }, [project, project.page]);

// console.log(project.page)
// console.log(project.totalCount)

//   return (
//     <div className="">
//     <ul className="our-projects__list list-reset">
//       {project.projects &&
//         project.projects.map((project) => (
//           <ProjectsSectionItem key={project.id} project={project} />
//         ))}
//     </ul>
//     <Pagination/>
//     </div>
//   );
// });

// export default ProjectsSectionList;

// ProjectsSectionList.jsx

// ProjectsSectionList.jsx

// ProjectsSectionList.jsx

// ProjectsSectionList.jsx

// import React, { useContext, useEffect } from "react";
// import { observer } from "mobx-react-lite";
// import { Context } from "../../../index";
// import ProjectsSectionItem from "./ProjectsSectionItem";
// import { fetchProjects } from "../../../http/projectAPI";
// import Pagination from "../../../Components/Pagination/Pagination";
// import { fetchCategories } from "../../../http/categoryAPI";
// import { useProjects } from "../../../Hooks/useProjects";

// const ProjectsSectionList = observer(() => {
//   // const { project } = useContext(Context);

//   const { projects } = useProjects();

//   return (
//     <div className="">
//       <ul className="our-projects__list list-reset">
// {projects.map((projectItem) => (
//             <ProjectsSectionItem key={projectItem.id} project={projectItem} />
//           ))}
//       </ul>
//     </div>
//   );
// });

// export default ProjectsSectionList;



import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../index";
import ProjectsSectionItem from "./ProjectsSectionItem";
import { fetchProjects } from "../../../http/projectAPI";
import Pagination from "../../../Components/Pagination/Pagination";
import { fetchCategories } from "../../../http/categoryAPI";
import { useProjects } from "../../../Hooks/useProjects";

const ProjectsSectionList = observer(() => {
  const { project } = useContext(Context);

  // const { projects } = useProjects();

  return (
    <div className="">
      <ul className="our-projects__list list-reset">
{project.projects.map((projectItem) => (
            <ProjectsSectionItem key={projectItem.id} project={projectItem} />
          ))}
      </ul>
    </div>
  );
});

export default ProjectsSectionList;