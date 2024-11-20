"use client";

import fetchSubscribedYoutuberData from "@/@util/functions/fetch/fetchSubscribedYoutuberData";
import useProcessError from "@/@util/hooks/useprocessError";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import SortDropdown from "../DataSort/SortDropdown";
import SortData from "../DataSort/SortData";
import ErrorContainer from "@/app/components/Error/ErrorContainer";
import LoadingContianer from "@/app/components/Loading/LoadingContainer";


// 지금 page.tsx에서 클라이언트 컴포넌트로 실행되는데 변경 부탁드리겠습니다.

 
interface Youtuber {
  channelId: string;
  thumbnails: string;
  title: string;
  publishedAt: string; // 날짜 형식에 맞게 조절
}


interface DataProps {
  youtuber: Youtuber[]; // youtuber를 배열로 정의
}



 export default function Subscriptions( { youtuber} : DataProps) {
  const [sortOption, setSortOption] = useState<string>("기본");
  // const [isVisible, setIsVisible] = useState(false);
  // const buttonRef = useRef<HTMLButtonElement>(null);


  // const handleButtonClick = () => {
  //   setIsVisible(true);
  //   if (buttonRef.current) {
  //     buttonRef.current.style.display = "none"; // 버튼 숨기기
  //   }
  // };


  /**드롭다운 메뉴 변경 함수 */
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

 
  if (!youtuber || youtuber.length === 0)
    return <ErrorContainer errorMessage="구독한 유튜버가 없습니다." />;

  const sortedData = sortItems(youtuber, sortOption);

  return (
    <div
      className="p-2 custom-scrollbar card-container mt-2"
      style={{ maxHeight: "400px", overflowY: "auto" }}
    >
        <>
          <div className="row row-center mb-3" style={{ margin: "auto" }}>
            <h5 className="mb-0">구독 유튜버 목록</h5>
            <SortDropdown onSortChange={handleSortChange} />
          </div>
          <SortData youtuber={sortedData}></SortData>
        </>
     
    
    </div>
  );
}
