# Bihari Auto Beats --- Ishq FM Integration Blueprint

## 1. Product Direction

**Do not build Ishq FM as a completely separate website.**

Make **Bihari Auto Beats** the parent music universe and make **Ishq
FM** one of the experiences inside it.

The current Bihari Auto Beats website already uses a **"मूड चुनिए • SELECT
YOUR VIBE"** concept with Bihari Auto Beats and Durgesh Nai Special.
Ishq FM should become the third experience in this system.

Current structure: - 🛺 Bihari Auto Beats - 💈 Durgesh Nai Special

New structure: - 🛺 Bihari Auto Beats --- Desi • Bhojpuri • Highway - 💈
Durgesh Nai Special --- 90s • Salon • Nostalgia - ❤️ Ishq FM --- Love •
Bollywood • Late Night

The parent brand remains **Bihari Auto Beats**.

------------------------------------------------------------------------

# 2. Brand Architecture

## Bihari Auto Beats

### Parent brand

**Bihari Swag on Wheels**

The overall website should become a collection of music experiences.

### Music worlds

#### 🛺 Bihari Auto Beats

**Desi • Bhojpuri • Highway**

#### 💈 Durgesh Nai Special

**90s • Salon • Nostalgia**

#### ❤️ Ishq FM

**Love • Romance • Bollywood • Late Night**

Future experiences can be added later:

#### 🚛 Highway FM

**Long Drive • Punjabi • Bollywood**

#### 🌙 Raat FM

**Chill • Slow • Late Night**

#### 🔥 Bass

**Remixes • Bass • EDM**

------------------------------------------------------------------------

# 3. Ishq FM's Role

Ishq FM should feel like a completely different emotional world while
still belonging to Bihari Auto Beats.

### Product identity

**Ishq FM**

**Dil Se... Sirf Tumhare Liye**

Core feeling:

> Kuch gaane sune nahi jaate... mehsoos kiye jaate hain.

The experience should feel:

-   Romantic
-   Gen-Z
-   Cinematic
-   Premium
-   Emotional
-   Slightly nostalgic
-   Late-night
-   Indian

Avoid making it look like a Valentine's Day website.

------------------------------------------------------------------------

# 4. Existing Homepage Integration

Keep the existing:

## मूड चुनिए • SELECT YOUR VIBE

Expand it to three cards.

### Card 1

## 🛺 बिहारी ऑटो बीट्स

**Bihari Swag on Wheels**

`Desi • Bhojpuri • Highway`

**▶ बजाओ**

Keep the current Bihari/desi visual identity.

------------------------------------------------------------------------

### Card 2

## 💈 दुर्गेश नाई स्पेशल

**90s Salon Nostalgia**

`90s • Salon • Nostalgia`

**▶ बजाओ**

Keep the nostalgic salon identity.

------------------------------------------------------------------------

### Card 3

## ❤️ ISHQ FM

**Dil Se... Sirf Tumhare Liye**

`Romance • Love • Late Night`

**▶ ENTER ISHQ FM**

Use the romantic city-night artwork as the background.

The Ishq FM card should visually stand apart from the other two.

------------------------------------------------------------------------

# 5. Ishq FM Card Design

The card should use:

-   Dark navy/purple background
-   Pink glow
-   Romantic city artwork
-   Soft gradient overlay
-   Elegant typography
-   Small heart/radio detail
-   Clear Play/Enter CTA

Do not use excessive hearts.

The card should immediately communicate:

> This is a different music experience.

------------------------------------------------------------------------

# 6. Ishq FM Entry Experience

When the user taps **ENTER ISHQ FM**, transition from the main Bihari
Auto Beats theme into Ishq FM.

### Transition

1.  Existing Bihari Auto Beats UI fades.
2.  Background transitions into the romantic city artwork.
3.  Colors transition from the main brand palette to deep purple/pink.
4.  Ishq FM logo fades in.
5.  Hero content appears.

### Hero

# ❤️ ISHQ FM

**Dil Se... Sirf Tumhare Liye**

> Kuch gaane sune nahi jaate...\
> mehsoos kiye jaate hain.

Primary CTA:

## ▶ START ISHQ FM

Supporting label:

`Romantic • Bollywood • Late Night`

------------------------------------------------------------------------

# 7. Ishq FM URL

Use:

