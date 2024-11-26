'use client'

import Listcountainer from '../components/listContainer';
import TestSubscriptions from './Subscriptions';
import fetchSubscribedYoutuberData from "@/@util/functions/fetch/fetchSubscribedYoutuberData";
import { useQuery } from "@tanstack/react-query";
import LoadingContianer from "@/app/components/Loading/LoadingContainer";
import ErrorContainer from "@/app/components/Error/ErrorContainer";
import { useDBUserStore } from "@/app/store";
import { useState } from 'react';
import Subscriptions from './Subscriptions';
import '@/app/css/mypage.css';

import HearteYoutuber from '../components/HearteYoutuber';
import Heartevideo from '../components/HearteVideo';
import useProcessError from '@/@util/hooks/useprocessError';


import { Session } from "next-auth";
import Card from '../components/card';

export default function MyPageHub({ session }: { session: Session | null }) {

    const { userdata } = useDBUserStore();
    
    

   

    const [selectedOptions, setSelectedOptions] = useState<boolean[]>([true, false, false]);

    /**마이페이지 분석 페이지 선택 함수 */
    const handleOptionSelect = (index: number) => {
        setSelectedOptions(prevOptions => {
            // 현재 선택된 옵션이 true인 경우 그대로 두고, false인 경우에만 상태를 변경
            if (prevOptions[index]) {
                return prevOptions; // 현재 선택된 옵션이 true면 상태를 변경하지 않음
            } else {
                const newOptions = [false, false, false]; // 모든 옵션을 false로 초기화
                newOptions[index] = true; // 클릭한 옵션만 true로 설정
                return newOptions;
            }
        });
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["subscription"],
        queryFn: () => fetchSubscribedYoutuberData(),
        refetchOnWindowFocus: false,
        // 캐시타임 1시간(3600000ms)
        gcTime: 3600000,
        staleTime: 3600000,
    });

    useProcessError(isError, error, "mc");

    if (isLoading) return <LoadingContianer height={300} />;

    if (!data || data.length === 0){
        return <ErrorContainer errorMessage="구독한 유튜버가 없습니다." />;
    }

    const Heartnumber = [data.length, userdata?.youtuberHeart.length ?? 0,  userdata?.videoHeart.length ?? 0];

    if (!userdata){
        return <ErrorContainer errorMessage="회원 정보를 확인할 수 없습니다." />;
    }

    return (
        <>
        
            <Card session={session}  Heartnumber={Heartnumber}></Card>
        
            <Listcountainer Heartnumber={Heartnumber}  onOptionSelect={handleOptionSelect} />

            
           { selectedOptions[0] &&<Subscriptions youtuber={data} />}
           { selectedOptions[1] && <HearteYoutuber/>}
           { selectedOptions[2] && <Heartevideo/>}
      
        </>
    )
}