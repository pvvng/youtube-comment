import axios from "axios";

export default async function fetchDeleteDBUserData() {
    try {
        const deleteResult = await axios.post("/api/post/database/user/delete");
        console.log("Success:", deleteResult.data);
        return deleteResult.data; // 성공한 응답 데이터 반환
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Axios에서 발생한 에러 처리
            console.error("Axios error:", error.response?.data || error.message);
            return error.response?.data || { message: "알 수 없는 오류가 발생했습니다." };
        } else {
            // Axios 외의 에러 처리
            console.error("Unexpected error:", error);
            return { message: "서버에서 예기치 못한 오류가 발생했습니다." };
        }
    }
}