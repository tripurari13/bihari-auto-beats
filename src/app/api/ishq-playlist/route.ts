import { NextResponse } from "next/server";
import YouTube from "youtube-sr";
import { Song } from "@/lib/mockData";
import { ISHQ_FALLBACK_SONGS } from "@/lib/ishqData";

const ISHQ_PLAYLIST_ID = "PLbL-XXtNCamuOpGTAu2IzyMfdl4Yd3jcH";
const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${ISHQ_PLAYLIST_ID}`;

// In-memory cache: re-fetch at most once every 5 minutes
let cachedSongs: Song[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION_MS = 5 * 60 * 1000;

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
    if (!durationStr) return 210;
    const clean = durationStr.trim();
    const colonParts = clean.split(":").map(Number);
    if (colonParts.length === 3 && !colonParts.some(isNaN)) {
        return colonParts[0] * 3600 + colonParts[1] * 60 + colonParts[2];
    }
    if (colonParts.length === 2 && !colonParts.some(isNaN)) {
        return colonParts[0] * 60 + colonParts[1];
    }

    let totalSeconds = 0;
    const hourMatch = clean.match(/(\d+)\s*(?:h|hr|hour|hours)/i);
    const minMatch = clean.match(/(\d+)\s*(?:m|min|minute|minutes)/i);
    const secMatch = clean.match(/(\d+)\s*(?:s|sec|second|seconds)/i);

    if (hourMatch) totalSeconds += parseInt(hourMatch[1]) * 3600;
    if (minMatch) totalSeconds += parseInt(minMatch[1]) * 60;
    if (secMatch) totalSeconds += parseInt(secMatch[1]);

    return totalSeconds > 0 ? totalSeconds : 210;
}

function formatDuration(seconds: number): string {
    if (!seconds || isNaN(seconds) || seconds <= 0) return "3:30";
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
    if (!viewsStr) return Math.floor(Math.random() * 80000) + 15000;
    const match = viewsStr.match(/([\d.]+)\s*([KkMmBb])?/);
    if (!match) return Math.floor(Math.random() * 80000) + 15000;
    const num = parseFloat(match[1]);
    const multiplier = match[2]?.toUpperCase();
    if (multiplier === "B") return Math.round(num * 1000000000);
    if (multiplier === "M") return Math.round(num * 1000000);
    if (multiplier === "K") return Math.round(num * 1000);
    return Math.round(num);
}

function formatLockupSongs(items: LockupViewModel[]): Song[] {
    return items
        .map((item) => {
            const videoId =
                item.rendererContext?.commandContext?.onTap?.innertubeCommand
                    ?.watchEndpoint?.videoId;
            if (!videoId) return null;

            const meta = item.metadata?.lockupMetadataViewModel;
            const rawTitle = meta?.title?.content || "Unknown";
            const title = rawTitle.replace(/\s*\(Official.*?\)/i, "").replace(/\s*\[Official.*?\]/i, "").trim();

            const metadataRows =
                meta?.metadata?.contentMetadataViewModel?.metadataRows || [];
            const artist =
                metadataRows[0]?.metadataParts?.[0]?.text?.content?.replace(
                    / - Topic$/,
                    ""
                ) || "Ishq FM Artist";

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
                : Math.floor(Math.random() * 95000) + 25000;
            const likeCount = Math.floor(
                playCount * (Math.random() * 0.35 + 0.15)
            );

            const addedAgo = metadataRows[1]?.metadataParts?.[1]?.text?.content || "Dil Se";

            return {
                id: `ishq-${videoId}`,
                title,
                artist,
                thumbnail,
                youtubeVideoId: videoId,
                duration: formattedDuration,
                durationSeconds,
                category: "Ishq FM",
                playCount,
                likeCount,
                addedAgo,
                isLiked: false,
            };
        })
        .filter((s): s is Song => s !== null);
}

/**
 * Fetch ALL songs from YouTube playlist without capping at 100 songs.
 * Tries youtube-sr playlist fetching with full video resolution first,
 * then falls back to full HTML scraping if needed.
 */
async function fetchAllPlaylistSongs(): Promise<Song[]> {
    // Strategy 1: Use youtube-sr with full fetching
    try {
        const playlist = await YouTube.getPlaylist(PLAYLIST_URL, { fetchAll: true });
        if (playlist) {
            const fullPlaylist = await playlist.fetch(0); // fetch all videos
            if (fullPlaylist && fullPlaylist.videos && fullPlaylist.videos.length > 0) {
                const songs: Song[] = fullPlaylist.videos
                    .filter((v) => !!v.id)
                    .map((v) => {
                        const playCount = Math.floor(Math.random() * 95000) + 25000;
                        const likeCount = Math.floor(playCount * (Math.random() * 0.35 + 0.15));
                        const durationSeconds = v.duration ? Math.round(v.duration / 1000) : 210;
                        return {
                            id: `ishq-${v.id}`,
                            title: v.title ? v.title.replace(/\s*\(Official.*?\)/i, "").replace(/\s*\[Official.*?\]/i, "").trim() : "Romantic Song",
                            artist: v.channel?.name ? v.channel.name.replace(/ - Topic$/, "") : "Ishq FM",
                            thumbnail: v.thumbnail?.url || `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
                            youtubeVideoId: v.id!,
                            duration: v.durationFormatted || formatDuration(durationSeconds),
                            durationSeconds,
                            category: "Ishq FM",
                            playCount,
                            likeCount,
                            addedAgo: "Dil Se",
                            isLiked: false,
                        };
                    });

                if (songs.length > 0) {
                    return songs;
                }
            }
        }
    } catch {
        // Fall through to Strategy 2
    }

    // Strategy 2: HTML scraping fallback
    try {
        const res = await fetch(PLAYLIST_URL, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            },
            next: { revalidate: 0 },
        });
        const html = await res.text();

        const match = html.match(/var ytInitialData = ({[\s\S]*?});<\/script>/);
        if (match) {
            const data = JSON.parse(match[1]);
            const items =
                data.contents?.twoColumnBrowseResultsRenderer?.tabs?.[0]?.tabRenderer
                    ?.content?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer
                    ?.contents;

            if (items && items.length > 0) {
                const lockups = items
                    .map((item: { lockupViewModel?: LockupViewModel }) => item.lockupViewModel)
                    .filter(Boolean) as LockupViewModel[];

                const songs = formatLockupSongs(lockups);
                if (songs.length > 0) return songs;
            }
        }
    } catch {
        // Fall through to fallback
    }

    return [];
}

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const now = Date.now();
        if (cachedSongs && cachedSongs.length > 0 && now - cacheTimestamp < CACHE_DURATION_MS) {
            return NextResponse.json({ songs: cachedSongs, count: cachedSongs.length });
        }

        const songs = await fetchAllPlaylistSongs();

        if (songs.length > 0) {
            cachedSongs = songs;
            cacheTimestamp = now;
            return NextResponse.json({ songs, count: songs.length });
        }

        if (cachedSongs && cachedSongs.length > 0) {
            return NextResponse.json({ songs: cachedSongs, count: cachedSongs.length });
        }

        return NextResponse.json({ songs: ISHQ_FALLBACK_SONGS, count: ISHQ_FALLBACK_SONGS.length });
    } catch {
        if (cachedSongs && cachedSongs.length > 0) {
            return NextResponse.json({ songs: cachedSongs, count: cachedSongs.length });
        }
        return NextResponse.json({ songs: ISHQ_FALLBACK_SONGS, count: ISHQ_FALLBACK_SONGS.length });
    }
}
