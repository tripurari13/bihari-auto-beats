"use client";
import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { Song, SONGS } from "@/lib/mockData";
import { ISHQ_FALLBACK_SONGS } from "@/lib/ishqData";

export type PlaylistType = "bihari" | "durgesh" | "ishq";

export interface DedicationItem {
    id: string;
    songTitle: string;
    artist: string;
    toName: string;
    message: string;
    date: string;
}

interface PlayerState {
    activePlaylist: PlaylistType;
    currentSong: Song | null;
    queue: Song[];
    allSongs: Song[];
    bihariSongs: Song[];
    durgeshSongs: Song[];
    ishqSongs: Song[];
    isLoadingPlaylist: boolean;
    isPlaying: boolean;
    progress: number;
    volume: number;
    isShuffle: boolean;
    repeatMode: "off" | "all" | "one";
    isAutoMode: boolean;
    seekRequest: number | null;
    isPlaylistModalOpen: boolean;
    isMoodModalOpen: boolean;
    hasSelectedMood: boolean;
    likedSongIds: string[];
    recentlyPlayed: Song[];
    dedications: DedicationItem[];
    activeIshqMood: string | null;
    activeIshqStation: string | null;
    isBuffering: boolean;
}

interface PlayerContextType extends PlayerState {
    setIsBuffering: (b: boolean) => void;
    setPlaylist: (type: PlaylistType, startPlaying?: boolean) => void;
    selectMood: (type: PlaylistType) => void;
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
    setCurrentSongDuration: (seconds: number) => void;
    openPlaylistModal: () => void;
    closePlaylistModal: () => void;
    togglePlaylistModal: () => void;
    openMoodModal: () => void;
    closeMoodModal: () => void;
    playIshqStation: (stationId: string) => void;
    filterIshqMood: (moodId: string) => void;
    addDedication: (dedication: Omit<DedicationItem, "id" | "date">) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

function shuffleArray<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

export function PlayerProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<PlayerState>(() => {
        const initialSongs = shuffleArray(SONGS);
        return {
            activePlaylist: "bihari",
            currentSong: initialSongs[0] || null,
            queue: initialSongs.slice(1, 11),
            allSongs: initialSongs,
            bihariSongs: initialSongs,
            durgeshSongs: [],
            ishqSongs: ISHQ_FALLBACK_SONGS,
            isLoadingPlaylist: false,
            isPlaying: false,
            progress: 0,
            volume: 80,
            isShuffle: false,
            repeatMode: "off",
            isAutoMode: false,
            seekRequest: null,
            isPlaylistModalOpen: false,
            isMoodModalOpen: true, // Opens mood selector on initial visit
            hasSelectedMood: false,
            likedSongIds: [],
            recentlyPlayed: [],
            dedications: [],
            activeIshqMood: null,
            activeIshqStation: null,
            isBuffering: false,
        };
    });

    // Load LocalStorage persisted data (My Ishq) on client mount
    useEffect(() => {
        try {
            const savedLikes = localStorage.getItem("ishq_liked_songs");
            const savedRecent = localStorage.getItem("ishq_recently_played");
            const savedDedications = localStorage.getItem("ishq_dedications");

            setState((s) => ({
                ...s,
                likedSongIds: savedLikes ? JSON.parse(savedLikes) : [],
                recentlyPlayed: savedRecent ? JSON.parse(savedRecent) : [],
                dedications: savedDedications ? JSON.parse(savedDedications) : [],
            }));
        } catch {
            // Ignore storage errors in private browsing
        }
    }, []);

    // Fetch all 3 playlists on mount
    useEffect(() => {
        let isMounted = true;

        const loadPlaylists = async () => {
            try {
                // Fetch Bihari Playlist
                const resBihari = await fetch("/api/playlist");
                let loadedBihari: Song[] = [];
                if (resBihari.ok) {
                    const data = await resBihari.json();
                    if (data.songs && data.songs.length > 0) {
                        loadedBihari = data.songs;
                    }
                }

                // Fetch Durgesh Playlist
                const resDurgesh = await fetch("/api/durgesh-playlist");
                let loadedDurgesh: Song[] = [];
                if (resDurgesh.ok) {
                    const dataDurgesh = await resDurgesh.json();
                    if (dataDurgesh.songs && dataDurgesh.songs.length > 0) {
                        loadedDurgesh = dataDurgesh.songs;
                    }
                }

                // Fetch Ishq FM Playlist (>100 songs support)
                const resIshq = await fetch("/api/ishq-playlist");
                let loadedIshq: Song[] = [];
                if (resIshq.ok) {
                    const dataIshq = await resIshq.json();
                    if (dataIshq.songs && dataIshq.songs.length > 0) {
                        loadedIshq = dataIshq.songs;
                    }
                }

                if (!isMounted) return;

                setState((s) => {
                    const bihari = loadedBihari.length > 0 ? loadedBihari : s.bihariSongs;
                    const durgesh = loadedDurgesh.length > 0 ? loadedDurgesh : [];
                    const ishq = loadedIshq.length > 0 ? loadedIshq : (s.ishqSongs.length > 0 ? s.ishqSongs : ISHQ_FALLBACK_SONGS);

                    let activeList = bihari;
                    if (s.activePlaylist === "durgesh") activeList = durgesh.length > 0 ? durgesh : bihari;
                    if (s.activePlaylist === "ishq") activeList = ishq.length > 0 ? ishq : bihari;

                    const shuffled = shuffleArray(activeList.length > 0 ? activeList : s.allSongs);

                    return {
                        ...s,
                        bihariSongs: bihari,
                        durgeshSongs: durgesh,
                        ishqSongs: ishq,
                        allSongs: activeList.length > 0 ? activeList : s.allSongs,
                        currentSong: s.currentSong || shuffled[0] || null,
                        queue: s.queue.length > 0 ? s.queue : shuffled.slice(1, 11),
                    };
                });
            } catch (err) {
                console.error("Failed to load playlists", err);
            }
        };

        loadPlaylists();

        return () => {
            isMounted = false;
        };
    }, []);

