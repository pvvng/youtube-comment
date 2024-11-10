'use client';

import '@/app/css/nav.css';
import { SignInBtn, SignOutBtn } from "../SignItems/SignBtn";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputContainer from "./InputContainer";
import MobileToggleButton from "./MobileToggleButton";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

/** Navbar Hub container */
export default function NavBarHubContainer(
    {session} : {session : Session|null}
){
    const router = useRouter();

    /** 모바일 검색 토클 버튼 클릭 여부 확인 감시 상태 */
    const [isMobileBtnClick, setIsMobileBtnClick] = useState(false);
    
    useEffect(() => {
        // 리사이즈 핸들러 함수
        const handleResize = () => {
            // bootstrap sm 범위 576px
            if(window.innerWidth >= 576){
                setIsMobileBtnClick(false);
            }
        };
    
        // 리사이즈 이벤트 리스너 추가
        window.addEventListener('resize', handleResize);
    
        // 초기 너비 출력
        handleResize();
    
        // 컴포넌트 언마운트 시 리스너 제거
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[])

    return (
        <>
            <div 
                className='p-2 row-center' 
                style={{
                    minHeight : 83, 
                    display : 'flex',
                    // background : '#1763b8',
                    borderBottomLeftRadius : 10,
                    borderBottomRightRadius : 10,
                }}
            >
                <div className="row row-center w-100" style={{margin : 'auto'}}>
                    <div className="col-3 col-md-2 text-center">
                        {
                            isMobileBtnClick ?
                            <button className="back-button" onClick={() => {
                                setIsMobileBtnClick(false)
                            }}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>:
                            <img
                                src="/logo/font-ko.png" 
                                width= "100px"
                                height="auto"
                                alt='logo'
                                onClick={() => {
                                    router.push('/main');
                                }}
                            />
                        }
                    </div>
                    <div className="col-9 col-md-8">
                        <div className="d-sm-block d-none">
                            <InputContainer />
                        </div>
                        {
                            isMobileBtnClick ?
                            <InputContainer />:
                            <MobileToggleButton 
                                isMobileBtnClick={isMobileBtnClick} 
                                setIsMobileBtnClick={setIsMobileBtnClick} 
                            />
                        }
                    <div style={{clear : 'both'}}/>
                    </div>
                    <div className="col-2 d-none d-md-block text-end">
                        {
                            !session?
                            <SignInBtn />:
                            <SignOutBtn />
                        }
                    </div>
                </div>
            </div>
            <hr className="m-0" />
        </>
    )
}