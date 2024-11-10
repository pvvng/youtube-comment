import { getServerSession, Session } from "next-auth"
import MiniMyPageHeader from "./Header";
import MiniMyPageBody from "./Body";

export default async function MiniMyPageContainer(){

    const session : Session|null = await getServerSession();
    
    return(
        <div 
            className="w-100 border" 
            style={{borderRadius : 10}}
        >
            <MiniMyPageHeader session={session} />
            <hr className="m-0"/>
            <MiniMyPageBody session={session} />
        </div>
    )
}