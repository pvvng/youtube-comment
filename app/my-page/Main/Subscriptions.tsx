"use client";

import fetchSubscribedYoutuberData from "@/@util/functions/fetch/fetchSubscribedYoutuberData";
import useProcessError from "@/@util/hooks/useprocessError";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import SortDropdown from "../DataSort/SortDropdown";
import SortData from "../DataSort/SortData";
import ErrorContainer from "@/app/components/Error/ErrorContainer";
import LoadingContianer from "@/app/components/Loading/LoadingContainer";
import { useDBUserStore } from "@/app/store";
import RadioDropdown from "../DataSort/testSordDropdown";
// 지금 page.tsx에서 클라이언트 컴포넌트로 실행되는데 변경 부탁드리겠습니다.
// import '@/app/css/card.css';

interface Youtuber {
  channelId: string;
  thumbnails: string;
  title: string;
  publishedAt: string; // 날짜 형식에 맞게 조절
}


interface DataProps {
  youtuber: Youtuber[]; // youtuber를 배열로 정의
}



export default function Subscriptions({ youtuber }: DataProps) {
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



  const { userdata } = useDBUserStore();

  /** 입력된 드롭 다운에 따라 구독 유투버를 정렬하는 함수 */
  const sortItems = (data: any[], sortOption: string) => {
    switch (sortOption) {
      case "구독":
        return [...data].sort((a, b) => {
          const dateA = new Date(a.publishedAt).getTime();
          const dateB = new Date(b.publishedAt).getTime();
          return dateA - dateB;
        });
      case "이름":
        return [...data].sort((a, b) => a.title.localeCompare(b.title, "ko"));

      case "찜":
        return data.filter(video =>
          userdata?.youtuberHeart.some(Heart => video.channelId === Heart.id)
        ) || [];
      case "기본":
      default:
        return data;
    }
  };


  if (!youtuber || youtuber.length === 0)
    return <ErrorContainer errorMessage="구독한 유튜버가 없습니다." />;


  const sortedData = sortItems(youtuber, sortOption);

  return (
    // <div
    //   className="p-2 custom-scrollbar card-container mt-2"
    //   style={{ maxHeight: "400px", overflowY: "auto" ,marginBottom: "20px"}}
    // >
    //     <>
    //       <div className="row row-center mb-3" style={{ margin: "auto" }}>
    //         <h5 className="mb-0">구독 유튜버 목록</h5>
    //         {/* <SortDropdown onSortChange={handleSortChange} /> */}
    //         <RadioDropdown></RadioDropdown>
    //       </div>
    //       <SortData youtuber={sortedData}></SortData>
    //     </>


    // </div>
    <div
      className="p-2 custom-scrollbar card-container mt-2"
      style={{ maxHeight: "400px", marginBottom: "20px", overflowY: 'scroll'}}

    >
      <div style={{ position: 'relative' }}>
        <div className="row mb-3 align-items-center" >
          <div className="col d-flex justify-content-start" >
            <h5 className="mb-3 mt-1  fw-medium"
              style={{ fontSize: '1.25rem', lineHeight: '1.75rem', color: 'rgba(0, 0, 0, 1)' }}>
              구독 유투버: {youtuber.length}</h5>
           
            <div className="position-absolute top-10 end-0 p-2  mb-3" style={{ zIndex: 1, marginBottom: "8px" }}>
              <RadioDropdown onSortChange={handleSortChange} />
              {/* <SortDropdown onSortChange={handleSortChange} ></SortDropdown> */}
            </div>
          </div>
        </div>

        <SortData youtuber={sortedData} />

      </div>
    </div>
  );
}
