'use client';

import moment from "moment-timezone";
import { VideoCardType } from "./PopularList/CardListContainer";
import VideoCardContainer from "./VideoCardContainer";
import { useEffect, useState } from "react";

export default function RecentContainer(){

    const [recentArr, setRecentArr] = useState<VideoCardType[]>([]);

    useEffect(() => {
        let getRecent = localStorage.getItem('recent')
        if(getRecent){
            let parsed = JSON.parse(getRecent);
            setRecentArr(parsed);
        }
    },[])

    return(
        <div className="border" style={{background : '#eee', borderRadius : '10px'}}>
            <div 
                className="bg-white pt-2 pb-2" 
                style={{borderTopLeftRadius : '10px', borderTopRightRadius : '10px'}}
            >
                <h6 className="fw-bold m-0 text-center">최근에 확인한 영상</h6>
            </div>
            <div className="row row-center w-100" style={{margin : 'auto'}}>
                {
                    recentArr.length > 0 ?
                    <VideoCardContainer cardData={recentArr} /> :
                    <p>최근 확인한 영상이 없습니다.</p>
                }
            </div>
        </div>
    )
}