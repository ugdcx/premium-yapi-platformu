"use client";

const APPLICATIONS_KEY = "blagg.applications";
const UPLOADS_KEY = "blagg.workerUploads";

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function readItems(key) {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeItems(key, items) {
  if (!canUseStorage()) return items;
  window.localStorage.setItem(key, JSON.stringify(items));
  return items;
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeWorkerUpload(upload) {
  const approvalStatus =
    upload.approvalStatus ||
    (upload.status === "approved"
      ? "approved"
      : upload.status === "rejected"
        ? "rejected"
        : "pending");
  const visibleToClient =
    typeof upload.visibleToClient === "boolean"
      ? upload.visibleToClient
      : Boolean(upload.visible_to_customer);

  return {
    id: upload.id || makeId("upload"),
    projectSlug: upload.projectSlug || "",
    projectName: upload.projectName || upload.project || "BLAGG projesi",
    token: upload.token || "",
    workerName: upload.workerName || upload.workerLabel || upload.worker || "Saha ekibi",
    workerLabel: upload.workerLabel || upload.workerName || upload.worker || "Saha ekibi",
    workItem: upload.workItem || upload.area || "Saha",
    workStatus: upload.workStatus || "",
    status:
      upload.status ||
      (approvalStatus === "approved"
        ? "approved"
        : approvalStatus === "rejected"
          ? "rejected"
          : "pending_review"),
    note: upload.note || "",
    photos: Array.isArray(upload.photos) ? upload.photos : [],
    createdAt: upload.createdAt || new Date().toISOString(),
    approvalStatus,
    approvedAt: upload.approvedAt || "",
    rejectedAt: upload.rejectedAt || "",
    adminNote: upload.adminNote || upload.customerDescription || "",
    visibleToClient,
    visible_to_customer: visibleToClient,
    customerDescription: upload.customerDescription || upload.adminNote || upload.note || ""
  };
}

export function createApplication(data) {
  const applications = readItems(APPLICATIONS_KEY);
  const application = {
    id: makeId("application"),
    applicationNo: `BLAGG-${new Date().getFullYear()}-${String(
      applications.length + 1
    ).padStart(3, "0")}`,
    status: "Yeni",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...data
  };

  writeItems(APPLICATIONS_KEY, [application, ...applications]);
  return application;
}

export function getApplications() {
  return readItems(APPLICATIONS_KEY);
}

export function updateApplication(id, updates) {
  const applications = readItems(APPLICATIONS_KEY);
  const exists = applications.some((application) => application.id === id);
  const updatedAt = new Date().toISOString();
  const nextApplication = {
    id,
    lifecycleOnly: true,
    createdAt: updatedAt,
    ...updates,
    updatedAt
  };
  const nextApplications = exists
    ? applications.map((application) =>
        application.id === id ? { ...application, ...updates, updatedAt } : application
      )
    : [nextApplication, ...applications];

  writeItems(APPLICATIONS_KEY, nextApplications);
  return nextApplications;
}

export function updateApplicationStatus(id, status) {
  return updateApplication(id, { status });
}

export function cancelApplication(id, cancelReason = "") {
  const now = new Date().toISOString();
  return updateApplication(id, {
    status: "İptal",
    cancelled: true,
    cancelledAt: now,
    cancelReason,
    archived: true,
    archivedAt: now,
    deleted: false,
    deletedAt: ""
  });
}

export function archiveApplication(id) {
  return updateApplication(id, {
    archived: true,
    archivedAt: new Date().toISOString(),
    deleted: false,
    deletedAt: ""
  });
}

export function restoreApplication(id) {
  return updateApplication(id, {
    archived: false,
    archivedAt: "",
    cancelled: false,
    cancelledAt: "",
    cancelReason: "",
    deleted: false,
    deletedAt: "",
    status: "İnceleniyor"
  });
}

export function deleteApplication(id) {
  return updateApplication(id, {
    deleted: true,
    deletedAt: new Date().toISOString(),
    archived: true
  });
}

export function createWorkerUpload(data) {
  const uploads = readItems(UPLOADS_KEY);
  const upload = normalizeWorkerUpload({
    id: makeId("upload"),
    projectName: "Villa Renovasyon Süreci",
    workerName: "Saha ekibi",
    status: "pending_review",
    approvalStatus: "pending",
    visibleToClient: false,
    createdAt: new Date().toISOString(),
    ...data
  });

  writeItems(UPLOADS_KEY, [upload, ...uploads]);
  return upload;
}

export function getWorkerUploads() {
  return readItems(UPLOADS_KEY).map(normalizeWorkerUpload);
}

export function updateWorkerUpload(id, updates) {
  const uploads = getWorkerUploads().map((upload) =>
    upload.id === id ? normalizeWorkerUpload({ ...upload, ...updates }) : upload
  );
  writeItems(UPLOADS_KEY, uploads);
  return uploads;
}

export function getApprovedUpdates() {
  return getWorkerUploads().filter(
    (upload) =>
      upload.approvalStatus === "approved" &&
      upload.visibleToClient &&
      (upload.adminNote?.trim() || upload.note?.trim())
  );
}

export function getApprovedProjectUpdates(projectSlug) {
  return getApprovedUpdates().filter((upload) => upload.projectSlug === projectSlug);
}
