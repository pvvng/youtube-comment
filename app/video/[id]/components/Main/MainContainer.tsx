'use client';

import VideoContainer from "@/app/components/VideoContainer";
import YoutuberProfileContainer from "@/app/components/YoutuberProfileContainer";
import CommentContainer from "../Comment/CommentContainer";
import useProcessError from "@/@util/hooks/useprocessError";
import { fetchVideoData } from "@/@util/functions/fetch/fetchVideoData";
import { useUpdateRecentVideoLocalStorage } from "@/@util/hooks/useUpdateRecentVideoLocalStorage";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useScrollStore } from "@/app/store";

export default function MainContainer(
    {videoId} : {videoId : string}
){
    // 사이드바 스크롤을 위한 설정
    const videoContainerRef = useRef(null);
    const { setSectionRef } = useScrollStore();

    useEffect(() => {
        setSectionRef('video', videoContainerRef);
    }, [setSectionRef]);

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
    useProcessError(isError, error, 'mc');

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
        <div ref={videoContainerRef} id="video" className="container-md">
            <YoutuberProfileContainer youtuber={youtuber} />
            <hr />
            <VideoContainer video={video} videoId={videoId} />
            <CommentContainer videoId={videoId} channelId={youtuber.channelId} />
        </div>
    )
}