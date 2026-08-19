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
        ishqSongs,
        currentSong,
        isPlaying,
        playSong,
    } = usePlayer();

    const [searchQuery, setSearchQuery] = useState("");

    if (!isPlaylistModalOpen) return null;

    let songs = allSongs;
    if (activePlaylist === "durgesh") {
        songs = durgeshSongs.length > 0 ? durgeshSongs : allSongs;
    } else if (activePlaylist === "ishq") {
        songs = ishqSongs.length > 0 ? ishqSongs : allSongs;
    } else {
        songs = bihariSongs.length > 0 ? bihariSongs : allSongs;
    }

    const filteredSongs = songs.filter((s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isIshq = activePlaylist === "ishq";
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
                    background: isIshq
                        ? "linear-gradient(180deg, rgba(23, 21, 42, 0.95) 0%, rgba(8, 7, 20, 0.98) 100%)"
                        : isDurgesh
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
                                <span className="text-2xl">{isIshq ? "❤️" : isDurgesh ? "💈" : "🛺"}</span>
                                <h2
                                    className="text-2xl sm:text-3xl font-black text-white drop-shadow-md"
                                    style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
                                >
                                    {isIshq ? "इश्क़ FM प्लेलिस्ट" : isDurgesh ? "दुर्गेश नाई प्लेलिस्ट" : "बिहारी ऑटो प्लेलिस्ट"}
                                </h2>
                            </div>
                            <p className="text-xs text-white/50 font-heading tracking-wider uppercase mt-0.5">
                                {isIshq
                                    ? "Ishq FM • Dil Se... Sirf Tumhare Liye"
                                    : isDurgesh
                                    ? "Durgesh Nai Salon Hits • 90s Classics"
                                    : "Bihari Swag on Wheels • Bhojpuri Bangers"}
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

                    {/* Playlist Switcher Pills inside Modal */}
                    <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-2xl border border-white/10">
                        <button
                            onClick={() => setPlaylist("bihari")}
                            className={`flex-1 py-2 px-2 sm:px-3 rounded-xl text-xs font-heading font-bold transition-all duration-300 flex items-center justify-center gap-1 ${
                                activePlaylist === "bihari"
                                    ? "bg-gradient-to-r from-amber-500 to-saffron-500 text-black shadow-md shadow-amber-500/20"
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            🛺 ऑटो
                        </button>
                        <button
                            onClick={() => setPlaylist("durgesh")}
                            className={`flex-1 py-2 px-2 sm:px-3 rounded-xl text-xs font-heading font-bold transition-all duration-300 flex items-center justify-center gap-1 ${
                                activePlaylist === "durgesh"
                                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-md shadow-amber-400/20"
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            💈 दुर्गेश
                        </button>
                        <button
                            onClick={() => setPlaylist("ishq")}
                            className={`flex-1 py-2 px-2 sm:px-3 rounded-xl text-xs font-heading font-bold transition-all duration-300 flex items-center justify-center gap-1 ${
                                activePlaylist === "ishq"
                                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/30"
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            ❤️ इश्क़ FM
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
                            className="w-full bg-white/5 border border-white/10 focus:border-pink-400/50 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-white/40 outline-none transition-all"
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

                {/* Song List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
                    {filteredSongs.length > 0 ? (
                        filteredSongs.map((song, index) => {
                            const isCurrent = currentSong?.id === song.id;
                            return (
                                <div
                                    key={song.id}
                                    onClick={() => playSong(song)}
                                    className={`group flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                                        isCurrent
                                            ? isIshq
                                                ? "bg-pink-500/20 border border-pink-400/40 shadow-md shadow-pink-500/10"
                                                : isDurgesh
                                                ? "bg-amber-500/20 border border-amber-400/40"
                                                : "bg-saffron-500/20 border border-saffron-400/40"
                                            : "hover:bg-white/5 border border-transparent"
                                    }`}
                                >
                                    <div className="flex items-center gap-3.5 min-w-0">
                                        {/* Number or Playing indicator */}
                                        <div className="w-6 text-center text-xs font-mono text-white/40 group-hover:text-white">
                                            {isCurrent && isPlaying ? (
                                                <span className="text-pink-400 font-bold">▶</span>
                                            ) : (
                                                index + 1
                                            )}
                                        </div>

                                        {/* Artwork */}
                                        <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                                            <img
                                                src={song.thumbnail}
                                                alt={song.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Title & Artist */}
                                        <div className="min-w-0">
                                            <p
                                                className={`text-sm font-semibold truncate ${
                                                    isCurrent
                                                        ? isIshq
                                                            ? "text-pink-300"
                                                            : isDurgesh
                                                            ? "text-amber-300"
                                                            : "text-saffron-400"
                                                        : "text-white group-hover:text-pink-200"
                                                }`}
                                            >
                                                {song.title}
                                            </p>
                                            <p className="text-xs text-white/50 truncate">
                                                {song.artist}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Duration */}
                                    <span className="text-xs font-mono text-white/40 flex-shrink-0 ml-3">
                                        {song.duration}
                                    </span>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-12 text-white/40 text-sm">
                            कोई गाना नहीं मिला / No songs found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
