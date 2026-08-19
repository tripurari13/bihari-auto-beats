"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PlayerProvider, usePlayer } from "@/components/PlayerContext";
import Player from "@/components/Player";
import YouTubePlayer from "@/components/YouTubePlayer";
import { ISHQ_FALLBACK_SONGS } from "@/lib/ishqData";
import { Song } from "@/lib/mockData";

function SongShareContent() {
    const params = useParams();
    const slug = typeof params?.slug === "string" ? params.slug : "";
    const { ishqSongs, playSong, currentSong, isPlaying, togglePlay } = usePlayer();

    const songs = ishqSongs.length > 0 ? ishqSongs : ISHQ_FALLBACK_SONGS;
    const song: Song | undefined = songs.find(
        (s) => s.id === slug || s.youtubeVideoId === slug || s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
    ) || songs[0];

    const isCurrentPlaying = currentSong?.id === song?.id && isPlaying;

    const handlePlay = () => {
        if (song) {
            if (currentSong?.id === song.id) {
                togglePlay();
            } else {
                playSong(song);
            }
        }
    };

    if (!song) return null;

    return (
        <div className="min-h-screen bg-[#080714] text-white relative flex flex-col items-center justify-center p-4 sm:p-8">
            {/* Background art */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center opacity-30 blur-sm pointer-events-none"
                style={{ backgroundImage: "url('/ishq-fm.png')" }}
            />
            <div className="fixed inset-0 bg-gradient-to-t from-[#080714] via-[#080714]/80 to-black/60 pointer-events-none" />

            <div className="relative z-10 w-full max-w-lg bg-[#17152A]/90 border border-pink-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_10px_50px_rgba(255,79,139,0.3)] backdrop-blur-2xl text-center space-y-6 animate-slide-up-modal">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <Link
                        href="/ishq-fm"
                        className="text-xs text-pink-300 hover:text-white flex items-center gap-1 font-semibold"
                    >
                        <span>← Back to Ishq FM</span>
                    </Link>
                    <span className="text-[10px] uppercase font-bold text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/30">
                        ❤️ Shared on Ishq FM
                    </span>
                </div>

                {/* Artwork */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-2xl overflow-hidden shadow-2xl border border-pink-500/40 group">
                    <img
                        src={song.thumbnail}
                        alt={song.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                        onClick={handlePlay}
                        className="absolute inset-0 bg-black/40 hover:bg-black/20 flex items-center justify-center text-white text-4xl transition-all"
                    >
                        {isCurrentPlaying ? "⏸" : "▶"}
                    </button>
                </div>

                {/* Info */}
                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {song.title}
                    </h1>
                    <p className="text-pink-300 text-sm">{song.artist}</p>
                    <p className="text-white/50 text-xs italic pt-2">
                        "Kuch gaane sune nahi jaate... mehsoos kiye jaate hain." ❤️
                    </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                        onClick={handlePlay}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-xl shadow-pink-500/30 transition-all flex items-center justify-center gap-2"
                    >
                        <span>{isCurrentPlaying ? "PAUSE" : "LISTEN ON ISHQ FM"}</span>
                        <span>▶</span>
                    </button>

                    <Link
                        href="/ishq-fm"
                        className="w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-center text-sm"
                    >
                        Explore All Songs
                    </Link>
                </div>
            </div>

            {/* Global player */}
            <YouTubePlayer />
            <Player />
        </div>
    );
}

export default function SongSharePage() {
    return (
        <ThemeProvider>
            <PlayerProvider>
                <SongShareContent />
            </PlayerProvider>
        </ThemeProvider>
    );
}
