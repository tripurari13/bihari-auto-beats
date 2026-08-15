"use client";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PlayerProvider, usePlayer } from "@/components/PlayerContext";
import TopBar from "@/components/Navbar";
import Player from "@/components/Player";
import SearchOverlay from "@/components/SearchOverlay";
import YouTubePlayer from "@/components/YouTubePlayer";
import MoodSelectorModal from "@/components/MoodSelectorModal";
import { HINDI_QUOTES } from "@/lib/mockData";

const DURGESH_QUOTES = [
  "बाल भी कटेगा, गाना भी बजेगा! 💈✂️",
  "सदाबहार 90s के सुपरहिट नगमे, सिर्फ दुर्गेश नाई के यहाँ!",
  "बाल कटवाते-कटवाते सुनिए अपने सबसे पसंदीदा गाने!",
  "दुर्गेश नाई की दुकान, 90s गानों की शान! 🎶",
];

function HomeContent() {
  const [showSearch, setShowSearch] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const { activePlaylist, allSongs } = usePlayer();

  const isDurgesh = activePlaylist === "durgesh";
  const currentQuotes = isDurgesh ? DURGESH_QUOTES : HINDI_QUOTES;

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
          backgroundImage: isDurgesh ? "url('/durgesh_nai.png')" : "url('/bg.png')",
        }}
      >
        {/* Dark overlay for contrast and sleek visual depth */}
        <div
          className="absolute inset-0 transition-colors duration-700"
          style={{
            background: isDurgesh
              ? "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(10, 5, 5, 0.35) 40%, rgba(0, 0, 0, 0.65) 80%, rgba(0, 0, 0, 0.85) 100%)"
              : "linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 40%, rgba(0, 0, 0, 0.5) 80%, rgba(0, 0, 0, 0.8) 100%)",
          }}
        />
      </div>

      {/* Top Bar (Clean, centered listener count, live clock, mood switch & search) */}
      <TopBar onSearch={() => setShowSearch(true)} />

      {/* Main Hero Content — Perfectly Centered & Uncluttered */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pb-28 pt-16">
        {/* Hero Branding */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in key={activePlaylist}">
          <h1
            className="font-heading text-4xl sm:text-6xl md:text-8xl font-black text-white text-center leading-tight tracking-tight drop-shadow-2xl flex items-center justify-center gap-2 sm:gap-4 transition-all duration-500"
            style={{
              fontFamily: "'Tiro Devanagari Hindi', serif",
              textShadow: isDurgesh
                ? "0 4px 40px rgba(245, 158, 11, 0.5), 0 2px 10px rgba(0,0,0,0.9)"
                : "0 4px 40px rgba(0,0,0,0.7)",
            }}
          >
            {isDurgesh ? "दुर्गेश नाई प्लेलिस्ट" : "बिहारी ऑटो बीट्स"}
          </h1>
          <p className="text-white/70 mt-3 text-sm sm:text-base md:text-lg font-semibold tracking-widest uppercase font-heading">
            {isDurgesh ? "Durgesh Nai Special • 90s Nostalgia Hits" : "Bihari Swag on Wheels"}
          </p>
        </div>

        {/* Rotating Hindi Quote */}
        <div className="min-h-[40px] flex items-center justify-center">
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

        {/* Crawlable Semantic SEO Content for Google Search Indexation */}
        <section className="sr-only" aria-label="About Bihari Auto Beats & Tracklist">
          <h2>Bihari Auto Beats - Desi Bhojpuri DJ Songs & Auto Bass Remixes</h2>
          <p>
            Stream the best Bihari auto beats, Bhojpuri DJ remixes, and high-bass highway tracks online. Experience authentic Bihari swag on wheels with non-stop Bhojpuri music and 90s Bollywood hits on Durgesh Nai Playlist.
          </p>
          <h3>Featured Highway DJ Hits & 90s Classics</h3>
          <ul>
            {allSongs.slice(0, 15).map((song) => (
              <li key={song.id}>
                <strong>{song.title}</strong> by <span>{song.artist}</span> ({song.duration})
              </li>
            ))}
          </ul>
          <h3>Why Listen to Bihari Auto Beats?</h3>
          <p>
            Bihari Auto Beats brings the iconic audio culture of Indian highway auto rickshaws directly to your headphones. Enjoy high bass remixes, authentic folk energy, and seamless streaming anywhere.
          </p>
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
