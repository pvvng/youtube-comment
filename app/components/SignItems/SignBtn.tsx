'use client'

import { signIn, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";

// 카카오 로그인 버튼
export function GoogleSignInBtn (){
    // 메인 페이지로 리다이렉트
    const searchParams = useSearchParams();
    if(searchParams){
        const callbackUrl = searchParams.get('callbackUrl') || '';
        return (
            <button 
                onClick={() => signIn('google', { callbackUrl })} 
            >
                구글 로그인 버튼
            </button>
        )
    }
}
// 로그인 페이지로 이동하는 버튼
export function SignInBtn (){
    return <button 
    onClick={() => {
        signIn();
    }}>로그인</button>
}

// 로그 아웃 버튼
export function SignOutBtn (){
    return <button 
    onClick={() => {
        signOut();
    }}>로그아웃</button>
}