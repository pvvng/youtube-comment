'use client'

import { useRouter } from "next/navigation"

export default function NavLogoContainer(){
    const router = useRouter();
    return (
        <button onClick={() => {
            router.push('/');
        }}>메인</button>
    )
}