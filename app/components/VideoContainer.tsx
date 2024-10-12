'use client';

import '@/app/css/video.css'
import { FilteredVideoSnippet, VideoStatisticsType } from "@/types/video";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faCommentDots, faSeedling } from '@fortawesome/free-solid-svg-icons'
import toLocaleString from '@/@util/functions/toLocaleString';
import dateToString from '@/@util/functions/dateToString';
import { useVideoRenderStateStore } from '../store';
import { useEffect } from 'react';

interface PropsType {
    video : FilteredVideoSnippet & VideoStatisticsType; 
    videoId : string;
}

export default function VideoContainer({video, videoId} : PropsType){

    // video detail page render state
    const { setVideoComponentState } = useVideoRenderStateStore();

    useEffect(() => {
        setVideoComponentState(['video', true]);
    },[]);

    // 아이콘 hover 상태 관리
    const ICON_ARR = [
        {icon : faThumbsUp, name : '좋아요', type : video.likeCount, offset : '개'},
        {icon : faSeedling, name : '조회수', type : video.viewCount, offset : '회'},
        {icon : faCommentDots, name : '댓글수', type : video.commentCount, offset : '개'},
    ]
    
    return (
        <div className="w-100 mt-3" style={{margin : 'auto'}}>
            <div className="w-100" style={{margin : 'auto', maxWidth : '640px'}}>
                <img 
                    src={video.thumbnails.url} 
                    width="100%" 
                    alt="thumbnail" 
                    style={{borderRadius : '20px'}}
                />
            </div>
            <div className="text-center p-3">
                <h5 className="fw-bold m-0 mt-3 mb-3">
                    <a 
                        href={`https://www.youtube.com/watch?v=${videoId}`}
                        target="_blank"
                        className="a-tag"
                    >{video.title}</a>
                </h5>
                <p>{dateToString(video.publishedAt)}</p>
                <div 
                    className="row row-center w-100 text-center mt-3 mb-3" 
                    style={{margin : 'auto', position : 'relative'}}
                >
                    {
                        ICON_ARR.map((ica, i) => (
                            <div
                                key={ica.type + i}
                                className="col-4 mb-0 icon-item"
                                style={{ cursor: 'pointer', position: 'relative' }}
                            >
                                <FontAwesomeIcon icon={ica.icon} />
                                <p className='m-0'>{ica.name}</p>

                                {/* hover 상태일 때만 라벨 표시 */}
                                <div 
                                    className="tooltip" 
                                    style={{width : '125%', maxWidth : 180}}
                                >
                                    <p className='m-0 text-center'>
                                        {toLocaleString(ica.type) + ica.offset}
                                    </p> 
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}