import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Premium Yapı Platformu",
  description:
    "Anahtar teslim yapı, değer artırma ve gayrimenkul danışmanlığı platformu."
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
