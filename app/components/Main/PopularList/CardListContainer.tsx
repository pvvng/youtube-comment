'use client';

import { RecentVideoType } from "@/@util/hooks/useUpdateRecentVideoLocalStorage";
import VideoCardContainer from "../VideoCardContainer";
import { useEffect, useState } from "react";
import axios from "axios";

export interface VideoCardType extends RecentVideoType{};

export default function CardListContainer(){
    const data = "사랑해 자기야"

    return(
        <div 
            className="p-2 border" 
            style={{borderRadius : '10px', background : '#eee'}}
        >
            <button onClick={async () => {
                let res = await axios.post(
                    'http://127.0.0.1:5000/receive_data', data, {
                    headers: {
                        'Content-Type': 'application/json'  // JSON 형식으로 헤더 지정
                    }
                })
                console.log(res.data)
            }}>테스트</button>
            <h5 className="fw-bold m-0">인기 유튜버</h5>
             <hr />
            <h5 className="fw-bold m-0">인기 영상</h5>
            <hr />
        </div>
    )
}