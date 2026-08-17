import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0c0c0b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "AETHER Studio — Architecture Beyond Form",
  description:
    "AETHER is a global studio for monolithic architecture, spatial atmospheres, and experiential residences in Dubai, Riyadh, Abu Dhabi, and London.",
  keywords: [
    "Architecture",
    "Minimalist Architecture",
    "Luxury Residences",
    "Aether Studio",
    "Brutalist Design",
    "Travertine Architecture",
    "Dubai Architecture",
    "Riyadh Architecture",
  ],
  authors: [{ name: "AETHER Studio" }],
  openGraph: {
    title: "AETHER Studio — Architecture Beyond Form",
    description:
      "Global studio for monolithic architecture, spatial atmospheres, and experiential residences.",
    type: "website",
    locale: "en_US",
    siteName: "AETHER Studio",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Load Instrument Serif, Plus Jakarta Sans, DM Mono, and Cormorant Garamond */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
