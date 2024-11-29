'use client';

import '@/app/css/card.css';

import React from 'react';
import { Session } from "next-auth";
import StatsContainer from './StatsContainert';

interface PropsType {
    session: Session; // 세션을 props로 받음
    heartList : {
        length: number;
        name: string;
    }[];
}

export default function MyPageUserProfile (
    { session, heartList }: PropsType
){
    return (
        <div className="p-2 p-md-4 border rounded box-shadowing">
            <div className="row row-center m-auto w-100">
                <div className="col-12 col-md-4 text-center">
                    <img
                        src={session?.user?.image || "/temp-user.png"}
                        alt="user-profile"
                        className="user-image w-100"
                        style={{maxWidth : 160, borderRadius : "50%"}}
                    />
                </div>
                <div className="col-12 col-md-8">
                    <h4 className='fw-bold'>{session.user?.name || "사용자님"}</h4>
                    <p className='m-0' style={{color : 'grey'}}>{session.user?.email || "이메일 없음"}</p>
                    <div className='d-none d-md-block'>
                        <StatsContainer heartList={heartList} />
                    </div>
                </div>
                <div className='d-block d-md-none'>
                    <StatsContainer heartList={heartList} />
                </div>
            </div>
            {/* 버튼 제거 */}
        </div>
    )
}