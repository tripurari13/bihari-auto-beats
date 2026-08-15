"use client";
import { useState, useEffect } from "react";
import { usePlayer } from "./PlayerContext";

interface TopBarProps {
    onAddSong?: () => void;
    onSearch: () => void;
    onMenuToggle?: () => void;
}

export default function TopBar({ onSearch }: TopBarProps) {
    const { activePlaylist, openMoodModal } = usePlayer();
    const [listeners, setListeners] = useState<number | null>(null);
    const [currentTime, setCurrentTime] = useState<string>("");

    // Live clock timer
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(
                now.toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                })
            );
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Presence counter
    useEffect(() => {
        let eventSource: EventSource | null = null;
        let retryTimeout: ReturnType<typeof setTimeout>;

        function connect() {
            eventSource = new EventSource("/api/presence");

            eventSource.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (typeof data.count === "number") {
                        setListeners(data.count);
                    }
                } catch {
                    // ignore malformed messages
                }
            };

            eventSource.onerror = () => {
                eventSource?.close();
                // Reconnect after 3 seconds on error
                retryTimeout = setTimeout(connect, 3000);
            };
        }

        connect();

        return () => {
            eventSource?.close();
            clearTimeout(retryTimeout);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 flex items-center justify-between pointer-events-none">
            {/* Left — Current Time (Translucent frosted glass pill) */}
            <div className="glass-pill px-4 py-2 text-white font-mono text-xs sm:text-sm font-semibold tracking-wide pointer-events-auto select-none">
                {currentTime || "--:--"}
            </div>

            {/* Center — Listener count */}
            <div className="glass-pill px-4 py-2 flex items-center gap-2 pointer-events-auto select-none">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-live" />
                <span className="text-xs sm:text-sm font-semibold text-white">
                    {listeners !== null ? listeners : "…"}
                </span>
                <span className="text-xs text-white/50 hidden sm:inline font-medium">on the highway</span>
            </div>

            {/* Right — Mood Switcher & Search */}
            <div className="flex items-center gap-2 pointer-events-auto">
                <button
                    onClick={openMoodModal}
                    className="glass-pill px-3.5 py-2 flex items-center gap-1.5 text-xs font-heading font-semibold text-white/90 hover:text-amber-400 transition-colors shadow-md"
                    title="मूड बदलें / Switch Vibe"
                >
                    <span>{activePlaylist === "durgesh" ? "💈 दुर्गेश नाई" : "🛺 बिहारी ऑटो"}</span>
                    <span className="text-[10px] text-white/40">⇄</span>
                </button>

                <button
                    onClick={onSearch}
                    className="glass-pill w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                    aria-label="Search"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
