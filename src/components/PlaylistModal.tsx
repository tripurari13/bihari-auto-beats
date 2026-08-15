"use client";
import { useState } from "react";
import { usePlayer } from "./PlayerContext";

export default function PlaylistModal() {
    const {
        isPlaylistModalOpen,
        closePlaylistModal,
        activePlaylist,
        setPlaylist,
        allSongs,
        bihariSongs,
        durgeshSongs,
        currentSong,
        isPlaying,
        playSong,
    } = usePlayer();

    const [searchQuery, setSearchQuery] = useState("");

    if (!isPlaylistModalOpen) return null;

    const songs = allSongs.length > 0
        ? allSongs
        : (activePlaylist === "durgesh" ? durgeshSongs : bihariSongs);

    const filteredSongs = songs.filter((s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isDurgesh = activePlaylist === "durgesh";

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop with blur */}
            <div
                className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-fade-in"
                onClick={closePlaylistModal}
            />

            {/* Modal Dialog */}
            <div
                className="relative z-10 w-full max-w-2xl max-h-[85vh] sm:max-h-[80vh] flex flex-col rounded-t-3xl sm:rounded-3xl border border-white/15 shadow-2xl overflow-hidden animate-slide-up-modal"
                style={{
                    background: isDurgesh
                        ? "linear-gradient(180deg, rgba(35, 20, 15, 0.92) 0%, rgba(15, 10, 10, 0.96) 100%)"
                        : "linear-gradient(180deg, rgba(20, 25, 35, 0.92) 0%, rgba(10, 12, 18, 0.96) 100%)",
                    backdropFilter: "blur(30px)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-5 sm:p-6 pb-4 border-b border-white/10 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        {/* Title in Hindi */}
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{isDurgesh ? "💈" : "🛺"}</span>
                                <h2
                                    className="text-2xl sm:text-3xl font-black text-white drop-shadow-md"
                                    style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
                                >
                                    {isDurgesh ? "दुर्गेश नाई प्लेलिस्ट" : "बिहारी ऑटो प्लेलिस्ट"}
                                </h2>
                            </div>
                            <p className="text-xs text-white/50 font-heading tracking-wider uppercase mt-0.5">
                                {isDurgesh ? "Durgesh Nai Salon Hits • 90s Classics" : "Bihari Swag on Wheels • Bhojpuri Bangers"}
                            </p>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={closePlaylistModal}
                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors shadow-inner"
                            aria-label="Close"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Playlist Switcher Pills inside Modal (Clean, no counts) */}
                    <div className="flex items-center gap-2 bg-black/40 p-1 rounded-2xl border border-white/10">
                        <button
                            onClick={() => setPlaylist("bihari")}
                            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                                !isDurgesh
                                    ? "bg-gradient-to-r from-amber-500 to-saffron-500 text-black shadow-md shadow-amber-500/20"
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            🛺 बिहारी ऑटो
                        </button>
                        <button
                            onClick={() => setPlaylist("durgesh")}
                            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                                isDurgesh
                                    ? "bg-gradient-to-r from-amber-500 to-saffron-500 text-black shadow-md shadow-amber-500/20"
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            💈 दुर्गेश नाई
                        </button>
                    </div>

                    {/* Search Input */}
                    <div className="relative">
                        <svg
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="गाना या गायक खोजें... / Search songs..."
                            className="w-full bg-white/5 border border-white/10 focus:border-saffron-400/50 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-white/40 outline-none transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Song List (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
                    {filteredSongs.length === 0 ? (
                        <div className="py-12 text-center text-white/40">
                            <span className="text-3xl block mb-2">🔍</span>
                            <p className="text-sm font-medium">कोई गाना नहीं मिला</p>
                        </div>
                    ) : (
                        filteredSongs.map((song, index) => {
                            const isCurrent = currentSong?.id === song.id;
                            return (
                                <div
                                    key={song.id}
                                    onClick={() => {
                                        playSong(song);
                                        closePlaylistModal();
                                    }}
                                    className={`group flex items-center gap-3.5 p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                                        isCurrent
                                            ? "bg-gradient-to-r from-amber-500/20 to-saffron-500/10 border border-saffron-400/40 shadow-lg shadow-saffron-500/10"
                                            : "bg-white/[0.04] hover:bg-white/[0.08] border border-white/5"
                                    }`}
                                >
                                    {/* Song Index or Playing Animation */}
                                    <div className="w-7 text-center flex-shrink-0 flex items-center justify-center">
                                        {isCurrent && isPlaying ? (
                                            <div className="flex items-end gap-0.5 h-4">
                                                <span className="w-1 bg-saffron-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-full" />
                                                <span className="w-1 bg-saffron-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-2/3" />
                                                <span className="w-1 bg-saffron-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-4/5" />
                                            </div>
                                        ) : (
                                            <span className={`text-xs font-mono font-semibold ${isCurrent ? "text-saffron-400" : "text-white/30 group-hover:text-white/70"}`}>
                                                {index + 1}
                                            </span>
                                        )}
                                    </div>

                                    {/* Thumbnail */}
                                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                                        <img
                                            src={song.thumbnail}
                                            alt={song.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                        {isCurrent && (
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <span className="text-saffron-400 text-sm">▶</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Song Title & Artist */}
                                    <div className="flex-1 min-w-0">
                                        <p
                                            className={`text-sm font-semibold truncate ${
                                                isCurrent ? "text-saffron-400 font-bold" : "text-white group-hover:text-white"
                                            }`}
                                        >
                                            {song.title}
                                        </p>
                                        <p className="text-xs text-white/50 truncate mt-0.5">
                                            {song.artist}
                                        </p>
                                    </div>

                                    {/* Duration */}
                                    <span className="text-xs text-white/40 font-mono flex-shrink-0">
                                        {song.duration}
                                    </span>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer Info */}
                <div className="px-6 py-3 border-t border-white/10 bg-black/30 flex items-center justify-end text-xs text-white/40 font-mono">
                    <button
                        onClick={closePlaylistModal}
                        className="text-saffron-400 hover:underline font-semibold"
                    >
                        बंद करें ✕
                    </button>
                </div>
            </div>
        </div>
    );
}
