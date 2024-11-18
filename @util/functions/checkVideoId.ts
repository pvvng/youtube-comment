import { RefObject } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/** 
 * 버튼 클릭 / Enter 클릭 시 
 * 비디오 아이디에 따른 디테일 페이지로 
 * 라우팅하는 함수 
 * */
export async function checkVideoId(
    inputRef : RefObject<HTMLInputElement>,
    router : AppRouterInstance
){
    // url 검증
    let inputValue :string = inputRef.current?.value || '';

    // 비디오 ID 추출: v= 형태와 공유 URL 형태를 모두 지원
    let videoId: string | null = null;
    
    // 1. v= 형태의 URL 처리
    const vMatch = inputValue.match(/v=([^&]+)/);
    if (vMatch) {
        videoId = vMatch[1]; // 캡처 그룹 값만 추출
    } else {
        // 2. 공유 URL 형태 처리 (https://youtu.be/{videoId}?si=???)
        const shareMatch = inputValue.match(/youtu\.be\/([^?]+)/);
        // 캡처 그룹 값만 추출
        if (shareMatch) videoId = shareMatch[1]; 
    }

    // 올바르지 않은 url은 alert 반환
    if (!videoId){
        alert('제대로 된 비디오 url이 아닙니다.');
    }
    // 유효한 videoId가 있을 때만 라우팅
    else{
        router.push(`/video/${videoId}`);
    }
}