`bihariautobeats.live/ishq-fm`

Do not create a separate domain initially.

Recommended architecture:

``` text
bihariautobeats.live/
│
├── /ishq-fm
├── /durgesh-nai
├── /auto-beats
├── /highway-fm
├── /raat-fm
└── /bass
```

This keeps Bihari Auto Beats as the parent platform.

------------------------------------------------------------------------

# 8. Ishq FM Homepage

Recommended order:

``` text
❤️ ISHQ FM
Dil Se… Sirf Tumhare Liye

▶ START ISHQ FM

↓

🎧 NOW PLAYING

↓

💕 AAJ DIL KA MOOD?

↓

📻 CHOOSE YOUR ISHQ

↓

🔥 ISHQ MEIN TRENDING

↓

🌙 2 AM ZONE

↓

💌 KISI KE LIYE?

↓

✨ SHAYAD YE TUMHARE LIYE HAI

↓

🎤 TUMHARA GAANA MISSING HAI?

↓

❤️ MY ISHQ

↓

🛺 BACK TO BIHARI AUTO BEATS
```

------------------------------------------------------------------------

# 9. Global Audio Engine

This is a critical architecture decision.

Do not create a separate player for every experience.

Use:

``` text
                 BIHARI AUTO BEATS
                        │
                GLOBAL AUDIO ENGINE
                        │
          ┌─────────────┼─────────────┐
          ↓             ↓             ↓
      Auto Beats      Ishq FM     Durgesh Nai
          │             │             │
      Bhojpuri       Romance          90s
```

The entire website should share:

-   One audio engine
-   One queue
-   One playback state
-   One global mini-player
-   One Media Session integration

------------------------------------------------------------------------

# 10. Persistent Playback

If a user starts:

**Ishq FM → Tum Hi Ho**

and then returns to the main homepage, playback should continue.

The bottom mini-player remains visible.

Example:

``` text
❤️ Tum Hi Ho
Arijit Singh

▶
```

If the user enters another experience, do not reset the entire player.

Only change music when the user explicitly selects a new station/song.

------------------------------------------------------------------------

# 11. Start Ishq FM

The main CTA:

## ▶ START ISHQ FM

should immediately start a curated Ishq FM playlist.

It should behave like an actual radio station:

-   Start with a curated song
-   Automatically play the next song
-   Continue the station
-   Maintain playback state
-   Show current song in the global player

Do not make users manually select every song.

------------------------------------------------------------------------

# 12. Now Playing

After playback starts:

## 🎧 NOW PLAYING

Display:

-   Large artwork
-   Song title
-   Artist
-   Progress bar
-   Current time
-   Duration
-   Previous
-   Play/Pause
-   Next
-   Shuffle
-   Repeat
-   Like
-   Share
-   Add to My Ishq
-   Queue

Example:

``` text
[ Large Artwork ]

Tum Hi Ho
Arijit Singh

━━━━━━━━●━━━━

◀     ▶     ▶

❤️ Like
↗ Share
+ My Ishq
```

------------------------------------------------------------------------

# 13. Mobile Player

Use a sticky mini-player at the bottom.

Example:

``` text
[Artwork] Tum Hi Ho
          Arijit Singh

      ❤️   ▶   ⋮
```

Tapping it opens a full-screen player.

Full-screen player:

-   Blurred artwork background
-   Large artwork
-   Song title
-   Artist
-   Progress
-   Controls
-   Queue
-   Like
-   Share
-   Lyrics when available

------------------------------------------------------------------------

# 14. Media Session

Use the Media Session API where supported.

Support:

-   Play/pause
-   Previous
-   Next
-   Headphone controls
-   Lock-screen controls where supported

The audio element should remain persistent.

Do not unnecessarily recreate it when navigating between routes.

------------------------------------------------------------------------

# 15. Aaj Dil Ka Mood?

This should be one of Ishq FM's signature features.

## 💕 AAJ DIL KA MOOD?

Create mood cards:

### 😍 In Love

**Dil full hai ❤️**

### 🥹 Missing Someone

**Yaad aa rahi hai?**

### 💔 Heartbroken

**Thoda dard bhi zaroori hai.**

### 🌙 Late Night

**2 AM thoughts.**

### 🫶 Crush

**Naam nahi lenge.**

### 🌧️ Baarish Wala Ishq

