import { cleanUpText } from "@/@util/functions/wordAPI/cleanUpText";
import { FilteredCommentType } from "@/types/comment";
import { AnalyzedCommentData } from "@/types/word";
import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface BodyType {
    commentData : FilteredCommentType[];
    channelId : string
}

const flask_url = process.env.NEXT_PUBLIC_FLASK_URL || process.env.FLASK_URL

export default async function handler(
    req : NextApiRequest, res : NextApiResponse
){
    if(req.method !== "POST") return res.status(500).json({message : "Not Allowed Method"})

    const { commentData, channelId } : BodyType = req.body;

    if(!flask_url) return null;

    // flask 서버에 보낼 수 있는 데이터로 수정
    let flaskArr : {text :string, like : number}[] = [];
    commentData.forEach(cd => {
        let cleandComment = cleanUpText(cd.text);
        flaskArr.push({
            text : cleandComment,
            like : cd.likeCount
        })
    })
    // 수정한 데이터 stringify
    let stringifyData = JSON.stringify(flaskArr);

    const blob = new Blob([stringifyData], {type : 'text/plain'});

    // 파일 크기 출력
    // const sizeInBytes = blob.size;
    // const sizeInKB = (sizeInBytes / 1024).toFixed(2);
    // const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
    
    // console.log("Blob size (bytes):", sizeInBytes);
    // console.log("Blob size (KB):", sizeInKB);
    // console.log("Blob size (MB):", sizeInMB);

    const formData = new FormData();
    formData.append('file', blob, 'textdata.txt');

    // videoId를 FormData에 추가
    formData.append('channelId', channelId);

    try{
        const response : AxiosResponse<AnalyzedCommentData> = 
        await axios.post(flask_url, formData, {
            headers : {
                'Content-Type' : 'multipart/form-data'
            },
        });
        return res.status(200).json({analyzedCommentData : response.data});
    }catch(error){
        // error가 AxiosError인지 확인
        if (axios.isAxiosError(error)) {
            // AxiosError 타입에 따라 에러 처리
            return res.status(500).json({ message: 'Error fetching anlyzed comment data', error: error });
        } else if (error instanceof Error) {
            // 다른 일반 에러 처리
            return res.status(500).json({ message: 'Error fetching anlyzed comment data', error: error });
        } 

        return res.status(500).json({ message: 'An unexpected error occurred', error: error });

    }
}