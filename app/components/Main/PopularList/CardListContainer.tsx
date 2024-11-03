'use client';

import { RecentVideoType } from "@/@util/hooks/useUpdateRecentVideoLocalStorage";

export interface VideoCardType extends RecentVideoType{};

export default function CardListContainer(){

    return(
        <div 
            className="p-2 border" 
            style={{borderRadius : '10px'}}
        >
            <h6 className="fw-bold m-0">인기 유튜버</h6>
            <hr className="m-0 mt-2 mb-3" />
            <h6 className="fw-bold m-0">인기 영상</h6>
            <hr className="m-0 mt-2 mb-3" />
        </div>
    )
}