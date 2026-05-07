import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { createSeoMetadata, siteConfig } from "../lib/seo";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  ...createSeoMetadata({})
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Header />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
