import IntakeFlow from "./IntakeFlow";
import { createSeoMetadata } from "../../lib/seo";

export const metadata = createSeoMetadata({
  title: "Projenizi Başlatın | BLAGG Studio",
  description:
    "Proje bilgilerinizi paylaşın. BLAGG Studio ekibi kapsamı inceleyip sizinle iletişime geçsin.",
  path: "/teklif-al"
});

export default function QuotePage() {
  return <IntakeFlow />;
}

