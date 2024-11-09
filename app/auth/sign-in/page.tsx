'use client';

import '@/app/css/sign.css';
import { GoogleSignInBtn } from "@/app/components/SignItems/SignBtn";
import { useRouter } from "next/navigation";

const BACKGROUND_STYE = {
    width: '100%',
    height: '100vh',
    display: 'grid',
    background: 'white',
}

export default function SignInPage() {

    const router = useRouter();

    return (
        <div style={{ ...BACKGROUND_STYE}}>
            <div className="text-center" style={{margin : 'auto'}}>
                <img src='/logo/logo-full.png' className='mb-3' width="100%" style={{maxWidth : 360}}/>
                <GoogleSignInBtn />
                <button className='go-main-button mt-2 btn-main' onClick={() => {
                    router.push('/main');
                }}>메인화면으로 돌아가기</button>
            </div>
        </div>
    )
}