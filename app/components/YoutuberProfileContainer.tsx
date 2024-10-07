'use client';

import toLocaleString from "@/@util/functions/toLocaleString";
import { YoutuberDataType } from "@/types/youtuber";
import { useState } from "react";

export default function YoutuberProfileContainer(
    {youtuber} : {youtuber : YoutuberDataType}
){
    return (
        <div 
            className="row w-100 row-center p-2" 
            style={{margin : 'auto'}}
        >
            <div className="col-sm-3 col-4 text-center">
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
                <a 
                    href={"https://www.youtube.com/" + youtuber.customUrl} 
                    target="_blank"
                    className="a-tag"
                >
                    {youtuber.customUrl}
                </a>

                <p className="m-1">
                    <span className="fw-bold">구독자</span> 
                    {' '}{toLocaleString(youtuber.subscriber)} 명
                </p>                
                <p className="m-1">
                    <span className="fw-bold">조회수</span> 
                    {' '}{toLocaleString(youtuber.totalview)} 회
                </p>
                <p className="m-1">
                    <span className="fw-bold">영상수</span> 
                    {' '}{toLocaleString(youtuber.videoCount)} 개
                </p>
                <button className="btn btn-dark float-end">정보</button>
                <div style={{clear : 'both'}}></div>
            </div>
        </div>
    ) 
}