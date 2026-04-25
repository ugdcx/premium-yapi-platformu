import "./globals.css";

export const metadata = {
  title: "Premium Yapı Platformu",
  description: "Anahtar teslim yapı, değer artırma ve gayrimenkul danışmanlığı platformu."
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
