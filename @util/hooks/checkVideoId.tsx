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

    // URL에서 비디오 ID를 추출하는 정규 표현식
    const match = inputValue.match(/v=([^&]+)/);
    const videoId = match ? match[1] : null;

    // 올바르지 않은 url 반환
    if (!videoId){
        alert('제대로 된 비디오 url이 아닙니다.');
    }
    // 유효한 videoId가 있을 때만 라우팅
    else{
        router.push(`/video/${videoId}`);
    }
}