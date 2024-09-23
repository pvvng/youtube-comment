'use client'

import { FilteredCommentType } from "@/types/comment";
import { useEffect, useRef, useState } from "react";

export default function TopLikeContainer(
    {commentData, videoId} : {commentData : FilteredCommentType[], videoId : string}
){

    const [visibleData, setVisibleData] = 
    useState<FilteredCommentType[]>([]);
    const [loadMore, setLoadMore] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);

    // 처음에 10개의 데이터를 로드
    useEffect(() => {
        setVisibleData(commentData.slice(0, 10));
    }, []);

    useEffect(() => {
        if (loadMore && visibleData.length < commentData.length) {
            const nextData = commentData.slice(visibleData.length, visibleData.length + 10);
            setVisibleData(prev => [...prev, ...nextData]);
            setLoadMore(false); // 데이터를 불러온 후 다시 loadMore 상태를 false로 설정
        }
    },[loadMore])

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
            className="p-2 border rounded-2" 
            style={{
                background :'#eee', 
                height : '300px', 
                overflowY : 'scroll'
            }}
        >
            {visibleData.map((cd, i) => (
                <div key={cd.publishedAt.toString() + i}>
                    <CommentCardContainer cd={cd} videoId={videoId} />
                </div>
            ))}
            {
                visibleData.length === commentData.length &&
                <p>이게 마지막 댓글이었음</p>
            }
            {/* 이 div가 스크롤 끝에 도달할 때마다 observer가 동작 */}
            <div ref={observerRef} style={{ height: "1px" }}></div>
        </div>
    )
}

export function CommentCardContainer(
    { cd, videoId }: { cd: FilteredCommentType, videoId: string }
) {
    // 줄바꿈 단어 존재 시 단어 분리
    let textArr: string[] = [...cd.text.split('\n')];
    const timestampRegex = /(\d{1,2}):(\d{2})/g;

    // jsx 반환 함수
    /** 타임 스탬프를 a태그로 변경하여 jsx로 반환하는 함수 */
    const convertTextWithTimestamps = (text: string) => {
        return text.split(' ').map((word, i) => {
            const match = word.match(timestampRegex);
            if (match) {
                const [minutes, seconds] = match[0].split(':');
                const timeInSeconds = parseInt(minutes) * 60 + parseInt(seconds);
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}&t=${timeInSeconds}s`;

                // 타임스탬프를 클릭 가능한 a 태그로 변환
                return (
                    <a
                        key={i}
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'blue', textDecoration: 'underline' }}
                    >
                        {match[0]}
                    </a>
                );
            }

            // 일반 텍스트는 span으로 렌더링
            return <span key={i}> {word} </span>;
        });
    };

    return (
        <div className="card p-2 mb-2">
            <div className="row row-center w-100" style={{ margin: 'auto' }}>
                <div className="col-2 col-lg-1">
                    <img
                        src={cd.autohorProfileImageUrl}
                        width="100%"
                        alt={cd.authorDisplayName}
                        style={{ borderRadius: '50%', maxWidth: '50px' }}
                    />
                </div>
                <div className="col-10 col-lg-11">
                    <div className="row row-center w-100" style={{ margin: 'auto' }}>
                        <div className="col-12 col-lg-8">
                            <p className="m-0 fs-5 fw-bold">{cd.authorDisplayName}</p>
                            {
                                textArr.map((line, index) => (
                                    <p className="m-0" key={index}>
                                        {convertTextWithTimestamps(line)}
                                    </p>
                                ))
                            }
                        </div>
                        <div className="col-12 col-lg-4">
                            <p className="m-0">❤️{cd.likeCount}</p>
                            <p className="m-0">{cd.publishedAt.toString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
