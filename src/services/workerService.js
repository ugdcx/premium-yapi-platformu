import { workers } from "../../lib/data/mockData";

export const workerService = {
  list: () => workers,
  findById: (id) => workers.find((worker) => worker.id === id)
};