**Rain + headphones.**

### 🥀 One-Sided Love

**Keh nahi paaye.**

### ✨ Happy Love

**Pyaar achha lag raha hai.**

Clicking a mood should immediately start the relevant playlist.

------------------------------------------------------------------------

# 16. Choose Your Ishq

Call these **stations**, not just playlists.

## 📻 CHOOSE YOUR ISHQ

### ❤️ Romantic Hits

The biggest romantic songs.

### 🎙️ Arijit Special

Arijit-focused romantic songs.

### 💔 Broken Hearts

Heartbreak and emotional songs.

### 🌙 Late Night Ishq

Slow songs for nighttime.

### 📻 90s Love

90s Bollywood romance.

### 🌧️ Baarish Wala Ishq

Romantic rainy-day songs.

### 🫶 Crush FM

Cute, youthful romantic songs.

### 🥀 One-Sided Love

Unspoken feelings.

Each station card should contain:

-   Artwork
-   Station name
-   Short description
-   Play
-   Shuffle
-   Number of songs where available

------------------------------------------------------------------------

# 17. Ishq Mein Trending

Create a live-feeling section:

## 🔥 ISHQ MEIN TRENDING

Use actual analytics data.

Example:

``` text
01 — Tum Hi Ho
     Arijit Singh

02 — Kesariya
     Arijit Singh

03 — Tera Ban Jaunga
     Akhil Sachdeva

04 — Agar Tum Saath Ho
     Alka Yagnik, Arijit Singh
```

If play counts are shown, they must come from real data.

------------------------------------------------------------------------

# 18. Recently Played

## 🕘 PHIR SE SUNOGE?

Store recently played songs locally.

Show:

-   Last played
-   Last 6--10 songs
-   Play button
-   Remove option

Empty state:

> Your next favourite song is waiting. ❤️

CTA:

**Start Listening**

------------------------------------------------------------------------

# 19. My Ishq

## ❤️ MY ISHQ

Include:

-   ❤️ Liked Songs
-   🕘 Recently Played
-   📻 Saved Stations
-   💌 My Dedications

For V1, use browser `localStorage`.

Do not force login.

Future accounts can provide:

-   Cloud favourites
-   Cross-device history
-   Personal playlists
-   Recommendations

------------------------------------------------------------------------

# 20. 2 AM Zone

Make this a special visual section.

## 🌙 2 AM ZONE

Main copy:

> Everyone's asleep.\
> Your playlist isn't.

Show:

-   Late Night Ishq
-   Missing You
-   Broken Hearts
-   Unspoken Feelings

Visual style:

-   Near-black purple background
-   Stars
-   Moon
-   Pink/purple glow
-   Slow atmospheric animation

This should be one of the most visually memorable sections.

------------------------------------------------------------------------

# 21. Ishq FM Says

Give the station a personality.

## 🎙️ ISHQ FM SAYS...

Occasionally show short messages:

> Aaj kisi ki yaad aa rahi hai kya? ❤️

> Ye gaana unke naam... jinko kabhi keh nahi paaye.

> Naam nahi lenge... gaana samajh jayega.

> Kuch log gaane ban jaate hain.

Keep these occasional and short.

Do not interrupt playback too frequently.

------------------------------------------------------------------------

# 22. Song of the Moment

## ❤️ SONG OF THE MOMENT

Feature one song prominently.

Example:

**Aaj Ka Gaana**

### Tum Hi Ho

*Arijit Singh*

**▶ LISTEN NOW**

Initially select manually.

Later automate using:

-   Plays
-   Likes
-   Trending
-   Time of day

------------------------------------------------------------------------

# 23. Kisi Ke Liye?

This should be one of the most shareable features.

## 💌 KISI KE LIYE?

> Naam mat batao... bas gaana batao. ❤️

Button:

## ❤️ DEDICATE A SONG

Fields:

**Song**

**For:** Someone special

**Message:** I still remember...

Button:

## CREATE SHARE CARD

Generated card should contain:

-   Ishq FM logo
-   Song artwork
-   Song name
-   Artist
-   Dedication message
-   Bihari Auto Beats branding
-   Website link

Then provide:

**Share on WhatsApp**

------------------------------------------------------------------------

# 24. Song Sharing

Every song should have:

## ↗ SHARE

Options:

