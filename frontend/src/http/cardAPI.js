// //dev
// import { $authHost, $host } from "./index";

// export const createCard = async (card) => {
//   console.log("createCard API request", card);
//   const { data } = await $authHost.post("api/card", card);
//   console.log("createCard API response", data);
//   return data;
// };

// export const updateCard = async (id, card) => {
//   console.log("updateCard API request", id, card);
//   const { data } = await $authHost.put(`api/card/${id}`, card);
//   console.log("updateCard API response", data);
//   return data;
// };

// export const deleteCard = async (id) => {
//   console.log("deleteCard API request", id);
//   const { data } = await $authHost.delete(`api/card/${id}`);
//   console.log("deleteCard API response", data);
//   return data;
// };

// export const fetchCardsByProjectId = async (projectId) => {
//   console.log("fetchCardsByProjectId API request", projectId);
//   const { data } = await $host.get("api/card", {
//     params: { projectId: projectId },
//   });
//   console.log("fetchCardsByProjectId API response", data);
//   return data;
// };








//production
import { $authHost, $host } from "./index";

export const createCard = async (card) => {
  console.log('createCard API request', card);
  const { data } = await $authHost.post("/api/card", card);
  console.log('createCard API response', data);
  return data;
};

export const updateCard = async (id, card) => {
  console.log('updateCard API request', id, card);
  const { data } = await $authHost.put(`/api/card/${id}`, card);
  console.log('updateCard API response', data);
  return data;
};

export const deleteCard = async (id) => {
  console.log('deleteCard API request', id);
  const { data } = await $authHost.delete(`/api/card/${id}`);
  console.log('deleteCard API response', data);
  return data;
};

export const fetchCardsByProjectId = async (projectId) => {
  console.log('fetchCardsByProjectId API request', projectId);
  const { data } = await $host.get("/api/card", {
    params: { projectId },
  });
  console.log('fetchCardsByProjectId API response', data);
  return data;
};
