import supabase from "@/utils/supabase";
import Cors from 'cors';
import initMiddleware from '@/utils/initMiddleware';

const cors = initMiddleware(
  Cors({
    origin: 'https://bungaurelians.vercel.app',
    methods: ['GET'],
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  try {
    const { data, error } = await supabase.from("personal_picks").select("*");

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: "Failed to fetch journey data." });
  }
}