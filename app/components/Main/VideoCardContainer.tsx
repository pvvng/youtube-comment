'use client';

import { VideoCardType } from "./PopularList/CardListContainer";
import { useRouter } from "next/navigation";

export default function VideoCardContainer(
    {cardData} : {cardData : VideoCardType[]}
){
    const router = useRouter();

    return(
        cardData.map((data, i) => {
            return (
                <div 
                    className="col-12 col-sm-6 col-lg-4" 
                    key={data.thumbnailUrl +i}
                    onClick={() => {
                        router.push(`/video/${data.videoId}`);
                    }}
                >
                    <div 
                        className="card mt-2 p-2" 
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
                            <div 
                                className="col-6 col-sm-12"
                                style={{
                                    // 부모 요소 크기를 넘기면 잘리도록 설정
                                    overflow: 'hidden',           
                                    // 말줄임표(...) 적용
                                    textOverflow: 'ellipsis',     
                                    // 한 줄로 제한
                                    whiteSpace: 'nowrap',         
                                }}
                            >
                                <span className="fs-5 fw-bold">
                                    {data.channelTitle}
                                </span>
                                <br/>
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