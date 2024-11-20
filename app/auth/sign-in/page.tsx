// 'use client';

import '@/app/css/sign.css';

import { Suspense } from 'react';
import { GoogleSignInBtn, LoginAnotherAccountBtn } from "@/app/components/SignItems/SignBtn";
import GoToMainBtn from './component/GoToMainBtn';
import Image from 'next/image';

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
                <div className='large-logo-container mb-3'>
                    <Image 
                        src='/logo/logo-full.png' 
                        width={360}
                        height={360}
                        layout='responsive'
                        alt='YoutuView Logo'
                        priority
                    />
                </div>
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