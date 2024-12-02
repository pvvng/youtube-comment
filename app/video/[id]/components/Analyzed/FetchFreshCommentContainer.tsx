'use client';

import { fetchAnalyzedCommentData } from "@/@util/functions/fetch/POST/fetchAnalyzedCommentData";
import { FilteredCommentType } from "@/types/comment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AnalyzingButtonByComponetType from "./AnalyzingButtonByComponetType";
import useProcessError from "@/@util/hooks/useprocessError";
import ErrorContainer from "@/app/components/Error/ErrorContainer";
import SideLoadingSpinner from "@/app/components/Loading/SideLodaingContainer";

const WAITING_MENT = `영상 분석은 네트워크 환경과 댓글 수에 따라 5분 정도 소요될 수 있습니다.`
const CHECKING_BOT = '봇인지 확인 중 입니다.'

interface PropsType{
    commentData: FilteredCommentType[];
    videoId : string;
    channelId: string;
    type ?: string;
}

export default function FetchFreshCommentContainer(
    {commentData, videoId, channelId, type} : PropsType
){
    const queryClient = useQueryClient();

    // 쿼리 상태 감시 상태
    const [queryKeyState, setQueryKeyState] = useState<string|boolean>(videoId);
    // 봇인지 감시하는 상태
    const [isBot, setIsBot] = useState<boolean>(false);

    const { data, isLoading, isError, isSuccess, error } = useQuery({
        queryKey : ['analyzedComment', queryKeyState],
        queryFn : () => fetchAnalyzedCommentData(commentData, videoId, channelId),
        refetchOnWindowFocus : false,
        // 캐시 안 함
        gcTime : 0,
        staleTime : 0,
        // queryKeyState가t boolean true 일때만 쿼리 실행
        enabled: queryKeyState === true
    });

    // 쿼리가 성공적으로 완료되고 데이터가 존재하면 한 번만 새로고침
    useEffect(() => {
        if (isSuccess && data) {
            // WordHubContainer의 쿼리 무효화
            queryClient.invalidateQueries({ 
                queryKey: ['DBanalyzedComment', videoId] 
            });
        }
    }, [isSuccess, data, queryClient]);

    // 에러처리
    const errorMessage = useProcessError(isError, error, "null");

    if(errorMessage) return <ErrorContainer errorMessage={errorMessage} />;

    return(
        <div className="w-100 text-center card-container mt-3 mb-3">
            {
                isBot ?
                <FreshDataLoadingSpinner text={CHECKING_BOT} />:
                (!data && !isLoading) ? 
                <AnalyzingButtonByComponetType type={type} setQueryKeyState={setQueryKeyState} setIsBot={setIsBot} />:
                isLoading ?
                <FreshDataLoadingSpinner text={WAITING_MENT} />:
                null
            }
        </div>
    )
}

function FreshDataLoadingSpinner({text} : {text : string}){
    return (
        <>
            <SideLoadingSpinner />
            <p className="fw-bold m-0 mt-2 fw-bold">
                {text}
            </p>
        </>
    )
}