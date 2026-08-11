"use client";
import { usePlayer } from "./PlayerContext";
import { MOST_REQUESTED } from "@/lib/mockData";

export default function MostRequested() {
    const { playSong } = usePlayer();

    return (
        <section className="w-full max-w-md mx-auto mt-10">
            <h3 className="font-heading text-lg font-bold mb-3 flex items-center gap-2">
                📻 MOST REQUESTED
            </h3>
            <div className="space-y-1">
                {MOST_REQUESTED.map(({ song, requestCount }) => (
                    <div
                        key={song.id}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-hover transition-colors cursor-pointer group"
                        onClick={() => playSong(song)}
                    >
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={song.thumbnail} alt={song.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{song.title}</p>
                            <p className="text-xs text-muted truncate">{song.artist}</p>
                        </div>
                        <span className="text-xs text-saffron-500 font-medium">🔥 {requestCount} requests</span>
                        <button
                            className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-saffron-500 flex items-center justify-center text-white text-xs transition-opacity"
                            aria-label="Play"
                        >
                            ▶
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
