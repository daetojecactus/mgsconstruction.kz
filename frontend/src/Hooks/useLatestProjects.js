// useLatestProjects.js
import { useEffect, useState, useContext } from 'react';
import { useProjects } from './useProjects';
import { Context } from '../index';

export const useLatestProjects = () => {
  const { project } = useContext(Context);
  const [latestProjects, setLatestProjects] = useState([]);
  const { projects: allProjects, categories, setSelectedCategoryId } = useProjects(project?.limitAll || 50);

  useEffect(() => {
    const fetchLatestProjects = async () => {
      try {
        const latestProjectsMap = new Map();

        allProjects
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, project?.limitAll || 50)
          .forEach((project) => {
            const categoryId = project.projectCategoryId;

            if (!latestProjectsMap.has(categoryId)) {
              latestProjectsMap.set(categoryId, project);
            } else {
              const existingProject = latestProjectsMap.get(categoryId);
              if (new Date(project.createdAt) > new Date(existingProject.createdAt)) {
                latestProjectsMap.set(categoryId, project);
              }
            }
          });

        const latestProjectsArray = Array.from(latestProjectsMap.values());
        setLatestProjects(latestProjectsArray);

        console.log('allProjects:', allProjects);
        console.log('latestProjectsMap:', latestProjectsMap);
        console.log('latestProjectsArray:', latestProjectsArray);
      } catch (error) {
        console.error('Error fetching latest projects:', error);
      }
    };

    fetchLatestProjects();
  }, [allProjects, project?.limitAll]);

  return { latestProjects, categories, setSelectedCategoryId };
};
