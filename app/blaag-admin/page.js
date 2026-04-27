import LoginForm from "../login/LoginForm";

export const metadata = {
  title: "BLAAG Yetkili Girişi",
  description: "BLAAG iç operasyon ekibi için gizli yönetim girişi."
};

export default function BlaagAdminLoginPage() {
  return <LoginForm />;
}
