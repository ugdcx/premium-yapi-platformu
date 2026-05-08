import { redirect } from "next/navigation";
import { createSeoMetadata } from "../../lib/seo";

export const metadata = createSeoMetadata({
  title: "Değer Artırma | BLAGG Studio",
  description: "Satış öncesi değer artırma renovasyonu.",
  path: "/deger-artirma"
});

export default function ValueIncreaseRedirectPage() {
  redirect("/hizmetler/deger-artirma");
}
