'use client'

import '@/app/css/mypage.css';

import { useDBUserStore, useMyPageListStore } from "@/app/store";
import { useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useRouter } from 'next/navigation';
import MyPageListcountainer from './MyPageListContainer';
import fetchSubscribedYoutuberData from "@/@util/functions/fetch/fetchSubscribedYoutuberData";
import LoadingContianer from "@/app/components/Loading/LoadingContainer";
import useProcessError from '@/@util/hooks/useprocessError';
import MyPageUserProfile from './MyPageUserProfile';
import { UserHeartedType } from '@/types/userdata';
import MyPageCardContainer from './MyPageCardContainer';
import ExitBtn, { SignOutBtn } from '@/app/components/SignItems/SignBtn';

export interface MyPageCardDataType extends UserHeartedType {
    publisedAt?: string;
}

export interface CardDataArrType {
    type: "video" | "youtuber";
    data: MyPageCardDataType[];
}

export default function MyPageHubContainer(
    { session }: { session: Session | null }
) {

    const { userdata } = useDBUserStore();
    const { selectedOption } = useMyPageListStore();
    const router = useRouter();

    // 구독 목록 불러오기
    const { data: youtuber, isLoading, isError, error } = useQuery({
        queryKey: ["subscription"],
        queryFn: () => fetchSubscribedYoutuberData(),
        refetchOnWindowFocus: false,
        // 캐시타임 1시간(3600000ms)
        enabled: !!session,
        gcTime: 3600000,
        staleTime: 3600000,
    });

    useProcessError(isError, error, "mc");

    // 로그인 하지 않은 유저는 메인 페이지로 라우팅
    useEffect(() => {
        if (!session) {
            alert("로그인 후 이용 가능한 페이지입니다.");
            router.push('/main');
        }
    }, [session, router]);

    const heartList = [
        { length: youtuber?.length || 0, name: "구독 목록" },
        { length: userdata?.youtuberHeart.length || 0, name: "찜한 유튜버" },
        { length: userdata?.videoHeart.length || 0, name: "찜한 영상" }
    ];

    const cardDataArr : CardDataArrType[] = [
        { type: "youtuber", data: youtuber?.map(v => {
            return {
                id: v.channelId,
                name: v.title,
                thumbnailUrl: v.thumbnails,
                publisedAt: v.publishedAt
            }
        }) || [] },
        { type: "youtuber", data: userdata?.youtuberHeart || [] },
        { type: "video", data: userdata?.videoHeart || [] },
    ]

    if (!session) return <LoadingContianer height={'calc(100vh - 100px)'} />;
    if (isLoading) return <LoadingContianer height={'calc(100vh - 100px)'} />;

    return (
        <div className='p-sm-3 p-2'>
            <MyPageUserProfile session={session} heartList={heartList} />
            <MyPageListcountainer heartList={heartList} />
            {
                cardDataArr.map((so, i) =>
                    selectedOption[i] ? <MyPageCardContainer key={i} cardData={so.data} type={so.type} /> : null
                )
            }
            <div className='card-container text-center mt-2'>
                <SignOutBtn />
                <ExitBtn />
            </div>
        </div>
    )
}