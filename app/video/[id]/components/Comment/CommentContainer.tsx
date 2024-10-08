'use client';

import { fetchCommentData } from "@/@util/functions/fetch/fetchCommentData";
import { useQuery } from "@tanstack/react-query";
import DatechartContainer from "../Analyzed/DateChartContainer";
import WordHubContainer from "../Analyzed/WordHubContainer";
import TopLikeContainer from "./TopLikeCountContainer";
import useProcessError from "@/@util/hooks/useprocessError";

interface PropsType {
    videoId : string;
    channelId : string;
}

export default function CommentContainer(
    {videoId, channelId} : PropsType
){
    
    const {data, isLoading, isError, error} = useQuery({
        queryKey : ['commentData', videoId],
        queryFn : () => fetchCommentData(videoId),
        refetchOnWindowFocus : false,
        // 캐시타임 1시간(3600000ms)
        gcTime : 3600000,
        staleTime : 3600000,
    })

    useProcessError(isError, error, '');
    if(isLoading) return <h2>로딩중임</h2>;
    if(data === undefined) return null;

    // 각각 댓글 데이터, 날짜 데이터
    const {commentData, dateData} = data;

    // 불러온 데이터가 빈 값일 때 (에러 발생시 혹은 댓글이 없는 영상일 때 방어)
    if(commentData.length === 0 && dateData.length === 0) return <p>댓글 데이터가 없습니다.</p>

    // 좋아요 많은 10개 댓글 보내기
    let sortedCommentData = commentData.sort((a,b) => b.likeCount - a.likeCount)
    
    return(
        <div className="w-100" id="topicality">
            <TopLikeContainer commentData={sortedCommentData} videoId={videoId} />
            <h3>화제성 분석</h3>
            <DatechartContainer dateData={dateData} />
            <WordHubContainer commentData={commentData} channelId={channelId} />
        </div>
    )
}

