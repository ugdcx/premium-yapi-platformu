import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "BLAAG Construction and Architecture | Yapı, Tadilat ve Gayrimenkul",
  description:
    "Anahtar teslim yapı, tadilat ve gayrimenkul danışmanlığı süreçlerinde profesyonel uygulama ve müşteriye özel şeffaf takip deneyimi."
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
