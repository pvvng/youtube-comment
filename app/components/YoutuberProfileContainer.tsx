'use client';

import { YoutuberDataType } from "@/types/youtuber";

export default function YoutuberProfileContainer(
    {youtuber} : {youtuber : YoutuberDataType}
){
    return (
        <div className="row w-100 row-center" style={{margin : 'auto'}}>
            <div className="col-sm-3 col-4">
                <img 
                    src={youtuber.thumbnail.url} 
                    alt={youtuber.name} 
                    width="100%" 
                    style={{borderRadius : '50%', maxWidth : '180px'}}
                />
            </div>
            <div className="col-sm-9 col-8">
                <span className="m-0 fw-bold fs-1">
                    {youtuber.name}{' '}
                </span>
                <a href={"https://www.youtube.com/" + youtuber.customUrl} target="_blank">
                    {youtuber.customUrl}
                </a>
                {/* <p className="m-0">{youtuber.description}</p> */}
                <p className="m-0">구독자 : {youtuber.subscriber} 명</p>                
                <p className="m-0">조회수 : {youtuber.totalview} 회</p>
                <p>영상수 : {youtuber.videoCount} 개</p>
            </div>
        </div>
    ) 
}