'use client';

import { PosType } from "@/types/word";
import { useEffect, useRef, useState } from "react";

export default function KeywordListContainer(
    {keywordData} : {keywordData : PosType[]}
){
    const [visibleData, setVisibleData] = useState<PosType[]>([]);
    const [loadMore, setLoadMore] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);

    // 최초 마운트 시 상단 10개 데이터만 렌더링 
    useEffect(() => {
        setVisibleData(keywordData.slice(0,10));
    },[]);

    // 끝에 가면 데이터 새로 추가
    useEffect(() => {
        if(loadMore && visibleData.length < keywordData.length){
            const nextData = keywordData.slice(visibleData.length, visibleData.length + 10);
            setVisibleData(prev => [...prev, ...nextData]);
            setLoadMore(false); // 데이터를 불러온 후 다시 loadMore 상태를 false로 설정
        }
    }, [loadMore]);

    // Intersection Observer (한무 스크롤) 설정
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setLoadMore(true); // 끝에 도달하면 추가 데이터를 불러오기 위해 상태 업데이트
            }
        });
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, []);

    return (
        <div 
            className="card-container custom-scrollbar2 mt-sm-0 mt-4" 
            style={{height : ' 350px', overflowY : 'scroll'}}
        >
            <p className="m-0 fw-bold">키워드 순위</p>
            {visibleData.map((kd, i) => 
                <div key={kd.text + kd.value + i}>
                    <div className="card-container mt-2">
                        <span className="fw-bold fs=5">{i+1 + ' '}</span>
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