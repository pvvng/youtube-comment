import { Session } from "next-auth";

export default function  MiniMyPageHeader(
    {session} : {session : Session | null}
){
    return (
        <div className="row row-center w-100" style={{margin : 'auto'}}>
            <div className="col-3 col-lg-4 p-0">
                {
                    session ?
                    <img 
                        src={session.user?.image || "/temp-user.png"} 
                        width="100%" 
                        alt="user-profile" 
                        style={{borderTopLeftRadius : '10px'}}
                    /> :
                    <img 
                        src="/temp-user.png"
                        width="100%" 
                        alt="user-temp-profile" 
                        style={{borderTopLeftRadius : '10px'}}
                    />
                }
            </div>
            <div className="col-9 col-lg-8">
                <p className="m-0">안녕하세요</p>
                <h5 className="m-0 fw-bold">{session?.user?.name || 'user'}님!</h5>   
            </div> 
        </div>
    )
}