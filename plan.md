# 🛺 Bihari Auto Beats — Complete Product Specification

Build a production-quality, mobile-first web music player called:

# **BIHARI AUTO BEATS**

### **Bihar ka apna auto music player.**

The concept is simple:

**Bihari/Bhojpuri/desi music that feels like the music playing inside an auto-rickshaw in Bihar.**

The experience should be inspired by the cultural simplicity and personality of **Horn OK Please**, but the design must be completely original.

Reference:
https://hornokplease.xyz/

Do NOT copy its branding, layout, assets, text, or visual design.

---

# 1. THE MOST IMPORTANT PRODUCT PRINCIPLE

**THE PLAYER IS THE PRODUCT.**

Do not turn this into a social network.

Do not create unnecessary pages or features.

The primary experience should be:

> **Open website → press play → music starts → enjoy.**

Everything else should support the music player.

The website should feel like a **digital radio/player made for Bihar's auto culture**.

---

# 2. BRAND

## Name

# 🛺 BIHARI AUTO BEATS

## Tagline

### **Bihar ka apna auto music player.**

Alternative small copy:

**“Gaana chala bhai.”**

The branding should immediately communicate:

**Bihari + Auto + Music**

Create a memorable logo using a combination of:

* Auto-rickshaw
* Speaker/audio waves
* Music note

The logo should work on:

* Website
* Mobile PWA icon
* Favicon
* Social media
* Loading screen

Use both English and occasional Devanagari:

**BIHARI AUTO BEATS**

**बिहारी ऑटो बीट्स**

---

# 3. OVERALL DESIGN DIRECTION

The website should feel:

* Bihari
* Desi
* Fun
* Street-inspired
* Nostalgic
* Young
* Minimal
* Modern
* Premium
* Authentic

Visual inspiration can come from:

* Indian auto-rickshaws
* Auto dashboards
* Old FM radios
* Cassette players
* Roadside signs
* Truck/auto stickers
* Indian typography
* Bihar street culture

But don't make it look like a cheap meme website.

The final UI should look polished enough to be a real public product.

Avoid:

* Generic SaaS design
* Excessive gradients
* Spotify clone UI
* Too many cards
* Excessive rounded rectangles
* Huge navigation menus
* Unnecessary animations
* Overcomplicated dashboards

---

# 4. HOMEPAGE

The homepage should primarily be the player.

No unnecessary marketing landing page.

At the top:

# 🛺 BIHARI AUTO BEATS

**Bihar ka apna auto music player.**

Below:

### ● 247 log abhi sun rahe hain

The listener count should be realtime.

Then the main player.

---

# 5. MAIN MUSIC PLAYER

The player is the centerpiece.

Display:

* Album artwork
* Song name
* Artist
* Playlist/category
* Play/pause
* Previous
* Next
* Progress bar
* Volume
* Shuffle
* Repeat
* Like
* Queue
* Share
* Add to playlist

Example:

**NOW PLAYING**

[Large album artwork]

### Song Name

Artist Name

`Bhojpuri • Bihari Auto Beats`

`━━━━━━━━━━●━━━━`

**◀** **▶ / ❚❚** **▶**

❤️ Like

＋ Add

↗ Share

The current artwork should have a very subtle animation while playing.

---

# 6. AUTO MODE

Add a special mode:

# 🛺 AUTO MODE

When enabled:

* Extremely simple interface
* Huge play/pause button
* Large next/previous buttons
* Minimal text
* High contrast
* Easy touch controls
* Reduced distractions

The purpose is to make the player feel like an **actual auto/radio player interface**.

However, include a clear safety message:

> **Gaadi chala rahe ho? Phone mat chalao. Gaana Bihari Auto Beats pe chhod do.**

Do not encourage users to interact with the device while driving.

---

# 7. BACKGROUND PLAYBACK / SCREEN LOCK

This is one of the MOST IMPORTANT requirements.

The player should be designed to support background playback as much as browsers and operating systems allow.

The user should ideally be able to:

1. Start music
2. Lock their phone
3. Open another application
4. Keep listening

Implement:

* HTML5 Audio where appropriate
* Media Session API
* Media Session metadata
* Media Session controls
* Play/pause action
* Previous track
* Next track
* Lock-screen controls where supported
* PWA
* Proper audio lifecycle management
* Background-friendly architecture

When supported, the lock screen should display:

