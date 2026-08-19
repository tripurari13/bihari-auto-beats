"use client";
import { usePlayer } from "./PlayerContext";
import { MOST_PLAYED, RECENTLY_ADDED, MOST_REQUESTED } from "@/lib/mockData";
import SongList from "./SongList";
import { useMemo } from "react";

interface SideMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
    const { activePlaylist, setPlaylist, openPlaylistModal } = usePlayer();

    const requestCounts = useMemo(() => {
        const map: Record<string, number> = {};
        MOST_REQUESTED.forEach(({ song, requestCount }) => {
            map[song.id] = requestCount;
        });
        return map;
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[80] flex">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Sidebar */}
            <div className="relative w-full max-w-sm h-full glass-strong border-l-0 border-y-0 rounded-none border-r border-white/10 animate-fade-in flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div>
                        <h2 className="font-heading text-xl font-bold text-white tracking-wider">MENU</h2>
                        <p className="text-xs text-white/50">Bihari Auto Beats & Durgesh Nai</p>
                    </div>
                    <button onClick={onClose} className="text-white/50 hover:text-white text-xl p-2">✕</button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
                    {/* Playlists Quick Switch */}
                    <div className="space-y-2.5">
                        <p className="text-xs font-heading font-semibold text-white/50 uppercase tracking-wider">
                          प्लेलिस्ट चुनें / Select Playlist
                        </p>
                        <div className="grid grid-cols-1 gap-2">
                            <button
                                onClick={() => {
                                    setPlaylist("bihari");
                                    onClose();
                                }}
                                className={`p-3 rounded-2xl flex items-center justify-between transition-all ${
                                    activePlaylist === "bihari"
                                        ? "bg-gradient-to-r from-amber-500/20 to-saffron-500/10 border border-saffron-400/40 text-saffron-400 font-bold"
                                        : "bg-white/5 hover:bg-white/10 border border-white/5 text-white/80"
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    <span className="text-lg">🛺</span>
                                    <span style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>बिहारी ऑटो प्लेलिस्ट</span>
                                </span>
                                {activePlaylist === "bihari" && <span className="text-xs bg-saffron-400 text-black px-2 py-0.5 rounded-full font-bold">Active</span>}
                            </button>

                            <button
                                onClick={() => {
                                    setPlaylist("durgesh");
                                    onClose();
                                }}
                                className={`p-3 rounded-2xl flex items-center justify-between transition-all ${
                                    activePlaylist === "durgesh"
                                        ? "bg-gradient-to-r from-amber-500/20 to-saffron-500/10 border border-saffron-400/40 text-saffron-400 font-bold"
                                        : "bg-white/5 hover:bg-white/10 border border-white/5 text-white/80"
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    <span className="text-lg">💈</span>
                                    <span style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>दुर्गेश नाई प्लेलिस्ट</span>
                                </span>
                                {activePlaylist === "durgesh" && <span className="text-xs bg-saffron-400 text-black px-2 py-0.5 rounded-full font-bold">Active</span>}
                            </button>

                            <button
                                onClick={() => {
                                    setPlaylist("ishq");
                                    onClose();
                                }}
                                className={`p-3 rounded-2xl flex items-center justify-between transition-all ${
                                    activePlaylist === "ishq"
                                        ? "bg-gradient-to-r from-pink-500/20 to-purple-500/10 border border-pink-400/40 text-pink-400 font-bold"
                                        : "bg-white/5 hover:bg-white/10 border border-white/5 text-white/80"
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    <span className="text-lg">❤️</span>
                                    <span style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>इश्क़ FM प्लेलिस्ट</span>
                                </span>
                                {activePlaylist === "ishq" && <span className="text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full font-bold">Active</span>}
                            </button>
                        </div>

                        {/* View All Songs button */}
                        <button
                            onClick={() => {
                                onClose();
                                openPlaylistModal();
                            }}
                            className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-heading font-semibold flex items-center justify-center gap-2 transition-all mt-2"
                        >
                            <span>📋</span>
                            <span>सभी गाने देखें / View All Songs</span>
                        </button>
                    </div>

                    {/* Most Played */}
                    <SongList title="Most Played" emoji="🔥" songs={MOST_PLAYED} showMeta="plays" />

                    {/* Most Requested */}
                    <SongList title="Most Requested" emoji="📻" songs={MOST_REQUESTED.map(r => r.song)} showMeta="requests" requestCounts={requestCounts} />

                    {/* Recently Added */}
                    <SongList title="Recently Added" emoji="🆕" songs={RECENTLY_ADDED} showMeta="added" />
                </div>
            </div>
        </div>
    );
}
