'use client';

import { RecentVideoType } from "@/@util/hooks/useUpdateRecentVideoLocalStorage";
import VideoCardContainer from "../VideoCardContainer";
import { useEffect, useState } from "react";
import axios from "axios";

export interface VideoCardType extends RecentVideoType{};

export default function CardListContainer(){
    const data = "채팅 개너무하네 풍신님이랑 이미 큐 돌리고 있는데 히키킹보고싶당 ㅇㅈㄹ ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ"

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