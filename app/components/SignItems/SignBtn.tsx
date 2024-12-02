'use client'

import '@/app/css/sign.css';

import { signIn, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { GoogleLogoSvg } from '@/app/SvgContainer';
import fetchDeleteDBUserData from '@/@util/functions/fetch/DELETE/fetchDeleteDBUserData';

// 구글 로그인 버튼
export function GoogleSignInBtn() {
    // 메인 페이지로 리다이렉트
    const searchParams = useSearchParams();

    if(searchParams){
        const callbackUrl = searchParams.get('callbackUrl') || '';
        return (
            <button
                className="google-sign-button"
                onClick={() => signIn('google', { callbackUrl })}
            >
                <GoogleLogoSvg />
                구글 아이디로 로그인하기
            </button>
        );
    }
}

// 로그인 페이지로 이동하는 버튼
export function SignInBtn() {
    return (
        <button
            className="btn-main"
            onClick={() => { signIn() }}
        >
            로그인
        </button>
    )
}

export function SignOutBtn() {
    return (
        <button
            className="btn-main"
            onClick={() => { signOut() }}
        >
            로그아웃
        </button>
    )
}

/** 다른 아이디로 로그인 지원 함수 */
export function LoginAnotherAccountBtn() {
    const handleLogin = () => {
        signIn('google', {
            callbackUrl: '/main',
            prompt: 'select_account',  // 항상 계정 선택을 요구
        });
    };

    return (
        <button className='another-account-btn' onClick={handleLogin}>
            다른 계정으로 로그인
        </button>
    );
}

export default function ExitBtn() {
    const router = useRouter();

    return (
        <button
            className="exit-btn ms-2"
            onClick={async () => {
                const isExit = confirm(
                    `회원 탈퇴 후에는 현재 데이터 복구가 불가능합니다.\n정말 회원 탈퇴하시겠습니까?`
                );

                if (isExit) {
                    try {
                        const response = await fetchDeleteDBUserData();
                        
                        // 서버에서 반환된 메시지 처리
                        if (response?.message && response.message !== "회원 탈퇴가 성공적으로 이루어졌습니다.") {
                            alert(`${response.message}`);
                        } else {
                            alert("회원 탈퇴가 성공적으로 이루어졌습니다.");
                            await signOut();
                        }
                    } catch (error) {
                        alert("회원 탈퇴 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
                        console.error(error);
                    }
                }
            }}
        >
            회원 탈퇴
        </button>
    );
}