-   WhatsApp
-   Copy Link
-   Native Share API where supported

Example message:

> ❤️ Currently listening to *Tum Hi Ho* on Ishq FM.
>
> Kuch gaane sune nahi jaate... mehsoos kiye jaate hain.
>
> 🎧 Listen on Ishq FM.

------------------------------------------------------------------------

# 25. Song URLs

Create shareable URLs:

``` text
bihariautobeats.live/ishq-fm/song/tum-hi-ho
```

The page should display:

-   Artwork
-   Song
-   Artist
-   Play
-   Like
-   Share
-   Ishq FM branding

Do not rely on automatic audio playback because browser autoplay
restrictions may block it.

------------------------------------------------------------------------

# 26. Search

Search should cover:

-   Songs
-   Artists
-   Stations
-   Moods

Results:

-   Artwork
-   Song
-   Artist
-   Play
-   Like
-   Add to queue

Mobile search should open as a full-screen search experience.

Empty result:

> Hmm... ye gaana Ishq FM ko nahi mila.\
> Try another song or request it. ❤️

------------------------------------------------------------------------

# 27. Queue

Create:

## UP NEXT

Users can:

-   Reorder
-   Remove
-   Play next
-   Clear queue

When a song ends:

1.  Play next queued song.
2.  If queue is empty, continue the active station.

------------------------------------------------------------------------

# 28. Dynamic Player Atmosphere

When a song plays:

-   Use its artwork as a blurred background.
-   Extract dominant artwork colors if feasible.
-   Add subtle glow.
-   Use a small waveform/equalizer.

Avoid excessive animations.

The player should feel cinematic.

------------------------------------------------------------------------

# 29. Music Visualizer

Show a subtle animated equalizer:

``` text
▂ ▅ ▇ ▆ ▃ ▅ ▇ ▅ ▂
```

When music plays:

**animate**

When paused:

**stop animation**

Keep it subtle.

------------------------------------------------------------------------

# 30. Day / Night Mode

Make the Ishq FM experience change based on time.

### Day

**☀️ Ishq FM**

Show normal romantic recommendations.

### Night

**🌙 Ishq FM --- AFTER DARK**

Prioritize:

-   2 AM Zone
-   Late Night Ishq
-   Broken Hearts
-   Missing Someone

Use darker backgrounds and stronger purple/pink lighting.

------------------------------------------------------------------------

# 31. Visual Design

Do not use a generic Valentine's Day aesthetic.

Avoid:

-   Excessive red
-   Huge hearts everywhere
-   Bright pink backgrounds
-   Valentine-style decorations

Use:

### Background

`#080714`

### Cards

`#17152A`

### Pink

`#FF4F8B`

### Purple

`#8B5CF6`

### White

`#FFFFFF`

The visual feeling should be:

> **2 AM + city lights + headphones + memories**

Use the generated romantic city artwork as the main visual direction.

------------------------------------------------------------------------

# 32. Cinematic Song Cards

Avoid generic cards.

Structure:

``` text
[ Artwork ]

Song Name
Artist

❤️     ▶
```

Hover/tap behavior:

-   Slight artwork zoom
-   Subtle glow
-   Play button
-   Dark gradient overlay

Keep animations smooth.

------------------------------------------------------------------------

# 33. Ishq Quotes

Small quote cards between major sections.

Examples:

> Kuch gaane sune nahi jaate... mehsoos kiye jaate hain.

> Some memories have a soundtrack.

> Naam nahi lenge... gaana samajh jayega.

> Kuch log gaane ban jaate hain.

> Har kisi ki ek playlist hoti hai, jo kisi ek insaan ke naam hoti hai.

Keep quotes short.

------------------------------------------------------------------------

# 34. For You

After the user has listened to multiple songs:

## ✨ SHAYAD YE TUMHARE LIYE HAI

Recommend songs based on listening behaviour.

V1 can use simple rules:

``` text
Romantic → Romantic
Sad → Sad
90s → 90s
Arijit → Arijit
Late Night → Late Night
```

No AI is required initially.

------------------------------------------------------------------------

# 35. Request a Song

## 🎤 TUMHARA GAANA MISSING HAI?

Supporting text:

> Request it on Ishq FM.

Fields:

-   Song name
-   Artist
-   Optional dedication
-   Optional nickname

Button:

