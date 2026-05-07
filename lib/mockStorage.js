"use client";

const APPLICATIONS_KEY = "blaag.mock.applications";
const UPLOADS_KEY = "blaag.mock.workerUploads";

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

export function createApplication(data) {
  const applications = readItems(APPLICATIONS_KEY);
  const application = {
    id: makeId("application"),
    applicationNo: `BLAAG-${new Date().getFullYear()}-${String(applications.length + 1).padStart(3, "0")}`,
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

export function updateApplicationStatus(id, status) {
  const applications = readItems(APPLICATIONS_KEY).map((application) =>
    application.id === id ? { ...application, status } : application
  );
  writeItems(APPLICATIONS_KEY, applications);
  return applications;
}

export function createWorkerUpload(data) {
  const uploads = readItems(UPLOADS_KEY);
  const upload = {
    id: makeId("upload"),
    project: "Villa Renovasyon Süreci",
    worker: "Ahmet Sezer",
    status: "Onay Bekliyor",
    customerDescription: "",
    createdAt: new Date().toISOString(),
    ...data
  };

  writeItems(UPLOADS_KEY, [upload, ...uploads]);
  return upload;
}

export function getWorkerUploads() {
  return readItems(UPLOADS_KEY);
}

export function updateWorkerUpload(id, updates) {
  const uploads = readItems(UPLOADS_KEY).map((upload) =>
    upload.id === id ? { ...upload, ...updates } : upload
  );
  writeItems(UPLOADS_KEY, uploads);
  return uploads;
}

export function getApprovedUpdates() {
  return readItems(UPLOADS_KEY).filter(
    (upload) => upload.status === "Yayınlandı" && upload.customerDescription?.trim()
  );
}
