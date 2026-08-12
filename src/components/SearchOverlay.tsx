"use client";
import { useState, useEffect, useRef } from "react";
import { usePlayer } from "./PlayerContext";
import { SONGS, Song } from "@/lib/mockData";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState("");
    const [localResults, setLocalResults] = useState<Song[]>([]);
    const [ytResults, setYtResults] = useState<Song[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const { playSong } = usePlayer();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery("");
            setLocalResults([]);
            setYtResults([]);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!query.trim()) {
            setLocalResults([]);
            setYtResults([]);
            return;
        }

        // Local search
        const local = SONGS.filter(
            (s) =>
                s.title.toLowerCase().includes(query.toLowerCase()) ||
                s.artist.toLowerCase().includes(query.toLowerCase())
        );
        setLocalResults(local);

        // YouTube search (debounced)
        const timer = setTimeout(async () => {
            setIsSearching(true);
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                if (res.ok) {
                    const data = await res.json();
                    setYtResults(data.results || []);
                }
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setIsSearching(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    if (!isOpen) return null;

    const handlePlay = (song: Song) => {
        playSong(song);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex flex-col animate-fade-in">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full max-w-2xl mx-auto w-full p-4 pt-12">
                {/* Search Input */}
                <div className="relative mb-6">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Gaana khojo (Search songs)..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-white/40 focus:outline-none focus:border-saffron-400/50 focus:bg-white/15 transition-all text-lg font-medium"
                    />
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    {query && (
                        <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                            ✕
                        </button>
                    )}
                </div>

                {/* Results */}
                <div className="flex-1 overflow-y-auto space-y-6 pb-24">
                    {/* Local Results */}
                    {localResults.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3 px-2">In Playlist</h3>
                            <div className="space-y-1">
                                {localResults.map((song) => (
                                    <div key={song.id} onClick={() => handlePlay(song)} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 cursor-pointer transition-colors group">
                                        <img src={song.thumbnail} alt={song.title} className="w-10 h-10 rounded-lg object-cover" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate">{song.title}</p>
                                            <p className="text-xs text-white/40 truncate">{song.artist}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* YouTube Results */}
                    {query.trim() && (
                        <section>
                            <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                                YouTube Search
                                {isSearching && <span className="w-3 h-3 border-2 border-saffron-400 border-t-transparent rounded-full animate-spin" />}
                            </h3>
                            <div className="space-y-1">
                                {ytResults.map((song) => (
                                    <div key={song.id} onClick={() => handlePlay(song)} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 cursor-pointer transition-colors group">
                                        <div className="relative w-16 h-10 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={song.thumbnail} alt={song.title} className="w-full h-full object-cover" />
                                            <div className="absolute bottom-0.5 right-0.5 bg-black/70 px-1 rounded text-[8px] text-white font-mono">
                                                {song.duration && !song.duration.toLowerCase().includes("view") && /^\d+:\d+/.test(song.duration)
                                                    ? song.duration
                                                    : (song.durationSeconds ? `${Math.floor(song.durationSeconds / 60)}:${String(song.durationSeconds % 60).padStart(2, "0")}` : "3:00")}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate">{song.title}</p>
                                            <p className="text-xs text-white/40 truncate">{song.artist}</p>
                                        </div>
                                    </div>
                                ))}
                                {!isSearching && ytResults.length === 0 && query.trim() && (
                                    <p className="text-sm text-white/40 px-2">No YouTube results found.</p>
                                )}
                            </div>
                        </section>
                    )}

                    {!query.trim() && (
                        <div className="h-full flex flex-col items-center justify-center text-white/30 pt-20">
                            <span className="text-4xl mb-4">🔍</span>
                            <p>Type to search songs...</p>
                        </div>
                    )}
                </div>

                {/* Close Button (Mobile) */}
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white/50 hover:text-white md:hidden">
                    ✕
                </button>
            </div>
        </div>
    );
}
