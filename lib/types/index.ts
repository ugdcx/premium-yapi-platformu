export type LeadStatus =
  | "Yeni"
  | "İnceleniyor"
  | "Arandı"
  | "Teklif Hazırlanıyor"
  | "Onaylandı"
  | "Reddedildi";

export type ProjectStatus =
  | "Planlama"
  | "Uygulamada"
  | "Beklemede"
  | "Teslime Hazırlanıyor"
  | "Tamamlandı";

export type WorkItemStatus = "Planlandı" | "Uygulamada" | "Tamamlandı" | "Revize";
export type PaymentStatus = "Bekliyor" | "Yaklaşan" | "Ödendi" | "Gecikti";
export type MaterialStatus = "Seçildi" | "Onay bekliyor" | "Sahaya alındı" | "Tedarikte";
export type NoteVisibility = "admin" | "client" | "worker";

export type ProjectPhoto = {
  id: string;
  url: string;
  caption: string;
  uploadedBy: "admin" | "worker" | "customer";
  workItemId?: string;
  stage: "Öncesi" | "Süreç" | "Malzeme" | "Teslim";
  createdAt: string;
};

export type WorkItem = {
  id: string;
  title: string;
  description: string;
  status: WorkItemStatus;
  plannedDate: string;
  completedDate?: string;
  notes: string;
};

export type PaymentItem = {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
};

export type MaterialItem = {
  id: string;
  category: string;
  brand: string;
  model: string;
  quantity: number;
  unit: string;
  status: MaterialStatus;
  documentUrl?: string;
};

export type ProjectDocument = {
  id: string;
  title: string;
  type: "PDF" | "DOC" | "Görsel" | "Link";
  url: string;
  createdAt: string;
};

export type ProjectNote = {
  id: string;
  visibility: NoteVisibility;
  content: string;
  createdAt: string;
};

export type LeadApplication = {
  id: string;
  fullName: string;
  phone: string;
  normalizedPhone: string;
  city: string;
  district: string;
  serviceType: string;
  description: string;
  budgetRange: string;
  startTime: string;
  photos: string[];
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
  adminNotes: string;
};

export type OfferFormInput = {
  fullName: string;
  phone: string;
  city: string;
  district: string;
  serviceType: string;
  description: string;
  budgetRange: string;
  startTime: string;
  notes: string;
  photos: string[];
};

export type AdminApplicationRow = {
  id: string;
  applicationNo: string;
  fullName: string;
  phone: string;
  normalizedPhone: string;
  city: string;
  district: string;
  serviceType: string;
  description: string;
  budgetRange: string;
  startTime: string;
  photos: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  adminNotes: string;
};

export type AdminProjectRow = {
  id: string;
  sourceApplicationId?: string;
  title: string;
  customerName: string;
  customerPhone: string;
  slug: string;
  clientToken: string;
  workerToken: string;
  location: string;
  startDate: string;
  estimatedEndDate: string;
  serviceType: string;
  status: string;
  progress: number;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  updatedAt: string;
};

export type AdminDashboardStat = {
  label: string;
  value: string | number;
};

export type Customer = {
  id: string;
  fullName: string;
  phone: string;
  normalizedPhone: string;
  email?: string;
  city: string;
  district: string;
};

export type Worker = {
  id: string;
  fullName: string;
  phone: string;
  normalizedPhone: string;
  specialty: string;
  activeProjectId?: string;
  workerToken?: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  customerName: string;
  customerPhone: string;
  location: string;
  serviceType: string;
  status: ProjectStatus;
  progress: number;
  startDate: string;
  estimatedEndDate: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  clientToken: string;
  workerToken: string;
  workItems: WorkItem[];
  photos: ProjectPhoto[];
  payments: PaymentItem[];
  materials: MaterialItem[];
  documents: ProjectDocument[];
  notes: ProjectNote[];
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
};

export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  serviceType: string;
  location: string;
  status?: string;
  stage: "Öncesi" | "Süreç" | "Sonrası";
  category?: string;
  duration?: string;
  year: string;
  summary: string;
  coverImage?: string;
  scope?: string[];
  works?: string[];
  materials?: string[];
  checklist?: string[];
};
