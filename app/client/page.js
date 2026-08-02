import ClientDashboard from "./ClientDashboard";

export const metadata = {
  title: "Özel Proje Takibi | BLAGG Studio",
  description:
    "BLAGG müşterileri için özel bağlantıyla proje durumu, teklif, fotoğraf, ödeme, belge ve teslim takibi."
};

export default function ClientPage() {
  return <ClientDashboard />;
}

