export const PHOTO_STATUSES = ["pending_review", "approved", "rejected"];

export function isCustomerVisiblePhoto(photo) {
  return photo?.status === "approved" && photo?.visible_to_customer === true;
}

export function prepareWorkerPhotoUpload(upload) {
  return {
    ...upload,
    status: "pending_review",
    visible_to_customer: false
  };
}
