import { getServerSession } from "next-auth"
import MiniMyPageHeader from "./Header";
import MiniMyPageBody from "./Body";

export default async function MiniMyPageContainer(){
    const session = await getServerSession();
    return(
        <div className="w-100">
            {
                session ?
                <div className="border">
                    <MiniMyPageHeader session={session} />
                    <MiniMyPageBody />
                </div> : <p>로그인 후 이용 가능함</p>
            }
        </div>
    )
}