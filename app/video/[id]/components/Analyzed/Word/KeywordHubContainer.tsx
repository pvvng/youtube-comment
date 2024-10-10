import { PosType } from "@/types/word";
import WordCloudContainer from "./WordCloudContainer";
import KeywordListContainer from "./KeywordListContainer";
import { useEffect, useRef } from "react";
import { useScrollStore } from "@/app/store";

export default function KeywordHubContainer(
    {keyWordData} : {keyWordData : PosType[]}
){
    // 사이드바 스크롤을 위한 설정
    const keywordContainerRef = useRef(null);
    const setSectionRef = useScrollStore((state) => state.setSectionRef);
    
    useEffect(() => {
        setSectionRef('keyword', keywordContainerRef);
    }, [setSectionRef]);

    return (
        <div ref={keywordContainerRef} id="keyword" className='card-container mt-3 mb-3' >
            <p className='fw-bold'>키워드 분석</p>
            <div className="w-100 row row-center" style={{margin : 'auto'}}>
                <div className="col-12 col-lg-6">
                    <WordCloudContainer keyWordData={keyWordData} />
                </div>
                <div className="col-12 col-lg-6">
                    <KeywordListContainer keywordData={keyWordData} />
                </div>
            </div>
    </div>
    )
}