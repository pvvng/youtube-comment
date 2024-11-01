'use client'

import { signIn, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import '@/app/css/item.css/loginButton.css';


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
    className="loginButton text-end"
  
    onClick={() => {
        signIn();
    }}>
      <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid"
          viewBox="0 0 256 262"
        >
          <path
            fill="#4285F4"
            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
          />
          <path
            fill="#34A853"
            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
          />
          <path
            fill="#FBBC05"
            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
          />
          <path
            fill="#EB4335"
            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
          />
        </svg>
      
    </button>
}
interface SidebarOverlayProps {
  isOpenModel: boolean; // isOpenMode의 타입을 boolean으로 정의
}

export function SidebarOverlay({ isOpenModel }: SidebarOverlayProps) {
  // if (!isOpenModel) return null;

  return (
      <div className="sidebar-overlay">
          <div className="sidebar-content">
              <h2>Sidebar Title</h2>
              <p>Some content here...</p>
             
          </div>
      </div>
  );
}

// 로그 아웃 버튼
export function SignOutBtn (
  {session} : {session : Session | null}
){
    const [isOpenModel, setisOpenModel] = useState(false);
    const router = useRouter();
     return <><div  onClick={() => {
        // router.push('/my-page');
        setisOpenModel(!isOpenModel);
       }}
        >
       {
                    session ?
                    <img 
                        src={session.user?.image || "/temp-user.png"} 
                        width="50px" 
                        alt="user-profile" 
                        style={{ borderRadius: '50%' }}
                    /> :
                    <img 
                        src="/temp-user.png"
                        width="50px" 
                        alt="user-temp-profile" 
                        style={{ borderRadius: '50%' }}
                    />
                }
       </div>
       <SidebarOverlay isOpenModel={isOpenModel}  />
       </>
}

