"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PlayerProvider, usePlayer } from "@/components/PlayerContext";
import TopBar from "@/components/Navbar";
import Player from "@/components/Player";
import SearchOverlay from "@/components/SearchOverlay";
import YouTubePlayer from "@/components/YouTubePlayer";
import MoodSelectorModal from "@/components/MoodSelectorModal";
import { HINDI_QUOTES } from "@/lib/mockData";
import { ISHQ_QUOTES } from "@/lib/ishqData";

const DURGESH_QUOTES = [
  "बाल भी कटेगा, गाना भी बजेगा! 💈✂️",
  "सदाबहार 90s के सुपरहिट नगमे, सिर्फ दुर्गेश नाई के यहाँ!",
  "बाल कटवाते-कटवाते सुनिए अपने सबसे पसंदीदा गाने!",
  "दुर्गेश नाई की दुकान, 90s गानों की शान! 🎶",
];

function HomeContent() {
  const [showSearch, setShowSearch] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const { activePlaylist, allSongs, setPlaylist } = usePlayer();

  const isDurgesh = activePlaylist === "durgesh";
  const isIshq = activePlaylist === "ishq";

  const currentQuotes = isIshq ? ISHQ_QUOTES : isDurgesh ? DURGESH_QUOTES : HINDI_QUOTES;

  // Rotate Hindi quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % currentQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentQuotes.length]);

  return (
    <>
      {/* Dynamic Background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: isIshq
            ? "url('/ishq-fm.png')"
            : isDurgesh
            ? "url('/durgesh_nai.png')"
            : "url('/bg.png')",
        }}
      >
        {/* Dark overlay for contrast and sleek visual depth */}
        <div
          className="absolute inset-0 transition-colors duration-700"
          style={{
            background: isIshq
              ? "linear-gradient(180deg, rgba(8, 7, 20, 0.6) 0%, rgba(23, 21, 42, 0.4) 40%, rgba(8, 7, 20, 0.75) 80%, rgba(8, 7, 20, 0.95) 100%)"
              : isDurgesh
              ? "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(10, 5, 5, 0.35) 40%, rgba(0, 0, 0, 0.65) 80%, rgba(0, 0, 0, 0.85) 100%)"
              : "linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 40%, rgba(0, 0, 0, 0.5) 80%, rgba(0, 0, 0, 0.8) 100%)",
          }}
        />
      </div>

      {/* Top Bar (Clean, centered listener count, live clock, mood switch & search) */}
      <TopBar onSearch={() => setShowSearch(true)} />

      {/* Main Hero Content — Perfectly Centered & Uncluttered */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pb-28 pt-16">
        {/* Experience Switcher Bar */}
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 mb-6 shadow-2xl">
          <button
            onClick={() => setPlaylist("bihari", true)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activePlaylist === "bihari"
                ? "bg-gradient-to-r from-amber-500 to-saffron-500 text-black shadow-lg shadow-amber-500/30"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>🛺</span>
            <span className="hidden sm:inline">बिहारी ऑटो बीट्स</span>
            <span className="sm:hidden">Auto</span>
          </button>
          <button
            onClick={() => setPlaylist("durgesh", true)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activePlaylist === "durgesh"
                ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-lg shadow-amber-400/30"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>💈</span>
            <span className="hidden sm:inline">दुर्गेश नाई</span>
            <span className="sm:hidden">Durgesh</span>
          </button>
          <button
            onClick={() => setPlaylist("ishq", true)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activePlaylist === "ishq"
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>❤️</span>
            <span>इश्क़ FM</span>
          </button>
        </div>

        {/* Hero Branding */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in key={activePlaylist}">
          <h1
            className="font-heading text-4xl sm:text-6xl md:text-8xl font-black text-white text-center leading-tight tracking-tight drop-shadow-2xl flex items-center justify-center gap-2 sm:gap-4 transition-all duration-500"
            style={{
              fontFamily: "'Tiro Devanagari Hindi', serif",
              textShadow: isIshq
                ? "0 4px 40px rgba(255, 79, 139, 0.5), 0 2px 10px rgba(0,0,0,0.9)"
                : isDurgesh
                ? "0 4px 40px rgba(245, 158, 11, 0.5), 0 2px 10px rgba(0,0,0,0.9)"
                : "0 4px 40px rgba(0,0,0,0.7)",
            }}
          >
            {isIshq ? "इश्क़ FM" : isDurgesh ? "दुर्गेश नाई प्लेलिस्ट" : "बिहारी ऑटो बीट्स"}
          </h1>
          <p className="text-white/70 mt-3 text-sm sm:text-base md:text-lg font-semibold tracking-widest uppercase font-heading">
            {isIshq
              ? "Dil Se... Sirf Tumhare Liye • Romantic & Late Night"
              : isDurgesh
              ? "Durgesh Nai Special • 90s Nostalgia Hits"
              : "Bihari Swag on Wheels"}
          </p>
        </div>

        {/* Rotating Hindi Quote */}
        <div className="min-h-[40px] flex items-center justify-center mb-6">
          <p
            key={`${activePlaylist}-${quoteIndex}`}
            className="text-white/80 text-base sm:text-xl text-center animate-fade-in font-medium max-w-xl px-4"
            style={{
              fontFamily: "'Tiro Devanagari Hindi', serif",
              textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            }}
          >
            {currentQuotes[quoteIndex % currentQuotes.length]}
          </p>
        </div>

        {/* Ishq FM Dedicated Experience Gateway */}
        {isIshq && (
          <Link
            href="/ishq-fm"
            className="px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-xl shadow-pink-500/30 transition-all flex items-center gap-2 hover:scale-105 active:scale-95 text-sm sm:text-base"
          >
            <span>❤️ OPEN FULL ISHQ FM WORLD</span>
            <span>↗</span>
          </Link>
        )}

        {/* Crawlable Semantic SEO Content for Google Search Indexation */}
        <section className="sr-only" aria-label="About Bihari Auto Beats & Tracklist">
          <h2>Bihari Auto Beats - Desi Bhojpuri DJ Songs, 90s Hits & Ishq FM Romance</h2>
          <p>
            Stream the best Bihari auto beats, Bhojpuri DJ remixes, 90s Bollywood classics on Durgesh Nai, and romantic love songs on Ishq FM online. Experience authentic Bihari swag on wheels with non-stop highway beats.
          </p>
          <h3>Featured Highway DJ Hits & Ishq FM Classics</h3>
          <ul>
            {allSongs.slice(0, 20).map((song) => (
              <li key={song.id}>
                <strong>{song.title}</strong> by <span>{song.artist}</span> ({song.duration})
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Bottom Player */}
      <YouTubePlayer />
      <Player />

      {/* Interactive Mood Selector Modal on Startup */}
      <MoodSelectorModal />

      {/* Search Modal */}
      <SearchOverlay isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <PlayerProvider>
        <HomeContent />
      </PlayerProvider>
    </ThemeProvider>
  );
}
