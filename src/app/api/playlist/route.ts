import { NextResponse } from "next/server";
import { SONGS } from "@/lib/mockData";

const PLAYLIST_ID = "PLbL-XXtNCamtgbjDnKOAP6o-boWFo33kB";
const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`;

// In-memory cache: re-fetch from YouTube at most once every 5 minutes
let cachedSongs: ReturnType<typeof formatSongs> | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

interface LockupViewModel {
    rendererContext?: {
        commandContext?: {
            onTap?: {
                innertubeCommand?: {
                    watchEndpoint?: { videoId?: string };
                };
            };
        };
    };
    metadata?: {
        lockupMetadataViewModel?: {
            title?: { content?: string };
            metadata?: {
                contentMetadataViewModel?: {
                    metadataRows?: Array<{
                        metadataParts?: Array<{ text?: { content?: string } }>;
                    }>;
                };
            };
        };
    };
    contentImage?: {
        thumbnailViewModel?: {
            image?: {
                sources?: Array<{ url?: string }>;
            };
        };
    };
}

function parseDurationToSeconds(durationStr: string): number {
    // Parses strings like "3m", "12m", "1h 2m", "45s", "3:24" etc.
    if (!durationStr) return 180;

    // Try "Xm" or "Xh Ym" format
    let totalSeconds = 0;
    const hourMatch = durationStr.match(/(\d+)\s*h/);
    const minMatch = durationStr.match(/(\d+)\s*m/);
    const secMatch = durationStr.match(/(\d+)\s*s/);

    if (hourMatch) totalSeconds += parseInt(hourMatch[1]) * 3600;
    if (minMatch) totalSeconds += parseInt(minMatch[1]) * 60;
    if (secMatch) totalSeconds += parseInt(secMatch[1]);

    if (totalSeconds > 0) return totalSeconds;

    // Try "M:SS" or "H:MM:SS" format
    const parts = durationStr.split(":").map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];

    return 180; // fallback
}

function formatSongs(items: LockupViewModel[]) {
    return items
        .map((item, index) => {
            const videoId =
                item.rendererContext?.commandContext?.onTap?.innertubeCommand
                    ?.watchEndpoint?.videoId;
            if (!videoId) return null;

            const meta = item.metadata?.lockupMetadataViewModel;
            const title = meta?.title?.content || "Unknown";

            const metadataRows =
                meta?.metadata?.contentMetadataViewModel?.metadataRows || [];
            const artist =
                metadataRows[0]?.metadataParts?.[0]?.text?.content?.replace(
                    / - Topic$/,
                    ""
                ) || "Unknown";
            const durationStr =
                metadataRows[1]?.metadataParts?.[0]?.text?.content || "";

            const thumbnail =
                item.contentImage?.thumbnailViewModel?.image?.sources?.[0]
                    ?.url ||
                `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

            const playCount = Math.floor(Math.random() * 50000) + 5000;
            const likeCount = Math.floor(
                playCount * (Math.random() * 0.3 + 0.1)
            );

            return {
                id: `yt-${videoId}`,
                title,
                artist,
                thumbnail,
                youtubeVideoId: videoId,
                duration: durationStr || "3:00",
                durationSeconds: parseDurationToSeconds(durationStr),
                category: "Bhojpuri Bangers",
                playCount,
                likeCount,
                addedAgo: metadataRows[1]?.metadataParts?.[1]?.text?.content || "Recently",
                isLiked: false,
            };
        })
        .filter(Boolean);
}

async function fetchPlaylistFromYouTube() {
    const res = await fetch(PLAYLIST_URL, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        next: { revalidate: 0 },
    });
    const html = await res.text();

    const match = html.match(/var ytInitialData = ({.*?});<\/script>/s);
    if (!match) throw new Error("Could not find ytInitialData");

    const data = JSON.parse(match[1]);

    const items =
        data.contents?.twoColumnBrowseResultsRenderer?.tabs?.[0]?.tabRenderer
            ?.content?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer
            ?.contents;

    if (!items || items.length === 0) throw new Error("No items in playlist");

    // Filter to only lockupViewModel items (skip continuation tokens etc.)
    const lockups = items
        .map((item: { lockupViewModel?: LockupViewModel }) => item.lockupViewModel)
        .filter(Boolean) as LockupViewModel[];

    return formatSongs(lockups);
}

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const now = Date.now();

        // Return cache if still fresh
        if (cachedSongs && now - cacheTimestamp < CACHE_DURATION_MS) {
            return NextResponse.json({ songs: cachedSongs });
        }

        const songs = await fetchPlaylistFromYouTube();

        if (songs.length > 0) {
            cachedSongs = songs;
            cacheTimestamp = now;
            return NextResponse.json({ songs });
        }

        // Empty result — fall back to mock data
        return NextResponse.json({ songs: SONGS });
    } catch {
        // If scraping fails, return cached data or mock data
        if (cachedSongs) {
            return NextResponse.json({ songs: cachedSongs });
        }
        return NextResponse.json({ songs: SONGS });
    }
}
