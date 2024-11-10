'use client';

import { fetchAnalyzedCommentData } from "@/@util/functions/fetch/fetchAnalyzedCommentData";
import useProcessError from "@/@util/hooks/useprocessError";
import ErrorContainer from "@/app/components/Error/ErrorContainer";
import { FilteredCommentType } from "@/types/comment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment-timezone";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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

    const [queryKeyState, setQueryKeyState] = useState<string|boolean>(videoId);

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

    const errorMessage = useProcessError(isError, error, "null");

    if(errorMessage) return <ErrorContainer errorMessage={errorMessage} />;

    return(
        <div className="w-100 text-center card-container mt-3 mb-3">
            {
                !data && !isLoading ? 
                returnHtmlByComponetType(type, setQueryKeyState):
                isLoading ?
                <>
                    <div 
                        className="spinner-border" 
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>
                    <p className="fw-bold m-0 mt-2 fw-bold">
                        영상 분석은 네트워크 환경에 따라 5분 정도 소요될 수 있습니다.
                    </p>
                </>:
                null
            }
        </div>
    )
}

function returnHtmlByComponetType(
    type : string|undefined,
    setQueryKeyState : Dispatch<SetStateAction<string | boolean>>
){
    const koreaTime = moment().tz('Asia/Seoul').format('YYYY-MM-DD');
    const daysDifference = moment(koreaTime).diff(moment(type), 'days');

    if(type === undefined){
        return (
            <>
                <p className="fw-bold">아직 아무도 분석하지 않은 영상이에요!</p>
                <button className="btn btn-dark" onClick={() => {
                    setQueryKeyState(true);
                }}>영상 분석하기</button>
            </>
        )
    }else if(typeof type === "string"){

        const [saveYear, saveMonth, saveDay] = type.split('-');

        return (
            <>
                <p className="fw-bold m-0">
                    {`${saveYear}년 ${saveMonth}월 ${saveDay}일`}에 분석된 영상입니다.
                </p>
                {
                    daysDifference >= 7 ?
                    <button className="mt-2 btn btn-dark" onClick={() => {
                        setQueryKeyState(true);
                    }}>따끈따끈한 데이터로 변경하기</button>:
                    <p className="m-0">일주일 이내에 분석된 데이터에요.</p>
                }
            </>
        )
    }else{
        return <p className="m-0 fw-bold">잘못된 접근입니다.</p>
    }
}