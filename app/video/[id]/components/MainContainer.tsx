'use client';

import { fetchVideoData } from "@/@util/functions/fetch/fetchVideoData";
import VideoContainer from "@/app/components/VideoContainer";
import YoutuberProfileContainer from "@/app/components/YoutuberProfileContainer";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CommentContainer from "./CommentContainer";
import { AxiosError } from "axios";
import { useUpdateRecentVideoLocalStorage } from "@/@util/hooks/useUpdateRecentVideoLocalStorage";

export default function MainContainer(
    {videoId} : {videoId : string}
){
    const router = useRouter();
    // Video Data 불러오기
    const { data, isLoading, isError, error } = useQuery({
        queryKey : ['videoData', videoId],
        queryFn : () => fetchVideoData(videoId),
        refetchOnWindowFocus : false,
        // 캐시타임 1시간(3600000ms)
        gcTime : 3600000,
        staleTime : 3600000,
    });

    // 에러 발생시 뒤로가기
    useEffect(() => {
        if (isError) {
            console.log(error)
            let errorMessage = '';
            // error가 AxiosError인지 확인
            if (error instanceof AxiosError ) {
                // AxiosError 타입에 따라 에러 처리
                errorMessage = 
                error.response?.data?.message || '서버에서 오류가 발생했습니다.';
            } else if (error instanceof Error) {
                // 다른 일반 에러 처리
                errorMessage = error.message;
            } else {
                errorMessage = "알 수 없는 에러가 발생했습니다.";
            }
            alert(errorMessage);
            router.back();
        }
    }, [isError, router]);

    useUpdateRecentVideoLocalStorage(
        videoId,
        data?.video.title,
        data?.video.channelTitle,
        data?.video.thumbnails.url
    );

    if(isLoading) return <h1>로딩중입니다.</h1>
    if(!data) return <h1>no Data</h1>

    const { youtuber, video } = data;

    return(
        <div id="video">
            <YoutuberProfileContainer youtuber={youtuber} />
            <hr/>
            <VideoContainer video={video} videoId={videoId} />
            <CommentContainer videoId={videoId} channelId={youtuber.channelId} />
        </div>
    )
}