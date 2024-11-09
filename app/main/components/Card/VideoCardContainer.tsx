'use client';

import '@/app/css/recent.css';
import { VideoCardType } from '@/app/main/components/Popularlist/CardListContainer';
import { useRouter } from "next/navigation";

export default function VideoCardContainer(
    {cardData} : {cardData : VideoCardType[]}
){
    const router = useRouter();

    return(
        cardData.map((data, i) => {
            return (
                <div 
                    className="col-12 col-sm-6 col-lg-3 recent-card-container" 
                    key={data.thumbnailUrl +i}
                    onClick={() => {
                        router.push(`/video/${data.videoId}`);
                    }}
                >
                    <div 
                        className="card mt-2 mb-1 p-2" 
                        style={{cursor : 'pointer'}}
                    >
                        <div className="row row-center w-100" style={{margin : 'auto'}}>
                            {/* 썸네일 */}
                            <div className="col-6 col-sm-12">
                                <img 
                                    src={data.thumbnailUrl} 
                                    alt={data.videoTitle} 
                                    width="100%" 
                                    style={{borderRadius : '10px'}}
                                />
                            </div>
                            <div className="col-6 col-sm-12 text-container">
                                <h6 className="m-0 mt-sm-2 mb-sm-2 fw-bold">
                                    {data.channelTitle}
                                </h6>
                                <span>
                                    {data.videoTitle}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    )
}