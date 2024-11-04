'use client'

import '@/app/css/sign.css';
import { signIn, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Session } from "next-auth";
import { GoogleLogoSvg } from '@/app/svg';

// 카카오 로그인 버튼
export function GoogleSignInBtn (){
    // 메인 페이지로 리다이렉트
    const searchParams = useSearchParams();
    if(searchParams){
        const callbackUrl = searchParams.get('callbackUrl') || '';
        return (
            /* From Uiverse.io by Yaya12085 */ 
            <button 
                className="google-sign-button"
                onClick={() => signIn('google', { callbackUrl })} 
            >
                <GoogleLogoSvg />
                Continue with Google
            </button>
        )
    }
}

// 로그인 페이지로 이동하는 버튼
export function SignInBtn (){
    return (
      <button 
        className="btn btn-dark"
        onClick={() => { signIn() }}
      >
        로그인
      </button>
    )
}

export function SignOutBtn (){
    return (
      <button 
        className="btn btn-dark"
        onClick={() => { signOut() }}
      >
        로그아웃
      </button>
    )
}

// 로그 아웃 버튼
// export function SignOutBtn (
//   {session} : {session : Session | null}
// ){
//     return (
//       <div  onClick={() => { signOut() }}>
//         {
//           session ?
//           <img 
//               src={session.user?.image || "/temp-user.png"} 
//               width="50px" 
//               alt="user-profile" 
//               style={{ borderRadius: '50%' }}
//           /> :
//           <img 
//               src="/temp-user.png"
//               width="50px" 
//               alt="user-temp-profile" 
//               style={{ borderRadius: '50%' }}
//           />
//         }
//       </div>
//     )
// }