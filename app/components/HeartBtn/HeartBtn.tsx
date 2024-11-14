'use client';

import '@/app/css/heart.css';
import { HeartButtonSVG } from '@/app/SvgContainer';
import { UserHeartedType } from '@/types/userdata';
import { useState } from 'react';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface PropsType extends UserHeartedType {
    type: string;
}

export default function HeartBtn(
    { id, name, thumbnailUrl, type }: PropsType
) {
    const router = useRouter();

    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function updateUserHeartData(){

        const session = await getSession();

        if (!session) {
            let isConfirmed = confirm(
                `로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?`
            );

            if(isConfirmed){
                router.push(`/auth/sign-in`);
            }
            
            return;
        }

        const userEmail = session.user?.email;
        if (!userEmail) {
            alert("회원 정보가 확인되지 않습니다.");
            return;
        }

        // API 요청
        await axios.post('/api/post/database/user/heart', {
            id, name, thumbnailUrl, type, userEmail, isChecked: !isChecked // 상태가 변경될 값을 서버로 보냄
        });

        // 서버 업데이트가 성공하면 상태를 토글
        setIsChecked((prev) => !prev);
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

    // onChange 핸들러로 mutate 호출
    const handleChange = () => {
        mutate();
    };

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
                        onChange={handleChange}
                    />
                    <div className="bookmark">
                        <HeartButtonSVG />
                    </div>
                </>
            }
        </label>
    );
}
