export default async function handler(req, res) {
    const { artist, title } = req.query;
    const API_BASE_URL = process.env.API_BASE_URL;

    const ANSWER_SONG = {
        title: "DNA.",
        artist: "Kendrick Lamar",
        album: "DAMN.",
        genre: "Hip-Hop",
    };

    if (!artist || !title) {
        return res.status(400).send("artist and title are required");
    }

    let songInfo;

    try {
        const response = await fetch(`${API_BASE_URL}?method=track.getInfo&artist=${artist}&track=${title}&api_key=${process.env.LASTFM_API_KEY}&format=json`);
        const data = await response.json();
        songInfo = {
            title: data?.track?.name,
            artist: data?.track?.artist?.name,
            album: data?.track?.album?.title,
            genres: data?.track?.toptags?.tag
        };
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong" });
    }

    let correctGenre = false;
    let correctAlbum = false;
    let genre = null;

    if (songInfo?.album && songInfo.album.toLowerCase().includes(ANSWER_SONG.album.toLowerCase())) {
        correctAlbum = true;
    }

    const answerSongGenreWords = ANSWER_SONG?.genre?.toLowerCase().split(/\s+/);
    for (let i = 0; i < songInfo?.genres?.length; i++) {
        const songInfoGenreWords = songInfo?.genres[i]?.name?.toLowerCase().split(/\s+/);
        if (answerSongGenreWords?.some(word => songInfoGenreWords?.includes(word))) {
            correctGenre = true;
            genre = ANSWER_SONG?.genre;
        }
    }

    let score = 0;
    if (ANSWER_SONG?.artist === songInfo?.artist) score += 25;
    if (ANSWER_SONG?.title === songInfo?.title) score += 25;
    if (correctAlbum) score += 25;
    if (correctGenre) score += 25;

    const results = {
        title: songInfo?.title,
        artist: songInfo?.artist,
        genre: genre,
        correctArtist: ANSWER_SONG?.artist === songInfo?.artist,
        correctTitle: ANSWER_SONG?.title === songInfo?.title,
        correctAlbum: correctAlbum,
        correctGenre: correctGenre,
        score: score,
    };

    return res.status(200).json(results);
}
