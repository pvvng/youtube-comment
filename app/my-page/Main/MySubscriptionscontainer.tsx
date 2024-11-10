"use client";

import fetchSubscribedYoutuberData from "@/@util/functions/fetch/fetchSubscribedYoutuberData";
import useProcessError from "@/@util/hooks/useprocessError";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useScrollStore, useVideoRenderStateStore } from "@/app/store";
import { fetchVideoData } from "@/@util/functions/fetch/fetchVideoData";
import SortDropdown from "../components/SortDropdown";
import SortData from "../components/SortData";
// 지금 page.tsx에서 클라이언트 컴포넌트로 실행되는데 변경 부탁드리겠습니다.

export default function MyPage() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["subscription"],
        queryFn: () => fetchSubscribedYoutuberData(),
        refetchOnWindowFocus: false,
        // 캐시타임 1시간(3600000ms)
        gcTime: 3600000,
        staleTime: 3600000,
    });
    
    const [sortOption, setSortOption] = useState<string>("기본");
    const [isVisible, setIsVisible] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleButtonClick = () => {
        setIsVisible(true);
        if (buttonRef.current) {
            buttonRef.current.style.display = "none"; // 버튼 숨기기
        }
    };
    // 데이터, 로딩 상태, 에러 상태 변수
    // 데이터가 undfiend일때는 오직 로딩중이거나, 에러가 발생했을 경우 뿐입니다.
    // 만약 구독한 유튜버가 없다면 빈 배열이 반환됩니다.

    console.log(data, isLoading, isError);

    // 에러처리 커스텀 훅 사용 예제입니다. video/[id] 폴더 안의 사용 예제를 보시면 이해가 쉬우실겁니다.
    // 또한, 해당 페이지에서 로그인 하지 않고 접근하는 경우에는
    // 자동 뒤로가기가 실행됐으면 해서 커스텀 훅의 세번째 인자를 mc로 넣으셨으면 합니다.

    useProcessError(isError, error, "mc");

    // 또한, video/[id]/components/Comment/TopLikeCountContainer 컴포넌트를 참고해서
    // 무한 스크롤 구현까지 해주신다면 감사하겠습니다.

    if (isLoading) {
        return <div className="text-center">로딩 중...</div>;
    }

    // 데이터가 없을 경우 처리
    if (!data || data.length === 0) {
        return <div className="text-center">구독한 유튜버가 없습니다.</div>;
    }

    //**드롭다운 메뉴 변경 함수 */
    const handleSortChange = (option: string) => {
        setSortOption(option);
    };

    /** 입력된 드롭 다운에 따라 구독 유투버를 정렬하는 함수 */
    const sortItems = (data: any[], sortOption: string) => {
        switch (sortOption) {
            case "구독 일자 순":
                return [...data].sort((a, b) => {
                    const dateA = new Date(a.publishedAt).getTime();
                    const dateB = new Date(b.publishedAt).getTime();
                    return dateA - dateB;
                });
            case "이름 순":
                return [...data].sort((a, b) => a.title.localeCompare(b.title, "ko"));
            case "기본":
            default:
                return data;
        }
    };

    const sortedData = sortItems(data, sortOption);

    return (
        <div
            className="p-2 custom-scrollbar card-container mt-2"
            style={{ maxHeight: "400px", overflowY: "auto" }}
        >
            {" "}
            {!isVisible && (
                <button className="btn btn-dark" onClick={handleButtonClick}>
                    구독중인 유투버 확인하기
                </button>
            )}
            {isVisible && (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">구독 유튜버 목록</h5>
                        <SortDropdown onSortChange={handleSortChange} />
                    </div>
                    <div className="row">
                        <SortData youtuber={sortedData}></SortData>
                    </div>
                </>
            )}
        </div>
    );
}
