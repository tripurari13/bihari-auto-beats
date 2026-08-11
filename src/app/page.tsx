"use client";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PlayerProvider, usePlayer } from "@/components/PlayerContext";
import TopBar from "@/components/Navbar";
import Player from "@/components/Player";
import AutoMode from "@/components/AutoMode";
import AddSongModal from "@/components/AddSongModal";
import SearchOverlay from "@/components/SearchOverlay";
import SideMenu from "@/components/SideMenu";
import YouTubePlayer from "@/components/YouTubePlayer";
import { HINDI_QUOTES } from "@/lib/mockData";

function HomeContent() {
  const [showAddSong, setShowAddSong] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const { isAutoMode, toggleAutoMode } = usePlayer();

  // Rotate Hindi quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % HINDI_QUOTES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Fixed Background */}
      <div className="bg-fixed-cover" />

      {/* Auto Mode Overlay */}
      {isAutoMode && <AutoMode />}

      {/* Top Bar */}
      <TopBar
        onAddSong={() => setShowAddSong(true)}
        onSearch={() => setShowSearch(true)}
        onMenuToggle={() => setShowMenu(true)}
      />

      {/* Side Menu */}
      <SideMenu isOpen={showMenu} onClose={() => setShowMenu(false)} />

      {/* Main Content - Completely Empty & Sleek */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pb-24">
        {/* Branding */}
        <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h1
            className="font-heading text-4xl sm:text-6xl md:text-8xl font-black text-white text-center leading-tight tracking-tight drop-shadow-2xl flex items-center justify-center gap-2 sm:gap-4"
            style={{ textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}
          >
            <span style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
              बिहारी ऑटो बीट्स
            </span>
          </h1>
          <p className="text-white/60 mt-4 text-base sm:text-lg md:text-xl font-medium tracking-wide uppercase letter-spacing-2">
            Bihari Swag on Wheels
          </p>
        </div>

        {/* Rotating Hindi Quote */}
        <p
          key={quoteIndex}
          className="text-white/70 text-lg md:text-xl mt-6 text-center animate-fade-in font-medium"
          style={{ fontFamily: "'Tiro Devanagari Hindi', serif", textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
        >
          {HINDI_QUOTES[quoteIndex]}
        </p>

        {/* Auto Mode shortcut */}
        <button
          onClick={toggleAutoMode}
          className="glass-pill px-5 py-2.5 mt-10 text-sm font-heading font-semibold text-white/50 hover:text-white transition-colors"
        >
          🛺 Auto Mode
        </button>
      </main>

      {/* Bottom Player */}
      <YouTubePlayer />
      <Player />

      {/* Modals */}
      <AddSongModal isOpen={showAddSong} onClose={() => setShowAddSong(false)} />
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
