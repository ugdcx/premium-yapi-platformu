import ProjectsClient from "./ProjectsClient";
import { createSeoMetadata } from "../../lib/seo";

export const metadata = createSeoMetadata({
  title: "Projeler | BLAAG Construction and Architecture",
  description:
    "Villa, konut tadilatı, dış cephe, banyo, mutfak ve satışa hazırlık uygulama örnekleri.",
  path: "/projeler"
});

export default function ProjectsPage() {
  return <ProjectsClient />;
}
