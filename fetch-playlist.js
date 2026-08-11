const YouTube = require("youtube-sr").default;
const fs = require('fs');

async function fetchPlaylist() {
    try {
        const playlist = await YouTube.getPlaylist("https://www.youtube.com/playlist?list=PLHKpZNim3NpU");

        // Fetch all videos in the playlist
        const fullPlaylist = await playlist.fetch();

        const songs = fullPlaylist.videos.map((item, index) => {
            const playCount = Math.floor(Math.random() * 50000) + 5000;
            const likeCount = Math.floor(playCount * (Math.random() * 0.3 + 0.1));

            return {
                id: `s${index + 1}`,
                title: item.title,
                artist: item.channel.name,
                thumbnail: item.thumbnail.url,
                youtubeVideoId: item.id,
                duration: item.durationFormatted,
                durationSeconds: item.duration / 1000,
                category: "Bhojpuri",
                playCount,
                likeCount,
                addedAgo: `${Math.floor(Math.random() * 10) + 1} days ago`,
                isLiked: Math.random() > 0.7
            };
        });

        fs.writeFileSync('playlist-data.json', JSON.stringify(songs, null, 2), 'utf8');
        console.log('Playlist data written to playlist-data.json');
    } catch (err) {
        console.error(err);
    }
}

fetchPlaylist();
