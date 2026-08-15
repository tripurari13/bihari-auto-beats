import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const siteUrl = "https://www.bihariautobeats.live";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Bihari Auto Beats | Desi Bhojpuri DJ Songs & Auto Bass Remixes",
  description:
    "Stream the best Bihari auto beats, Bhojpuri DJ remixes, and high-bass highway tracks online. Experience authentic Bihari swag on wheels.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  keywords: [
    "Bihari Auto Beats",
    "Bhojpuri songs",
    "Auto DJ remix",
    "Bihari swag",
    "Desi auto beats",
    "Bhojpuri bass boosted",
    "bihariautobeats",
    "बिहारी ऑटो बीट्स",
    "Durgesh Nai",
    "दुर्गेश नाई",
    "90s Hindi Songs",
  ],
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Bihari Auto Beats | Desi Bhojpuri DJ Songs & Auto Bass",
    description:
      "Feel the true Bihari swag on wheels. Stream high-bass Bhojpuri auto beats and DJ remixes.",
    url: siteUrl,
    siteName: "Bihari Auto Beats",
    locale: "hi_IN",
    type: "website",
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Bihari Auto Beats Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bihari Auto Beats | Desi Bhojpuri DJ Songs & Auto Bass",
    description:
      "Feel the true Bihari swag on wheels. Stream high-bass Bhojpuri auto beats and DJ remixes.",
    images: [`${siteUrl}/logo.png`],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFC107",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Bihari Auto Beats",
        description:
          "High-bass Bhojpuri auto beats, DJ remixes, and highway music stream.",
        inLanguage: ["hi", "en", "bho"],
      },
      {
        "@type": "MusicPlaylist",
        "@id": `${siteUrl}/#playlist`,
        name: "Bihari Auto Beats - Highway Hits",
        url: siteUrl,
        numTracks: 20,
        genre: ["Bhojpuri", "Desi DJ Remix", "Folk Electronic", "90s Bollywood"],
        publisher: {
          "@type": "Organization",
          name: "Bihari Auto Beats",
          url: siteUrl,
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@400;600;700;900&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap"
          rel="stylesheet"
        />
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
