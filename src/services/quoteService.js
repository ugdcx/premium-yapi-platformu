export const quoteService = {
  list: () => [],
  createFromApplication: (application) => ({
    id: `quote-${application.id}`,
    applicationId: application.id,
    status: "draft",
    lineItems: [],
    exclusions: [],
    paymentPlan: [],
    totalAmount: 0
  })
};
