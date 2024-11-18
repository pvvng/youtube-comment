import { DBUserdataType } from "@/types/userdata";
import axios from "axios";

/**
 * React-Query와 함께 사용
 * 
 * @param userEmail : session의 email
 * @returns db에 저장된 userdata 저장된 데이터가 없으면 insert하므로 항상 값을 가짐
 */
export default async function fetchGetDBUserData(
    userEmail : string|undefined|null
){
    try {
        if (!userEmail) {
            throw new Error("Authorization Error: userEmail is required");
        }

        let dbUserdataResult = await axios.get(
            `/api/get/database/user/data`, 
            { params : { email : userEmail } }
        );

        const userdata : DBUserdataType = dbUserdataResult.data.userdata

        return userdata;
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