    // Track recently played in state & localStorage
    const recordRecentlyPlayed = useCallback((song: Song) => {
        setState((s) => {
            const filtered = s.recentlyPlayed.filter((item) => item.id !== song.id);
            const updated = [song, ...filtered].slice(0, 15);
            try {
                localStorage.setItem("ishq_recently_played", JSON.stringify(updated));
            } catch {
                // Ignore storage errors
            }
            return { ...s, recentlyPlayed: updated };
        });
    }, []);

    // Switch between Bihari Auto Playlist, Durgesh Nai, and Ishq FM
    const setPlaylist = useCallback((type: PlaylistType, startPlaying = false) => {
        setState((s) => {
            let targetSongs: Song[] = [];
            if (type === "durgesh") {
                targetSongs = s.durgeshSongs.length > 0 ? s.durgeshSongs : [];
            } else if (type === "ishq") {
                targetSongs = s.ishqSongs.length > 0 ? s.ishqSongs : ISHQ_FALLBACK_SONGS;
            } else {
                targetSongs = s.bihariSongs.length > 0 ? s.bihariSongs : SONGS;
            }

            if (targetSongs.length === 0) {
                return { ...s, activePlaylist: type };
            }

            // Only pick new song if switching experience or starting playback
            const shuffled = shuffleArray(targetSongs);
            const newSong = shuffled[0];
            const newQueue = shuffled.slice(1, 11);

            return {
                ...s,
                activePlaylist: type,
                allSongs: targetSongs,
                currentSong: newSong,
                queue: newQueue,
                isPlaying: startPlaying ? true : s.isPlaying,
                progress: 0,
            };
        });
    }, []);

    // Select mood from the introductory modal and start playing
    const selectMood = useCallback((type: PlaylistType) => {
        setState((s) => {
            let targetSongs: Song[] = [];
            if (type === "durgesh") {
                targetSongs = s.durgeshSongs.length > 0 ? s.durgeshSongs : [];
            } else if (type === "ishq") {
                targetSongs = s.ishqSongs.length > 0 ? s.ishqSongs : ISHQ_FALLBACK_SONGS;
            } else {
                targetSongs = s.bihariSongs.length > 0 ? s.bihariSongs : SONGS;
            }

            const shuffled = targetSongs.length > 0 ? shuffleArray(targetSongs) : s.allSongs;
            const newSong = shuffled[0] || null;
            const newQueue = shuffled.slice(1, 11);

            return {
                ...s,
                activePlaylist: type,
                allSongs: targetSongs.length > 0 ? targetSongs : s.allSongs,
                currentSong: newSong,
                queue: newQueue,
                isPlaying: true,
                progress: 0,
                isMoodModalOpen: false,
                hasSelectedMood: true,
            };
        });
    }, []);

    const openMoodModal = useCallback(() => {
        setState((s) => ({ ...s, isMoodModalOpen: true }));
    }, []);

    const closeMoodModal = useCallback(() => {
        setState((s) => ({ ...s, isMoodModalOpen: false, hasSelectedMood: true }));
    }, []);

    const togglePlay = useCallback(() => {
        setState((s) => ({ ...s, isPlaying: !s.isPlaying }));
    }, []);

    // Play a specific song
    const playSong = useCallback((song: Song) => {
        recordRecentlyPlayed(song);
        setState((s) => ({
            ...s,
            currentSong: song,
            isPlaying: true,
            progress: 0,
        }));
    }, [recordRecentlyPlayed]);

