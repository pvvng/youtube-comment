import '@/app/css/card.css';

import React from 'react';
import { Session } from "next-auth";

interface ListcountainerProps {
    Heartnumber: number[]; // Heartnumber 배열의 타입
    session: Session | null; // 세션을 props로 받음
}

const Card = ({ Heartnumber, session }: ListcountainerProps) => {
    const HeartnumbList = Heartnumber;
    return (

        <div className="card col-12 mt-4">
            <div className="infos">
                <div className="image-container  me-5">
                    <img
                        src={session?.user?.image || "/temp-user.png"}
                        alt="user-profile"
                        className="user-image"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }} // 사각형 이미지
                    />
                </div>
                <div className="info">
                    <div>
                        <p className="name">{session?.user?.name || "이름 없음"}</p>
                        <p className="function">{session?.user?.email || "이메일 없음"}</p>
                    </div>
                    <div className="stats">
                        <p className="flex flex-col">
                            구독 목록
                            <span className="state-value">{HeartnumbList[0]}</span>
                        </p>
                        <p className="flex">
                            찜한 유투버
                            <span className="state-value">{HeartnumbList[1]}</span>
                        </p>
                        <p className="flex">
                            찜한 영상
                            <span className="state-value">{HeartnumbList[2]}</span>
                        </p>
                    </div>
                </div>
            </div>
            {/* 버튼 제거 */}
        </div>)
}


export default Card;