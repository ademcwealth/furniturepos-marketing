import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Furniture OS — The operating system for furniture retail";
const description =
  "One system that sells, fulfils and reports for your furniture business, with AI that reads your paperwork, sorts your email and drafts your follow-ups. Your team reviews instead of retypes.";

export const metadata: Metadata = {
  metadataBase: new URL("https://furniturepos.com"),
  title: {
    default: title,
    template: "%s — Furniture OS",
  },
  description,
  openGraph: {
    title,
    description,
    url: "https://furniturepos.com",
    siteName: "Furniture OS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: {
    types: {
      "application/rss+xml": "https://furniturepos.com/blog/rss.xml",
    },
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
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
