import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "PATCHWORK — Android Device Power Toolkit",
  description:
    "The ultimate Android power toolkit. 50+ features including automation engine, battery monitor, app lock, status bar control, and quick tiles. Root & Shizuku supported.",
  keywords: [
    "android",
    "toolkit",
    "automation",
    "battery",
    "root",
    "shizuku",
    "patchwork",
  ],
  openGraph: {
    title: "PATCHWORK — Android Device Power Toolkit",
    description:
      "The ultimate Android power toolkit with 50+ features for complete device control.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`min-h-full flex flex-col bg-[#050507] text-[#ededed] ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