**Bihari Auto Beats**

Song title

Artist

Artwork

Play / Pause / Previous / Next

### IMPORTANT

Do NOT fake or promise universal lock-screen playback.

Browsers and operating systems have different restrictions.

YouTube playback also has platform-specific limitations.

Use supported browser/API mechanisms and gracefully handle platforms where background playback is unavailable.

---

# 8. YOUTUBE / YOUTUBE MUSIC PLAYLIST SYSTEM

The initial music library will come from playlists that I curate from YouTube/YouTube Music.

The system should support importing/managing music metadata from authorized YouTube sources.

Store:

* YouTube video ID
* Song title
* Artist
* Thumbnail
* Playlist
* Duration
* Category
* Added date
* Added by
* Play count
* Likes

Use official YouTube APIs/embeds where appropriate.

### IMPORTANT LEGAL REQUIREMENT

Do NOT:

* Download YouTube audio
* Extract audio illegally
* Bypass YouTube restrictions
* Scrape copyrighted media
* Convert YouTube videos into downloadable MP3s

Use official APIs/embeds and permitted playback mechanisms.

Create a music-provider abstraction so the backend can support another music provider in the future.

---

# 9. PLAYLISTS

Create curated playlists.

Examples:

### 🔥 Bhojpuri Bangers

High-energy Bhojpuri songs.

### 🛺 Auto Mein Baja

The primary playlist.

### ❤️ Dilwa Tootal Ba

Romantic/sad songs.

### 🕺 Full Volume

High-energy songs.

### 🌙 Raat Ka Safar

Late-night songs.

### 🪔 Purana Sona

Old Bhojpuri/Bihari classics.

### 🛣️ Highway Beats

Road-trip music.

### 👑 Driver's Choice

Songs selected by the community.

Each playlist should have:

* Cover image
* Name
* Description
* Song count
* Play button
* Shuffle
* Share
* Queue

Keep playlist UI simple.

---

# 10. UP NEXT / QUEUE

Show:

## UP NEXT

1. Song
2. Song
3. Song
4. Song
5. Song

Users can:

* Reorder
* Remove
* Play immediately
* Add to queue

Queue should persist during the session.

---

# 11. LIVE LISTENER COUNT

Show:

### ● 247 लोग अभी सुन रहे हैं

This should be a REAL realtime count.

Do NOT hardcode fake numbers in production.

Use:

* Supabase Realtime
* WebSockets
* Firebase Realtime Database
* Or another reliable realtime presence system

Track anonymous listening sessions.

Each listener gets a temporary session ID.

Use heartbeat/presence logic.

If the user becomes inactive or closes the page, eventually remove the session.

Do not expose personal information.

---

# 12. LISTENER EXPERIENCE

The website should make the user feel that other people are listening at the same time.

Examples:

### ● 247 people listening now

### 🔥 82 people are listening to this playlist

### 🎵 37 people added this song to their favorites

Keep this subtle.

Do not turn it into a social feed.

---

# 13. COMMUNITY SONG CONTRIBUTION

This is the most important community feature.

Add a prominent button:

# 🎵 APNA GAANA JODO

Subtitle:

**“Jo gaana Bihari Auto Beats pe bajna chahiye, woh bhejo.”**

Clicking opens a simple modal.

Fields:

**YouTube URL**

**Song name** — optional

**Artist** — optional

**Your nickname** — optional

Then:

### SUBMIT SONG

After submission:

> **Gaana mil gaya bhai ❤️
> Approval ke baad Bihari Auto Beats pe bajega.**

The song enters an admin moderation queue.

---

# 14. COMMUNITY SONG MODERATION

Admin should be able to:

* View submissions
* Approve
* Reject
* Delete
* Edit metadata
* Assign playlist
* Feature song
* Remove unavailable songs

Do not automatically publish arbitrary submissions.

Only approved songs should enter the public playlist.

---

# 15. COMMUNITY CONTRIBUTION WITHOUT SOCIAL-NETWORK COMPLEXITY

Do NOT build:

* Followers
* Friends
* Direct messages
* Social profiles
* Public chat
* Social feed
* Complex badges
* Social notifications

The community should exist mainly through:

* Song submissions
* Likes
* Requests
* Playlist contributions

Keep it focused.

---

# 16. SONG LIKES

Every song can have:

❤️ Like