    const nextSong = useCallback(() => {
        setState((s) => {
            if (s.queue.length === 0) {
                if (s.allSongs.length > 0) {
                    const next = s.allSongs[0];
                    return { ...s, currentSong: next, progress: 0, isPlaying: true };
                }
                return s;
            }
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

    const openPlaylistModal = useCallback(() => {
        setState((s) => ({ ...s, isPlaylistModalOpen: true }));
    }, []);

    const closePlaylistModal = useCallback(() => {
        setState((s) => ({ ...s, isPlaylistModalOpen: false }));
    }, []);

    const togglePlaylistModal = useCallback(() => {
        setState((s) => ({ ...s, isPlaylistModalOpen: !s.isPlaylistModalOpen }));
    }, []);

    const setCurrentSongDuration = useCallback((seconds: number) => {
        if (!seconds || isNaN(seconds) || seconds <= 0) return;
        const rounded = Math.round(seconds);
        const hrs = Math.floor(rounded / 3600);
        const mins = Math.floor((rounded % 3600) / 60);
        const secs = rounded % 60;
        const formatted = hrs > 0
            ? `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
            : `${mins}:${String(secs).padStart(2, "0")}`;

        setState((s) => {
            if (!s.currentSong) return s;
            if (s.currentSong.durationSeconds === rounded && s.currentSong.duration === formatted) {
                return s;
            }
            return {
                ...s,
                currentSong: {
                    ...s.currentSong,
                    durationSeconds: rounded,
                    duration: formatted,
                },
            };
        });
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
        setState((s) => {
            const isCurrentlyLiked = s.likedSongIds.includes(songId);
            const newLikedIds = isCurrentlyLiked
                ? s.likedSongIds.filter((id) => id !== songId)
                : [...s.likedSongIds, songId];

            try {
                localStorage.setItem("ishq_liked_songs", JSON.stringify(newLikedIds));
            } catch {
                // Ignore storage errors
            }

            return {
                ...s,
                likedSongIds: newLikedIds,
                currentSong: s.currentSong?.id === songId
                    ? {
                          ...s.currentSong,
                          isLiked: !isCurrentlyLiked,
                          likeCount: isCurrentlyLiked ? s.currentSong.likeCount - 1 : s.currentSong.likeCount + 1,
                      }
                    : s.currentSong,
                queue: s.queue.map((song) =>
                    song.id === songId
                        ? {
                              ...song,
                              isLiked: !isCurrentlyLiked,
                              likeCount: isCurrentlyLiked ? song.likeCount - 1 : song.likeCount + 1,
                          }
                        : song
                ),
            };
        });
    }, []);

    // Filter by Ishq FM Mood (e.g. In love, 2 AM, Heartbroken)
    const filterIshqMood = useCallback((moodId: string) => {
        setState((s) => {
            const sourceSongs = s.ishqSongs.length > 0 ? s.ishqSongs : ISHQ_FALLBACK_SONGS;
            const shuffled = shuffleArray(sourceSongs);
            const newSong = shuffled[0] || null;
            const newQueue = shuffled.slice(1, 15);

            return {
                ...s,
                activePlaylist: "ishq",
                activeIshqMood: moodId,
                activeIshqStation: null,
                allSongs: sourceSongs,
                currentSong: newSong,
                queue: newQueue,
                isPlaying: true,
                progress: 0,
            };
        });
    }, []);

    // Play an Ishq FM Station (e.g. Arijit Special, Late Night, 90s Love)
    const playIshqStation = useCallback((stationId: string) => {
        setState((s) => {
            const sourceSongs = s.ishqSongs.length > 0 ? s.ishqSongs : ISHQ_FALLBACK_SONGS;
            const shuffled = shuffleArray(sourceSongs);
            const newSong = shuffled[0] || null;
            const newQueue = shuffled.slice(1, 15);

            return {
                ...s,
                activePlaylist: "ishq",
                activeIshqStation: stationId,
                activeIshqMood: null,
                allSongs: sourceSongs,
                currentSong: newSong,
                queue: newQueue,
                isPlaying: true,
                progress: 0,
            };
        });
    }, []);

    // Add user song dedication
    const addDedication = useCallback((dedication: Omit<DedicationItem, "id" | "date">) => {
        setState((s) => {
            const newItem: DedicationItem = {
                ...dedication,
                id: `ded-${Date.now()}`,
                date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
            };
            const updated = [newItem, ...s.dedications];
            try {
                localStorage.setItem("ishq_dedications", JSON.stringify(updated));
            } catch {
                // Ignore storage errors
            }
            return { ...s, dedications: updated };
        });
    }, []);

    // Keyboard shortcut (Space)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                document.activeElement?.tagName === "INPUT" ||
                document.activeElement?.tagName === "TEXTAREA"
            ) {
                return;
            }

            if (e.code === "Space") {
                e.preventDefault();
                togglePlay();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [togglePlay]);

    const setIsBuffering = useCallback((b: boolean) => {
        setState((s) => ({ ...s, isBuffering: b }));
    }, []);

    return (
        <PlayerContext.Provider
            value={{
                ...state,
                setIsBuffering,
                setPlaylist,
                selectMood,
                playSong,
                togglePlay,
                nextSong,
                prevSong,
                setProgress,
                setVolume,
                toggleShuffle,
                cycleRepeat,
                toggleAutoMode,
                addToQueue,
                removeFromQueue,
                toggleLike,
                requestSeek,
                clearSeekRequest,
                setCurrentSongDuration,
                openPlaylistModal,
                closePlaylistModal,
                togglePlaylistModal,
                openMoodModal,
                closeMoodModal,
                playIshqStation,
                filterIshqMood,
                addDedication,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    const ctx = useContext(PlayerContext);
    if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
    return ctx;
}
