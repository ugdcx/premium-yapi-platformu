import { leadApplications } from "../../lib/data/mockData";

export const applicationService = {
  list: () => leadApplications,
  findById: (id) => leadApplications.find((application) => application.id === id)
};
