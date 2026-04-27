import { redirect } from "next/navigation";

export const metadata = {
  title: "Yönlendiriliyor | BLAAG Construction and Architecture"
};

export default function LoginPage() {
  redirect("/blaag-admin");
}
