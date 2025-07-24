import supabase from "../../utils/supabase";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  try {
    const { data, error } = await supabase
      .from("about_sections")
      .select("*")
      .order("order", { ascending: true });

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: "Failed to fetch about data." });
  }
}
