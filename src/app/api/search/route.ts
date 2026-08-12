import { NextResponse } from "next/server";
import YouTube from "youtube-sr";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
        return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    try {
        // Search YouTube for videos
        const videos = await YouTube.search(query, { limit: 10, type: "video" });

        // Format the results to match our Song interface
        const formattedResults = videos.map((video, index) => {
            const playCount = Math.floor(Math.random() * 50000) + 5000;
            const likeCount = Math.floor(playCount * (Math.random() * 0.3 + 0.1));

            const durationSec = Math.round((video.duration || 0) / 1000) || 180;
            const hrs = Math.floor(durationSec / 3600);
            const mins = Math.floor((durationSec % 3600) / 60);
            const secs = durationSec % 60;
            const fallbackDuration = hrs > 0
                ? `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
                : `${mins}:${String(secs).padStart(2, "0")}`;

            return {
                id: `yt-${video.id}`,
                title: video.title,
                artist: video.channel?.name || "YouTube",
                thumbnail: video.thumbnail?.url || "/bg.png",
                youtubeVideoId: video.id,
                duration: video.durationFormatted || fallbackDuration,
                durationSeconds: durationSec,
                category: "YouTube Search",
                playCount,
                likeCount,
                addedAgo: "Just now",
                isLiked: false,
            };
        });

        return NextResponse.json({ results: formattedResults });
    } catch (error) {
        console.error("YouTube search error:", error);
        return NextResponse.json({ error: "Failed to search YouTube" }, { status: 500 });
    }
}
