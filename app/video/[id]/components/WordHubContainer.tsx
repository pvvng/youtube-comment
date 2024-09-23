'use client';

import { fetchAnalyzedCommentData } from "@/@util/functions/fetch/fetchAnalyzedCommentData";
import { FilteredCommentType } from "@/types/comment";
import { useQuery } from "@tanstack/react-query";
import WordCloudContainer from "./WordCloudContainer";
import FeelGraphContainer from "./FeelGraphContainer";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";

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

    if(isLoading) return <h3>댓글 데이터 로딩 중임</h3>
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
    if(!data) return <h3>no data</h3>

    const {morpData :keyWordData, feelData} = data;
    
    return (
        <>
            <h3 id="feeling">댓글 감정 분석</h3>
            <FeelGraphContainer feelData={feelData} />
            <h3 id="keyword">댓글 키워드</h3>
            <WordCloudContainer keyWordData={keyWordData} />
        </>
    )
}