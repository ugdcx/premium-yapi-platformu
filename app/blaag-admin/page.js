import LoginForm from "../login/LoginForm";

export const metadata = {
  title: "BLAAG Yetkili Erişim",
  description: "BLAAG iç operasyon ekibi için özel yönetim erişimi."
};

export default function BlaagAdminLoginPage() {
  return <LoginForm />;
}
