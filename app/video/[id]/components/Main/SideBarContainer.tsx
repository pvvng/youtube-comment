'use client';

import '@/app/css/video.css';
import { useScrollStore, useVideoSideBarStore } from '@/app/store';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BTN_INFO = [
    {name : 'video', koname : '영상'},
    {name : 'comment', koname : '댓글'},
    {name : 'topicality', koname : '화제성 분석'},
    {name : 'sentiment', koname : '감정 분석'},
    {name : 'keyword', koname : '키워드 분석'},
]

export default function SideBarContainer(){

    const { sideBarState, setSideBarState } = useVideoSideBarStore();

    const { sectionRefs } = useScrollStore();

    const handleScroll = (section : string) => {
        const sectionRef = sectionRefs[section];
        if (sectionRef && sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div 
            className="sidebar-container text-center" 
            style={{transform: `translateX(${sideBarState ? 0 : -150}px)`}}
            onDoubleClick={() => {setSideBarState(false)}}
        >
            <div>
                {BTN_INFO.map((bi) => 
                    <button 
                        key={bi.name + bi.koname}
                        className="w-100 sidebar-btn"
                        onClick={() => {handleScroll(bi.name)}}
                    >{bi.koname}</button>
                )}
            </div>
            <div 
                className="sidebar-toggle"             
                onClick={() => {
                    sideBarState ?
                    setSideBarState(false):
                    setSideBarState(true);
                }}
            >
                <FontAwesomeIcon icon={faBars} />
            </div>
        </div>
    )
}