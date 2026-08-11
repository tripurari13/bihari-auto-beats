"use client";
import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { Song, SONGS } from "@/lib/mockData";

interface PlayerState {
    currentSong: Song | null;
    queue: Song[];
    allSongs: Song[];
    isPlaying: boolean;
    progress: number;
    volume: number;
    isShuffle: boolean;
    repeatMode: "off" | "all" | "one";
    isAutoMode: boolean;
    seekRequest: number | null;
}

interface PlayerContextType extends PlayerState {
    playSong: (song: Song) => void;
    togglePlay: () => void;
    nextSong: () => void;
    prevSong: () => void;
    setProgress: (p: number) => void;
    setVolume: (v: number) => void;
    toggleShuffle: () => void;
    cycleRepeat: () => void;
    toggleAutoMode: () => void;
    addToQueue: (song: Song) => void;
    removeFromQueue: (index: number) => void;
    toggleLike: (songId: string) => void;
    requestSeek: (progress: number) => void;
    clearSeekRequest: () => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<PlayerState>(() => {
        const initialSongs = [...SONGS];
        // Shuffle initial songs
        for (let i = initialSongs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [initialSongs[i], initialSongs[j]] = [initialSongs[j], initialSongs[i]];
        }
        return {
            currentSong: initialSongs[0],
            queue: initialSongs.slice(1, 11),
            allSongs: initialSongs,
            isPlaying: false, // Disabled autoplay
            progress: 0,
            volume: 80,
            isShuffle: false,
            repeatMode: "off",
            isAutoMode: false,
            seekRequest: null,
        };
    });

    // Fetch real-time playlist on mount
    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const res = await fetch("/api/playlist");
                if (res.ok) {
                    const data = await res.json();
                    if (data.songs && data.songs.length > 0) {
                        const realSongs = [...data.songs];
                        // Shuffle the entire array
                        for (let i = realSongs.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [realSongs[i], realSongs[j]] = [realSongs[j], realSongs[i]];
                        }
                        const randomSong = realSongs[0];
                        const newQueue = realSongs.slice(1, 11); // Next 10 songs
                        setState((s) => ({ ...s, currentSong: randomSong, queue: newQueue, allSongs: realSongs, isPlaying: false }));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch real-time playlist", error);
                // Fallback to mock data is already in initial state
            }
        };

        fetchPlaylist();
    }, []);

    const togglePlay = useCallback(() => {
        setState((s) => ({ ...s, isPlaying: !s.isPlaying }));
    }, []);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if user is typing in an input or textarea
            if (
                document.activeElement?.tagName === "INPUT" ||
                document.activeElement?.tagName === "TEXTAREA"
            ) {
                return;
            }

            if (e.code === "Space") {
                e.preventDefault(); // Prevent scrolling
                togglePlay();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [togglePlay]);

    const playSong = useCallback((song: Song) => {
        setState((s) => ({ ...s, currentSong: song, isPlaying: true, progress: 0 }));
    }, []);

    const nextSong = useCallback(() => {
        setState((s) => {
            if (s.queue.length === 0) return s;
            const next = s.queue[0];
            const newQueue = s.queue.slice(1);
            if (s.currentSong) newQueue.push(s.currentSong);
            return { ...s, currentSong: next, queue: newQueue, progress: 0, isPlaying: true };
        });
    }, []);

    const prevSong = useCallback(() => {
        setState((s) => {
            if (s.queue.length === 0) return s;
            const prev = s.queue[s.queue.length - 1];
            const newQueue = [...s.queue.slice(0, -1)];
            if (s.currentSong) newQueue.unshift(s.currentSong);
            return { ...s, currentSong: prev, queue: newQueue, progress: 0, isPlaying: true };
        });
    }, []);

    const setProgress = useCallback((p: number) => setState((s) => {
        if (Math.abs(s.progress - p) > 0.5) {
            return { ...s, progress: p };
        }
        return s;
    }), []);

    const setVolume = useCallback((v: number) => setState((s) => ({ ...s, volume: v })), []);

    // Shuffle now plays a random song immediately
    const toggleShuffle = useCallback(() => {
        setState((s) => {
            if (s.allSongs.length === 0) return s;
            const randomIndex = Math.floor(Math.random() * s.allSongs.length);
            const randomSong = s.allSongs[randomIndex];
            const newQueue = s.allSongs.filter((_, i) => i !== randomIndex).slice(0, 10);
            return { ...s, currentSong: randomSong, queue: newQueue, isPlaying: true, progress: 0, isShuffle: true };
        });
    }, []);
    const toggleAutoMode = useCallback(() => setState((s) => ({ ...s, isAutoMode: !s.isAutoMode })), []);

    const requestSeek = useCallback((p: number) => {
        setState((s) => ({ ...s, seekRequest: p, progress: p }));
    }, []);

    const clearSeekRequest = useCallback(() => {
        setState((s) => ({ ...s, seekRequest: null }));
    }, []);

    const cycleRepeat = useCallback(() => {
        setState((s) => {
            const modes: ("off" | "all" | "one")[] = ["off", "all", "one"];
            const idx = modes.indexOf(s.repeatMode);
            return { ...s, repeatMode: modes[(idx + 1) % 3] };
        });
    }, []);

    const addToQueue = useCallback((song: Song) => {
        setState((s) => ({ ...s, queue: [...s.queue, song] }));
    }, []);

    const removeFromQueue = useCallback((index: number) => {
        setState((s) => ({ ...s, queue: s.queue.filter((_, i) => i !== index) }));
    }, []);

    const toggleLike = useCallback((songId: string) => {
        setState((s) => ({
            ...s,
            currentSong: s.currentSong?.id === songId
                ? { ...s.currentSong, isLiked: !s.currentSong.isLiked, likeCount: s.currentSong.isLiked ? s.currentSong.likeCount - 1 : s.currentSong.likeCount + 1 }
                : s.currentSong,
            queue: s.queue.map((song) =>
                song.id === songId ? { ...song, isLiked: !song.isLiked, likeCount: song.isLiked ? song.likeCount - 1 : song.likeCount + 1 } : song
            ),
        }));
    }, []);

    return (
        <PlayerContext.Provider value={{ ...state, playSong, togglePlay, nextSong, prevSong, setProgress, setVolume, toggleShuffle, cycleRepeat, toggleAutoMode, addToQueue, removeFromQueue, toggleLike, requestSeek, clearSeekRequest }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    const ctx = useContext(PlayerContext);
    if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
    return ctx;
}
