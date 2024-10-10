import { RefObject } from "react";
import { create } from "zustand"

export type SectionRefs = {
    [key: string]: RefObject<HTMLElement> | null;
};
  
interface ScrollStore {
    sectionRefs: SectionRefs;
    setSectionRef: (section: string, ref: RefObject<HTMLElement>) => void;
  }
  
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

export const useVideoSideBarStore = create<VideoSideBarType>((set) => ({
    sideBarState : false,
    setSideBarState : (isOpen) => set((state) => ({ sideBarState : isOpen }))
}))