'use client';

import { FilteredCommentType } from "@/types/comment";
import { useQuery } from "@tanstack/react-query";
import FeelGraphContainer from "./FeelGraphContainer";
import useProcessError from "@/@util/hooks/useprocessError";
import KeywordHubContainer from "./Word/KeywordHubContainer";
import { fetchDBAnalyzedData } from "@/@util/functions/fetch/fetchDBAnalyzedData";
import FetchFreshCommentContainer from "./FetchFreshCommentContainer";

interface PropsType {
    commentData : FilteredCommentType[]
    channelId : string;
    videoId : string;
};

export default function WordHubContainer(
    {commentData, channelId, videoId} : PropsType
){
    // 영상이 바뀌지 않는 한 첫번째 댓글 내용이 변하지 않음 => 쿼리 키로 사용
    const queryKey = videoId;

    const { data, isLoading, isError, isFetching, error } = useQuery({
        queryKey : ['DBanalyzedComment', queryKey],
        queryFn : () => fetchDBAnalyzedData(videoId),
        refetchOnWindowFocus : false,
        // 캐시타임 1시간(3600000ms)
        gcTime : 3600000,
        staleTime : 3600000,
    });
    
    useProcessError(isError, error, 'null');

    if(isLoading || isFetching || data === undefined){
        return <h3>댓글 데이터 로딩 중임</h3>
    }else if(data === null) {
        return (
            <FetchFreshCommentContainer 
                commentData = {commentData} 
                videoId = {videoId} 
                channelId = {channelId} 
            />
        )
    };

    let { keyword :keyWordData, sentiment, lastUpdate } = data;
    
    return (
        <>
            <FeelGraphContainer feelData={sentiment} type="video" />
            <KeywordHubContainer keyWordData={keyWordData} />
            <FetchFreshCommentContainer 
                commentData = {commentData} 
                videoId = {videoId} 
                channelId = {channelId} 
                type={lastUpdate}
            />
        </>
    )
}