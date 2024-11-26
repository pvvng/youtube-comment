'use client';

import { fetchVideoData } from "@/@util/functions/fetch/fetchVideoData";
import { useUpdateRecentVideoLocalStorage } from "@/@util/hooks/useUpdateRecentVideoLocalStorage";
import { useQuery } from "@tanstack/react-query";
import VideoContainer from "@/app/components/Video/VideoContainer";
import YoutuberProfileContainer from "@/app/components/Youtuber/YoutuberProfileContainer";
import CommentContainer from "../Comment/CommentContainer";
import useProcessError from "@/@util/hooks/useprocessError";
import LoadingContianer from "@/app/components/Loading/LoadingContainer";
import ErrorContainer from "@/app/components/Error/ErrorContainer";


export default function MainContainer(
    {videoId} : {videoId : string}
){
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

    if(isLoading) return <LoadingContianer height={'calc(100vh - 100px)'} />
    if(!data) return <ErrorContainer errorMessage="데이터가 존재하지 않습니다." />

    const { youtuber, video } = data;

    return(
        <div id="video" className="container-md">
            <YoutuberProfileContainer youtuber={youtuber} />
            <hr />
            <VideoContainer video={video} videoId={videoId} />
            <CommentContainer videoId={videoId} channelId={youtuber.channelId} />
        </div>
    )
}