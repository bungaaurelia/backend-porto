import supabase from "../../utils/supabase";
import Cors from 'cors';
import initMiddleware from '@/utils/initMiddleware';

const cors = initMiddleware(
  Cors({
    origin: 'https://bungaurelians.vercel.app',
    methods: ['GET'],
  })
);

export default async function handler(req, res) {
  try {
    await cors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
      const { data, error } = await supabase
        .from("contact_info")
        .select("type, label, url, icon_url, order")
        .order("order", { ascending: true });

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: "Failed to fetch about data." });
  }
}


