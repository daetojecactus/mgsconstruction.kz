// useProjects.js
import { useEffect, useState } from "react";
import { fetchProjects } from "../http/projectAPI";
import { fetchCategories } from "../http/categoryAPI";
import { useContext } from "react";
import { Context } from "../index";

export const useProjects = (limit) => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const { project } = useContext(Context);

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));

    const fetchData = async () => {
      try {
        let data;

        if (selectedCategoryId !== null) {
          console.log("Fetching projects with category:", selectedCategoryId);
          data = await fetchProjects(selectedCategoryId, project.page, limit);
        } else {
          console.log("Fetching projects without category");
          data = await fetchProjects(null, project.page, limit);
        }

        console.log("Fetched projects:", data);
        setProjects(data.rows);
        setTotalCount(data.count);

      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, [project.page, project.selectedCategory, selectedCategoryId, limit]);

  useEffect(() => {
    console.log("Projects state after update:", projects);
  }, [projects]);

  return {
    projects,
    categories,
    totalCount,
    selectedCategoryId,
    setSelectedCategoryId,
  };
};