## REQUEST ❤️

Backend requirements:

-   Validate input
-   Sanitize text
-   Rate-limit requests
-   Spam protection

Later add:

## 🔥 MOST REQUESTED

based on actual request data.

------------------------------------------------------------------------

# 36. Bihari Auto Beats Homepage

The parent homepage should become:

``` text
🛺 बिहारी ऑटो बीट्स

Bihari Swag on Wheels

किस्मत तेरी दासी है,
घर में मथुरा काशी है।

↓

🎧 मूड चुनिए • SELECT YOUR VIBE

↓

🛺 Bihari Auto Beats
Desi • Bhojpuri • Highway

💈 Durgesh Nai Special
90s • Salon • Nostalgia

❤️ Ishq FM
Love • Romance • Late Night

↓

🔥 TRENDING ACROSS BIHARI AUTO BEATS

↓

🕘 RECENTLY PLAYED

↓

🎧 EXPLORE MORE EXPERIENCES

↓

Footer
```

Do not remove the existing Bihari Auto Beats identity.

Expand it.

------------------------------------------------------------------------

# 37. Navigation

Main navigation should remain simple.

Desktop:

``` text
Home | Experiences | Trending | My Ishq
```

Mobile bottom navigation:

``` text
🏠 Home
📻 Stations
🔍 Search
❤️ My Ishq
```

The global mini-player sits above the bottom navigation.

------------------------------------------------------------------------

# 38. Back to Parent Brand

Inside Ishq FM:

``` text
← Bihari Auto Beats
```

This should always be easy to find.

At the bottom:

> **Ishq FM ❤️**
>
> A part of Bihari Auto Beats 🛺

------------------------------------------------------------------------

# 39. Technical Architecture

Recommended structure:

``` text
BihariAutoBeats
│
├── Home
│
├── Experiences
│   ├── AutoBeats
│   ├── IshqFM
│   └── DurgeshNai
│
├── GlobalAudioPlayer
│   ├── AudioEngine
│   ├── MiniPlayer
│   ├── FullPlayer
│   ├── Queue
│   └── MediaSession
│
├── Search
├── Trending
├── MyIshq
├── Share
├── Dedication
└── SongRequest
```

The audio engine should live above route/page components.

------------------------------------------------------------------------

# 40. Suggested Ishq FM Components

``` text
IshqFM
├── IshqHeader
├── IshqHero
├── MoodSelector
├── StationGrid
├── TrendingSongs
├── SongOfTheMoment
├── TwoAMZone
├── IshqSays
├── RecommendedSongs
├── SongRequest
├── Dedication
├── MyIshq
└── IshqFooter
```

Global:

``` text
GlobalAudioPlayer
├── MiniPlayer
├── FullPlayer
├── PlayerControls
├── ProgressBar
├── Queue
├── Visualizer
└── MediaSession
```

------------------------------------------------------------------------

# 41. URL Architecture

Use the same domain.

``` text
/
```

Main Bihari Auto Beats.

``` text
/ishq-fm
```

Ishq FM.

``` text
/ishq-fm/song/:slug
```

Individual song.

``` text
/ishq-fm/station/:slug
```

Individual station.

``` text
/durgesh-nai
```

Durgesh Nai.

``` text
/auto-beats
```

Bihari Auto Beats experience.

This is better for maintaining one strong domain.

------------------------------------------------------------------------

# 42. SEO

Ishq FM page title:

**Ishq FM ❤️ \| Romantic Songs, Love Hits & Late Night Music**

Meta description:

> Ishq FM is the romantic music experience from Bihari Auto Beats
> featuring love songs, Bollywood romance, 90s classics, Arijit Singh
> hits and late-night vibes.

Add:

-   Canonical URL
-   Open Graph image
-   Social sharing metadata
-   Crawlable station pages
-   Crawlable song pages
-   Proper headings
-   Appropriate structured data

------------------------------------------------------------------------

# 43. Analytics

Track:

``` text
ishq_play
ishq_song_play
ishq_song_complete
ishq_skip
ishq_like
ishq_share
ishq_whatsapp_share
ishq_station_play
ishq_mood_select
ishq_request_song
ishq_dedicate_song
ishq_search
ishq_install
```

Use real data to determine:

-   Most played songs
-   Most skipped songs
-   Most popular station
-   Most selected mood
-   Most shared song
-   Most requested song

