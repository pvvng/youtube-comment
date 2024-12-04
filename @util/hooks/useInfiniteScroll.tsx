'use client';

import { useEffect, useRef, useState } from "react";

/**
 * 배열을 인자로 받아 무한 스크롤을 설정하는 커스텀 훅
 * 
 * @param arrayData : 무한 스크롤을 설정할 배열, 제네릭 타입이 지정됨
 * 
 * @returns visibleData : 현재 view에 보이는 데이터
 * @returns observerRef : 최하단 div에 부착할 ref
 */
export default function useInfiniteScroll<T>(arrayData : T[]){

    const [visibleData, setVisibleData] = useState<T[]>([]);
    const [loadMore, setLoadMore] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);

    // 최초 마운트 시 상단 10개 데이터만 렌더링 
    useEffect(() => {
        setVisibleData(arrayData.slice(0,10));
    },[]);

    // 끝에 가면 데이터 새로 추가
    useEffect(() => {
        if(loadMore && visibleData.length < arrayData.length){
            const nextData = arrayData.slice(visibleData.length, visibleData.length + 10);
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

    return {visibleData, observerRef};
}