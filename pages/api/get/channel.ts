import { YoutuberDataType, YoutuberSnippetType, YoutuberStatisticsType } from "@/types/youtuber";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = 'https://www.googleapis.com/youtube/v3/channels';
const apiKey = process.env.YOUTUBE_API_KEY;

export default async function handler(
    req: NextApiRequest, res: NextApiResponse
) {
    if (req.method !== "GET") return res.status(405).json({ message: "Not Allowed Method" });

    const channelId = req.query.channelId;

    // channelId 유효성 검사
    if (Array.isArray(channelId) || !channelId) {
        return res.status(400).json({ message: 'channelId is required and must be a string.' });
    }

    try {
        // 유튜버 정보 가져오기
        const channelResponse = await axios.get(BASE_URL, {
            params: {
                part: 'snippet,statistics',
                id: channelId,
                key: apiKey
            }
        });

        // 유튜버 데이터 유효성 검사
        if (channelResponse.data.items && channelResponse.data.items.length > 0) {
            const youtberSnippet: YoutuberSnippetType = channelResponse.data.items[0].snippet;
            const youtuberStatistics: YoutuberStatisticsType = channelResponse.data.items[0].statistics;

            // 유튜버 데이터 필요한 것만 필터링
            const filteredYoutuberData: YoutuberDataType = {
                name: youtberSnippet.title,
                customUrl: youtberSnippet.customUrl,
                description: youtberSnippet.description,
                thumbnail: 
                (
                    youtberSnippet.thumbnails.high ||
                    youtberSnippet.thumbnails.medium ||
                    youtberSnippet.thumbnails.default
                ),
                subscriber: youtuberStatistics.subscriberCount,
                totalview: youtuberStatistics.viewCount,
                videoCount: youtuberStatistics.videoCount,
                channelId: channelId,
            };

            // 성공적으로 필터링된 유튜버 정보를 응답
            return res.status(200).json({ youtuber: filteredYoutuberData });
        } else {
            console.error('유튜버 데이터를 찾을 수 없습니다.');
            return res.status(404).json({ message: 'No data found for the given channelId.' });
        }
    } catch (error) {
        console.error('유튜버 정보를 가져오는 도중 오류가 발생했습니다:', error);
        return res.status(500).json({ message: 'Error fetching data from YouTuber API', error: error });
    }
}