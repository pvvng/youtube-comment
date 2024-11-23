/** 입력값 정리 함수 (NoSQL Injection 방지) */
export const sanitizeValue = (message: string): string => {
    // 문자열이 아닌 경우 에러 반환
    if (typeof message !== "string") {
        throw new Error("Invalid value type")
    }; 
    return message.replace(/[$.]/g, ""); // NoSQL Injection 방지: `$`, `.` 제거
};