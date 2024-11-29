'use client';

import '@/app/css/heart.css';

import axios from 'axios';
import useReCaptchaVerify from '@/@util/hooks/useReCaptchaVerify';
import { HeartButtonSVG } from '@/app/SvgContainer';
import { UserHeartedType } from '@/types/userdata';
import { useEffect, useState } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useDBUserStore } from '@/app/store';

interface PropsType extends UserHeartedType {
    type: "video" | "youtuber";
}

const CONFIRM_TEXT = `로그인 후 이용 가능합니다.\n로그인하시겠습니까?`;

export default function HeartBtn(
    { id, name, thumbnailUrl, type }: PropsType
){
    // userdata 상태 store
    const { userdata, addHeart, removeHeart } = useDBUserStore();
    const { getReCaptchaToken } = useReCaptchaVerify();

    // heart btn 감시 상태
    const [isChecked, setIsChecked] = useState(false);
    
    // loading btn 감시 상태
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    /** 타입 검증 후 userdata에 사용 가능한 타입 문자열 반환 함수 */
    function checkHeartType(){
        let typeString : "videoHeart" | "youtuberHeart" | undefined; 

        if(type === "video"){
            typeString = "videoHeart";
        }else if (type === "youtuber"){
            typeString = "youtuberHeart";
        }

        return typeString;
    }

    /** userdata db에 업데이트하고 성공하면 store에 업데이트하는 함수 */
    async function updateUserHeartData(){
        const session = await getSession();

        if (!session) {
            let isConfirmed = confirm(CONFIRM_TEXT);

            if(isConfirmed) signIn();
            
            return;
        }

        const userEmail = session.user?.email;

        if (!userEmail) {
            alert("회원 정보가 확인되지 않습니다.");

            return;
        }

        let verifyData = await getReCaptchaToken();

        if(verifyData.success){

            if(type !== "video" && type !== "youtuber") return;

            try {
                let result = await axios.post('/api/post/database/user/heart', {
                    // 상태가 변경될 값을 서버로 보냄
                    id, name, thumbnailUrl, type, userEmail, isChecked: !isChecked 
                });
            
                if (result.status === 200) {
                    // 서버 업데이트가 성공하면 zustand userdata 수정
                    const typeString = checkHeartType();
            
                    if (!typeString) return;
            
                    if (isChecked) {
                        removeHeart(typeString, id);
                    } else {
                        addHeart(typeString, { id, name, thumbnailUrl });
                    }
                } else {
                    alert(result.data.message);
                }
            } catch (error) {
                // 실패한 경우
                console.error(error);
            
                // AxiosError를 안전하게 처리
                if (axios.isAxiosError(error)) {
                    alert(error.response?.data?.message || "서버 오류가 발생했습니다.");
                } else {
                    alert("알 수 없는 오류가 발생했습니다.");
                }
            }
        }
    }

    // useMutation 훅을 활용하여 서버에 데이터를 업데이트하고 상태를 변경
    const { mutate } = useMutation(
        {
            mutationFn : () => updateUserHeartData(),
            onMutate : () => {
                setIsLoading(true);
            },
            onSettled : () => {
                setIsLoading(false);
            },
            onError: (error) => {
                console.error('Update failed:', error);
                setIsLoading(false);
            }
        }
    );

    // zustand store의 변경에 따라 heart button 상태 토글
    useEffect(() => {
        if (userdata) {
            const typeString = checkHeartType();

            if(!typeString) return;

            const exists = userdata[typeString].some(v => v.id === id);

            // exists 값으로 isChecked 설정
            setIsChecked(exists); 
        }
    }, [userdata, type, id]);

    return (
        <label className="ui-bookmark">
            {
                isLoading ?
                <div className="spinner-grow text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>:
                <>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        // 클릭할때마다 mutate
                        onChange={() => mutate()}
                    />
                    <div className="bookmark">
                        <HeartButtonSVG />
                    </div>
                </>
            }
        </label>
    );
}
