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
    const { currentSong, isPlaying, volume, setProgress, nextSong, seekRequest, clearSeekRequest } = usePlayer();
    const playerRef = useRef<any>(null);
    const [isReady, setIsReady] = useState(false);
    const progressInterval = useRef<NodeJS.Timeout | null>(null);

    // Load YouTube IFrame API
    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = () => {
                playerRef.current = new window.YT.Player("youtube-player", {
                    height: "0",
                    width: "0",
                    videoId: "",
                    playerVars: {
                        autoplay: 1,
                        controls: 0,
                        disablekb: 1,
                        fs: 0,
                        rel: 0,
                        modestbranding: 1,
                    },
                    events: {
                        onReady: () => setIsReady(true),
                        onStateChange: (event: any) => {
                            // 0 = ended
                            if (event.data === 0) {
                                nextSong();
                            }
                        },
                    },
                });
            };
        } else if (window.YT && window.YT.Player && !playerRef.current) {
            // API already loaded
            playerRef.current = new window.YT.Player("youtube-player", {
                height: "0",
                width: "0",
                videoId: "",
                events: {
                    onReady: () => setIsReady(true),
                    onStateChange: (event: any) => {
                        if (event.data === 0) nextSong();
                    },
                },
            });
        }

        return () => {
            if (progressInterval.current) clearInterval(progressInterval.current);
        };
    }, [nextSong]);

    // Handle song changes
    useEffect(() => {
        if (isReady && playerRef.current && currentSong) {
            playerRef.current.loadVideoById(currentSong.youtubeVideoId);
            if (!isPlaying) {
                playerRef.current.pauseVideo();
            }
        }
    }, [currentSong, isReady]);

    // Handle play/pause and browser autoplay blocks
    useEffect(() => {
        if (isReady && playerRef.current) {
            if (isPlaying) {
                playerRef.current.playVideo();

                // Start progress tracking
                if (progressInterval.current) clearInterval(progressInterval.current);
                progressInterval.current = setInterval(() => {
                    if (playerRef.current && playerRef.current.getCurrentTime) {
                        const time = playerRef.current.getCurrentTime();
                        const duration = playerRef.current.getDuration();
                        if (duration > 0) {
                            setProgress((time / duration) * 100);
                        }
                    }
                }, 1000);
            } else {
                playerRef.current.pauseVideo();
                if (progressInterval.current) clearInterval(progressInterval.current);
            }
        }
    }, [isPlaying, isReady, setProgress]);

    // Handle volume
    useEffect(() => {
        if (isReady && playerRef.current && playerRef.current.setVolume) {
            playerRef.current.setVolume(volume);
        }
    }, [volume, isReady]);

    // Handle seeking
    useEffect(() => {
        if (isReady && playerRef.current && seekRequest !== null) {
            const duration = playerRef.current.getDuration();
            if (duration > 0) {
                playerRef.current.seekTo((seekRequest / 100) * duration, true);
                clearSeekRequest();
            }
        }
    }, [seekRequest, isReady, clearSeekRequest]);

    return <div id="youtube-player" className="hidden" />;
}
