'use client';

import fetchDBTopYoutuber from "@/@util/functions/fetch/GET/fetchDBTopYoutuber";
import useProcessError from "@/@util/hooks/useprocessError";
import PopularCardSkeleton from "./PopularCardSkeleton";
import PopularCard from "./PopularCard";
import { useQuery } from "@tanstack/react-query";

export default function PopularCardContainer() {
    const { data: topYoutuber, isLoading, isError, error } = useQuery({
        queryKey: ['DBTopYoutuber'],
        queryFn: () => fetchDBTopYoutuber(),
        refetchOnWindowFocus: false,
        gcTime: 3600000,
        staleTime: 3600000,
    });

    useProcessError(isError, error, "null");

    // Skeleton UI 표시
    if (isLoading) {
        return (
            <div className="p-3 container">
                <div className="row row-center w-100 m-auto">
                    <div className="col-12">
                        <PopularCardSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    // 데이터가 없거나 에러가 발생한 경우
    if (!topYoutuber) {
        return (
            <div className="p-3 container text-center">
                <p>데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.</p>
            </div>
        );
    }

    // 데이터가 로드된 경우
    return (
        <div className="p-3 container">
            <div className="row row-center w-100 m-auto">
                <div className="col-12">
                    <PopularCard topYoutuber={topYoutuber} />
                </div>
            </div>
        </div>
    );
}