import AdminKanban from "./AdminKanban";

export const metadata = {
  title: "BLAAG İç Operasyon Merkezi",
  description:
    "BLAAG başvurular, teklifler, projeler, müşteriler, ustalar, proje linkleri, fotoğraf onayları, ödemeler, belgeler ve teslim süreçleri."
};

export default function AdminPage() {
  return <AdminKanban />;
}
