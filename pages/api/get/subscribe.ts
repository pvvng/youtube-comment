import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import axios, { AxiosResponse } from "axios";
import { RawSubscribedYoutuberType, SubScibedYoutuberType } from "@/types/youtuber";

// api url
const URL = 'https://www.googleapis.com/youtube/v3/subscriptions';

/** 
 * ### 소셜 로그인 후 api 요청 시 구독한 유튜버 목록 보내주는 api 
 * 
 * (클라이언트 컴포넌트 전용, 서버 컴포넌트에서 사용 x)
 * 
 * **예외상황 1** : 
 * 구독한 유튜버가 없을때는 빈 배열 반환
 * 
 * **예외상황 2** :
 * 로그인 하지 않았을때는 에러 반환
 * */
export default async function handler(
    req : NextApiRequest, res : NextApiResponse
){
    // 메소드 검증
    if(req.method !== "GET") return res.status(405).json({message : "Not Allowed Method"})

    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.accessToken) {
        return res.status(400).json({ message: "Session or accessToken not found" });
    }

    // 전체 구독 목록 저장용 배열
    let rawSubscriptions :RawSubscribedYoutuberType[] = [];
    let nextPageToken: string | undefined = '';

    try {
        // 반복적으로 요청을 보내 모든 구독 목록을 가져옴
        while (nextPageToken !== undefined) {
            const response: AxiosResponse<{ 
                items: RawSubscribedYoutuberType[]; 
                nextPageToken?: string 
            }> = await axios.get(URL, {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,  // accessToken 사용
                },
                params: {
                    part: 'snippet',
                    mine: true,
                    // 한 번에 최대 50개 가져옴
                    maxResults: 50,  
                    // 다음 페이지를 위한 토큰
                    pageToken: nextPageToken,  
                },
            });

            const data = response.data;
            // 현재 페이지의 구독 목록을 추가
            rawSubscriptions = [...rawSubscriptions, ...data.items];  
            // 다음 페이지가 없으면 undefined로 설정
            nextPageToken = data.nextPageToken || undefined;  
        }

        // 필요한 데이터만 매핑
        let subscriptions : SubScibedYoutuberType[] = 
        rawSubscriptions.map(rsc => {
            return {
                publishedAt : rsc.snippet.publishedAt,
                title : rsc.snippet.title,
                description : rsc.snippet.description,
                channelId : rsc.snippet.resourceId.channelId,
                thumbnails : 
                rsc.snippet.thumbnails.high?.url ||
                rsc.snippet.thumbnails.medium?.url || 
                rsc.snippet.thumbnails.default.url
            };
        })

        // 전체 구독 목록 반환
        return res.status(200).json(subscriptions);

    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        return res.status(500).json({ message: "Failed to fetch subscriptions" });
    }
}