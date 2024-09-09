import { supabase } from "../../../lib/supabaseClient";

export default async function handler(req, res) {
    // Get the date from the query parameter
    const { date } = req.query;

    try {
        // If date is not provided in the query, return a 400 error
        if (!date) {
            return res.status(400).json({ error: "Date parameter is required" });
        }

        console.log('Query Date:', date);

        // Query the Supabase table using the provided date
        const { data, error } = await supabase
            .from('emoji-prompts')
            .select()
            .eq('date', date)
            .single();

        if (error) {
            console.error('Supabase Error:', error);
            return res.status(500).json({ error: "Something went wrong" });
        }

        // Check if data exists
        if (!data) {
            return res.status(404).json({ error: "No prompt found for the given date" });
        }

        // Return the prompt data
        res.status(200).json({ prompt: data.prompt });
    } catch (error) {
        console.error('Handler Error:', error);
        res.status(500).json({ error: "Something went wrong" });
    }
}
