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
    const { playSong } = usePlayer();

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
                    <h2 className="font-heading text-xl font-bold text-white tracking-wider">MENU</h2>
                    <button onClick={onClose} className="text-white/50 hover:text-white text-xl">✕</button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-10 pb-32">
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
