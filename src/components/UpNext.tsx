"use client";
import { usePlayer } from "./PlayerContext";

export default function UpNext() {
    const { queue, removeFromQueue, playSong } = usePlayer();

    if (queue.length === 0) return null;

    return (
        <section className="w-full max-w-md mx-auto mt-8">
            <h3 className="font-heading text-lg font-bold mb-3 flex items-center gap-2">
                <span className="text-saffron-500">▶</span> UP NEXT
            </h3>
            <div className="space-y-1">
                {queue.slice(0, 5).map((song, i) => (
                    <div
                        key={`${song.id}-${i}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-hover transition-colors group cursor-pointer"
                        onClick={() => playSong(song)}
                    >
                        <span className="text-xs text-muted w-5 text-center font-mono">{i + 1}</span>
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={song.thumbnail} alt={song.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{song.title}</p>
                            <p className="text-xs text-muted truncate">{song.artist}</p>
                        </div>
                        <span className="text-xs text-muted">
                            {song.duration && !song.duration.toLowerCase().includes("view") && /^\d+:\d+/.test(song.duration)
                                ? song.duration
                                : (song.durationSeconds ? `${Math.floor(song.durationSeconds / 60)}:${String(song.durationSeconds % 60).padStart(2, "0")}` : "3:00")}
                        </span>
                        <button
                            onClick={(e) => { e.stopPropagation(); removeFromQueue(i); }}
                            className="opacity-0 group-hover:opacity-100 text-muted hover:text-red-500 transition-all text-sm p-1"
                            aria-label="Remove"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
