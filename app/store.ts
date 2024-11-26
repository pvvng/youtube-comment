import { DBUserdataType, UserHeartedType } from "@/types/userdata";
import { create } from "zustand"

interface DBUserStore {
    userdata: DBUserdataType | undefined; // 초기값으로 undefined
    setUserdata: (data: DBUserdataType) => void; // userdata 설정
    clearUserdata: () => void; // userdata 초기화
    addHeart: (type: "videoHeart" | "youtuberHeart", heartData: UserHeartedType) => void; // heart 추가 함수
    removeHeart: (type: "videoHeart" | "youtuberHeart", id: string) => void; // heart 삭제 함수
}

export const useDBUserStore = create<DBUserStore>((set) => ({
    userdata: undefined, // 초기 상태

    setUserdata: (data) => set({ userdata: data }), // userdata 업데이트

    clearUserdata: () => set({ userdata: undefined }), // userdata 초기화

    addHeart: (type, heartData) =>
        set((state) => {
            if (!state.userdata) {
                console.error("No userdata available to update.");
                return state; // userdata가 없으면 아무 작업도 하지 않음
            }

            const updatedHearts = state.userdata[type].some((h) => h.id === heartData.id)
                ? state.userdata[type] // 이미 존재하면 그대로 반환
                : [...state.userdata[type], heartData]; // 없으면 추가

            return {
                userdata: {
                    ...state.userdata,
                    [type]: updatedHearts, // videoHeart 또는 youtuberHeart 업데이트
                },
            };
        }),

    removeHeart: (type, id) =>
        set((state) => {
            if (!state.userdata) {
                console.error("No userdata available to update.");
                return state; // userdata가 없으면 아무 작업도 하지 않음
            }

            const updatedHearts = state.userdata[type].filter((h) => h.id !== id); // id가 일치하지 않는 데이터만 남김

            return {
                userdata: {
                    ...state.userdata,
                    [type]: updatedHearts, // videoHeart 또는 youtuberHeart 업데이트
                },
            };
        }),
}));