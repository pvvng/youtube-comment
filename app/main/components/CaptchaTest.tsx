"use client";

import useReCaptchaVerify from "@/@util/hooks/useReCaptchaVerify";

export default function LoginForm() {

    const { getReCaptchaToken } = useReCaptchaVerify();

    return (
        <button onClick={getReCaptchaToken}>
            버튼
        </button>
    );
}