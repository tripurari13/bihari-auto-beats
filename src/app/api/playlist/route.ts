import { NextResponse } from "next/server";
import YouTube from "youtube-sr";

export async function GET() {
    try {
        // Fetch the user's specific playlist
        const playlist = await YouTube.getPlaylist("https://www.youtube.com/playlist?list=PLHKpZNim3NpU");

        if (!playlist || !playlist.videos) {
            return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
        }

        // Format the videos to match our Song interface
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
                durationSeconds: video.duration / 1000,
                category: "Bhojpuri Bangers",
                playCount,
                likeCount,
                addedAgo: "Just now",
                isLiked: false,
            };
        });

        return NextResponse.json({ songs: formattedSongs });
    } catch (error) {
        console.error("Failed to fetch playlist:", error);
        return NextResponse.json({ error: "Failed to fetch playlist" }, { status: 500 });
    }
}
