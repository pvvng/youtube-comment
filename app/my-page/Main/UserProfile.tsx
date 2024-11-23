import { Session } from "next-auth";
export default function UserProfile({ session }: { session: Session | null }) {
    return (
        <>
            <div className="mt-4">
                <div className="card-container d-flex align-items-center">
                    <div className="col-sm-3 col-12 text-center mb-sm-0 mb-3">
                        <img
                            src={session?.user?.image || "/temp-user.png"}
                            alt="user-profile"
                            className="rounded-circle"
                            width="100%"
                            style={{ borderRadius: '50%', maxWidth: '180px' }}
                        />
                    </div>
                    <div className="col-sm-9 col-12">
                    <div className="mb-sm-0 mb-3">
                        <h5>{session?.user?.email || "이메일 없음"}</h5>
                        <p className="m-0">이름: {session?.user?.name || "이름 없음"}</p>
                       
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
   
}

{/* 
<div className="mt-4">
                <div className="card-container">
                    <div className="col-auto">
                        <img
                            src={session?.user?.image || "/temp-user.png"}
                            alt="user-profile"
                            className="rounded-circle"
                            style={{ width: "100px", height: "100px" }}
                        />
                    </div>
                    <div>
                        <h5>{session?.user?.email || "이메일 없음"}</h5>
                        <p className="m-0">이름: {session?.user?.name || "이름 없음"}</p>
                        <p>가입일: {"가입일 없음"}</p>
                    </div>
                </div>
            </div> */}