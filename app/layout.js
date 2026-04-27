import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "BLAAG Construction and Architecture",
  description:
    "Anahtar teslim yapı, tadilat ve gayrimenkul danışmanlığı hizmetlerinde premium süreç yönetimi."
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
