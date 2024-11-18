'use client';

import { Session } from "next-auth";
import { SignInBtn } from "@/app/components/SignItems/SignBtn";
import { useRouter } from "next/navigation";

export default function MiniMyPageBody(
    {session} : {session : Session | null}
){

    const router = useRouter();
    return(
        <div className="w-100 p-2">
            {
                session ?
                <>
                    <p>찜한 동영상</p>
                    <p>찜한 유튜버</p>
                    <p>구독 목록</p>
                    <button className="btn btn-dark float-end" onClick={() => {
                        router.push('/my-page');
                    }}>마이페이지</button>
                    <div style={{clear : 'both'}}></div>   
                </> : 
                <div 
                    className="row row-center w-100" 
                    style={{minHeight : '200px', margin : 'auto'}}
                >
                    <div className="text-center">
                        <p>로그인 후 이용 가능합니다.</p>
                        <SignInBtn />
                    </div>
                </div>
            }
        </div>
    )
}