Store anonymous/user likes safely.

Show:

**❤️ 1,248**

Allow users to unlike.

Use rate limiting so users cannot spam likes.

---

# 17. SONG REQUESTS

Add a simple:

# 📻 REQUEST A SONG

User searches for a song or submits a supported YouTube link.

Example:

> “Bhai Pawan Singh ka ye wala gaana baja do.”

The request goes into a request queue.

Other listeners can upvote it.

Example:

**🔥 82 requests**

Admin can see the most requested songs.

---

# 18. MOST REQUESTED

Create a small section:

## 🔥 MOST REQUESTED

Show 5–10 songs.

Each item:

Song

Artist

`82 requests`

Button:

**▶ Play**

Keep this section compact.

---

# 19. MOST PLAYED

Create:

## 🔥 MOST PLAYED

Show the most played songs based on recent listening activity.

Don't rank only by lifetime plays.

Use a combination of:

* Recent plays
* Likes
* Requests

This keeps the playlist fresh.

---

# 20. RECENTLY ADDED

Create:

## 🆕

### RECENTLY ADDED

Show songs recently approved by the admin/community.

Example:

🎵 Song Name
Artist
`Added 10 minutes ago`

---

# 21. SHARE SONG

Every song should have:

↗ Share

Use the Web Share API on mobile where supported.

Generate a URL:

`/song/:id`

Sharing text:

> **“Bhai ye gaana Bihari Auto Beats pe sun 😂”**

On desktop fallback to copy link.

---

# 22. SHARE PLAYLIST

Every playlist should have:

↗ Share

Example:

`/playlist/bhojpuri-bangers`

Generate Open Graph preview:

**BIHARI AUTO BEATS**

**Bhojpuri Bangers**

**Bihar ka apna auto music player.**

---

# 23. SEARCH

Add a simple search.

Search across:

* Songs
* Artists
* Playlists

Search should be fast.

Mobile search should be easy to access.

Do not create an unnecessarily complicated search page.

---

# 24. MINI PLAYER

When the user navigates away from the main player, show a sticky mini-player.

Example:

[Artwork] Song Name

**▶**

**Bihari Auto Beats**

On mobile it should sit above the bottom navigation if bottom navigation is used.

---

# 25. MOBILE NAVIGATION

Keep navigation extremely small.

Recommended:

### 🏠 Home

### 📻 Radio

### 🎵 Playlists

### 🔍 Search

### ➕ Add Song

Do not create 10 navigation items.

---

# 26. DESKTOP NAVIGATION

Desktop:

Logo:

**🛺 Bihari Auto Beats**

Links:

Home

Radio

Playlists

Search

Add Song

Right side:

**● 247 Listening**

Keep the navigation clean.

---

# 27. DARK MODE

Include dark mode.

Dark mode should be excellent for:

* Night listening
* Low-light environments
* Mobile use

Use smooth theme switching.

Remember user preference.

---

# 28. PWA

Make the website installable as a Progressive Web App.

Include:

* Web manifest
* App icon
* Splash screen
* Install support
* Cached application shell
* Media Session support
* Mobile-friendly viewport

The PWA should feel like a lightweight music app.

---

# 29. OFFLINE HANDLING

Do not promise offline music downloads.

Instead, provide graceful handling:

If connection is lost:

> **“Network thoda signal se bahar hai 📡”**

When connection returns:

> **“Signal wapas aa gaya. Baja dein?”**

Cache UI resources where useful.

Do NOT cache/download copyrighted music unless legally permitted.

---

# 30. REALTIME RADIO STATE

Create a central radio state.

Admin should be able to control:

* Current playlist
* Current featured song
* Featured playlist
* Next songs
* Whether radio is active

The frontend should receive changes in realtime.

---

# 31. ADMIN PANEL

Keep admin panel simple.

### SONGS

* Add
* Edit
* Delete
* Feature
* Hide

### SUBMISSIONS

* Pending
* Approved
* Rejected

### PLAYLISTS

* Create
* Edit
* Delete
* Reorder

### REQUESTS

* View
* Approve
* Remove

### ANALYTICS

Show:

* Current listeners
* Total listeners today
* Most played
* Most liked
* Most requested
* Recently added

Nothing unnecessary.

---

# 32. ANALYTICS

Track anonymous product analytics:

