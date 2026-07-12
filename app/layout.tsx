import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://furniturepos.com"),
  title: "Furniture OS — Operations software for furniture retailers on Anzio",
  description:
    "Furniture OS sits downstream of your Anzio ERP and automates the busywork: AI document intake, order tracking with automated customer emails, purchase order generation, and a cross-brand sales dashboard.",
  openGraph: {
    title: "Furniture OS — Operations software for furniture retailers on Anzio",
    description:
      "AI-powered document intake, order tracking, purchase orders, and a cross-brand dashboard — built for furniture retailers running on Anzio.",
    url: "https://furniturepos.com",
    siteName: "Furniture OS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Furniture OS — Operations software for furniture retailers on Anzio",
    description:
      "AI-powered document intake, order tracking, purchase orders, and a cross-brand dashboard — built for furniture retailers running on Anzio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
