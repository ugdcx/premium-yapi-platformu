import ClientDashboard from "./ClientDashboard";

export const metadata = {
  title: "Müşteri Paneli | Premium Yapı Platformu",
  description:
    "Müşteriler için proje durumu, teklif, saha güncellemeleri, ödeme, belge ve onay takip paneli."
};

export default function ClientPage() {
  return <ClientDashboard />;
}
