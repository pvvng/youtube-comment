import { SubScibedYoutuberType } from "@/types/youtuber";
import axios from "axios";

/** #### 사용자가 로그인 한 경우에 구독한 유튜버 목록 불러오는 함수 (클라이언트 컴포넌트 전용)
 * 
 * **React-Query에서 사용 권장**
 */
export default async function fetchSubscribedYoutuberData(){
    try{
        const resultGetSubscription = await axios.get('/api/get/subscribe');
        const subscription : SubScibedYoutuberType[] = resultGetSubscription.data;

        return subscription;
    }catch(error){
        // error가 AxiosError인지 확인
        if (axios.isAxiosError(error)) {
            // AxiosError 타입에 따라 에러 처리
            console.error("Axios 에러 발생:", error.message);
        } else if (error instanceof Error) {
            // 다른 일반 에러 처리
            console.error("일반 에러 발생:", error.message);
        } else {
            console.error("알 수 없는 에러 발생");
        }

        // 에러를 다시 던져 useQuery에서 처리하도록 함
        throw error;
    }
}