'use client';

import { fetchCommentData } from "@/@util/functions/fetch/GET/fetchCommentData";
import { useQuery } from "@tanstack/react-query";
import DatechartContainer from "../Analyzed/DateChartContainer";
import WordHubContainer from "../Analyzed/WordHubContainer";
import TopLikeContainer from "./TopLikeCountContainer";
import useProcessError from "@/@util/hooks/useprocessError";
import LoadingContianer from "@/app/components/Loading/LoadingContainer";
import ErrorContainer from "@/app/components/Error/ErrorContainer";
import axios from "axios";

interface PropsType {
    videoId : string;
    channelId : string;
}

export default function CommentContainer(
    {videoId, channelId} : PropsType
){
    const { data, isLoading, isError, error } = useQuery({
        queryKey : ['commentData', videoId],
        queryFn : () => fetchCommentData(videoId),
        refetchOnWindowFocus : false,
        // 특정 오류 코드에 대해서만 retry 하지 않음
        retry: (failureCount, error) => {
            if (axios.isAxiosError(error)) {
                const serverMessage = error.response?.data?.message;
        
                if (serverMessage === "댓글 수집이 허용되지 않은 영상입니다.") {
                    return false; // 자동 재시도 방지
                }
            }
            return true;  // 그 외의 오류는 자동 재시도
        },
        // 캐시타임 1시간(3600000ms)
        gcTime : 3600000,
        staleTime : 3600000,
    })

    const errorMessage = useProcessError(isError, error, 'null');

    if(isLoading) return <LoadingContianer height={300} />;
    if(errorMessage) return <ErrorContainer errorMessage={errorMessage} />;
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
            <DatechartContainer dateData={dateData} />
            <WordHubContainer commentData={commentData} channelId={channelId} videoId={videoId} />
        </div>
    )
}

