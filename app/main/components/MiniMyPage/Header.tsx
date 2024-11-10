import { Session } from "next-auth";

export default function  MiniMyPageHeader(
    {session} : {session : Session | null}
){
    return (
        <div className="row row-center w-100 p-2" style={{margin : 'auto'}}>
            <div className="col-3 col-md-4 text-center">
                <img 
                    src={session?.user?.image || "/logo/logo-mask.png"} 
                    width="100%" 
                    alt="user-profile" 
                    style={{maxWidth : 100}}
                />
            </div>
            <div className="col-9 col-md-8">
                <p className="m-0 fw-bold">{session?.user?.name || '사용자'}님</p>   
                <p className="m-0">안녕하세요</p>
            </div> 
        </div>
    )
}