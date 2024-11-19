import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const RECAPTCHA_URL = "https://www.google.com/recaptcha/api/siteverify";
const secretKey = process.env.RECAPTCHA_SECRET_KEY;

export default async function handler(
    req: NextApiRequest, res: NextApiResponse
) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const { token } : { token : string } = req.body;

    if (!token) return res.status(400).json({ error: "No reCAPTCHA token provided" });

    try {
        // Google reCAPTCHA 검증 API 호출
        const response = await axios.post(
            RECAPTCHA_URL,
            null,
            {
                params: {
                    secret: secretKey,
                    response: token,
                },
            }
        );

        const data = response.data;

        if (data.success) {
            res.status(200).json({ success: true, score: data.score });
        } else {
            res.status(400).json({ success: false, errors: data["error-codes"] });
        }
    } catch (error) {
        console.error("Error verifying reCAPTCHA:", error);
        res.status(500).json({ error: "Failed to verify reCAPTCHA" });
    }
}
