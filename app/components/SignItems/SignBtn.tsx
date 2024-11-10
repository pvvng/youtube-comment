'use client'

import '@/app/css/sign.css';
import { signIn, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { GoogleLogoSvg } from '@/app/SvgContainer';

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