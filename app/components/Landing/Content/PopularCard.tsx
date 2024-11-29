'use client';

import fetchDBTopYoutuber from "@/@util/functions/fetch/fetchDBTopYoutuber";
import useProcessError from "@/@util/hooks/useprocessError";
import Image from "next/image";
import PopularCardSkeleton from "./PopularCardSkeleton";
import { TopYoutuberData } from "@/types/youtuber";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function PopularCardContainer() {

    const { data: topYoutuber, isError, error } = useQuery({
        queryKey: ['youtuberPopularity'],
        queryFn: () => fetchDBTopYoutuber(),
        refetchOnWindowFocus: false,
        gcTime: 3600000,
        staleTime: 3600000,
    });

    useProcessError(isError, error, "null");

    return (
        <div className="p-3 container">
            <div className="row row-center w-100 m-auto">
                <div className="col-12">
                    <PopularCard topYoutuber={topYoutuber} />
                </div>
            </div>
        </div>
    )
}

function PopularCard(
    { topYoutuber }: { topYoutuber: TopYoutuberData | undefined }
) {

    const router = useRouter();

    return (
        <div className="popular-card m-auto text-center mb-4">
            {topYoutuber ? (
                <>
                    <h2 className="m-0">인기 유튜버</h2>
                    <h2><span className="fw-bold">{topYoutuber.youtuber.name}</span></h2>
                    <div
                        className="m-auto position-relative"
                        style={{
                            width: '180px', // 원하는 정사각형 크기
                            height: '180px', // 원하는 정사각형 크기
                            overflow: 'hidden', // 잘린 부분 숨기기
                        }}
                    >
                        <Image
                            className="w-100 border"
                            src={topYoutuber.youtuber.thumbnail.url}
                            alt={`${topYoutuber.youtuber.name} thumbnail`}
                            fill
                            loading="lazy"
                            sizes="180px"
                            style={{
                                borderRadius: '50%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                maxWidth: '180px',
                            }}
                        />
                    </div>
                    <p className="mt-3"><span className="fw-bold">{topYoutuber.extra.popularity}</span>만큼의 관심도</p>
                    <button className="sign-up rounded mt-2" onClick={() => (router.push(`/youtuber/${topYoutuber.channelId}`))}>더 알아보기</button>
                </>
            ) : <PopularCardSkeleton />}
        </div>
    );
}