import { CommentThread, FilteredCommentType, RawCommentData } from "@/types/comment";
import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = 'https://www.googleapis.com/youtube/v3/commentThreads';
const apiKey = process.env.YOUTUBE_API_KEY;

export default async function handler(
    req: NextApiRequest, res: NextApiResponse
){
    const { videoId } = req.query;

    // videoId 유효성 검사
    if (Array.isArray(videoId) || !videoId) {
        return res.status(400).json({ message: 'videoId is required and must be a string.' });
    }

    // 댓글 수에 따라 불러올 댓글의 데이터 수 정하기
    // let targetCount :number = samplingCount(numCommentCount);

    let allCommentsData :RawCommentData[] = [];
    let nextPageToken = null;

    while (true) {
        try {
            const response : AxiosResponse<CommentThread> = await axios.get(BASE_URL, {
                params: {
                    part: 'snippet',
                    videoId: videoId,
                    order: 'relevance',
                    maxResults: 5000,
                    key: apiKey,
                    pageToken: nextPageToken
                }
            });

            // 댓글 데이터 처리
            allCommentsData = allCommentsData.concat(response.data.items);

            // 다음 페이지 토큰 업데이트
            nextPageToken = response.data.nextPageToken || null;

            // 더 이상 페이지가 없으면 루프 종료
            if (!nextPageToken) {
                break;
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
            // 에러 발생 시 루프 중단
            break; 
        }
    }

    // 날짜 별로 댓글 몇개 있는지 count
    const dateMap = new Map();

    // 데이터 필터 및 정렬
    let filteredAllCommentData :FilteredCommentType[] = [];
    allCommentsData.forEach(v => {
        let snippet = v.snippet.topLevelComment.snippet;
        let publishedDate = snippet.publishedAt.split('T')[0]; 
        let getter = dateMap.get(publishedDate) || 0;
        dateMap.set(publishedDate, getter + 1);

        let pushItem = {
            text : snippet.textOriginal,
            authorDisplayName : snippet.authorDisplayName,
            autohorProfileImageUrl : snippet.authorProfileImageUrl,
            likeCount : snippet.likeCount,
            publishedAt : new Date(snippet.publishedAt),
        }
        filteredAllCommentData.push(pushItem);
    })

    // date Map 배열로 형식 변경 및 날짜 순으로 정렬, 퍼센티지 필드 추가
    const totalCommentLength = filteredAllCommentData.length;
    let sortedDateArr = 
    Array.from(dateMap).sort((a, b) => {
        return new Date(a[0]).getTime() - new Date(b[0]).getTime();
    }).map(v => { 
        return {
            date : v[0], 
            value : v[1],
            percent : v[1] / totalCommentLength * 100
        };
    });
    
    return res.status(200).json({
        commentData : filteredAllCommentData,
        dateData : sortedDateArr,
    });
}