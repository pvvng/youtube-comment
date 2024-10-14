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
    sideBarState : boolean;
    setSideBarState : (isOpen : boolean) => void
}

/** 사이드바 상태 store */
export const useVideoSideBarStore = create<VideoSideBarType>((set) => ({
    sideBarState : false,
    setSideBarState : (isOpen) => set({ sideBarState : isOpen })
}))

interface VideoRenderState {
    videoComponentState: { [key: string]: boolean };
    setVideoComponentState: (nowState: [string, boolean]) => void;
    setDefaultState : (nowState : { [key: string]: boolean }) => void;
    setClearState : (nowState : { [key: string]: boolean }) => void;
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