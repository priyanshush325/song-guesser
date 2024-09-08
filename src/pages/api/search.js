export default async function handler(req, res) {
    const { query } = req.query;
    const API_BASE_URL = process.env.API_BASE_URL;

    if (!query) {
        res.status(400).send("No query provided");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}?method=track.search&track=${query}&api_key=${process.env.LASTFM_API_KEY}&format=json`);
        const data = await response.json();

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
}
