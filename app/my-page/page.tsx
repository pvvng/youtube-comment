import { getServerSession, Session } from "next-auth"
import NavbarContainer from "../components/Navbar/NavbarContainer";
import MyPageHubContainer from "./components/MyPageHubContainer";
import FooterContainer from "../components/Footer/FooterContainer";

export default async function MyPage() {

    const session: Session | null = await getServerSession();

    return (
        <>
            <NavbarContainer />
            <div className="container-md">
               <MyPageHubContainer session={session}/>
            </div>
            <FooterContainer />
        </>
    );
}