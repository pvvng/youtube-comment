'use client';

import { FilteredVideoSnippet, VideoStatisticsType } from "@/types/video";

interface PropsType {
    video : FilteredVideoSnippet & VideoStatisticsType; 
    videoId : string;
}

export default function VideoContainer({video, videoId} : PropsType){
    return (
        <div className="row row-center" style={{margin : 'auto'}}>
            <div className="col-12 col-md-6">
                <img 
                    src={video.thumbnails.url} 
                    width="100%" 
                    alt="thumbnail" 
                    style={{borderRadius : '20px'}}
                />
            </div>
            <div className="col-12 col-md-6 text-center">
                <h5 className="fw-bold">
                    <a 
                        href={`https://www.youtube.com/watch?v=${videoId}`}
                        target="_blank"
                    >{video.title}</a>
                </h5>
                <div className="row row-center" style={{margin : 'auto'}}>
                    <div className="col-4">👍{video.likeCount}</div>
                    <div className="col-4">👀{video.viewCount}</div>
                    <div className="col-4">💬{video.commentCount}</div>
                </div>
                <p className="m-0 mt-2">{video.publishedAt}</p>
            </div>
        </div>
    )
}