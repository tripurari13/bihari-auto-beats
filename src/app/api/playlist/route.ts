import { NextResponse } from "next/server";
import YouTube from "youtube-sr";
import { SONGS } from "@/lib/mockData";

export async function GET() {
    try {
        const playlist = await YouTube.getPlaylist("https://www.youtube.com/playlist?list=PLHKpZNim3NpU");

        if (!playlist || !playlist.videos || playlist.videos.length === 0) {
            return NextResponse.json({ songs: SONGS });
        }

        const formattedSongs = playlist.videos.map((video) => {
            const playCount = Math.floor(Math.random() * 50000) + 5000;
            const likeCount = Math.floor(playCount * (Math.random() * 0.3 + 0.1));

            return {
                id: `yt-${video.id}`,
                title: video.title,
                artist: video.channel?.name || "YouTube",
                thumbnail: video.thumbnail?.url || "/bg.png",
                youtubeVideoId: video.id,
                duration: video.durationFormatted,
                durationSeconds: video.duration ? video.duration / 1000 : 180,
                category: "Bhojpuri Bangers",
                playCount,
                likeCount,
                addedAgo: "Just now",
                isLiked: false,
            };
        });

        return NextResponse.json({ songs: formattedSongs });
    } catch {
        return NextResponse.json({ songs: SONGS });
    }
}
