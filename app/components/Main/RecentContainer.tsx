'use client';

import moment from "moment-timezone";
import { VideoCardType } from "./PopularList/CardListContainer";
import VideoCardContainer from "./VideoCardContainer";
import { useEffect, useState } from "react";

export default function RecentContainer(){

    const [recentArr, setRecentArr] = useState<VideoCardType[]>([]);
    
    const nowDate = moment().format('YYYYMMDD')
    // localstorage에 저장된 최근 확인한 비디오 불러오기
    useEffect(() => {
        let recent = localStorage.getItem('recent');
        if(recent) {
            let parsed :VideoCardType[] = JSON.parse(recent);
            // 3일 이전 데이터는 삭제
            let filteredParsed = parsed.filter(e => parseInt(e.date) < parseInt(nowDate) - 3)
            localStorage.setItem('recent', JSON.stringify(filteredParsed));
            // 뒤집어서 상태로 변경
            setRecentArr([...filteredParsed].reverse());
        }
    },[]);

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