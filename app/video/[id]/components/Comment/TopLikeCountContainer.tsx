'use client'

import '@/app/css/video.css';

import { FilteredCommentType } from "@/types/comment";
import { CommentCardContainer } from './CommentCardContainer';
import useInfiniteScroll from '@/@util/hooks/useInfiniteScroll';

export default function TopLikeContainer(
    {commentData, videoId} : {commentData : FilteredCommentType[], videoId : string}
){

    // 무한 스크롤 지정
    const {visibleData, observerRef} = useInfiniteScroll(commentData);

    return (
        <div id='comment' className="p-2 custom-scrollbar card-container mt-2">
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