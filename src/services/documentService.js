import { projects } from "../../lib/data/mockData";

export const documentService = {
  listByProject: (projectId) =>
    projects.find((project) => project.id === projectId)?.documents || []
};
