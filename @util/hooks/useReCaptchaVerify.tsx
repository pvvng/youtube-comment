import axios from "axios";
import { useReCaptcha } from "next-recaptcha-v3";
import { useState } from "react";

export type CaptchaDataType = {
    score : number;
    success : boolean;
}

const ERROR_DATA: CaptchaDataType = {
    score : 0,
    success : false,
}

/**
 * reCAPTCHA 인증을 위한 함수 반환 커스텀 훅 
 * 
 * @returns executeRecaptcha : 인증 함수, token : 인증 토큰
 */
export default function useReCaptchaVerify(){
    const { executeRecaptcha } = useReCaptcha();
    const [token, setToken] = useState<string|null>(null);

    /**
     * 
     * @returns score : number, success : boolean인 object
     */
    async function getReCaptchaToken(){
        try {
            // reCAPTCHA 토큰 생성
            const token = await executeRecaptcha("test");
            setToken(token);

            // 서버에 토큰 전송
            const response = await axios.post("/api/post/verify", { token });

            // 서버 응답 처리
            if (response.data.success) {
                let successData: CaptchaDataType = response.data;
                
                return successData;
            } else {
                console.error("Verification Failed:", response.data.errors);
                alert("캡챠 인증에 실패했습니다.");

                return ERROR_DATA;
            }
        } catch (error) {
            // Axios 에러 처리
            if (axios.isAxiosError(error)) {
                console.error("Axios Error:", error.message);
            } else if (error instanceof Error) {
                console.error("General Error:", error.message);
            } else {
                console.error("Unknown Error");
            }

            return ERROR_DATA;
        }
    };

    return { getReCaptchaToken, token };
}