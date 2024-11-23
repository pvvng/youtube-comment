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

export default function MyPageHub() {

    const { userdata } = useDBUserStore();
    
    const [selectedOptions, setSelectedOptions] = useState<boolean[]>([false, false, false]);

    /**마이페이지 분석 페이지 선택 함수 */
    const handleOptionSelect = (index: number) => {
        setSelectedOptions(prevOptions => {
            const newOptions = [false, false, false];
            newOptions[index] = !prevOptions[index]; // 현재 선택된 옵션의 상태를 토글
            return newOptions;
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

    if (!userdata || userdata.youtuberHeart.length === 0){
        return <ErrorContainer errorMessage="구독한 유튜버가 없습니다." />;
    }

    return (
        <>
            <Listcountainer Heartnumber={Heartnumber}  onOptionSelect={handleOptionSelect} />

            {!selectedOptions[0] && !selectedOptions[1] && !selectedOptions[2] &&
            <ErrorContainer errorMessage="회원님의 추가 정보를 확인해보세요!" />}

           { selectedOptions[0] &&<Subscriptions youtuber={data} />}
           { selectedOptions[1] && <HearteYoutuber/>}
           { selectedOptions[2] && <Heartevideo/>}
        </>
    )
}