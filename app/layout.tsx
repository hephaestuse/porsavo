import { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
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
    <html className="dark">
      <body className={`${rubik.className} antialiased pattern`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
