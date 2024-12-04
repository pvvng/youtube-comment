'use client';

import useInfiniteScroll from "@/@util/hooks/useInfiniteScroll";
import { PosType } from "@/types/word";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function KeywordListContainer(
    {keywordData} : {keywordData : PosType[]}
){
    // 무한 스크롤 지정
    const {visibleData, observerRef} = useInfiniteScroll(keywordData);

    return (
        <div 
            className="card-container custom-scrollbar mt-sm-0 mt-4" 
            style={{ height : '250px', overflowY : 'scroll'}}
        >
            <p className="m-0 fw-bold">키워드 순위</p>
            {visibleData.map((kd, i) => 
                <div key={kd.text + kd.value + i}>
                    <div className="card-container text-center mt-2">
                        <span className="fw-bold float-start">
                            {i < 3 ?<FontAwesomeIcon icon={faCrown} />:i + 1 }{' '}
                        </span>
                        <span>{kd.text}</span>
                        <span className="float-end">{kd.value}회 언급</span>
                        <div style={{clear : 'both'}}/>
                    </div>
                </div>
            )}
            <div ref={observerRef} style={{ height: "1px" }}></div>
        </div>
    )
}