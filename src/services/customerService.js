import { customers } from "../../lib/data/mockData";

export const customerService = {
  list: () => customers,
  findById: (id) => customers.find((customer) => customer.id === id)
};
