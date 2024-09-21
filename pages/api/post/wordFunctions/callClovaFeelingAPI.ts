import axios from "axios";

/** 감정 분석 clova api 호출 */
export async function callClovaFeelingAPI(content :string){

    const clientId = process.env.NAVER_CLIENT_KEY || '';
    const clientSecret = process.env.NAVER_CLIENT_SECRET || '';
    const url = 'https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze';

    const headers = {
        "X-NCP-APIGW-API-KEY-ID": clientId,
        "X-NCP-APIGW-API-KEY": clientSecret,
        "Content-Type": "application/json",
    }
    try{
        const response = await axios.post(url, { content }, { headers });
        return response.data.sentences;
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