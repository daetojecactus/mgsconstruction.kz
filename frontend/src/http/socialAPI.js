// //dev

// import { $authHost, $host } from "./index";

// export const createSocialLink = async (socialLink) => {
//   const { data } = await $authHost.post("api/social-link", socialLink);
//   return data;
// };

// export const updateSocialLink = async (id, socialLink) => {
//   console.log("Sending PUT request to update category with id", id, "and data:", socialLink);
//   const { data } = await $authHost.put(`api/social-link/${id}`, socialLink);
//   return data;
// };

// export const deleteSocialLink = async (id) => {
//   const { data } = await $authHost.delete(`api/social-link/${id}`);
//   return data;
// };

// export const fetchSocialLinks = async () => {
//   const { data } = await $host.get("api/social-link");
//   return data;
// };

// export const fetchSocialLinksByProjectId = async (projectId) => {
//   const { data } = await $host.get("api/social-link", {
//     params: { projectId },
//   });
//   return data;
// };


//production
import { $authHost, $host } from "./index";

export const createSocialLink = async (socialLink) => {
  const { data } = await $authHost.post("/api/social-link", socialLink);
  return data;
};

export const updateSocialLink = async (id, socialLink) => {
  console.log("Sending PUT request to update category with id", id, "and data:", socialLink);
  const { data } = await $authHost.put(`/api/social-link/${id}`, socialLink);
  return data;
};

export const deleteSocialLink = async (id) => {
  const { data } = await $authHost.delete(`/api/social-link/${id}`);
  return data;
};

export const fetchSocialLinks = async () => {
  const { data } = await $host.get("/api/social-link");
  return data;
};

export const fetchSocialLinksByProjectId = async (projectId) => {
  const { data } = await $host.get("/api/social-link", {
    params: { projectId },
  });
  return data;
};
