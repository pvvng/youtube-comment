'use client';

import '@/app/css/recent.css';
import { VideoCardType } from '../Popularlist/CardListContainer';
import { useEffect, useState } from "react";
import VideoCardContainer from '@/app/main/components/Card/VideoCardContainer';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function RecentContainer(){

    const [recentArr, setRecentArr] = useState<VideoCardType[]>([]);

    useEffect(() => {
        let getRecent = localStorage.getItem('recent')
        if(getRecent){
            let parsed = JSON.parse(getRecent);
            setRecentArr(parsed.reverse());
        }
    },[])

    return(
        <div className="border mt-3" style={{borderRadius : '10px'}}>
            <div 
                className="bg-white card-header-container" 
                style={{borderTopLeftRadius : '10px', borderTopRightRadius : '10px'}}
            >
                <h6 className="fw-bold m-0">
                    <span className='mx-2 c-main'><FontAwesomeIcon icon={faClockRotateLeft} /></span>
                    최근 감상한 동영상
                </h6>
            </div>
            <hr className="m-0 mb-2"/>
            <div className="row w-100" style={{margin : 'auto'}}>
                {
                    recentArr.length > 0 ?
                    <VideoCardContainer cardData={recentArr} /> :
                    <div 
                        className="row-center" 
                        style={{display : 'flex', minHeight : 200}}
                    >
                        <p className="text-center m-0">감상한 영상이 없습니다.</p>
                    </div>
                }
            </div>
        </div>
    )
}