import { ClientUserdataType, UserHeartedType } from "@/types/userdata";
import { RefObject } from "react";
import { create } from "zustand"

export type SectionRefs = {
    [key: string]: RefObject<HTMLElement> | null;
};

interface ScrollStore {
    sectionRefs: SectionRefs;
    setSectionRef: (section: string, ref: RefObject<HTMLElement>) => void;
}

/** video scroll store */
export const useScrollStore = create<ScrollStore>((set) => ({
    sectionRefs: {},
    setSectionRef: (section, ref) => set((state) => ({
        sectionRefs: { ...state.sectionRefs, [section]: ref }
    })),
}));

interface VideoSideBarType {
    sideBarState: boolean;
    setSideBarState: (isOpen: boolean) => void
}

/** 사이드바 상태 store */
export const useVideoSideBarStore = create<VideoSideBarType>((set) => ({
    sideBarState: false,
    setSideBarState: (isOpen) => set({ sideBarState: isOpen })
}))

interface VideoRenderState {
    videoComponentState: { [key: string]: boolean };
    setVideoComponentState: (nowState: [string, boolean]) => void;
    setDefaultState: (nowState: { [key: string]: boolean }) => void;
    setClearState: (nowState: { [key: string]: boolean }) => void;
}

export const defaultVideoComponentState = {
    youtuber: false,
    video: false,
    comment: false,
    topicality: false,
    sentiment: false,
    keyword: false,
}

export const clearVideoComponentState = {
    youtuber: true,
    video: true,
    comment: true,
    topicality: true,
    sentiment: true,
    keyword: true,
}

/** 비디오 컴포넌트 렌더링 상태 추적 store */
export const useVideoRenderStateStore = create<VideoRenderState>((set) => ({
    videoComponentState: defaultVideoComponentState,
    setVideoComponentState: ([key, value]) =>
        set((state) => ({
            videoComponentState: {
                ...state.videoComponentState,
                [key]: value,
            },
        })
        ),
    // 기본 상태로 초기화
    setDefaultState: (defaultState) =>
        set(() => ({
            videoComponentState: defaultState, // 상태를 기본 값으로 설정
        })
        ),
    // 전부 true 상태로 초기화
    setClearState: (clearState) =>
        set(() => ({
            videoComponentState: clearState, // 상태를 클리어 값으로 설정
        })
        ),
}));


interface DBUserStore {
    userdata: ClientUserdataType | undefined; // 초기값으로 undefined
    setUserdata: (data: ClientUserdataType) => void; // userdata 설정
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