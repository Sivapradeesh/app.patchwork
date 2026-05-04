import type { Metadata } from "next";
import "./globals.css";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#050507] text-[#ededed]">
        {children}
      </body>
    </html>
  );
}
