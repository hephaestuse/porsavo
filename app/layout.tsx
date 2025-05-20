import { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
const rubik = Rubik({
  weight: ["300", "400", "500", "700"],
  subsets: ["arabic"],
});
export const metadata: Metadata = {
  title: "porsavo",
  description: "دستیار صوتی برای آمادگی مصاحبه شغلی",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html dir="rtl" lang="fa" className="dark">
      <body className={`${rubik.className} antialiased pattern`}>
        {children}
      </body>
    </html>
  );
}
