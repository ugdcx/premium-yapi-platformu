import { projects } from "../../lib/data/mockData";
import { isCustomerVisiblePhoto } from "../lib/photoApproval";

export const photoService = {
  listPendingReview: () =>
    projects.flatMap((project) => (project.photos || []).filter((photo) => photo.status === "pending_review")),
  listCustomerVisible: (projectId) =>
    projects.find((project) => project.id === projectId)?.photos.filter(isCustomerVisiblePhoto) || []
};
