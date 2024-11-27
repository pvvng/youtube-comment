import { getServerSession, Session } from "next-auth"
import NavbarContainer from "../components/Navbar/NavbarContainer";
import MyPageHub from "./Main/MypageHubcontainer";

export default async function MyPage() {

    const session: Session | null = await getServerSession();

    return (
        <>
            <NavbarContainer />
            <div className="container">
               <MyPageHub session={session}/>
            </div>
        </>
    );
}