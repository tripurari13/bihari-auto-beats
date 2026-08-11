const fs = require('fs');

const playlistData = JSON.parse(fs.readFileSync('playlist-data.json', 'utf8'));

let mockDataContent = fs.readFileSync('src/lib/mockData.ts', 'utf8');

// Find the start and end of the SONGS array
const songsStart = mockDataContent.indexOf('export const SONGS: Song[] = [');
const songsEnd = mockDataContent.indexOf('];', songsStart) + 2;

const newSongsArray = `export const SONGS: Song[] = ${JSON.stringify(playlistData, null, 2)};`;

mockDataContent = mockDataContent.substring(0, songsStart) + newSongsArray + mockDataContent.substring(songsEnd);

fs.writeFileSync('src/lib/mockData.ts', mockDataContent);
console.log('mockData.ts updated successfully.');
