import { useEffect } from "react";

export interface RecentVideoType {
    videoId: string;
    videoTitle: string;
    channelTitle: string;
    thumbnailUrl : string;
}

/** localstorage에 최근 본 6개 영상 저장하는 커스텀 훅 */
export function useUpdateRecentVideoLocalStorage(
    videoId :string, 
    videoTitle :string | undefined, 
    channelTitle : string | undefined,
    thumbnailUrl : string | undefined
) {
    // localStorage에 최근 본 영상 6개까지 저장하기
    useEffect(() => {
        // 조건이 맞지 않으면 훅 실행하지 않음
        if (!videoTitle || !channelTitle || !thumbnailUrl) return; 

        // 저장할 데이터 객체
        let pushData: RecentVideoType = {
            videoId: videoId,
            videoTitle: videoTitle,
            channelTitle: channelTitle,
            thumbnailUrl : thumbnailUrl
        };

        let getRecent = localStorage.getItem('recent');
        
        let parsedRecent: RecentVideoType[] = getRecent ? JSON.parse(getRecent) : [];

        // 현재 비디오가 localStorage에 저장되어 있지 않을 때
        const videoExists = parsedRecent.some(video => video.videoId === videoId);
        
        if (!videoExists) {
            parsedRecent.push(pushData);
        } else {
            // 현재 비디오가 localStorage에 저장되어 있을때
            // videoId에 해당하는 객체를 배열에서 제거하고 마지막에 추가
            parsedRecent = parsedRecent.filter(video => video.videoId !== videoId);
            parsedRecent.push(pushData);
        }

        // localStorage에 저장된 recent의 길이가 6 이상일 때
        if (parsedRecent.length > 6) {
            // 제일 오래된 것 제거 (제일 앞에 있는 것)
            parsedRecent.shift();
        }

        // localStorage에 다시 저장
        localStorage.setItem('recent', JSON.stringify(parsedRecent));

    }, [videoId, videoTitle, thumbnailUrl, channelTitle]);
}