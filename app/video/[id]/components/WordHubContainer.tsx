'use client';

import { fetchAnalyzedCommentData } from "@/@util/functions/fetch/fetchAnalyzedCommentData";
import { FilteredCommentType } from "@/types/comment";
import { useQuery } from "@tanstack/react-query";
import WordCloudContainer from "./WordCloudContainer";
import FeelGraphContainer from "./FeelGraphContainer";

export default function WordHubContainer(
    {commentData} : {commentData : FilteredCommentType[]}
){
    // 영상이 바뀌지 않는 한 첫번째 댓글 내용이 변하지 않음
    // 쿼리 키로 사용
    const queryKey = commentData[0];
    const {data, isLoading, isError} = useQuery({
        queryKey : ['analyzedComment', queryKey],
        queryFn : () => fetchAnalyzedCommentData(commentData),
        refetchOnWindowFocus : false,
        // 캐시타임 1시간(3600000ms)
        gcTime : 3600000,
        staleTime : 3600000,
    });

    if(isLoading) return <h3>댓글 데이터 로딩 중임</h3>
    if(!data) return <h3>no data</h3>
    if(isError) return <h3>에러남;;</h3>

    const {morpData :keyWordData, feelData} = data;
    return (
        <>
            <h3>댓글 감정 분석</h3>
            <FeelGraphContainer feelData={feelData} />
            <h3>댓글 키워드</h3>
            <WordCloudContainer keyWordData={keyWordData} />
        </>
    )
}