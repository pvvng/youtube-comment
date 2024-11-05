'use client';

import fetchGetDBYoutuberData from "@/@util/functions/fetch/fetchGetDBYoutuberData";
import useProcessError from "@/@util/hooks/useprocessError";
import YoutuberProfileContainer from "@/app/components/YoutuberProfileContainer";
import FeelGraphContainer from "@/app/video/[id]/components/Analyzed/FeelGraphContainer";
import KeywordListContainer from "@/app/video/[id]/components/Analyzed/Word/KeywordListContainer";
import WordCloudContainer from "@/app/video/[id]/components/Analyzed/Word/WordCloudContainer";
import { useQuery } from "@tanstack/react-query";

export default function YoutuberDetailHubContainer(
    {channelId} : {channelId : string}
){

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey : ['DByoutuberData', channelId],
        queryFn : () => fetchGetDBYoutuberData(channelId),
        refetchOnWindowFocus : false,
        // 캐시타임 1시간(3600000ms)
        gcTime : 3600000,
        staleTime : 3600000,
    })

    useProcessError(isError, error, "mc");

    if(data === undefined || isLoading) { 
        return (
            <p className="text-center">로딩중입니다.</p>
        )
    }else if (data === null){
        return (
            <p className="text-center">저장된 데이터가 없습니다.</p>
        )
    }

    const { youtuber, extra } = data;
    const { keyword, sentiment, popularity } = extra;

    return (
        <div className="container">
            <YoutuberProfileContainer youtuber={youtuber} />
            <hr />
            {
                sentiment ?
                <FeelGraphContainer feelData={sentiment} type={youtuber.name} />:
                null
            }
            <div id="keyword" className='card-container mt-3 mb-3' >
                <p className='fw-bold'>{`${youtuber.name} 채널 키워드 분석`}</p>
                <div className="w-100 row row-center" style={{margin : 'auto'}}>
                    {
                        keyword ?
                        <>
                            <div className="col-12 col-lg-6">
                                <WordCloudContainer keyWordData={keyword} />
                            </div>
                            <div className="col-12 col-lg-6">
                                <KeywordListContainer keywordData={keyword} />
                            </div>   
                        </>: null
                    }
                </div>
            </div>
            <div className="card-container text-center mb-3">
                <button className="btn btn-dark" onClick={() => refetch()}>
                    따끈따끈한 데이터로 변경하기
                </button>
            </div>
        </div>
    )
}