'use client';

import { faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function  MiniMyPageHeader(
    {session} : {session : Session | null}
){
    const router = useRouter();

    return (
        <>
            <div className={
                    session ? 
                    "w-100 p-2 pt-1 pb-4 text-center":
                    "w-100 p-2 pt-3 pb-4 text-center"
                }
            >
                {
                    session &&
                    <div className="text-end">
                        <button className="mx-1 no-bg-main-btn" onClick={() => {
                            signOut();
                        }}>
                            <FontAwesomeIcon icon={faPowerOff} />
                        </button>
                        <button className="no-bg-main-btn" onClick={() => {
                            router.push('/my-page');
                        }}>
                            <FontAwesomeIcon icon={faUser} />
                        </button>
                    </div>
                }
                <div className="row row-center" style={{margin : 'auto'}}>
                    <div className="col-4">
                        <img
                            src={session?.user?.image || "/logo/logo-mask.png"} 
                            alt="user-profile" 
                            width="100%"
                            loading="lazy"
                            className="rounded"
                        />
                    </div>
                    <div className="col-8">
                        <h5 className="mt-2 m-0">
                            <span className="fw-bold">{session?.user?.name || '사용자'}</span>님
                        </h5>   
                        <p className="m-0">안녕하세요</p>
                    </div>
                </div>
            </div>
        </>
    )
}