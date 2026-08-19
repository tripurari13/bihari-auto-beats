"use client";
import { useEffect, useState } from "react";
import { usePlayer } from "./PlayerContext";
import PlaylistModal from "./PlaylistModal";
import DedicationModal from "./DedicationModal";

export default function Player() {
    const {
        currentSong,
        isPlaying,
        isBuffering,
        progress,
        togglePlay,
        nextSong,
        prevSong,
        requestSeek,
        toggleLike,
        isShuffle,
        toggleShuffle,
        openPlaylistModal,
        activePlaylist,
    } = usePlayer();

    const [showDedication, setShowDedication] = useState(false);

    const isIshq = activePlaylist === "ishq";
    const isDurgesh = activePlaylist === "durgesh";

    // Media Session Integration
    useEffect(() => {
        if (!currentSong || typeof window === "undefined" || !("mediaSession" in navigator)) return;

        try {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: currentSong.title,
                artist: currentSong.artist,
                album: isIshq ? "Ishq FM • Dil Se" : isDurgesh ? "Durgesh Nai Special" : "Bihari Auto Beats",
                artwork: [
                    { src: currentSong.thumbnail, sizes: "512x512", type: "image/jpeg" },
                ],
            });

            navigator.mediaSession.setActionHandler("play", () => {
                if (!isPlaying) togglePlay();
            });
            navigator.mediaSession.setActionHandler("pause", () => {
                if (isPlaying) togglePlay();
            });
            navigator.mediaSession.setActionHandler("previoustrack", () => {
                prevSong();
            });
            navigator.mediaSession.setActionHandler("nexttrack", () => {
                nextSong();
            });
        } catch {
            // MediaSession may fail in restricted webviews
        }
    }, [currentSong, isPlaying, isIshq, isDurgesh, togglePlay, prevSong, nextSong]);

    if (!currentSong) return null;

    const formatTime = (seconds: number) => {
        if (isNaN(seconds) || seconds < 0) return "0:00";
        const rounded = Math.floor(seconds);
        const hrs = Math.floor(rounded / 3600);
        const mins = Math.floor((rounded % 3600) / 60);
        const secs = rounded % 60;
        if (hrs > 0) {
            return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
        }
        return `${mins}:${String(secs).padStart(2, "0")}`;
    };

    const totalSeconds = currentSong.durationSeconds || 180;
    const currentTime = Math.floor((progress / 100) * totalSeconds);
    const isDurationClean = Boolean(
        currentSong.duration &&
        !currentSong.duration.toLowerCase().includes("view") &&
        /^\d+:\d+/.test(currentSong.duration)
    );
    const displayDuration = isDurationClean
        ? currentSong.duration
        : formatTime(totalSeconds);

    return (
        <>
            <div className="fixed bottom-3 sm:bottom-6 left-0 right-0 z-50 safe-bottom px-2 sm:px-4">
                <div
                    className={`mx-auto max-w-2xl rounded-2xl overflow-hidden animate-fade-in shadow-2xl transition-all duration-500 backdrop-blur-xl border ${
                        isIshq
                            ? "bg-[#17152A]/90 border-pink-500/30 shadow-[0_10px_40px_rgba(255,79,139,0.25)]"
                            : isDurgesh
                            ? "bg-[#1c140e]/90 border-amber-500/30 shadow-[0_10px_40px_rgba(245,158,11,0.2)]"
                            : "glass-strong border-white/10"
                    }`}
                >
                    {/* Progress bar at top */}
                    <div
                        className="w-full bg-white/10 cursor-pointer relative overflow-hidden"
                        style={{ height: "3px" }}
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                            requestSeek(pct);
                        }}
                    >
                        <div
                            className={`h-full transition-all duration-150 relative ${
                                isIshq
                                    ? "bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_8px_rgba(255,79,139,0.8)]"
                                    : isDurgesh
                                    ? "bg-gradient-to-r from-amber-400 to-yellow-500"
                                    : "progress-fill"
                            }`}
                            style={{ width: `${progress}%` }}
                        >
                            {/* Shimmer on loading */}
                            {isBuffering && (
                                <div className="absolute inset-0 bg-white/40 animate-pulse" />
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3">
                        {/* Thumbnail & Equalizer */}
                        <div
                            onClick={openPlaylistModal}
                            className={`w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 shadow-lg cursor-pointer group relative border ${
                                isIshq ? "border-pink-500/40" : isDurgesh ? "border-amber-400/40" : "border-white/10"
                            }`}
                            title="प्लेलिस्ट खोलें / Open Playlist"
                        >
                            <img
                                src={currentSong.thumbnail}
                                alt={currentSong.title}
                                className={`w-full h-full object-cover transition-transform duration-300 ${
                                    isPlaying && !isBuffering ? "scale-105" : "group-hover:scale-110"
                                }`}
                            />

                            {/* Loading / Buffering Shimmer Ring */}
                            {isBuffering && (
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-t-transparent border-pink-400 rounded-full animate-spin" />
                                </div>
                            )}

                            {/* Subtle live equalizer overlay when actively playing */}
                            {isPlaying && !isBuffering && (
                                <div className="absolute inset-0 bg-black/40 flex items-end justify-center gap-0.5 pb-1">
                                    <span className="w-1 bg-pink-400 rounded-full animate-pulse h-3" />
                                    <span className="w-1 bg-purple-400 rounded-full animate-pulse h-4 delay-75" />
                                    <span className="w-1 bg-pink-300 rounded-full animate-pulse h-2 delay-150" />
                                </div>
                            )}
                        </div>

                        {/* Song Info */}
                        <div
                            className="flex-1 min-w-0 cursor-pointer"
                            onClick={openPlaylistModal}
                            title="प्लेलिस्ट खोलें / Open Playlist"
                        >
                            <p
                                className={`text-sm font-semibold truncate transition-colors ${
                                    isIshq ? "text-white hover:text-pink-300" : isDurgesh ? "text-white hover:text-amber-300" : "text-white hover:text-saffron-400"
                                }`}
                            >
                                {currentSong.title}
                            </p>
                            <div className="flex items-center gap-1.5 truncate">
                                {isBuffering ? (
                                    <span className="text-[11px] font-semibold text-pink-300 flex items-center gap-1 animate-pulse">
                                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400" />
                                        {isIshq
                                            ? "📻 ट्यून हो रहा है... Dil Se ❤️"
                                            : isDurgesh
                                            ? "💈 सुर मिल रहा है... ✨"
                                            : "🛺 बेस कनेक्ट हो रहा है... 🔥"}
                                    </span>
                                ) : (
                                    <>
                                        <span className="text-xs text-white/50 truncate">{currentSong.artist}</span>
                                        {isIshq && (
                                            <span className="text-[10px] text-pink-400 font-bold bg-pink-500/10 px-1.5 py-0.2 rounded-full border border-pink-400/20 flex-shrink-0">
                                                Ishq FM
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Time */}
                        <span className="text-[10px] text-white/40 font-mono hidden sm:block">
                            {isBuffering ? "Connecting..." : `${formatTime(currentTime)} / ${displayDuration}`}
                        </span>

                        {/* Controls */}
                        <div className="flex items-center gap-0.5 sm:gap-1">
                            {/* Dedicate Button for Ishq FM */}
                            {isIshq && (
                                <button
                                    onClick={() => setShowDedication(true)}
                                    className="p-1.5 sm:p-2 rounded-full text-pink-400 hover:text-pink-300 hover:bg-pink-500/10 transition-all"
                                    aria-label="Dedicate Song"
                                    title="गाना Dedicate करें / Dedicate Song"
                                >
                                    💌
                                </button>
                            )}

                            {/* Playlist Song List Button */}
                            <button
                                onClick={openPlaylistModal}
                                className={`p-1.5 sm:p-2 rounded-full text-white/70 hover:bg-white/10 transition-all flex items-center justify-center ${
                                    isIshq ? "hover:text-pink-400" : isDurgesh ? "hover:text-amber-400" : "hover:text-saffron-400"
                                }`}
                                aria-label="Playlist Songs"
                                title="प्लेलिस्ट के सभी गाने / View Playlist Songs"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="8" y1="6" x2="21" y2="6" />
                                    <line x1="8" y1="12" x2="21" y2="12" />
                                    <line x1="8" y1="18" x2="21" y2="18" />
                                    <line x1="3" y1="6" x2="3.01" y2="6" />
                                    <line x1="3" y1="12" x2="3.01" y2="12" />
                                    <line x1="3" y1="18" x2="3.01" y2="18" />
                                </svg>
                            </button>

                            {/* Like */}
                            <button
                                onClick={() => toggleLike(currentSong.id)}
                                className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                                    currentSong.isLiked ? "text-pink-500" : "text-white/40 hover:text-white/70"
                                }`}
                                aria-label="Like"
                                title={currentSong.isLiked ? "Unlike" : "Like"}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill={currentSong.isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                            </button>

                            {/* Shuffle */}
                            <button
                                onClick={toggleShuffle}
                                className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                                    isShuffle ? (isIshq ? "text-pink-400" : "text-saffron-400") : "text-white/40 hover:text-white/70"
                                }`}
                                aria-label="Shuffle"
                                title="Shuffle"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="16 3 21 3 21 8" />
                                    <line x1="4" y1="20" x2="21" y2="3" />
                                    <polyline points="21 16 21 21 16 21" />
                                    <line x1="15" y1="15" x2="21" y2="21" />
                                    <line x1="4" y1="4" x2="9" y2="9" />
                                </svg>
                            </button>

                            {/* Prev */}
                            <button onClick={prevSong} className="p-1.5 sm:p-2 text-white/50 hover:text-white transition-colors" aria-label="Previous" title="Previous">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                                </svg>
                            </button>

                            {/* Play/Pause */}
                            <button
                                onClick={togglePlay}
                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg mx-0.5 sm:mx-1 ${
                                    isIshq
                                        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-400 hover:to-purple-500 shadow-pink-500/30"
                                        : isDurgesh
                                        ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-amber-500/30"
                                        : "bg-white text-black hover:bg-white/90"
                                }`}
                                aria-label={isPlaying ? "Pause" : "Play"}
                                title={isPlaying ? "Pause" : "Play"}
                            >
                                {isBuffering ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : isPlaying ? (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                                    </svg>
                                ) : (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </button>

                            {/* Next */}
                            <button onClick={nextSong} className="p-1.5 sm:p-2 text-white/50 hover:text-white transition-colors" aria-label="Next" title="Next">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Playlist Modal Dialog */}
            <PlaylistModal />

            {/* Song Dedication Modal */}
            <DedicationModal
                isOpen={showDedication}
                onClose={() => setShowDedication(false)}
                preselectedSong={currentSong}
            />
        </>
    );
}
