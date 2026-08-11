"use client";
import { usePlayer } from "./PlayerContext";

export default function AutoMode() {
    const { currentSong, isPlaying, togglePlay, nextSong, prevSong, toggleAutoMode } = usePlayer();

    if (!currentSong) return null;

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center">
            {/* BG */}
            <div className="bg-fixed-cover" />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-sm">
                {/* Close */}
                <button
                    onClick={toggleAutoMode}
                    className="absolute top-[-60px] right-0 glass-pill w-10 h-10 flex items-center justify-center text-white/50 hover:text-white"
                    aria-label="Exit Auto Mode"
                >
                    ✕
                </button>

                <p className="text-saffron-400 font-heading font-bold text-sm tracking-[0.2em] mb-8">
                    🛺 AUTO MODE
                </p>

                {/* Artwork */}
                <div className="w-36 h-36 rounded-2xl overflow-hidden mb-8 shadow-2xl ring-1 ring-white/10">
                    <img src={currentSong.thumbnail} alt={currentSong.title} className="w-full h-full object-cover" />
                </div>

                <h2 className="text-white font-heading text-xl font-bold text-center mb-1 truncate w-full">
                    {currentSong.title}
                </h2>
                <p className="text-white/40 text-sm mb-14">{currentSong.artist}</p>

                {/* Huge Controls */}
                <div className="flex items-center justify-center gap-8">
                    <button onClick={prevSong} className="w-14 h-14 rounded-full glass flex items-center justify-center text-white active:scale-95 transition-transform" aria-label="Previous">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
                    </button>

                    <button onClick={togglePlay} className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-black shadow-2xl active:scale-95 transition-transform" aria-label={isPlaying ? "Pause" : "Bajao"}>
                        {isPlaying ? (
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
                        ) : (
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                        )}
                    </button>

                    <button onClick={nextSong} className="w-14 h-14 rounded-full glass flex items-center justify-center text-white active:scale-95 transition-transform" aria-label="Next">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
                    </button>
                </div>

                {/* Safety */}
                <p className="text-white/20 text-[11px] text-center mt-12 leading-relaxed max-w-[260px]">
                    ⚠️ Gaadi chala rahe ho? Phone mat chalao.
                </p>
            </div>
        </div>
    );
}
