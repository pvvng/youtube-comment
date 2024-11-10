'use client';
import { useRouter } from "next/navigation";

export default function GoToMainBtn(){

    const router = useRouter();

    return (
        <button className='go-main-button mt-2 mb-2 btn-main' onClick={() => {
            router.push('/main');
        }}>메인화면으로 돌아가기</button>
    )
}