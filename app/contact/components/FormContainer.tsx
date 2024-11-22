'use client';

import useReCaptchaVerify from "@/@util/hooks/useReCaptchaVerify";
import { faFrown, faPaperPlane, faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRef, useState } from "react";

export default function FormContainer() {
    const { getReCaptchaToken } = useReCaptchaVerify();

    const messageRef = useRef<HTMLTextAreaElement>(null);
    const feelRef = useRef<"good" | "bad">("good");

    const [isLoading, setIsLoading] = useState(false);

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetValue = e.target.value;
        if (targetValue !== "good" && targetValue !== "bad") {
            return;
        }
        feelRef.current = targetValue; // 선택된 값 저장
    };

    async function checkFeedbackValidation() {
        if (!messageRef.current) return;

        const message = messageRef.current.value;
        const feedback = feelRef.current;

        if (!message || message.trim() === "") {
            alert("공백을 입력할 수 없습니다.");
            return;
        }

        if (message.length > 100 || message.length < 10) {
            alert("메시지는 10자부터 100자까지 입력가능합니다.");
            return;
        }

        if (feedback !== "bad" && feedback !== "good") {
            alert("예상하지 못한 값이 확인되었습니다.");
            return;
        }

        setIsLoading(true);

        try {
            const verifyData = await getReCaptchaToken();

            if (!verifyData.success) {
                alert("Captcha verification failed.");
                setIsLoading(false);
                return;
            }

            await axios.post("/api/post/database/submit-feedback", { message, feedback });

            // 업로드 성공 후 값 초기화
            if (messageRef.current) {
                messageRef.current.value = ""; // 텍스트 입력 초기화
            }
            feelRef.current = "good"; // 라디오 버튼 기본값으로 초기화
            const defaultRadio = document.querySelector<HTMLInputElement>('input[name="feedback"][value="good"]');
            if (defaultRadio) {
                defaultRadio.checked = true; // 라디오 버튼 상태 초기화
            }

            alert("성공적으로 피드백이 업로드 되었습니다! 감사합니다💙");
        } catch (error) {
            console.error("Error uploading feedback:", error);
            alert("피드백 업로드 중 에러가 발생했습니다.");
        } finally {
            setIsLoading(false); // 로딩 상태 해제
        }
    }

    return (
        <div className="form-container mt-5">
            <h1 className="form-title m-0 mt-2 mb-2">Send Feedback</h1>
            <textarea
                ref={messageRef}
                className="form-textarea"
                name="message"
                placeholder="유튜브에 대한 메시지를 남겨주세요!"
                maxLength={100}
                required
            />
            <div className="form-buttons">
                <label className="icon-button">
                    <input
                        type="radio"
                        name="feedback"
                        value="good"
                        required
                        defaultChecked
                        onChange={handleRadioChange}
                    />
                    <FontAwesomeIcon icon={faSmile} className="icon-space" />
                </label>
                <label className="icon-button mx-2">
                    <input
                        type="radio"
                        name="feedback"
                        value="bad"
                        onChange={handleRadioChange}
                    />
                    <FontAwesomeIcon icon={faFrown} className="icon-space" />
                </label>
                <span className="spacer"></span>
                {isLoading ? (
                    <div>업로드 중</div>
                ) : (
                    <button className="submit-button" onClick={checkFeedbackValidation}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                )}
            </div>
        </div>
    );
}