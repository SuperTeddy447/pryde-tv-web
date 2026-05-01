import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LoginModal } from "@/components/auth/LoginModal";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Pryde TV - ดูมวยไทยสดออนไลน์ | Live Muay Thai Streaming",
  description: "แพลตฟอร์มถ่ายทอดสดมวยไทยระดับพรีเมียม ดูมวยไทย มวยสากล และกีฬาต่อสู้ได้ทุกที่ทุกเวลา | Premium Muay Thai live streaming platform",
  keywords: ["muay thai", "live streaming", "boxing", "มวยไทย", "ถ่ายทอดสด", "pryde tv"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>
          <Header />
          <LoginModal />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
