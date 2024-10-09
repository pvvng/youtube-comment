'use client';

import { fetchVideoData } from "@/@util/functions/fetch/fetchVideoData";
import VideoContainer from "@/app/components/VideoContainer";
import YoutuberProfileContainer from "@/app/components/YoutuberProfileContainer";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CommentContainer from "../Comment/CommentContainer";
import { AxiosError } from "axios";
import { useUpdateRecentVideoLocalStorage } from "@/@util/hooks/useUpdateRecentVideoLocalStorage";
import useProcessError from "@/@util/hooks/useprocessError";

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
        <div id="video">
            <YoutuberProfileContainer youtuber={youtuber} />
            <hr className="m-0" />
            <VideoContainer video={video} videoId={videoId} />
            <CommentContainer videoId={videoId} channelId={youtuber.channelId} />
        </div>
    )
}