* Plays
* Song starts
* Song completions where technically available
* Playlist plays
* Likes
* Requests
* Song submissions
* Active listeners

Use this to understand which songs are popular.

Do not collect unnecessary personal information.

---

# 33. PRIVACY

Users should be able to listen anonymously.

Do NOT require login for basic listening.

Only ask for login/account when necessary for:

* Saving likes
* Submitting songs
* Requests
* Personal preferences

Do not expose:

* Email
* IP
* Precise location
* Private account information

For listener statistics, use anonymous/aggregated information.

---

# 34. OPTIONAL CITY SELECTION

Do NOT track precise GPS.

If we want location-based statistics later, let users voluntarily select a city.

Examples:

Patna

Gaya

Muzaffarpur

Bhagalpur

Darbhanga

Ara

Chapra

Hajipur

Delhi

Hyderabad

Mumbai

etc.

This can eventually show:

### 🌍 Bihari Auto Beats listeners

But this is optional and should remain secondary to the player.

---

# 35. FUN MICROCOPY

Use authentic Hinglish/Hindi copy.

Examples:

Loading:

**“Gaana aa raha hai bhai…”**

Play:

**“BAJAO”**

Paused:

**“Itni jaldi pause? 😭”**

No internet:

**“Network bhi thoda chai peene gaya hai ☕”**

Song unavailable:

**“Ye gaana abhi signal se bahar hai 📡”**

Submission:

**“Gaana mil gaya bhai ❤️”**

No songs:

**“Playlist khaali hai. Ek gaana daal do.”**

Keep these limited.

Don't turn every UI element into a joke.

---

# 36. AUTO-RICKSHAW VISUAL DETAILS

Use subtle design details such as:

* Auto meter-inspired progress bar
* Audio wave shaped like road lines
* Tiny auto icon while music is playing
* Road-sign style section labels
* Sticker-style badges
* Cassette/radio-inspired player details

Do not make the entire UI look like an auto dashboard.

The player should remain modern.

---

# 37. RESPONSIVE DESIGN

Mobile is the priority.

Optimize for:

* Android
* Chrome mobile
* Smaller screens
* Slower networks
* Low-end devices

Desktop should still look polished.

Do NOT simply shrink the desktop layout.

Design mobile and desktop intentionally.

---

# 38. ACCESSIBILITY

Implement:

* Proper button labels
* Keyboard navigation
* Focus states
* Accessible contrast
* Screen reader labels
* Large touch targets
* Reduced motion preference

---

# 39. PERFORMANCE

The site must load quickly.

Optimize:

* Images
* JavaScript
* Fonts
* API requests
* Realtime connections
* Database queries

Use:

* Lazy loading
* Image optimization
* Caching
* Pagination where necessary
* Debounced search

The main player should become usable as quickly as possible.

---

# 40. ERROR HANDLING

Create polished states for:

### Playback error

**“Gaana nahi baj paaya. Agla wala try karein?”**

### Network error

**“Network thoda slow hai bhai.”**

### YouTube unavailable

**“Ye gaana abhi available nahi hai.”**

### Empty playlist

**“Playlist mein abhi koi gaana nahi hai.”**

Provide a useful action wherever possible.

---

# 41. SECURITY

Production-quality security.

Implement:

* Server-side validation
* Input sanitization
* Rate limiting
* Secure authentication
* Authorization
* Admin role protection
* Environment variables for secrets
* No API keys exposed unnecessarily
* Protection against spam submissions
* Protection against malicious URLs
* XSS protection
* Proper database permissions

---

# 42. DATABASE

Use a simple scalable schema.

Suggested tables:

### songs

id

title

artist

thumbnail

youtube_video_id

duration

status

created_at

play_count

like_count

### playlists

id

name

description

cover

status

created_at

### playlist_songs

playlist_id

song_id

position

### community_submissions

id

youtube_url

title

artist

submitted_by

status

created_at

### likes

id

song_id

user/session_id

created_at

### requests

id

song_id

requested_by

votes

status

created_at

### listening_sessions

id

session_id

current_song

last_seen

created_at

### plays

id

song_id

session_id

created_at

### radio_state

current_song

current_playlist

updated_at

---

# 43. TECHNOLOGY

Preferred stack:

### Frontend

Next.js

React

TypeScript

Tailwind CSS

### Backend

Supabase

PostgreSQL

Supabase Realtime

Supabase Auth where necessary

