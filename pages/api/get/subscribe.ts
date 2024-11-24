import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import axios, { AxiosResponse } from "axios";
import { RawSubscribedYoutuberType, SubScibedYoutuberType } from "@/types/youtuber";
import { isTokenExpired, refreshAccessToken, tokenInfo } from "@/@util/functions/fetch/fetchRefreshAccessToken";
import { Db } from "mongodb";
import { connectDB } from "@/@util/database";
import { DBUserdataType } from "@/types/userdata";
import { decrypt } from "@/@util/functions/cryptoValue";

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
    if(req.method !== "GET") return res.status(405).json({message : "Not Allowed Method"});

    // 세션 불러오기
    const session :Session | null = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(400).json({ message: "Session not found" });
    }

    // 사용자 이메일 저장
    let userEmail = session.user?.email;

    if(!userEmail){
        return res.status(400).json({ message : "User Email required" })
    }

    // 리프레시 토큰 초기화
    let refreshToken :string|null = null;

    // 데이터베이스 연결 처리
    let db: Db;
    try {
        db = (await connectDB).db('youtube');
    } catch (error) {
        return res.status(500).json({ message: "Database connection failed", error });
    }
    try{
        const dbUserData = await db.collection<DBUserdataType>('userdata').findOne({ email : userEmail });

        // 리프레시 토큰 저장
        refreshToken = dbUserData?.refreshToken || null;
    }catch (dbError) {
        return res.status(500).json({ message: "Database operation failed", error: dbError });
    }

    if(!refreshToken){
        return res.status(401).json({ message : "리프레시 토큰이 확인되지 않습니다. 다시 로그인해주세요." });
    }

    // session.expires를 활용하여 tokenInfo 초기화
    const sessionExpires = Math.floor(new Date(session.expires).getTime() / 1000); // 초 단위 타임스탬프
    const currentTime = Math.floor(Date.now() / 1000);

    // 토큰 저장
    try {
        tokenInfo.refreshToken = refreshToken ? decrypt(refreshToken) : null;
    } catch (error) {
        console.error("Failed to decrypt refresh token:", error);
        return res.status(500).json({ message: "Invalid refresh token. Please log in again." });
    }

    // 토큰 초기화
    tokenInfo.accessToken = session.accessToken || null;
    tokenInfo.tokenCreatedAt = currentTime;
    tokenInfo.expiresIn = sessionExpires - currentTime;

    if (!tokenInfo.accessToken || !tokenInfo.refreshToken) {
        return res.status(400).json({ message: "Access or Refresh Token is missing." });
    }

    // 전체 구독 목록 저장용 배열
    let rawSubscriptions :RawSubscribedYoutuberType[] = [];
    let nextPageToken: string | undefined = '';

    try {
        // Access Token 만료 확인 및 갱신 처리
        try {
            if (isTokenExpired()) {
                console.log("Access Token expired, refreshing...");
                await refreshAccessToken(); 
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.message.includes("Unauthorized")) {
                    return res.status(401).json({ message: error.message });
                }
                return res.status(500).json({ message: "Failed to refresh access token.", error: error.message });
            }
        
            // 예상치 못한 에러 타입 처리
            console.error("Unknown error:", error);
            return res.status(500).json({ message: "An unknown error occurred." });
        }

        // 반복적으로 요청을 보내 모든 구독 목록을 가져옴
        while (nextPageToken !== undefined) {
            const response: AxiosResponse<{ 
                items: RawSubscribedYoutuberType[]; 
                nextPageToken?: string 
            }> = await axios.get(URL, {
                headers: {
                    Authorization: `Bearer ${tokenInfo.accessToken}`,  // accessToken 사용
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

            if (!nextPageToken) {
                break; // 무한 루프 방지
            }
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
        });

        // 전체 구독 목록 반환
        return res.status(200).json(subscriptions);

    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        return res.status(500).json({ message: "Failed to fetch subscriptions" });
    }
}