export type PhotoStatus = "pending_review" | "approved" | "rejected";
export type QuoteStatus = "draft" | "sent" | "approved" | "rejected" | "converted_to_project";

export interface Customer {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  city?: string;
  district?: string;
}

export interface Worker {
  id: string;
  fullName: string;
  phone: string;
  specialty?: string;
  activeProjectId?: string;
}

export interface Supplier {
  id: string;
  title: string;
  phone?: string;
  category?: string;
}

export interface Application {
  id: string;
  fullName: string;
  phone: string;
  serviceType: string;
  description: string;
  status: string;
  createdAt: string;
}

export interface Quote {
  id: string;
  applicationId: string;
  status: QuoteStatus;
  lineItems: QuoteLineItem[];
  exclusions: string[];
  paymentPlan: CustomerPayment[];
  totalAmount: number;
}

export interface QuoteLineItem {
  id: string;
  title: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  customerId?: string;
  status: string;
  progress: number;
  clientToken: string;
  workerToken: string;
}

export interface WorkItem {
  id: string;
  projectId: string;
  title: string;
  status: string;
  plannedDate?: string;
}

export interface Photo {
  id: string;
  projectId: string;
  workItemId?: string;
  url: string;
  caption: string;
  status: PhotoStatus;
  visible_to_customer: boolean;
  uploadedBy: "worker" | "admin";
  createdAt: string;
}

export interface Material {
  id: string;
  projectId: string;
  category: string;
  brand?: string;
  model?: string;
  status: string;
}

export interface CustomerPayment {
  id: string;
  projectId?: string;
  title: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: string;
}

export interface WorkerPayment {
  id: string;
  projectId: string;
  workerId: string;
  amount: number;
  dueDate: string;
  status: string;
}

export interface SupplierPayment {
  id: string;
  projectId: string;
  supplierId: string;
  amount: number;
  dueDate: string;
  status: string;
}

export interface Expense {
  id: string;
  projectId?: string;
  category: string;
  amount: number;
  date: string;
}

export interface Document {
  id: string;
  projectId: string;
  title: string;
  type: string;
  url: string;
  createdAt: string;
}

export interface Note {
  id: string;
  projectId: string;
  visibility: "admin" | "client" | "worker";
  content: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  projectId?: string;
  actor: string;
  action: string;
  createdAt: string;
}
