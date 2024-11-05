'use client';

import '@/app/css/sign.css';
import { GoogleSignInBtn } from "@/app/components/SignItems/SignBtn";
import { useRouter } from "next/navigation";

const BACKGROUND_STYE = {
    width: '100%',
    // navbar 크기 빼기
    height: '100vh',
    display: 'grid',
    placeItems: 'center',
    background: 'white',
}

export default function SignInPage() {

    const router = useRouter();

    return (
        <div style={{ 
            ...BACKGROUND_STYE, 
            backgroundSize: 'contain', 
            backgroundPosition: 'center center', 
            backgroundRepeat: 'no-repeat', 
            position : 'absolute',
            top : 0,
        }}>
            <div className="text-center" style={{margin : 'auto'}}>
                <img src='/blue-logo-with-koname.png' width="100%" style={{maxWidth : 360}}/>
                <GoogleSignInBtn />
                <button className='go-main-button bg-dark' onClick={() => {
                    router.push('/');
                }}>메인화면으로 돌아가기</button>
            </div>
        </div>
    )
}