// //dev
// import { $authHost, $host } from "./index";

// export const createCategory = async (category) => {
//   const { data } = await $authHost.post("api/category", category);

//   console.log("and data:", category);

//   return data;
// };

// export const updateCategory = async (categoryId, category) => {
//   console.log(
//     "Sending PUT request to update category with categoryId",
//     categoryId,
//     "and data:",
//     category
//   );

//   const { data } = await $authHost.put(`api/category/${categoryId}`, category);

//   console.log("Received response from server:", data);
//   return data;
// };

// export const deleteCategory = async (categoryId) => {
//   const { data } = await $authHost.delete(`api/category/${categoryId}`);
//   return data;
// };

// export const fetchCategories = async () => {
//   const { data } = await $host.get("api/category");
//   return data;
// };

// export const fetchCategoriesByProjectId = async (projectId) => {
//   const { data } = await $host.get("api/category", {
//     params: { projectId },
//   });
//   return data;
// };




//production
import { $authHost, $host } from "./index";

export const createCategory = async (category) => {
  const { data } = await $authHost.post("/api/category", category);

  console.log( "and data:", category);

  return data;
};

export const updateCategory = async (categoryId, category) => {
  console.log("Sending PUT request to update category with categoryId", categoryId, "and data:", category);

  const { data } = await $authHost.put(`/api/category/${categoryId}`, category);

  console.log("Received response from server:", data);
  return data;
};

export const deleteCategory = async (categoryId) => {
  const { data } = await $authHost.delete(`/api/category/${categoryId}`);
  return data;
};

export const fetchCategories = async () => {
  const { data } = await $host.get("/api/category");
  return data;
};

export const fetchCategoriesByProjectId = async (projectId) => {
  const { data } = await $host.get("/api/category", {
    params: { projectId },
  });
  return data;
};
