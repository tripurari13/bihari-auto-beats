"use client";
import { usePlayer } from "./PlayerContext";
import { Song } from "@/lib/mockData";

interface SongListProps {
    title: string;
    emoji: string;
    songs: Song[];
    showMeta?: "plays" | "added" | "requests";
    requestCounts?: Record<string, number>;
}

export default function SongList({ title, emoji, songs, showMeta = "plays", requestCounts }: SongListProps) {
    const { playSong } = usePlayer();

    return (
        <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-heading text-sm font-bold text-white/60 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span>{emoji}</span> {title}
            </h3>
            <div className="glass-light p-1 space-y-0.5">
                {songs.map((song, i) => (
                    <div
                        key={`${song.id}-${i}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
                        onClick={() => playSong(song)}
                    >
                        {/* Rank / Number */}
                        {showMeta === "plays" && (
                            <span className={`text-xs w-5 text-center font-heading font-bold ${i < 3 ? 'text-saffron-400' : 'text-white/30'}`}>
                                {i + 1}
                            </span>
                        )}

                        {/* Thumbnail */}
                        <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-white/5">
                            <img src={song.thumbnail} alt={song.title} className="w-full h-full object-cover" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{song.title}</p>
                            <p className="text-[11px] text-white/35 truncate">{song.artist}</p>
                        </div>

                        {/* Meta */}
                        <div className="text-right flex-shrink-0">
                            {showMeta === "plays" && (
                                <span className="text-[11px] text-white/25">{song.playCount.toLocaleString()}</span>
                            )}
                            {showMeta === "added" && (
                                <span className="text-[11px] text-white/25">{song.addedAgo}</span>
                            )}
                            {showMeta === "requests" && requestCounts && (
                                <span className="text-[11px] text-saffron-400/70">🔥 {requestCounts[song.id]}</span>
                            )}
                        </div>

                        {/* Play on hover */}
                        <button className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white text-[10px] transition-opacity flex-shrink-0">
                            ▶
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
