'use client';

import '@/app/css/nav.css';

import { SignInBtn, SignOutBtn } from "../SignItems/SignBtn";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useDBUserStore } from '@/app/store';
import InputContainer from "./InputContainer";
import MobileToggleButton from "./MobileToggleButton";
import fetchPostDBUserData from '@/@util/functions/fetch/POST/fetchPostDBUserData';
import useProcessError from '@/@util/hooks/useprocessError';
import Image from 'next/legacy/image';

interface PropsType {
    session : Session|null; 
};

/** Navbar Hub container */
export default function NavBarHubContainer(
    {session} : PropsType
){

    const { userdata, setUserdata } = useDBUserStore();

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
    },[]);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["dbUserData", session?.user?.email],
        queryFn: () => fetchPostDBUserData(session),
        enabled: !!session?.user?.email, // email이 존재할 때만 쿼리 실행
        refetchOnWindowFocus: false,
        retry : false,
        // 캐시타임 1시간(3600000ms)
        gcTime: 3600000,
        staleTime: 3600000,
    });

    useProcessError(isError, error, "null");

    // zustand store에 userdata 저장
    useEffect(() => {
        if (!isLoading && !userdata && data) {
            setUserdata(data); // 상태 업데이트
        }
      }, [isLoading, data, setUserdata]); 

    return (
        <div className='nav-wrapper'>
            <div className='p-2 row-center nav-container'>
                <div className="row row-center w-100 m-auto">
                    <div className="col-3 col-md-2 text-center">
                        {
                            isMobileBtnClick ?
                            <button className="back-button" onClick={() => {
                                setIsMobileBtnClick(false)
                            }}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>:
                            <div className='nav-logo-container m-auto'>
                                <Image
                                    src="/logo/font-ko.png" 
                                    width= {100}
                                    height={45}
                                    alt='logo'
                                    layout='responsive'
                                    priority
                                    style={{cursor : 'pointer'}}
                                    onClick={() => {
                                        router.push('/main');
                                    }}
                                />
                            </div>
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
        </div>
    )
}