import supabase from "@/utils/supabase";
import Cors from 'cors';
import initMiddleware from '@/utils/initMiddleware';

const cors = initMiddleware(
  Cors({
    origin: 'https://bunga-portofolio.vercel.app',
    methods: ['GET', 'POST'],
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const { error } = await supabase.from("resume_requests").insert({ email });

    if (error) throw error;

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: "Failed to submit resume request" });
  }
}
