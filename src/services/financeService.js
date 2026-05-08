import { projects } from "../../lib/data/mockData";

export const financeService = {
  summary: () => {
    const totalSales = projects.reduce((sum, project) => sum + Number(project.totalAmount || 0), 0);
    const collected = projects.reduce((sum, project) => sum + Number(project.paidAmount || 0), 0);
    const pending = projects.reduce((sum, project) => sum + Number(project.remainingAmount || 0), 0);
    const totalCost = Math.round(totalSales * 0.62);

    return {
      totalSales,
      collected,
      pending,
      totalCost,
      netProfit: collected - totalCost
    };
  }
};
