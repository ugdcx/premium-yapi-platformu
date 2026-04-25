import AdminKanban from "./AdminKanban";

export const metadata = {
  title: "Admin Kanban | Premium Yapı Platformu",
  description:
    "Müşteri başvurularını Kanban akışıyla inceleme, teklif hazırlama ve onaylama paneli."
};

export default function AdminPage() {
  return <AdminKanban />;
}
