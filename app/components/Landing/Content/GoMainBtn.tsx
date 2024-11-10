'use client';

import { useRouter } from "next/navigation";

export default function GoMainBtn(){

    const router = useRouter();

    return(
        <button 
            className="go-home-button"            
            onClick={() => {
                router.push('/main');
            }}
        >메인화면으로 이동</button>
    )
}