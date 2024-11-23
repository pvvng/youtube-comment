import updateDBYAnalyzedDataYoutuberCollection from "@/@util/functions/fetch/updateDBAnalyzedDataYoutuberCollection";
import updateDBYoutuberCollection from "@/@util/functions/fetch/updateDBYoutuberCollection";
import { getClientIp, rateLimiter } from "@/@util/functions/rateLimit";
import { cleanUpText } from "@/@util/functions/wordAPI/cleanUpText";
import { FilteredCommentType } from "@/types/comment";
import { AnalyzedCommentData } from "@/types/word";
import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface BodyType {
    commentData : FilteredCommentType[];
    videoId : string;
    channelId : string
}

interface CommentArrType {
    text: string; 
    like: number;
}

const FLASK_URL = process.env.NEXT_PUBLIC_FLASK_URL || process.env.FLASK_URL
const FLASK_API_KEY = process.env.FLASK_API_KEY;

const MAX_SIZE_MB = 5; // 5MB 제한
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export default async function handler(
    req : NextApiRequest, res : NextApiResponse
){
    // rate limiting
    const clientIp = getClientIp(req); // 클라이언트 IP 추출

    try {
        // Rate Limiting 적용
        await rateLimiter.consume(clientIp);
    } catch (rateLimiterRes) {
        return res.status(429).json({ message: "Too many requests. Please try again later." });
    }

    if(req.method !== "POST") {
        return res.status(405).json({message : "Not Allowed Method"});
    }

    const { commentData, videoId, channelId } : BodyType = req.body;

    if (!Array.isArray(commentData) || commentData.length === 0) {
        return res.status(400).json({ message: "Invalid or empty comment data" });
    }
    
    if (!channelId || typeof channelId !== "string") {
        return res.status(400).json({ message: "Invalid or missing channelId" });
    }

    if (!videoId || typeof videoId !== "string") {
        return res.status(400).json({ message: "Invalid or missing videoId" });
    }

    if(FLASK_API_KEY === undefined){
        return res.status(400).json({ message : "api key must be required" });
    }

    if (!FLASK_URL || !FLASK_URL.startsWith("http")) {
        console.error("FLASK_URL is not properly configured");
        return res.status(500).json({ message: "Server configuration error: FLASK_URL is invalid" });
    }

    // flask에 전송할 배열 만들기
    const flaskArr = getFlaskArr(commentData);

    try {
        const response = await sendDataToFlask(flaskArr, channelId, videoId, res);

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error in handler:", error);

        if (axios.isAxiosError(error)) {
            return res.status(500).json({ message: "Error sending data to Flask", error: error.message });
        }
        
        return res.status(500).json({ message: "An unexpected error occurred" });
    }
}

function getFlaskArr(commentData : FilteredCommentType[]):CommentArrType[]{
    // flask 서버에 보낼 수 있는 데이터로 수정
    let flaskArr : CommentArrType[] = [];
    commentData.forEach(cd => {
        let cleandComment = cleanUpText(cd.text);
        flaskArr.push({
            text : cleandComment,
            like : cd.likeCount
        });
    });

    return flaskArr;
}

function calculateBlobSize(data : CommentArrType[]): number {
    const jsonString = JSON.stringify(data);
    const blob = new Blob([jsonString], { type: "application/json" });
    return blob.size;
}

function reduceData(data: CommentArrType[]): { text: string; like: number }[] {
    // 동적 처리용 필터 조건
    const thresholds = [0, 1, 2, 5]; 

    for (const threshold of thresholds) {
        const filteredData = data.filter(item => item.like > threshold);
        let blobSize = calculateBlobSize(filteredData);
        if (blobSize <= MAX_SIZE_BYTES) {
            return filteredData;
        }
        if (process.env.NODE_ENV !== "production") {
            console.log(`${blobSize} in threshold ${threshold}`);
        }
    }

    // 모든 조건을 만족하지 못하면 원본 데이터를 반환
    return data; 
}

async function sendDataToFlask(
    commentData: CommentArrType[], 
    channelId: string, 
    videoId : string,
    res : NextApiResponse
) {

    if (!FLASK_URL || !FLASK_URL.startsWith("http")) {
        console.error("FLASK_URL is not properly configured");
        return res.status(500).json({ message: "Server configuration error: FLASK_URL is invalid" });
    }

    let filteredData = commentData;
    let dataSize = calculateBlobSize(filteredData);
    let lastSize = dataSize;

    // 개발 환경에서 데이터 크기를 MB 단위로 출력
    if (process.env.NODE_ENV !== "production") {
        const dataSizeInMB = (dataSize / (1024 * 1024)).toFixed(2); // MB 단위로 변환
        console.log(`Data size: ${dataSizeInMB} MB`);
    }

    // 데이터를 축소하여 5MB 이하로 만들기
    while (dataSize > MAX_SIZE_BYTES) {
        const newData = reduceData(filteredData);
        if (newData.length === filteredData.length) {
            console.error("Data cannot be reduced further to fit 10MB limit");
            return res.status(413).json({message: "Payload size too large to reduce below 10MB",});
        }
        // 데이터 크기를 다시 계산
        if (lastSize === (dataSize = calculateBlobSize(filteredData))) {
            break; // 크기가 변하지 않으면 루프 종료
        }
        lastSize = dataSize;
    }

    // 최종 데이터를 전송
    const formData = new FormData();
    formData.append("file", new Blob([JSON.stringify(filteredData)], { type: "text/plain" }), "textdata.txt");
    formData.append("channelId", channelId);

    try {
        const response : AxiosResponse<AnalyzedCommentData> = 
        await axios.post(FLASK_URL, formData, {
            headers : {
                'Content-Type' : 'multipart/form-data',
                'YOUTUVIEW-API-KEY' : FLASK_API_KEY,
            },
            timeout: 300000, // 타임아웃 5분
        });

        try {
            await Promise.all([
                updateDBYoutuberCollection(videoId, channelId, response.data)
                .catch(err => {
                    console.error("Error updating Youtuber collection:", err.message);
                }),
                updateDBYAnalyzedDataYoutuberCollection(channelId, response.data)
                .catch(err => {
                    console.error("Error updating Analyzed Data collection:", err.message);
                })
            ]);
        } catch (error) {
            return res.status(500).json({ message: 'Error update db collection' });
        }
        
        return res.status(200).json(response.data);
    } catch (error) {
    // AxiosError인지 확인
    if (axios.isAxiosError(error)) {
            // Axios 에러에서 상태 코드와 데이터 추출
            const status = error.response?.status || 500; // 상태 코드가 없으면 500으로 기본값 설정
            const errorMessage = error.response?.data?.error || 'Error fetching analyzed comment data';
            
            // 상태 코드와 메시지를 그대로 반환
            return res.status(status).json({ message: errorMessage });
        } else if (error instanceof Error) {
            // 일반 에러 처리
            return res.status(500).json({ message: 'General error occurred' });
        }

        // 알 수 없는 에러 처리
        return res.status(500).json({ message: 'An unexpected error occurred' });
    }
}