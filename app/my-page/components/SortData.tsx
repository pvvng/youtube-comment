'use client'

import React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import useProcessError from "@/@util/hooks/useprocessError";
import { useRouter } from 'next/navigation';
import { fetchChannelData } from '@/@util/functions/fetch/fetchChannelData';
import { YoutuberDataType } from "@/types/youtuber";
import fetchPostDBYoutuberData from '@/@util/functions/fetch/fetchPostDBYoutuberData';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('ko-KR', options);
};

interface Youtuber {
  channelId: string;
  thumbnails: string;
  title: string;
  publishedAt: string; // 날짜 형식에 맞게 조절
}


interface SortDataProps {
  youtuber: Youtuber[]; // youtuber를 배열로 정의
}

const SortData: React.FC<SortDataProps> = ({ youtuber }) => {

  const router = useRouter();
  
  const [selectedYoutuberData, setSelectedYoutuberData] = useState<string | null>(null);

  const { data, isLoading, isError, error, refetch: reFetchData } = useQuery({
    queryKey: ['DByoutuberData', selectedYoutuberData],
    queryFn: () => {
      if (selectedYoutuberData) { // selectedYoutuberData가 null이 아닐 때만 호출
        return fetchChannelData(selectedYoutuberData);
      } else {
        // channelId가 null이거나 selectedYoutuberData가 null일 경우에 대한 처리
        throw new Error("Channel ID or selected Youtuber Data is null");
      }
    },
    refetchOnWindowFocus: false,
    enabled: false,   // 클릭 시에만 데이터 패칭을 실시
    gcTime: 0,
    staleTime: 0,
});

// fetchPostDBYoutuberData

const loadYoutuberData = (youtuberData: string) => {
    setSelectedYoutuberData(youtuberData); // 실제 유튜버 데이터로 변경
    reFetchData(); // 쿼리 실행
}

// data가 업데이트될 때마다 fetchPostDBYoutuberData 호출
useEffect(() => {
    const youtuberData = data?.youtuber as YoutuberDataType | undefined;
    console.log(youtuberData);
    if (youtuberData) {
        fetchPostDBYoutuberData(youtuberData); 
    }
}, [data]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>구독한 유튜버 수: {youtuber.length}</h5>
      </div>
      <div className="row">
        {youtuber.map((item, index) => (
          <div className="col-6 mb-3" key={index}>
            <div
              className="d-flex align-items-center p-3 border rounded-pill"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="me-3">
                <img
                  src={item.thumbnails}
                  alt={item.title}
                  className="rounded-circle"
                  style={{ width: "80px", height: "80px" }}
                  onClick={() => {
                    loadYoutuberData(item.channelId);
                    
                  }}

                />
                <button onClick={()=>{
                  router.push(`/youtuber/${item.channelId}`);
                }}>유투버홈페이지 이동</button>
              </div>
              <div>
                
                <h6 className="mb-0">{item.title}</h6>
                <h6 className="mb-0">구독일자: {formatDate(item.publishedAt)}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortData;