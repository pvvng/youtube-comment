import { connectDB } from "@/@util/database";
import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import moment from "moment-timezone";
import { PostDataType } from "@/@util/functions/fetch/PATCH/fetchUpdateVideoPopularity";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    let { videoId, title, thumnailUrl } :PostDataType = req.body;

    try {
        if (!videoId || !title || !thumnailUrl) {
            return res.status(400).json({ message: "Missing or invalid input data" });
        }
    } catch (error) {
        return res.status(400).json({ message: "Invalid input data" });
    }

    const koreaTime = moment().tz('Asia/Seoul').format('YYYY-MM-DD');

    let db: Db;

    try {
        db = (await connectDB).db('youtube');
    } catch (error) {
        return res.status(500).json({ message: 'Database connection failed' });
    }

    try {
        const existingDoc = await db.collection('popular-video').findOne({
            dataId: videoId,
            date: koreaTime
        });

        if (existingDoc) {
            await db.collection('popular-video').updateOne(
                { dataId: videoId, date: koreaTime },
                { $inc: { count: 1 } }
            );
        } else {
            await db.collection('popular-video').insertOne({
                dataId: videoId,
                name: title,
                thumnailUrl : thumnailUrl,
                date: koreaTime,
                count: 1
            });
        }

        return res.status(200).json({ message: "Update successful" });
    } catch (error) {
        return res.status(500).json({ message: "Database operation failed", error: error });
    }
}
