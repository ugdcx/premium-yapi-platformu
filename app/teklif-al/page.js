import IntakeFlow from "./IntakeFlow";
import { createSeoMetadata } from "../../lib/seo";

export const metadata = createSeoMetadata({
  title: "Teklif Al | BLAAG Construction and Architecture",
  description:
    "Projeniz için ön başvuru oluşturun, fotoğraf ekleyin ve BLAAG ekibinden dönüş alın.",
  path: "/teklif-al"
});

export default function QuotePage() {
  return <IntakeFlow />;
}
