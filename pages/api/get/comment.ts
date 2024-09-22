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
            if (axios.isAxiosError(error)) {
                // AxiosError의 상태 코드 확인
                const statusCode = error.response?.status;
    
                if (statusCode === 403) {
                    // 403 Forbidden - 댓글이 차단된 경우
                    const errorMessage = '댓글 수집이 허용되지 않은 영상입니다.';
                    console.error('403 Forbidden:', errorMessage);
                    return res.status(403).json({ message: errorMessage });
                } else if (statusCode === 404) {
                    // 404 Not Found - 잘못된 videoId 또는 비공개 영상인 경우
                    const errorMessage = '해당 영상이 존재하지 않거나 비공개 상태입니다.';
                    console.error('404 Not Found:', errorMessage);
                    return res.status(404).json({ message: errorMessage });
                } else {
                    // 다른 일반적인 에러 처리
                    const errorMessage = error.response?.data?.error?.message || '알 수 없는 에러가 발생했습니다.';
                    console.error('기타 에러 발생:', errorMessage);
                    return res.status(statusCode || 500).json({ message: errorMessage });
                }
            } else {
                // AxiosError가 아닌 다른 에러 처리
                console.error('알 수 없는 에러 발생:', error);
                return res.status(500).json({ message: '서버에서 알 수 없는 에러가 발생했습니다.' });
            }
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