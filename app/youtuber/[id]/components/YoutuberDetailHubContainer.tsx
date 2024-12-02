'use client';

import { useQuery } from "@tanstack/react-query";
import fetchGetDBYoutuberData from "@/@util/functions/fetch/GET/fetchGetDBYoutuberData";
import useProcessError from "@/@util/hooks/useprocessError";
import LoadingContianer from "@/app/components/Loading/LoadingContainer";
import YoutuberProfileContainer from "@/app/components/Youtuber/YoutuberProfileContainer";
import YoutuberDetailKeywordContainer from "./YoutuberDetailKeywordContainer";
import YoutuberDetailSentimentContainer from "./YoutuberDetailSentimentContainer";
import ErrorContainer from "@/app/components/Error/ErrorContainer";

export default function YoutuberDetailHubContainer(
    {channelId} : {channelId : string}
){

    const { data, isLoading, isError, error } = useQuery({
        queryKey : ['DByoutuberData', channelId],
        queryFn : () => fetchGetDBYoutuberData(channelId),
        refetchOnWindowFocus : false,
        // 캐시타임 1시간(3600000ms)
        gcTime : 0,
        staleTime : 0,
    })
    
    useProcessError(isError, error, "mc");

    if(data === undefined || isLoading) { 
        return <LoadingContianer height={'calc(100vh - 100px)'} />
    }else if (data === null){
        return <ErrorContainer errorMessage="데이터가 존재하지 않습니다." />
    }

    const { youtuber, extra } = data;
    const { keyword, sentiment, popularity } = extra;

    return (
        <div className="container">
            <YoutuberProfileContainer youtuber={youtuber} />
            <hr />
            {
                !sentiment && !keyword ?
                <ErrorContainer errorMessage="분석된 데이터가 존재하지 않습니다." />:
                <>
                    <YoutuberDetailSentimentContainer sentiment={sentiment} youtuberName={youtuber.name} />
                    <YoutuberDetailKeywordContainer keyword={keyword} youtuberName={youtuber.name} />   
                </>

            }
        </div>
    )
}