import { connectDB } from "@/@util/database";
import { PopularPostDataType } from "@/@util/functions/fetch/fetchUpdateYoutuberPopularity";
import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import moment from "moment-timezone";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { youtuberName, customUrl, thumnailUrl, channelId }: PopularPostDataType = req.body;
    // const userAgent = req.headers['user-agent'];
    // console.log(userAgent)

    const koreaTime = moment().tz('Asia/Seoul').format('YYYY-MM-DD');
    let db: Db;

    try {
        db = (await connectDB).db('youtube');
    } catch (error) {
        return res.status(500).json({ message: 'Database connection failed' });
    }

    try {
        const existingDoc = await db.collection('popular-youtuber').findOne({
            channelId: channelId,
            date: koreaTime
        });

        if (existingDoc) {
            await db.collection('popular-youtuber').updateOne(
                { channelId: channelId, date: koreaTime },
                { $inc: { count: 1 } }
            );
        } else {
            await db.collection('popular-youtuber').insertOne({
                name: youtuberName,
                customUrl: customUrl,
                thumnailUrl: thumnailUrl,
                channelId: channelId,
                date: koreaTime,
                count: 1
            });
        }

        return res.status(200).json({ message: "Update successful" });
    } catch (error) {
        return res.status(500).json({ message: "Database operation failed", error: error });
    }
}
