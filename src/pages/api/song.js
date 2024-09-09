export default async function handler(req, res) {
    const { artist, title } = req.query;
    const API_BASE_URL = process.env.API_BASE_URL;

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

    res.status(200).json(songInfo);
}
