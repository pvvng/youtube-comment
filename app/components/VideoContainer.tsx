'use client';

import '@/app/css/video.css'
import { FilteredVideoSnippet, VideoStatisticsType } from "@/types/video";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faEye, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import toLocaleString from '@/@util/functions/toLocaleString';
import dateToString from '@/@util/functions/dateToString';

interface PropsType {
    video : FilteredVideoSnippet & VideoStatisticsType; 
    videoId : string;
}

export default function VideoContainer({video, videoId} : PropsType){

    const ICON_ARR = [
        {icon : faThumbsUp, type : video.likeCount, offset : '개'},
        {icon : faEye, type : video.viewCount, offset : '회'},
        {icon : faCommentDots, type : video.commentCount, offset : '개'},
    ]
    
    return (
        <div className="w-100" style={{margin : 'auto'}}>
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
                <div className="row row-center" style={{margin : 'auto'}}>
                    {ICON_ARR.map((ica, i) => 
                        <div key={ica.type + i} className="col-4 video-icon-container" style={{cursor : 'pointer'}}>
                            <FontAwesomeIcon icon={ica.icon} className='video-icon' />
                            <p className="m-0 video-tag">{toLocaleString(ica.type)} {ica.offset}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}