import axios from "axios";
import { useReCaptcha } from "next-recaptcha-v3";
import { useState } from "react";

/**
 * reCAPTCHA 인증을 위한 함수 반환 커스텀 훅 
 * 
 * @returns executeRecaptcha : 인증 함수, token : 인증 토큰
 */
export default function useReCaptchaVerify(){
    const { executeRecaptcha } = useReCaptcha();
    const [token, setToken] = useState<string|null>(null);

    async function getReCaptchaToken(){
        try {
            // reCAPTCHA 토큰 생성
            const token = await executeRecaptcha("test");
            setToken(token);

            // 서버에 토큰 전송
            const response = await axios.post("/api/verify", { token });

            // 서버 응답 처리
            if (response.data.success) {
                console.log("Verification Successful:", response.data);
            } else {
                console.error("Verification Failed:", response.data.errors);
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
        }
    };

    return { getReCaptchaToken, token };
}