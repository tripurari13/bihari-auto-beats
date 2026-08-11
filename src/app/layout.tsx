import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

export const metadata: Metadata = {
  title: "Bihari Auto Beats",
  description: "Bihari Swag on Wheels - The ultimate auto-rickshaw music experience",
  manifest: "/manifest.json",
  keywords: [
    "Bihari Auto Beats",
    "Bhojpuri music",
    "Bihar",
    "Auto rickshaw",
    "Music player",
  ],
  openGraph: {
    title: "🛺 Bihari Auto Beats",
    description: "Bihari Swag on Wheels - The ultimate auto-rickshaw music experience",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@400;600;700;900&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-black text-white selection:bg-saffron-500/30">
        {children}
        {/* Google Analytics for tracking users and sessions */}
        <GoogleAnalytics gaId="G-MJPXYYWSYJ" />
      </body>
    </html>
  );
}