### Deployment

Use a modern production-ready deployment platform.

Structure the code so the music provider can be replaced later.

---

# 44. MUSIC PROVIDER ABSTRACTION

Do not tightly couple the entire application to YouTube.

Create a provider interface such as:

MusicProvider

with methods conceptually like:

* getSong()
* searchSong()
* play()
* pause()
* next()
* getMetadata()
* getPlaylist()

Then YouTube can be the initial provider.

This will make future integrations easier.

---

# 45. HOMEPAGE FINAL LAYOUT

The final homepage should look approximately like this conceptually:

```text
              🛺 BIHARI AUTO BEATS

             Bihar ka apna auto
                music player.

          ● 247 log abhi sun rahe hain


               [ ALBUM ART ]

               NOW PLAYING

             SONG NAME
              Artist Name

          ━━━━━━━●━━━━━━━━

             ◀    ▶    ▶▶

          ❤️     +     ↗


              UP NEXT

        🎵 Song 1
        🎵 Song 2
        🎵 Song 3


          🔥 MOST PLAYED

        🎵 Song
        🎵 Song
        🎵 Song


           🆕 RECENTLY ADDED

        🎵 Song
        🎵 Song


          🎵 APNA GAANA JODO
```

Keep the player visually dominant.

---

# 46. WHAT NOT TO BUILD

Do NOT build these unless explicitly requested later:

* Social media feed
* Followers
* Friends
* DMs
* Public chatroom
* Complex profiles
* Leaderboards
* Badges
* NFT/crypto features
* Payment system
* Subscription system
* Music downloads
* Offline copyrighted music
* Complex recommendation engine
* Giant admin dashboard
* Excessive animations
* Multiple unnecessary pages

The product should stay focused.

---

# 47. PRODUCT LOOP

The entire product loop should be:

### DISCOVER

User opens Bihari Auto Beats.

↓

### PLAY

Presses **BAJAO**

↓

### LISTEN

Music plays.

↓

### DISCOVER MORE

Sees Up Next / Most Played.

↓

### CONTRIBUTE

Finds a song that isn't there.

↓

### APNA GAANA JODO

Submits it.

↓

### MODERATION

Admin approves it.

↓

### COMMUNITY

Everyone can listen to it.

That is the entire product loop.

---

# 48. FIRST SCREEN PRIORITY

Within the first 3 seconds, the user must understand:

### WHAT IS THIS?

**Bihari Auto Beats**

### WHAT CAN I DO?

**Listen to music.**

### WHAT IS PLAYING?

**Current song.**

### HOW MANY ARE LISTENING?

**Live listener count.**

### HOW DO I ADD A SONG?

**Apna Gaana Jodo.**

If these aren't immediately obvious, simplify the design.

---

# 49. FINAL EXPERIENCE

The final website should feel like:

**A futuristic version of the music player inside a Bihar auto-rickshaw.**

Not Spotify.

Not YouTube.

Not Instagram.

Not a SaaS dashboard.

Not a generic playlist website.

It should feel like its own thing.

The user should open it and think:

> **“Arre bhai, ye toh auto ka apna music player hai 😂”**

Then press:

# ▶ BAJAO

and start listening.

---

# 50. DEVELOPMENT APPROACH

Build this in stages.

## Stage 1 — UI/UX

Create:

* Design system
* Logo
* Homepage
* Player
* Playlist UI
* Mobile layout
* Desktop layout
* Dark mode

First make the interface excellent.

## Stage 2 — Music

Implement:

* Song database
* Playlists
* Queue
* YouTube integration
* Player controls
* Media Session

## Stage 3 — Community

Implement:

* Add Song
* Submission moderation
* Likes
* Requests

## Stage 4 — Realtime

Implement:

* Live listener count
* Realtime radio state
* Realtime request updates

## Stage 5 — PWA + Polish

Implement:

* Installable PWA
* Background playback support
* Lock-screen controls where supported
* Performance
* Accessibility
* Security
* SEO
* Error states

---

# FINAL BRANDING

## 🛺 BIHARI AUTO BEATS

### Bihar ka apna auto music player.

Primary button:

# ▶ BAJAO

Secondary:

# 🎵 APNA GAANA JODO

Live indicator:

# ● 247 LOG ABHI SUN RAHE HAIN

The product should remain **simple, fast, fun and music-first**.
