import { FilteredVideoSnippet, VideoSnippetType, VideoStatisticsType } from "@/types/video";
import { YoutuberDataType, YoutuberSnippetType, YoutuberStatisticsType } from "@/types/youtuber";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = 'https://www.googleapis.com/youtube/v3/videos';
const apiKey = process.env.YOUTUBE_API_KEY;

export default async function handler(
    req: NextApiRequest, res: NextApiResponse
){
    const videoId = req.query.videoId;

    // videoId 유효성 검사
    if (Array.isArray(videoId) || !videoId) {
        return res.status(400).json({ message: 'videoId is required and must be a string.' });
    }

    try {
        const videoResponse = await axios.get(BASE_URL, {
            params: {
                part: 'snippet,statistics',
                id: videoId,
                key: apiKey,
            }
        });

        // response 데이터 유효성 검사
        if (!videoResponse.data || !videoResponse.data.items || videoResponse.data.items.length === 0) {
            return res.status(404).json({ message: 'No video data found for the given videoId.' });
        }

        // 영상 정보 추출 및 필터링
        const videoSnippet: VideoSnippetType = videoResponse.data.items[0].snippet;
        // 채널 아이디 추출
        const channelId = videoSnippet.channelId;

        // 유튜버 정보 추출
        try {
            const channelResponse = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
                params: {
                    part: 'snippet,statistics',
                    id: channelId,
                    key: apiKey
                }
            });
        
            if (channelResponse.data.items && channelResponse.data.items.length > 0) {
                const youtberSnippet: YoutuberSnippetType = channelResponse.data.items[0].snippet;
                const youtuberStatistics: YoutuberStatisticsType = channelResponse.data.items[0].statistics;

                // 유튜버 데이터 필요한 것만 필터링
                const filteredYoutuberData :YoutuberDataType = {
                    name : youtberSnippet.title,
                    customUrl : youtberSnippet.customUrl,
                    description : youtberSnippet.description,
                    thumbnail : 
                    (
                        youtberSnippet.thumbnails.high ||
                        youtberSnippet.thumbnails.medium ||
                        youtberSnippet.thumbnails.default
                    ),
                    subscriber : youtuberStatistics.subscriberCount,
                    totalview : youtuberStatistics.viewCount,
                    videoCount : youtuberStatistics.videoCount,
                    channelId : channelId,
                }
        
                // 비디오 스니펫 필요한 것만 필터링
                const filteredVideoSnippet: FilteredVideoSnippet = {
                    channelTitle: videoSnippet.channelTitle,
                    title: videoSnippet.title,
                    thumbnails: 
                    (
                        videoSnippet.thumbnails.maxres || 
                        videoSnippet.thumbnails.standard || 
                        videoSnippet.thumbnails.high
                    ),
                    publishedAt: videoSnippet.publishedAt,
                };
        
                // 영상 통계 정보 추출
                const videoStatistics: VideoStatisticsType = videoResponse.data.items[0].statistics;
                // 성공적으로 필터링된 영상 정보와 통계 정보를 응답
                return res.status(200).json(
                    {
                        video : {...filteredVideoSnippet, ...videoStatistics},
                        youtuber : filteredYoutuberData               
                    }
                );
            } else {
                console.error('유튜버 데이터를 찾을 수 없습니다.');
                // 데이터가 없는 경우에 대한 추가 처리
                return res.status(500).json({ message: 'Error fetching video data from YouTuber API' });
            }
        } catch (error) {
            console.error('유튜버 정보를 가져오는 도중 오류가 발생했습니다:', error);
            return res.status(500).json({ message: 'Error fetching video data from YouTuber API', error: error });
        }
    } catch (error) {
        // axios 요청 실패 또는 기타 예외 처리
        if (axios.isAxiosError(error)) {
            return res.status(500).json({ message: 'Error fetching video data from YouTube API', error: error.message });
        } else {
            return res.status(500).json({ message: 'An unexpected error occurred', error: error });
        }
    }
}