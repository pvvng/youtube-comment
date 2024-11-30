import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

/** 
 * #### 에러시 예외 처리하는 커스텀 훅 
 * 
 * isError : React-Query isError 값
 * 
 * error : React-Query error 값
 * 
 * type : str 타입의 "mc"일 경우 alert 박스 띄우고 뒤로가기
 * */
export default function useProcessError(
    isError : boolean, error : Error|null, type : string
){
    const router = useRouter();

    if (isError) {
        let errorMessage = '';
        // error가 AxiosError인지 확인
        if (error instanceof AxiosError) {
            // AxiosError 타입에 따라 에러 처리
            errorMessage = 
            error.response?.data?.message || '서버에서 오류가 발생했습니다.';
        } else if (error instanceof Error) {
            // 다른 일반 에러 처리
            errorMessage = error.message;
        } else {
            errorMessage = "알 수 없는 에러가 발생했습니다.";
        }

        alert(errorMessage);

        // 에러 객체에서 메시지 추출
        if(type === "mc"){
            router.back();
            return;
        }else{
            return errorMessage;
        }
    }

    return;
}