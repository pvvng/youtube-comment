import { clearVideoComponentState, defaultVideoComponentState, useVideoRenderStateStore } from "@/app/store";
import { VideoDataType } from "@/types/video";
import { CommentDataType } from "@/types/comment";
import { AnalyzedCommentData } from "@/types/word";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

/** video detail 페이지에서 사이드바 로딩 스피너 설정 시 데이터가 캐싱되어 있는지 검증하는 커스텀 훅 */
export default function useCheckCachedData(videoId : string){
    const { 
        setClearState, 
        setDefaultState, 
        setVideoComponentState 
    } = useVideoRenderStateStore();

    const queryClient = useQueryClient();
    
    const cachedVideoData: VideoDataType | undefined 
    = queryClient.getQueryData(['videoData', videoId]);
    const cachedCommentData: CommentDataType | undefined 
    = queryClient.getQueryData(['commentData', videoId]);
    let cachedAnalyzedData: AnalyzedCommentData | null | undefined 
    = undefined; 

    if(cachedCommentData){
        cachedAnalyzedData = queryClient.getQueryData(
            ['analyzedComment', cachedCommentData.commentData[0]]
        );
    }

    const isCached = cachedVideoData && cachedCommentData && cachedAnalyzedData

    useEffect(() => {
        // 일단 초기화 하고 시작
        setDefaultState(defaultVideoComponentState);

        // 둘 다 캐시된 데이터면 캐시된 페이지로 간주
        if(isCached){
            // console.log(1,1,1)
            setClearState(clearVideoComponentState);
        // 캐싱된 비디오 데이터가 존재할때
        }else if (cachedVideoData && !cachedCommentData && !cachedAnalyzedData){
            // console.log(1,0,0)
            setVideoComponentState(['video', true]);
            setVideoComponentState(['youtuber', true]);
        // 캐싱된 비디오, 댓글 데이터가 존재할때
        }else if (cachedVideoData && cachedCommentData && !cachedAnalyzedData){
            // console.log(1,1,0)
            setVideoComponentState(['video', true]);
            setVideoComponentState(['youtuber', true]);
            setVideoComponentState(['topicality', true]);
            setVideoComponentState(['comment', true]);
        // 캐싱된 데이터가 존재하지 않는다면 그냥 초기화
        }else{
            // console.log(0,0,0)
            setDefaultState(defaultVideoComponentState);
        }
    },[videoId])
}