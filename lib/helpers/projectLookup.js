import { projects } from "../data/mockData";

export function findProjectByClientToken(token) {
  return projects.find((project) => project.clientToken === token) || null;
}

export function findProjectByWorkerToken(token) {
  return projects.find((project) => project.workerToken === token) || null;
}

export function findProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug) || null;
}
