import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bihari Auto Beats",
  description: "Bihari Swag on Wheels - The ultimate auto-rickshaw music experience",
  manifest: "/manifest.json",
  themeColor: "#000000",
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
      </body>
    </html>
  );
}
