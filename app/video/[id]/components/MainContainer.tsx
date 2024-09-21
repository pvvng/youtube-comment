'use client';

import { fetchVideoData } from "@/@util/functions/fetch/fetchVideoData";
import VideoContainer from "@/app/components/VideoContainer";
import YoutuberProfileContainer from "@/app/components/YoutuberProfileContainer";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CommentContainer from "./CommentContainer";

export default function MainContainer(
    {videoId} : {videoId : string}
){
    const router = useRouter();
    // Video Data 불러오기
    const { data, isLoading, isError } = useQuery({
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
            alert('잘못된 접근입니다.');
            router.back();
        }
    }, [isError, router]);

    if(!data || isLoading) return <h1>로딩중입니다.</h1>

    const { youtuber, video } = data;

    return(
        <>
            <YoutuberProfileContainer youtuber={youtuber} />
            <VideoContainer video={video} videoId={videoId} />
            <CommentContainer videoId={videoId} />
        </>
    )
}