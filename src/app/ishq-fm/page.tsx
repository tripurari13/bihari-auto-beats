"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PlayerProvider, usePlayer } from "@/components/PlayerContext";
import Player from "@/components/Player";
import YouTubePlayer from "@/components/YouTubePlayer";
import SearchOverlay from "@/components/SearchOverlay";
import DedicationModal from "@/components/DedicationModal";
import SongRequestModal from "@/components/SongRequestModal";
import {
  ISHQ_MOODS,
  ISHQ_STATIONS,
  ISHQ_QUOTES,
  ISHQ_FM_SAYS,
  IshqMood,
  IshqStation,
} from "@/lib/ishqData";
import { Song } from "@/lib/mockData";

function IshqFMContent() {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    playSong,
    ishqSongs,
    allSongs,
    setPlaylist,
    playIshqStation,
    filterIshqMood,
    activeIshqMood,
    activeIshqStation,
    likedSongIds,
    toggleLike,
    recentlyPlayed,
    dedications,
  } = usePlayer();

  const [showSearch, setShowSearch] = useState(false);
  const [showDedicationModal, setShowDedicationModal] = useState(false);
  const [dedicationSongTarget, setDedicationSongTarget] = useState<Song | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [saysIndex, setSaysIndex] = useState(0);
  const [isAfterDark, setIsAfterDark] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "liked" | "recent" | "dedications">("all");

  // On page entry, ensure active playlist is Ishq FM
  useEffect(() => {
    setPlaylist("ishq");
  }, [setPlaylist]);

  // Rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % ISHQ_QUOTES.length);
      setSaysIndex((i) => (i + 1) % ISHQ_FM_SAYS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const songsList = ishqSongs.length > 0 ? ishqSongs : allSongs;
  const trendingSongs = [...songsList].sort((a, b) => b.playCount - a.playCount).slice(0, 6);
  const spotlightSong = songsList[0] || currentSong;
  const twoAMSongs = songsList.slice(2, 8);
  const forYouSongs = songsList.slice(4, 10);
  const likedSongsList = songsList.filter((s) => likedSongIds.includes(s.id));

  const handleStartIshq = () => {
    if (songsList.length > 0) {
      playSong(songsList[0]);
    }
  };

  const handleDedicate = (song: Song) => {
    setDedicationSongTarget(song);
    setShowDedicationModal(true);
  };

  return (
    <div className={`min-h-screen text-white relative transition-colors duration-700 selection:bg-pink-500/40 ${isAfterDark ? "bg-[#04030a]" : "bg-[#080714]"}`}>
      {/* Background Image: public/ishq-fm.png */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center transition-all duration-1000 scale-105 pointer-events-none opacity-40"
        style={{ backgroundImage: "url('/ishq-fm.png')" }}
      >
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: isAfterDark
              ? "radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.15), transparent 70%), linear-gradient(180deg, rgba(4, 3, 10, 0.8) 0%, rgba(15, 12, 30, 0.92) 50%, #04030a 100%)"
              : "radial-gradient(circle at 50% 15%, rgba(255, 79, 139, 0.18), transparent 60%), linear-gradient(180deg, rgba(8, 7, 20, 0.75) 0%, rgba(23, 21, 42, 0.88) 50%, #080714 100%)",
          }}
        />
      </div>

      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between backdrop-blur-xl bg-[#080714]/75 border-b border-pink-500/15">
        {/* Left Side: Ishq FM Branding & Live Tag */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-pulse">❤️</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 bg-clip-text text-transparent">
                  इश्क़ FM
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-pink-400 bg-pink-500/20 px-2.5 py-0.5 rounded-full border border-pink-500/40">
                  LIVE
                </span>
              </div>
              <p className="text-[11px] text-pink-300/80 font-medium tracking-wider hidden sm:block">
                Dil Se... Sirf Tumhare Liye
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Back to Bihari Auto Beats, Day/Night, Search, Request */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full border border-white/20 transition-all shadow-sm"
          >
            <span>←</span>
            <span>बिहारी ऑटो बीट्स</span>
          </Link>

          {/* Day / Night Toggle */}
          <button
            onClick={() => setIsAfterDark(!isAfterDark)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition-all flex items-center gap-1.5"
            title="Day / 2 AM Mode Toggle"
          >
            <span>{isAfterDark ? "🌙 After Dark" : "☀️ Day Mode"}</span>
          </button>

          {/* Search */}
          <button
            onClick={() => setShowSearch(true)}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all"
            aria-label="Search"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Request Song */}
          <button
            onClick={() => setShowRequestModal(true)}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-md shadow-pink-500/30 transition-all hidden md:flex items-center gap-1"
          >
            <span>Request</span>
            <span>🎤</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 pt-28 pb-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-16">
        {/* ================= SECTION 1: HERO ================= */}
        <section className="text-center py-8 sm:py-14 flex flex-col items-center justify-center animate-fade-in">
          {/* Badge: Live Romantic Radio (without 100+ songs) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs sm:text-sm font-semibold tracking-wider mb-5 shadow-[0_0_20px_rgba(255,79,139,0.2)]">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
            <span>LIVE ROMANTIC RADIO</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-tight tracking-tight drop-shadow-[0_10px_40px_rgba(255,79,139,0.4)]"
            style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
          >
            दिल से... सिर्फ तुम्हारे लिए
          </h1>

          <p className="text-white/80 text-base sm:text-xl font-medium mt-4 max-w-2xl text-center italic">
            "{ISHQ_QUOTES[quoteIndex]}"
          </p>

          <p className="text-pink-300/80 text-xs sm:text-sm tracking-widest uppercase font-semibold mt-2">
            Romantic • Bollywood • Late Night • 2 AM Zone
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              onClick={handleStartIshq}
              className="px-8 py-4 rounded-full font-black text-white text-base sm:text-lg bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-[0_0_35px_rgba(255,79,139,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              <span>▶ START ISHQ FM</span>
            </button>

            <button
              onClick={() => setShowDedicationModal(true)}
              className="px-6 py-4 rounded-full font-bold text-white text-sm sm:text-base bg-[#17152A]/90 hover:bg-[#1f1c38] border border-pink-500/40 hover:border-pink-400 shadow-xl transition-all flex items-center gap-2"
            >
              <span>💌 KISI KE LIYE? DEDICATE</span>
            </button>
          </div>
        </section>



        {/* ================= SECTION 3: 💕 AAJ DIL KA MOOD? ================= */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-widest font-heading font-bold text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-400/20">
                💕 AAJ DIL KA MOOD?
              </span>
              <h2
                className="text-3xl sm:text-4xl font-black text-white mt-2"
                style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
              >
                दिल की धड़कन के हिसाब से चुनें
              </h2>
            </div>
            <p className="text-white/60 text-xs sm:text-sm">
              Tap any mood to instantly tune the stream
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
            {ISHQ_MOODS.map((mood: IshqMood) => (
              <div
                key={mood.id}
                onClick={() => filterIshqMood(mood.id)}
                className={`group relative rounded-2xl p-4 sm:p-5 cursor-pointer border transition-all duration-300 overflow-hidden bg-gradient-to-br ${mood.color} backdrop-blur-md ${
                  activeIshqMood === mood.id
                    ? "border-pink-400 shadow-[0_0_25px_rgba(255,79,139,0.35)] scale-[1.03]"
                    : "border-white/10 hover:border-pink-400/60 hover:scale-[1.02]"
                }`}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {mood.emoji}
                </div>
                <h3 className="font-bold text-white text-base sm:text-lg leading-tight">
                  {mood.name}
                </h3>
                <p className="text-xs text-white/70 mt-0.5">{mood.tagline}</p>
                <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-pink-300">
                  <span>{mood.nameHindi}</span>
                  <span className="group-hover:translate-x-1 transition-transform">▶</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SECTION 4: 📻 CHOOSE YOUR ISHQ (STATIONS) ================= */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-widest font-heading font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-400/20">
                📻 CHOOSE YOUR ISHQ
              </span>
              <h2
                className="text-3xl sm:text-4xl font-black text-white mt-2"
                style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
              >
                इश्क़ के 8 रेडियो स्टेशन
              </h2>
            </div>
            <p className="text-white/60 text-xs sm:text-sm">
              Non-stop curated romantic broadcast channels
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ISHQ_STATIONS.map((station: IshqStation) => (
              <div
                key={station.id}
                onClick={() => playIshqStation(station.id)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 bg-[#17152A] flex flex-col justify-between min-h-[260px] ${
                  activeIshqStation === station.id
                    ? "border-pink-400 shadow-[0_0_30px_rgba(255,79,139,0.3)]"
                    : "border-white/10 hover:border-pink-400/50 hover:scale-[1.02]"
                }`}
              >
                {/* Station Cover */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-30"
                  style={{ backgroundImage: `url(${station.thumbnail})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17152A] via-[#17152A]/90 to-transparent" />

                <div className="relative z-10 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{station.emoji}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-pink-300 border border-white/10">
                      {station.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white leading-snug group-hover:text-pink-300 transition-colors">
                    {station.name}
                  </h3>
                  <p className="text-xs text-white/50 mt-0.5">{station.nameHindi}</p>
                  <p className="text-xs text-white/70 mt-2 line-clamp-2 leading-relaxed">
                    {station.description}
                  </p>
                </div>

                <div className="relative z-10 p-5 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
                  <span className="text-[11px] text-white/40">
                    {station.songCount}+ Tracks
                  </span>
                  <button className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:scale-110 transition-transform">
                    ▶
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SECTION 5: 🎙️ ISHQ FM SAYS (FIXED NO OVERLAP) ================= */}
        <section className="relative overflow-hidden rounded-3xl py-12 px-6 sm:px-12 border border-pink-500/20 bg-gradient-to-r from-pink-950/20 via-[#17152A] to-purple-950/20 backdrop-blur-xl flex flex-col items-center justify-center text-center gap-4 shadow-xl">
          <div>
            <span className="inline-block text-xs uppercase tracking-widest font-heading font-bold text-pink-400 bg-pink-500/10 px-4 py-1.5 rounded-full border border-pink-400/20 shadow-sm">
              🎙️ ISHQ FM SAYS...
            </span>
          </div>
          <div className="min-h-[70px] flex items-center justify-center px-4">
            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-black text-white max-w-2xl mx-auto italic leading-normal animate-fade-in"
              style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
            >
              "{ISHQ_FM_SAYS[saysIndex]}"
            </h3>
          </div>
          <p className="text-xs text-white/50 tracking-wider">
            Late-night thoughts on frequency 104.8 FM
          </p>
        </section>

        {/* ================= SECTION 6: 🔥 ISHQ MEIN TRENDING ================= */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-widest font-heading font-bold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-400/20">
                🔥 ISHQ MEIN TRENDING
              </span>
              <h2
                className="text-3xl sm:text-4xl font-black text-white mt-2"
                style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
              >
                आज सबसे ज़्यादा सुने गए गाने
              </h2>
            </div>
            <p className="text-white/60 text-xs sm:text-sm">Real-time listener popularity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingSongs.map((song: Song, index: number) => (
              <div
                key={song.id}
                onClick={() => playSong(song)}
                className="group relative rounded-2xl p-3.5 bg-[#17152A]/90 hover:bg-[#201d38] border border-white/10 hover:border-pink-500/50 transition-all flex items-center gap-3.5 cursor-pointer shadow-lg hover:scale-[1.02]"
              >
                <span className="font-heading font-black text-2xl text-pink-400/60 group-hover:text-pink-400 w-8 text-center transition-colors">
                  0{index + 1}
                </span>

                <img
                  src={song.thumbnail}
                  alt={song.title}
                  className="w-14 h-14 rounded-xl object-cover border border-white/10 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white text-sm sm:text-base truncate group-hover:text-pink-300 transition-colors">
                    {song.title}
                  </h4>
                  <p className="text-xs text-white/50 truncate">{song.artist}</p>
                  <p className="text-[10px] text-pink-400/80 mt-1">
                    {(song.playCount).toLocaleString()} plays • {song.duration}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDedicate(song);
                  }}
                  className="p-2 rounded-full text-white/40 hover:text-pink-400 hover:bg-white/10 transition-all"
                  title="Dedicate song"
                >
                  💌
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SECTION 7: 🌙 2 AM ZONE (LATE NIGHT) ================= */}
        <section className="relative rounded-3xl overflow-hidden p-8 sm:p-12 border border-purple-500/30 bg-gradient-to-b from-[#0e0920] to-[#04030a] shadow-[0_0_60px_rgba(139,92,246,0.2)]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs uppercase tracking-widest font-heading font-bold text-purple-300 bg-purple-500/20 px-3.5 py-1 rounded-full border border-purple-400/30">
                🌙 2 AM ZONE • LATE NIGHT
              </span>
              <h2
                className="text-3xl sm:text-5xl font-black text-white leading-tight"
                style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
              >
                Everyone's asleep. Your playlist isn't.
              </h2>
              <p className="text-white/60 text-xs sm:text-sm">
                Acoustic, lofi, and soft soul-stirring melodies for late night thoughts
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-4">
              {twoAMSongs.map((song: Song) => (
                <div
                  key={song.id}
                  onClick={() => playSong(song)}
                  className="group relative rounded-2xl overflow-hidden p-3 bg-white/5 hover:bg-purple-950/50 border border-purple-400/20 hover:border-purple-400/60 cursor-pointer transition-all hover:scale-105 flex flex-col justify-between text-center"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                    <img
                      src={song.thumbnail}
                      alt={song.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="text-white text-xl">▶</span>
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-purple-300">
                    {song.title}
                  </h4>
                  <p className="text-[10px] text-white/50 truncate">{song.artist}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 8: ❤️ SONG OF THE MOMENT ================= */}
        {spotlightSong && (
          <section className="bg-gradient-to-r from-pink-900/30 via-[#17152A] to-purple-900/30 rounded-3xl p-6 sm:p-10 border border-pink-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs uppercase tracking-widest font-heading font-bold text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-400/20">
                ❤️ SONG OF THE MOMENT • आज का ख़ास नगमा
              </span>
              <h3 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                {spotlightSong.title}
              </h3>
              <p className="text-pink-300 text-base">{spotlightSong.artist}</p>
              <p className="text-white/60 text-xs sm:text-sm max-w-md pt-1">
                Selected for its timeless melody and profound emotional depth.
              </p>
            </div>

            <button
              onClick={() => playSong(spotlightSong)}
              className="px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-xl shadow-pink-500/30 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <span>LISTEN NOW</span>
              <span>▶</span>
            </button>
          </section>
        )}

        {/* ================= SECTION 9: ✨ SHAYAD YE TUMHARE LIYE HAI ================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest font-heading font-bold text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-400/20">
                ✨ SHAYAD YE TUMHARE LIYE HAI
              </span>
              <h2
                className="text-2xl sm:text-3xl font-black text-white mt-1.5"
                style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
              >
                Recommended For Your Vibe
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {forYouSongs.map((song: Song) => (
              <div
                key={song.id}
                onClick={() => playSong(song)}
                className="group relative rounded-2xl p-3 bg-[#17152A] hover:bg-[#221f3d] border border-white/10 hover:border-pink-500/50 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                  <img
                    src={song.thumbnail}
                    alt={song.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-white text-lg">▶</span>
                  </div>
                </div>
                <h4 className="text-xs font-bold text-white truncate group-hover:text-pink-300">
                  {song.title}
                </h4>
                <p className="text-[10px] text-white/50 truncate">{song.artist}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SECTION 10: ❤️ MY ISHQ (PERSISTED LOCAL DATA) ================= */}
        <section className="bg-[#17152A]/95 rounded-3xl p-6 sm:p-8 border border-pink-500/20 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <span className="text-xs uppercase tracking-widest font-heading font-bold text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-400/20">
                ❤️ MY ISHQ
              </span>
              <h2
                className="text-2xl sm:text-3xl font-black text-white mt-1.5"
                style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
              >
                आपकी निजी दुनिया
              </h2>
            </div>

            {/* Tab switch */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "all" ? "bg-pink-500 text-white" : "text-white/60 hover:text-white"
                }`}
              >
                All Songs ({songsList.length})
              </button>
              <button
                onClick={() => setActiveTab("liked")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "liked" ? "bg-pink-500 text-white" : "text-white/60 hover:text-white"
                }`}
              >
                ❤️ Liked ({likedSongIds.length})
              </button>
              <button
                onClick={() => setActiveTab("recent")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "recent" ? "bg-pink-500 text-white" : "text-white/60 hover:text-white"
                }`}
              >
                🕘 Recent ({recentlyPlayed.length})
              </button>
              <button
                onClick={() => setActiveTab("dedications")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "dedications" ? "bg-pink-500 text-white" : "text-white/60 hover:text-white"
                }`}
              >
                💌 Dedications ({dedications.length})
              </button>
            </div>
          </div>

          {/* Tab 1: All Songs */}
          {activeTab === "all" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
              {songsList.map((song: Song) => (
                <div
                  key={song.id}
                  onClick={() => playSong(song)}
                  className="p-3 rounded-xl bg-black/30 hover:bg-black/50 border border-white/5 hover:border-pink-500/40 flex items-center gap-3 cursor-pointer transition-all"
                >
                  <img
                    src={song.thumbnail}
                    alt={song.title}
                    className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">{song.title}</h5>
                    <p className="text-[10px] text-white/50 truncate">{song.artist}</p>
                  </div>
                  <span className="text-[10px] font-mono text-white/40">{song.duration}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Liked Songs */}
          {activeTab === "liked" && (
            <div>
              {likedSongsList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
                  {likedSongsList.map((song: Song) => (
                    <div
                      key={song.id}
                      onClick={() => playSong(song)}
                      className="p-3 rounded-xl bg-black/30 hover:bg-black/50 border border-pink-500/20 flex items-center gap-3 cursor-pointer transition-all"
                    >
                      <img
                        src={song.thumbnail}
                        alt={song.title}
                        className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-white truncate">{song.title}</h5>
                        <p className="text-[10px] text-pink-300 truncate">{song.artist}</p>
                      </div>
                      <span className="text-pink-400 text-xs">❤️</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-white/50 text-sm">
                  <p className="text-3xl mb-2">🤍</p>
                  <p>No liked songs yet. Tap the heart on any song to save it here!</p>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Recently Played */}
          {activeTab === "recent" && (
            <div>
              {recentlyPlayed.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
                  {recentlyPlayed.map((song: Song) => (
                    <div
                      key={song.id}
                      onClick={() => playSong(song)}
                      className="p-3 rounded-xl bg-black/30 hover:bg-black/50 border border-white/5 flex items-center gap-3 cursor-pointer transition-all"
                    >
                      <img
                        src={song.thumbnail}
                        alt={song.title}
                        className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-white truncate">{song.title}</h5>
                        <p className="text-[10px] text-white/50 truncate">{song.artist}</p>
                      </div>
                      <span className="text-[10px] text-white/40 font-mono">{song.duration}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-white/50 text-sm">
                  <p className="text-3xl mb-2">🎧</p>
                  <p>Your listening history will appear here once you play a song.</p>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Dedications */}
          {activeTab === "dedications" && (
            <div>
              {dedications.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-1">
                  {dedications.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-gradient-to-br from-pink-950/30 to-black/40 border border-pink-500/30 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs text-pink-400 font-semibold">
                        <span>To: {item.toName}</span>
                        <span className="text-[10px] text-white/40">{item.date}</span>
                      </div>
                      <p className="text-white font-bold text-sm leading-tight">
                        🎵 {item.songTitle} - {item.artist}
                      </p>
                      <p className="text-xs text-white/80 italic bg-black/20 p-2.5 rounded-lg border border-white/5">
                        "{item.message}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-white/50 text-sm">
                  <p className="text-3xl mb-2">💌</p>
                  <p>You haven't created any dedications yet. Click "Dedicate a Song" above!</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ================= SECTION 11: 🛺 FOOTER & PARENT BRAND ================= */}
        <footer className="text-center pt-8 border-t border-white/10 space-y-4 pb-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-white/70">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              🛺 बिहारी ऑटो बीट्स
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-amber-400 transition-colors">
              💈 दुर्गेश नाई स्पेशल
            </Link>
            <span>•</span>
            <span className="text-pink-400">❤️ इश्क़ FM</span>
          </div>

          <p className="text-xs text-white/40">
            इश्क़ FM is a curated romantic music world proudly powered by <strong>Bihari Auto Beats</strong>.
          </p>

          <p className="text-[11px] text-white/30">
            © {new Date().getFullYear()} Bihari Auto Beats • Dil Se... Sirf Tumhare Liye
          </p>
        </footer>
      </main>

      {/* Global Audio Player & Modals */}
      <YouTubePlayer />
      <Player />

      <SearchOverlay isOpen={showSearch} onClose={() => setShowSearch(false)} />

      <DedicationModal
        isOpen={showDedicationModal}
        onClose={() => {
          setShowDedicationModal(false);
          setDedicationSongTarget(null);
        }}
        preselectedSong={dedicationSongTarget}
      />

      <SongRequestModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
      />
    </div>
  );
}

export default function IshqFMPage() {
  return (
    <ThemeProvider>
      <PlayerProvider>
        <IshqFMContent />
      </PlayerProvider>
    </ThemeProvider>
  );
}
