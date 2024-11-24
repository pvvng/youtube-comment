import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

export default async function handler(
    req: NextApiRequest, res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    if(!clientId){
        return res.status(500).json({ message: "Invalid client id"});
    }

    if(!clientSecret){
        return res.status(500).json({ message : "Invalid client secret" });
    }

    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token is required" });
    }

    try {
        const response = await axios.post(
            "https://oauth2.googleapis.com/token",
            new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken,
                grant_type: "refresh_token",
            }).toString(),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        res.status(200).json({
            accessToken: response.data.access_token,
            expiresIn: response.data.expires_in,
        });
    } catch (error) {
        console.error("Failed to refresh token:", error);
        res.status(500).json({ message: "Failed to refresh access token" });
    }
}