import { getServerSession, Session } from "next-auth"
import NavbarContainer from "../components/Navbar/NavbarContainer";
import MyPageHub from "./Main/MypageHubcontainer";

const url = process.env.NEXTAUTH_URL;

interface PropsType {
    params: { id: string };
}

export default async function MyPag(props: PropsType) {

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