Do not collect unnecessary personal data.

------------------------------------------------------------------------

# 44. Performance

Prioritize:

1.  Fast first load
2.  Small JavaScript bundle
3.  Optimized artwork
4.  Lazy loading
5.  Minimal animation
6.  Persistent audio
7.  Mobile performance
8.  No unnecessary dependencies

Use WebP/AVIF where appropriate.

------------------------------------------------------------------------

# 45. Accessibility

Implement:

-   Keyboard navigation
-   Focus states
-   ARIA labels
-   Good contrast
-   Alt text
-   Accessible controls

Examples:

``` text
aria-label="Play song"
aria-label="Next song"
aria-label="Add to favourites"
aria-label="Share song"
```

------------------------------------------------------------------------

# 46. Security

For song requests and dedications:

-   Validate inputs
-   Sanitize user content
-   Rate-limit requests
-   Add spam protection
-   Prevent script injection
-   Never expose private API keys in frontend code

------------------------------------------------------------------------

# 47. Music Rights

Only stream music for which you have the appropriate rights, licensing,
or permission.

The music catalogue should be data-driven so tracks can be added or
removed without modifying the core application.

Do not hard-code unauthorized copyrighted music into the application.

------------------------------------------------------------------------

# 48. Development Phases

## V1 --- Core Experience

Build first:

-   Ishq FM card on existing homepage
-   Ishq FM route
-   Ishq FM hero
-   Romantic artwork
-   Start Ishq FM
-   Global audio engine
-   Mini-player
-   Full-screen player
-   Auto-next
-   Queue
-   Stations
-   Mood selector
-   Search
-   Favourites
-   Recently played
-   Share
-   WhatsApp share
-   Responsive design
-   SEO
-   PWA foundation

## V2 --- Engagement

Add:

-   Song requests
-   Dedications
-   Share cards
-   Trending analytics
-   Song of the Moment
-   2 AM Zone
-   Ishq FM Says
-   Media Session
-   Install prompt

## V3 --- Personalization

Add:

-   Accounts
-   Cloud favourites
-   Cross-device history
-   Personalized recommendations
-   User playlists
-   Advanced analytics

------------------------------------------------------------------------

# 49. What NOT to Do

Do not:

-   Make Ishq FM a completely separate brand from Bihari Auto Beats.
-   Create a second independent audio player.
-   Force login before listening.
-   Put too many buttons on the hero.
-   Overuse hearts and pink.
-   Make it look like a Valentine's website.
-   Add excessive animations.
-   Show fake play counts.
-   Add AI recommendations before basic recommendation logic works.
-   Overload V1 with unnecessary social features.

------------------------------------------------------------------------

# 50. Ideal User Journey

``` text
User opens Bihari Auto Beats
          ↓
मूड चुनिए • SELECT YOUR VIBE
          ↓
❤️ Ishq FM
          ↓
Enter Ishq FM
          ↓
Beautiful cinematic transition
          ↓
❤️ Ishq FM
Dil Se… Sirf Tumhare Liye
          ↓
▶ START ISHQ FM
          ↓
Music starts
          ↓
Global mini-player appears
          ↓
User chooses a mood
          ↓
Playlist changes
          ↓
User likes a song
          ↓
Song enters My Ishq
          ↓
User dedicates the song
          ↓
Share card generated
          ↓
User shares on WhatsApp
          ↓
Friend opens shared song
          ↓
Friend enters Bihari Auto Beats
          ↓
New user discovers Ishq FM
```

The loop is:

**Listen → Feel → Save → Dedicate → Share → Return**

------------------------------------------------------------------------

# 51. Final Product Definition

> **Bihari Auto Beats is the universe.**
>
> **Ishq FM is the romantic world. ❤️**
>
> **Durgesh Nai is the nostalgic world. 💈**
>
> **Auto Beats is the desi/highway world. 🛺**

Ishq FM should not simply be another playlist.

It should be a **premium romantic music experience living inside Bihari
Auto Beats**.

The final feeling should be:

> **2 AM + city lights + headphones + memories.**

And the core Ishq FM message should remain:

# ❤️ Ishq FM

## Dil Se... Sirf Tumhare Liye

**Kuch gaane sune nahi jaate... mehsoos kiye jaate hain.**
