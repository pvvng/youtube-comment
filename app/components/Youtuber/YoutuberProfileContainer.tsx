'use client';

import { YoutuberDataType } from "@/types/youtuber";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toLocaleString from "@/@util/functions/toLocaleString";
import YoutuberInfoContainer from "./YoutuberInfoContainer";
import fetchUpdateYoutuberPopularity from "@/@util/functions/fetch/fetchUpdateYoutuberPopularity";
import fetchPostDBYoutuberData from "@/@util/functions/fetch/fetchPostDBYoutuberData";
import HeartBtn from "../HeartBtn/HeartBtn";
import Image from 'next/legacy/image';

export const OVERLAY_Z_INDEX = 10000;

export default function YoutuberProfileContainer(
    {youtuber} : {youtuber : YoutuberDataType}
){ 
    // 정보 알림창 띄우거나 죽이는 state
    const [infoClicker, setInfoClicker] = 
    useState<[number, number, 'visible' | 'hidden']>([0, -OVERLAY_Z_INDEX, 'hidden']);
    // 로딩 중 skeleton ui 로드를 위한 감시 상태 
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const { mutate: mutateYoutuberPopularity } = useMutation(
        { 
            mutationFn : () => fetchUpdateYoutuberPopularity(youtuber),
            onError: (error) => {
                console.error('Update failed:', error);
            },
        }
    );

    const { mutate: mutateYoutuberData } = useMutation(
        { 
            mutationFn : () => fetchPostDBYoutuberData(youtuber),
            onError: (error) => {
                console.error('Update failed:', error);
            },
        }
    );

    useEffect(() => {
        mutateYoutuberPopularity();
        mutateYoutuberData();
    }, [mutateYoutuberPopularity, youtuber]);

    return (
        <div style={{position : 'relative', overflow : 'hidden'}}>
            {/* 정보 알림창 */}
            <YoutuberInfoContainer 
                name={youtuber.name}
                info={youtuber.description} 
                infoClicker={infoClicker}
                setInfoClicker={setInfoClicker} 
            />
            <div 
                className="mt-3 row w-100 row-center p-2" 
                style={{margin : 'auto'}}
            >
                <div className="col-sm-3 col-12 text-center mb-sm-0 mb-3">
                    {/* 프로필 사진 */}
                    <div style={{margin : 'auto', maxWidth : 180, position: 'relative'}}>
                        {/* Skeleton UI */}
                        {
                            !isImageLoaded &&
                            <div className="skeleton-container" style={{borderRadius : "50%"}}>
                                <div className="video-skeleton" style={{borderRadius : "50%"}} />
                            </div>
                        }
                        <Image 
                            src={youtuber.thumbnail.url} 
                            alt={youtuber.name} 
                            width={180}
                            height={180}
                            layout="responsive"
                            priority
                            style={{borderRadius : '50%'}}
                            onLoadingComplete={() => setIsImageLoaded(true)}
                        />
                    </div>
                </div>
                <div className="col-sm-9 col-12">
                    {/* 유튜버 이름 */}
                    <div className="mb-sm-0 mb-3">
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
                    </div>
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
                    <div className="mt-2 w-100">
                        <button 
                            className="btn btn-dark justify-content-start" 
                            onClick={() => {setInfoClicker([10000, 1, 'visible'])}}
                        >정보</button>
                    </div>

                    {/* HeartBtn 절대 위치 */}
                    <div style={{ position: 'absolute', top: 15, right: 15 }}>
                        <HeartBtn 
                            id={youtuber.channelId} 
                            name={youtuber.name} 
                            thumbnailUrl={youtuber.thumbnail.url} 
                            type="youtuber" 
                        />
                    </div>
                </div>
            </div>
        </div>
    ) 
}