"use client";

import { useState } from "react";
import { useDBUserStore } from "@/app/store";
import SortData from "../DataSort/SortData";
import ErrorContainer from "@/app/components/Error/ErrorContainer";
import RadioDropdown from "../DataSort/SortDropdown";

interface Youtuber {
    channelId: string;
    thumbnails: string;
    title: string;
    publishedAt: string;
}

interface DataProps {
    youtuber: Youtuber[];
}

export default function Subscriptions({ youtuber }: DataProps) {
    const [sortOption, setSortOption] = useState<string>("기본");
    const { userdata } = useDBUserStore();

    if (!youtuber || youtuber.length === 0) {
        return <ErrorContainer errorMessage="구독한 유튜버가 없습니다." />;
    }

    const sortedData = sortItems(youtuber, sortOption, userdata);

    return (
        <div
            className="p-2 custom-scrollbar mypage-card-container mt-2"
        >
            <Header youtuberCount={youtuber.length} onSortChange={setSortOption} />
            <SortData youtuber={sortedData} />
        </div>
    );
}

function Header({
    youtuberCount,
    onSortChange,
}: {
    youtuberCount: number;
    onSortChange: (option: string) => void;
}) {
    return (
        <div style={{ position: "relative" }}>
            <div className="row mb-3 align-items m-auto">
                <div className="col d-flex justify-content-start">
                    <h5
                        className="mb-3 mt-1 fw-medium"
                        style={{
                            fontSize: "1.25rem",
                            lineHeight: "1.75rem",
                            color: "rgba(0, 0, 0, 1)",
                        }}
                    >
                        구독 유투버: {youtuberCount}
                    </h5>
                    <div
                        className="position-absolute top-10 end-0 p-2 mb-3"
                        style={{ zIndex: 1, marginBottom: "8px" }}
                    >
                        <RadioDropdown onSortChange={onSortChange} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function sortItems(data: Youtuber[], sortOption: string, userdata: any) {
    switch (sortOption) {
        case "구독":
            return sortByDate(data);
        case "이름":
            return sortByName(data);
        case "찜":
            return filterByHeart(data, userdata);
        case "기본":
        default:
            return data;
    }
}

function sortByDate(data: Youtuber[]) {
    return [...data].sort((a, b) => {
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return dateA - dateB;
    });
}

function sortByName(data: Youtuber[]) {
    return [...data].sort((a, b) => a.title.localeCompare(b.title, "ko"));
}

function filterByHeart(data: Youtuber[], userdata: any) {
    return (
        data.filter((video) =>
            userdata?.youtuberHeart.some((Heart: any) => video.channelId === Heart.id)
        ) || []
    );
}