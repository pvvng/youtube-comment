'use client';

import { fetchCommentData } from "@/@util/functions/fetch/fetchCommentData";
import { useQuery } from "@tanstack/react-query";
import DatechartContainer from "./DateChartContainer";
import WordHubContainer from "./WordHubContainer";
import { AxiosError } from "axios";

export default function CommentContainer({videoId} : {videoId : string}){
    
    const {data, isLoading, isError, error} = useQuery({
        queryKey : ['commentData', videoId],
        queryFn : () => fetchCommentData(videoId),
        refetchOnWindowFocus : false,
        // 캐시타임 1시간(3600000ms)
        gcTime : 3600000,
        staleTime : 3600000,
    })

    if(isLoading) return <h2>로딩중임</h2>;
    if (isError) {
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
        // 에러 객체에서 메시지 추출
        return <p>{errorMessage}</p>;
    }

    if(data === undefined) return <p>노 데이터</p>;

    // 각각 댓글 데이터, 날짜 데이터
    const {commentData, dateData} = data;

    return(
        <div className="w-100" id="topicality">
            <h3>화제성 분석</h3>
            <DatechartContainer dateData={dateData} />
            <WordHubContainer commentData={commentData} />
        </div>
    )
}

