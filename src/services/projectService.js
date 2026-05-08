import { projects } from "../../lib/data/mockData";

export const projectService = {
  list: () => projects,
  findByToken: ({ slug, token }) =>
    projects.find((project) => project.slug === slug && project.clientToken === token)
};
