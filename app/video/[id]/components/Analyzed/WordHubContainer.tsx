'use client';

import { fetchAnalyzedCommentData } from "@/@util/functions/fetch/fetchAnalyzedCommentData";
import { FilteredCommentType } from "@/types/comment";
import { useQuery } from "@tanstack/react-query";
import WordCloudContainer from "./WordCloudContainer";
import FeelGraphContainer from "./FeelGraphContainer";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import useProcessError from "@/@util/hooks/useprocessError";

interface PropsType {
    commentData : FilteredCommentType[]
    channelId : string;
};

export default function WordHubContainer(
    {commentData, channelId} : PropsType
){
    // 영상이 바뀌지 않는 한 첫번째 댓글 내용이 변하지 않음
    // 쿼리 키로 사용
    const queryKey = commentData[0];
    const {data, isLoading, isError, error} = useQuery({
        queryKey : ['analyzedComment', queryKey],
        queryFn : () => fetchAnalyzedCommentData(commentData, channelId),
        refetchOnWindowFocus : false,
        // 캐시타임 1시간(3600000ms)
        gcTime : 3600000,
        staleTime : 3600000,
    });

    useProcessError(isError, error, 'null');
    if(isLoading) return <h3>댓글 데이터 로딩 중임</h3>
    if(!data) return <h3>no data</h3>

    let {pos :keyWordData, sentiment} = data;
    
    return (
        <>
            <FeelGraphContainer feelData={sentiment} />
            <WordCloudContainer keyWordData={keyWordData} />
        </>
    )
}