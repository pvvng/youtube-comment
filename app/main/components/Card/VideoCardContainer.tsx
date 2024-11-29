'use client';

import '@/app/css/recent.css';
import { VideoCardType } from '@/app/main/components/Popularlist/CardListContainer';
import { useRouter } from "next/navigation";
import Image from 'next/legacy/image';

export default function VideoCardContainer(
    {cardData} : {cardData : VideoCardType[]}
){
    const router = useRouter();

    return(
        cardData.map((data, i) => {
            return (
                <div 
                    className="col-12 col-sm-6 col-lg-3 recent-card-container mb-2" 
                    key={data.thumbnailUrl +i}
                    onClick={() => {
                        router.push(`/video/${data.videoId}`);
                    }}
                >
                    <div 
                        className="card-container mb-1 p-2" 
                        style={{cursor : 'pointer', border : '1px solid #c7c8c9'}}
                    >
                        <div className="row row-center w-100" style={{margin : 'auto'}}>
                            {/* 썸네일 */}
                            <div className="col-6 col-sm-12">
                                <div style={{margin : 'auto', width : '100%'}}>
                                    <Image
                                        src={data.thumbnailUrl} 
                                        alt={data.videoTitle} 
                                        width={170}
                                        height={95} 
                                        layout='responsive'
                                        priority
                                        style={{borderRadius : '10px'}}
                                    />
                                </div>
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