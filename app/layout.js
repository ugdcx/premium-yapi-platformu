import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileCTA from "../components/MobileCTA";
import { createSeoMetadata, siteConfig } from "../lib/seo";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  ...createSeoMetadata({})
};

export const viewport = {
  themeColor: "#050505",
  colorScheme: "light"
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="bg-[#F7F7F5] text-[#111111]">
        <Header />
        <div id="main-content" className="min-h-screen pb-24 md:pb-0">
          {children}
        </div>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}
