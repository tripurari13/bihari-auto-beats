"use client";
import { usePlayer } from "./PlayerContext";

export default function Player() {
    const {
        currentSong,
        isPlaying,
        progress,
        togglePlay,
        nextSong,
        prevSong,
        requestSeek,
        toggleLike,
        isShuffle,
        toggleShuffle,
    } = usePlayer();

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
        <div className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
            <div className="glass-strong mx-2 mb-2 md:mx-auto md:max-w-2xl rounded-2xl overflow-hidden animate-fade-in">
                {/* Progress bar at top */}
                <div
                    className="progress-track rounded-none"
                    style={{ height: '3px', borderRadius: 0 }}
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                        requestSeek(pct);
                    }}
                >
                    <div className="progress-fill" style={{ width: `${progress}%`, borderRadius: 0 }} />
                </div>

                <div className="flex items-center gap-3 px-4 py-3">
                    {/* Thumbnail */}
                    <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
                        <img
                            src={currentSong.thumbnail}
                            alt={currentSong.title}
                            className={`w-full h-full object-cover transition-transform duration-300 ${isPlaying ? 'scale-105' : ''}`}
                        />
                    </div>

                    {/* Song Info */}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{currentSong.title}</p>
                        <p className="text-xs text-white/50 truncate">{currentSong.artist}</p>
                    </div>

                    {/* Time */}
                    <span className="text-[10px] text-white/40 font-mono hidden sm:block">
                        {formatTime(currentTime)} / {displayDuration}
                    </span>

                    {/* Controls */}
                    <div className="flex items-center gap-0.5 sm:gap-1">
                        {/* Like */}
                        <button
                            onClick={() => toggleLike(currentSong.id)}
                            className={`p-1.5 sm:p-2 rounded-full transition-colors ${currentSong.isLiked ? 'text-red-400' : 'text-white/40 hover:text-white/70'}`}
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
                            className={`p-1.5 sm:p-2 rounded-full transition-colors ${isShuffle ? 'text-saffron-400' : 'text-white/40 hover:text-white/70'}`}
                            aria-label="Shuffle"
                            title="Shuffle"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="16 3 21 3 21 8"></polyline>
                                <line x1="4" y1="20" x2="21" y2="3"></line>
                                <polyline points="21 16 21 21 16 21"></polyline>
                                <line x1="15" y1="15" x2="21" y2="21"></line>
                                <line x1="4" y1="4" x2="9" y2="9"></line>
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
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-white/90 transition-all active:scale-95 shadow-lg mx-0.5 sm:mx-1"
                            aria-label={isPlaying ? "Pause" : "Play"}
                            title={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? (
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
    );
}
