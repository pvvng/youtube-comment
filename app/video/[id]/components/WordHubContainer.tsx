'use client';

import { fetchAnalyzedCommentData } from "@/@util/functions/fetch/fetchAnalyzedCommentData";
import { FilteredCommentType } from "@/types/comment";
import { useQuery } from "@tanstack/react-query";

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

    console.log(data)
    console.log(isLoading)
    console.log(isError)

    return 123;
}