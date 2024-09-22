'use client';

import { fetchCommentData } from "@/@util/functions/fetch/fetchCommentData";
import { useQuery } from "@tanstack/react-query";
import DatechartContainer from "./DateChartContainer";
import WordHubContainer from "./WordHubContainer";

export default function CommentContainer({videoId} : {videoId : string}){
    
    const {data, isLoading, isError} = useQuery({
        queryKey : ['commentData', videoId],
        queryFn : () => fetchCommentData(videoId),
        refetchOnWindowFocus : false,
        // 캐시타임 1시간(3600000ms)
        gcTime : 3600000,
        staleTime : 3600000,
    })

    if(isLoading) return <h2>로딩중임</h2>;
    if(data === undefined) return <p>노 데이터</p>;
    if(isError) return <p>에러남;</p>

    // 각각 댓글 데이터, 날짜 데이터
    const {commentData, dateData} = data;

    console.log(commentData)
    return(
        <div className="w-100">
            <h3>화제성 분석</h3>
            <DatechartContainer dateData={dateData} />
            <WordHubContainer commentData={commentData} />
        </div>
    )
}

