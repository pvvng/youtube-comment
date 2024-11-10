'use client'

import '@/app/css/video.css';
import { FilteredCommentType } from "@/types/comment";
import { useEffect, useRef, useState } from "react";
import { CommentCardContainer } from './CommentCardContainer';
import { useScrollStore, useVideoRenderStateStore } from '@/app/store';


export default function TopLikeContainer(
    {commentData, videoId} : {commentData : FilteredCommentType[], videoId : string}
){

    const [visibleData, setVisibleData] = useState<FilteredCommentType[]>([]);
    const [loadMore, setLoadMore] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);

    // 사이드바 스크롤을 위한 설정
    const commentContainerRef = useRef(null);
    const { setSectionRef } = useScrollStore();
    
    // video detail page render state
    const { setVideoComponentState } = useVideoRenderStateStore();

    // Intersection Observer (한무 스크롤) 설정
    useEffect(() => {
        setVideoComponentState(['comment', true]);

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
    
    useEffect(() => {
        if (loadMore && visibleData.length < commentData.length) {
            const nextData = commentData.slice(visibleData.length, visibleData.length + 10);
            setVisibleData(prev => [...prev, ...nextData]);
            setLoadMore(false); // 데이터를 불러온 후 다시 loadMore 상태를 false로 설정
        }
    },[loadMore])

    useEffect(() => {
        setSectionRef('comment', commentContainerRef);
    }, [setSectionRef]);

    // 처음에 10개의 데이터를 로드
    useEffect(() => {
        setVisibleData(commentData.slice(0, 10));
    }, [setSectionRef]);

    return (
        <div ref={commentContainerRef} id='comment' className="p-2 custom-scrollbar card-container mt-2">
            {visibleData.map((cd, i) => (
                <div key={cd.publishedAt.toString() + i}>
                    <CommentCardContainer cd={cd} videoId={videoId} />
                </div>
            ))}
            {
                visibleData.length === commentData.length &&
                <p className='m-0 fw-bold text-center'>마지막 댓글입니다.</p>
            }
            {/* 이 div가 스크롤 끝에 도달할 때마다 observer가 동작 */}
            <div ref={observerRef} style={{ height: "1px" }}></div>
        </div>
    )
}