'use client';

import { RecentVideoType } from "@/@util/hooks/useUpdateRecentVideoLocalStorage";
import VideoCardContainer from "../VideoCardContainer";
import { useEffect, useState } from "react";

export interface VideoCardType extends RecentVideoType{};

export default function CardListContainer(){

    return(
        <div 
            className="p-2 border" 
            style={{borderRadius : '10px', background : '#eee'}}
        >
            <h5 className="fw-bold m-0">인기 유튜버</h5>
            <hr />
            <h5 className="fw-bold m-0">인기 영상</h5>
            <hr />
        </div>
    )
}