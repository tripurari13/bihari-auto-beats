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
            overlays?: Array<{
                thumbnailBottomOverlayViewModel?: {
                    badges?: Array<{
                        thumbnailBadgeViewModel?: {
                            text?: string;
                            rendererContext?: {
                                accessibilityContext?: {
                                    label?: string;
                                };
                            };
                        };
                    }>;
                };
                thumbnailOverlayTimeStatusRenderer?: {
                    text?: {
                        simpleText?: string;
                        runs?: Array<{ text?: string }>;
                    };
                };
            }>;
        };
    };
}

function parseDurationToSeconds(durationStr: string): number {
    if (!durationStr) return 180;
    const clean = durationStr.trim();

    // Check "M:SS" or "H:MM:SS" format
    const colonParts = clean.split(":").map(Number);
    if (colonParts.length === 3 && !colonParts.some(isNaN)) {
        return colonParts[0] * 3600 + colonParts[1] * 60 + colonParts[2];
    }
    if (colonParts.length === 2 && !colonParts.some(isNaN)) {
        return colonParts[0] * 60 + colonParts[1];
    }

    // Try "Xh Ym Zs" or "X minutes, Y seconds" format
    let totalSeconds = 0;
    const hourMatch = clean.match(/(\d+)\s*(?:h|hr|hour|hours)/i);
    const minMatch = clean.match(/(\d+)\s*(?:m|min|minute|minutes)/i);
    const secMatch = clean.match(/(\d+)\s*(?:s|sec|second|seconds)/i);

    if (hourMatch) totalSeconds += parseInt(hourMatch[1]) * 3600;
    if (minMatch) totalSeconds += parseInt(minMatch[1]) * 60;
    if (secMatch) totalSeconds += parseInt(secMatch[1]);

    return totalSeconds > 0 ? totalSeconds : 180;
}

function formatDuration(seconds: number): string {
    if (!seconds || isNaN(seconds) || seconds <= 0) return "3:00";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
        return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
    return `${mins}:${String(secs).padStart(2, "0")}`;
}

function extractDurationString(item: LockupViewModel): string {
    const overlays = item.contentImage?.thumbnailViewModel?.overlays || [];
    for (const ov of overlays) {
        const badges = ov.thumbnailBottomOverlayViewModel?.badges || [];
        for (const b of badges) {
            const badge = b.thumbnailBadgeViewModel;
            if (badge?.text && !badge.text.toLowerCase().includes("view")) {
                return badge.text;
            }
            if (badge?.rendererContext?.accessibilityContext?.label) {
                const label = badge.rendererContext.accessibilityContext.label;
                if (!label.toLowerCase().includes("view")) {
                    return label;
                }
            }
        }
        const timeStatus = ov.thumbnailOverlayTimeStatusRenderer;
        if (timeStatus?.text?.simpleText && !timeStatus.text.simpleText.toLowerCase().includes("view")) {
            return timeStatus.text.simpleText;
        }
        if (timeStatus?.text?.runs?.[0]?.text && !timeStatus.text.runs[0].text.toLowerCase().includes("view")) {
            return timeStatus.text.runs[0].text;
        }
    }
    return "";
}

function parseViews(viewsStr?: string): number {
    if (!viewsStr) return Math.floor(Math.random() * 50000) + 5000;
    const match = viewsStr.match(/([\d.]+)\s*([KkMmBb])?/);
    if (!match) return Math.floor(Math.random() * 50000) + 5000;
    const num = parseFloat(match[1]);
    const multiplier = match[2]?.toUpperCase();
    if (multiplier === "B") return Math.round(num * 1000000000);
    if (multiplier === "M") return Math.round(num * 1000000);
    if (multiplier === "K") return Math.round(num * 1000);
    return Math.round(num);
}

function formatSongs(items: LockupViewModel[]) {
    return items
        .map((item) => {
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

            const durationStr = extractDurationString(item);
            const durationSeconds = parseDurationToSeconds(durationStr);
            const formattedDuration = formatDuration(durationSeconds);

            const thumbnail =
                item.contentImage?.thumbnailViewModel?.image?.sources?.[0]
                    ?.url ||
                `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

            const viewsStr = metadataRows[1]?.metadataParts?.[0]?.text?.content;
            const playCount = viewsStr && viewsStr.toLowerCase().includes("view")
                ? parseViews(viewsStr)
                : Math.floor(Math.random() * 50000) + 5000;
            const likeCount = Math.floor(
                playCount * (Math.random() * 0.3 + 0.1)
            );

            const addedAgo = metadataRows[1]?.metadataParts?.[1]?.text?.content || "Recently";

            return {
                id: `yt-${videoId}`,
                title,
                artist,
                thumbnail,
                youtubeVideoId: videoId,
                duration: formattedDuration,
                durationSeconds,
                category: "Bhojpuri Bangers",
                playCount,
                likeCount,
                addedAgo,
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

    const match = html.match(/var ytInitialData = ({[\s\S]*?});<\/script>/);
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
