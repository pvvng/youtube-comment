import axios from "axios";

/** 형태소 분석 api 호출 함수 */
export async function callMorpAPI(value: string) {
    try{
        const response = await axios.post(
            "http://aiopen.etri.re.kr:8000/WiseNLU_spoken",
            {
                argument: {
                    analysis_code: "morp",
                    text: value,
                },
            },
            {
                headers: {
                    Authorization: process.env.ETRI_API_KEY,
                },
            }
        );
    
        return response;
    }catch(error){
        if (axios.isAxiosError(error)) {
            // Axios 에러일 때 처리
            console.error("Axios error:", error.response?.data || error.message);
            throw new Error(`API 요청 실패: ${error.response?.statusText || error.message}`);
        } else {
            // 기타 에러 처리
            console.error("Unexpected error:", error);
            throw new Error("예상치 못한 오류가 발생했습니다.");
        }
    }
}