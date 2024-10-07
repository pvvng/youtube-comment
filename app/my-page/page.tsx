'use client';

import fetchSubscribedYoutuberData from "@/@util/functions/fetch/fetchSubscribedYoutuberData";
import useProcessError from "@/@util/hooks/useprocessError";
import { useQuery } from "@tanstack/react-query";

// 지금 page.tsx에서 클라이언트 컴포넌트로 실행되는데 변경 부탁드리겠습니다.
export default function MyPage (){

    const {data, isLoading, isError, error} = useQuery({
        queryKey : ['subscription'],
        queryFn : () => fetchSubscribedYoutuberData(),
        refetchOnWindowFocus : false,
        // 캐시타임 1시간(3600000ms)
        gcTime : 3600000,
        staleTime : 3600000,
    })

    // 데이터, 로딩 상태, 에러 상태 변수
    // 데이터가 undfiend일때는 오직 로딩중이거나, 에러가 발생했을 경우 뿐입니다.
    // 만약 구독한 유튜버가 없다면 빈 배열이 반환됩니다.
    console.log(data, isLoading, isError)
    // 에러처리 커스텀 훅 사용 예제입니다. video/[id] 폴더 안의 사용 예제를 보시면 이해가 쉬우실겁니다.
    // 또한, 해당 페이지에서 로그인 하지 않고 접근하는 경우에는 
    // 자동 뒤로가기가 실행됐으면 해서 커스텀 훅의 세번째 인자를 mc로 넣으셨으면 합니다. 
    useProcessError(isError, error, 'mc')
    // 또한, video/[id]/components/Comment/TopLikeCountContainer 컴포넌트를 참고해서
    // 무한 스크롤 구현까지 해주신다면 감사하겠습니다.

    // 화이팅!
    return <p>하이욤</p>
}