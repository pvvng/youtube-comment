'use client';

import { Session } from "next-auth";
import { SignInBtn } from "@/app/components/SignItems/SignBtn";
import HeartedDataContainer from "./HeartedDataContainer";

export default function MiniMyPageBody(
    {session} : {session : Session | null}
){
    return(
        <div className="w-100 p-2">
            {
                session ?
                <>
                    <HeartedDataContainer type="video" />
                    <hr />
                    <HeartedDataContainer type="youtuber" />
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