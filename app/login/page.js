import { redirect } from "next/navigation";

export const metadata = {
  title: "Yönlendiriliyor | BLAGG Studio"
};

export default function LoginPage() {
  redirect("/control");
}

