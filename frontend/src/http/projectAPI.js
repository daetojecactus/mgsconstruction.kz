// //dev
// import { $authHost, $host } from "./index";

// export const createProject = async (project) => {
//   console.log("projectAPI", project);
//   const { data } = await $authHost.post("api/project", project);
//   console.log("Received response from server:", data);
//   return data;
// };

// export const updateProject = async (id, project) => {
//   console.log(
//     "Sending PUT request to update project with id",
//     id,
//     "and data:",
//     project
//   );
//   const { data } = await $authHost.put(`api/project/${id}`, project);
//   return data;
// };

// export const deleteProject = async (id) => {
//   const { data } = await $authHost.delete(`api/project/${id}`);
//   return data;
// };

// export const fetchProjects = async (categoryId, page, limit = 3) => {
//   const { data } = await $host.get("api/project", {
//     params: {
//       categoryId,
//       page,
//       limit,
//     },
//   });

//   return data;
// };

// export const fetchOneProject = async (id) => {
//   const { data } = await $host.get(`api/project/${id}`);
//   return data;
// };



//production
import { $authHost, $host } from "./index";

export const createProject = async (project) => {
  console.log("projectAPI", project);
  const { data } = await $authHost.post("/api/project", project);
  console.log("Received response from server:", data);
  return data;
};

export const updateProject = async (id, project) => {
  console.log(
    "Sending PUT request to update project with id",
    id,
    "and data:",
    project
  );
  const { data } = await $authHost.put(`/api/project/${id}`, project);
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await $authHost.delete(`/api/project/${id}`);
  return data;
};

export const fetchProjects = async (categoryId, page, limit = 3) => {
  const { data } = await $host.get("/api/project", {
    params: {
      categoryId,
      page,
      limit,
    },
  });

  return data;
};

export const fetchOneProject = async (id) => {
  const { data } = await $host.get(`/api/project/${id}`);
  return data;
};
