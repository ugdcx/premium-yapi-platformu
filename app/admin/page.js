import AdminKanban from "./AdminKanban";

export const metadata = {
  title: "BLAGG Control",
  description:
    "BLAGG Control başvurular, teklifler, projeler, müşteriler, ustalar, fotoğraf onayları, finans ve belgeler."
};

export default function AdminPage() {
  return <AdminKanban />;
}
