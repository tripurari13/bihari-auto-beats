"use client";
import { useEffect, useRef, useState } from "react";
import { usePlayer } from "./PlayerContext";

// Add YouTube types to window
declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

export default function YouTubePlayer() {
    const {
        currentSong,
        isPlaying,
        volume,
        setProgress,
        nextSong,
        seekRequest,
        clearSeekRequest,
        setCurrentSongDuration,
        setIsBuffering,
    } = usePlayer();

    const playerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const lastVideoIdRef = useRef<string | null>(null);
    const [isReady, setIsReady] = useState(false);
    const progressInterval = useRef<NodeJS.Timeout | null>(null);
    const errorSkipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Initialize YouTube IFrame API safely with visible dimensions in off-screen container to satisfy YouTube embed policies
    useEffect(() => {
        let isMounted = true;

        const initPlayer = () => {
            if (!containerRef.current || playerRef.current) return;

            // Create a dedicated child element for YT to replace
            const playerDiv = document.createElement("div");
            playerDiv.id = "yt-player-instance-" + Math.random().toString(36).substring(2, 9);
            containerRef.current.innerHTML = "";
            containerRef.current.appendChild(playerDiv);

            const origin = typeof window !== "undefined" ? window.location.origin : undefined;

            playerRef.current = new window.YT.Player(playerDiv.id, {
                height: "200",
                width: "200",
                videoId: currentSong?.youtubeVideoId || "",
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    rel: 0,
                    modestbranding: 1,
                    playsinline: 1,
                    enablejsapi: 1,
                    ...(origin ? { origin } : {}),
                },
                events: {
                    onReady: () => {
                        if (isMounted) {
                            setIsReady(true);
                            if (currentSong?.youtubeVideoId) {
                                lastVideoIdRef.current = currentSong.youtubeVideoId;
                            }
                        }
                    },
                    onStateChange: (event: any) => {
                        // 1 = PLAYING
                        if (event.data === 1) {
                            setIsBuffering(false);
                            if (errorSkipTimeoutRef.current) {
                                clearTimeout(errorSkipTimeoutRef.current);
                                errorSkipTimeoutRef.current = null;
                            }
                            const d = event.target?.getDuration?.();
                            if (d && d > 0) {
                                setCurrentSongDuration(d);
                            }
                        }
                        // 3 = BUFFERING or -1 = UNSTARTED
                        else if (event.data === 3 || event.data === -1) {
                            setIsBuffering(true);
                        }
                        // 2 = PAUSED
                        else if (event.data === 2) {
                            setIsBuffering(false);
                        }
                        // 0 = ENDED
                        else if (event.data === 0) {
                            setIsBuffering(false);
                            nextSong();
                        }
                    },
                    onError: (event: any) => {
                        // 150 / 101: video embedding restricted by owner
                        // 100: not found or removed
                        console.warn("YouTube player embed restricted (Error Code:", event.data, ")");
                        setIsBuffering(false);

                        // Clear any pending timeout and smoothly move to next track
                        if (errorSkipTimeoutRef.current) clearTimeout(errorSkipTimeoutRef.current);
                        errorSkipTimeoutRef.current = setTimeout(() => {
                            nextSong();
                        }, 1200);
                    },
                },
            });
        };

        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = () => {
                if (isMounted) initPlayer();
            };
        } else if (window.YT && window.YT.Player) {
            initPlayer();
        }

        return () => {
            isMounted = false;
            if (errorSkipTimeoutRef.current) clearTimeout(errorSkipTimeoutRef.current);
            if (progressInterval.current) clearInterval(progressInterval.current);
            if (playerRef.current && typeof playerRef.current.destroy === "function") {
                try {
                    playerRef.current.destroy();
                } catch {
                    // Ignore destroy errors on unmount
                }
                playerRef.current = null;
            }
        };
    }, [nextSong, setCurrentSongDuration, setIsBuffering]);

    // Handle song changes ONLY when the videoId actually changes (prevent replay on like/props update)
    useEffect(() => {
        const videoId = currentSong?.youtubeVideoId;
        if (!videoId || !isReady || !playerRef.current) return;

        if (videoId !== lastVideoIdRef.current) {
            lastVideoIdRef.current = videoId;
            setIsBuffering(true);

            try {
                if (typeof playerRef.current.loadVideoById === "function") {
                    playerRef.current.loadVideoById(videoId);
                    if (!isPlaying && typeof playerRef.current.pauseVideo === "function") {
                        playerRef.current.pauseVideo();
                    }
                }
            } catch {
                // Ignore transient load errors
            }
        }
    }, [currentSong?.youtubeVideoId, isReady, isPlaying, setIsBuffering]);

    // Handle play/pause
    useEffect(() => {
        if (isReady && playerRef.current) {
            try {
                if (isPlaying) {
                    if (typeof playerRef.current.playVideo === "function") {
                        playerRef.current.playVideo();
                    }

                    // Start progress tracking
                    if (progressInterval.current) clearInterval(progressInterval.current);
                    progressInterval.current = setInterval(() => {
                        if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
                            const time = playerRef.current.getCurrentTime();
                            const duration = playerRef.current.getDuration?.();
                            if (duration && duration > 0) {
                                setProgress((time / duration) * 100);
                                setCurrentSongDuration(duration);
                            }
                        }
                    }, 1000);
                } else {
                    if (typeof playerRef.current.pauseVideo === "function") {
                        playerRef.current.pauseVideo();
                    }
                    if (progressInterval.current) clearInterval(progressInterval.current);
                }
            } catch {
                // Ignore player control errors
            }
        }
    }, [isPlaying, isReady, setProgress, setCurrentSongDuration]);

    // Handle volume
    useEffect(() => {
        if (isReady && playerRef.current && typeof playerRef.current.setVolume === "function") {
            try {
                playerRef.current.setVolume(volume);
            } catch {
                // Ignore volume errors
            }
        }
    }, [volume, isReady]);

    // Handle seeking
    useEffect(() => {
        if (isReady && playerRef.current && seekRequest !== null && typeof playerRef.current.getDuration === "function") {
            try {
                const duration = playerRef.current.getDuration();
                if (duration > 0 && typeof playerRef.current.seekTo === "function") {
                    playerRef.current.seekTo((seekRequest / 100) * duration, true);
                    clearSeekRequest();
                }
            } catch {
                // Ignore seek errors
            }
        }
    }, [seekRequest, isReady, clearSeekRequest]);

    // Off-screen position with standard dimension rendering to pass YouTube embed viewability requirements
    return (
        <div
            ref={containerRef}
            className="fixed -left-[9999px] -top-[9999px] w-[200px] h-[200px] pointer-events-none opacity-0 overflow-hidden"
            aria-hidden="true"
            suppressHydrationWarning
        />
    );
}
