import '@/app/css/sign.css';
import { GoogleSignInBtn, LoginAnotherAccountBtn } from "@/app/components/SignItems/SignBtn";
import GoToMainBtn from './component/GoToMainBtn';
import { Suspense } from 'react';

const BACKGROUND_STYE = {
    width: '100%',
    height: '100vh',
    display: 'grid',
    background: 'white',
}

export default function SignInPage() {
    return (
        <div style={{ ...BACKGROUND_STYE}}>
            <div className="text-center" style={{margin : 'auto'}}>
                <img src='/logo/logo-full.png' className='mb-3' width="100%" style={{maxWidth : 360}}/>
                <Suspense fallback={<p>loading...</p>} >
                    <GoogleSignInBtn />
                </Suspense>
                <GoToMainBtn />
                <div className='mt-4'>
                    <LoginAnotherAccountBtn />
                </div>
            </div>
        </div>
    )
}