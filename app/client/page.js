import ClientDashboard from "./ClientDashboard";

export const metadata = {
  title: "Özel Proje Takibi | BLAAG Construction and Architecture",
  description:
    "BLAAG müşterileri için özel bağlantıyla proje durumu, teklif, fotoğraf, ödeme, belge ve teslim takibi."
};

export default function ClientPage() {
  return <ClientDashboard />;
}
