"use client";
import { useState, useEffect } from "react";
import { CURRENT_LISTENERS } from "@/lib/mockData";

interface TopBarProps {
    onAddSong: () => void;
    onSearch: () => void;
    onMenuToggle: () => void;
}

export default function TopBar({ onAddSong, onSearch, onMenuToggle }: TopBarProps) {
    const [listeners, setListeners] = useState(CURRENT_LISTENERS);

    useEffect(() => {
        const interval = setInterval(() => {
            setListeners((prev) => {
                const change = Math.floor(Math.random() * 7) - 3;
                let next = prev + change;
                if (next < 200) next = 200;
                if (next > 500) next = 500;
                return next;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 flex items-center justify-between">
            {/* Left — Hamburger Menu */}
            <button
                onClick={onMenuToggle}
                className="glass-pill w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Menu"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </button>

            {/* Center — Listener count */}
            <div className="glass-pill px-4 py-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-live" />
                <span className="text-sm font-semibold text-white">{listeners}</span>
                <span className="text-xs text-white/50 hidden sm:inline">on the highway</span>
            </div>

            {/* Right — Search & Add */}
            <div className="flex items-center gap-2">
                <button
                    onClick={onSearch}
                    className="glass-pill w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                    aria-label="Search"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </button>
                <button
                    onClick={onAddSong}
                    className="glass-pill w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                    aria-label="Add Song"
                >
                    <span className="text-lg">➕</span>
                </button>
            </div>
        </div>
    );
}
