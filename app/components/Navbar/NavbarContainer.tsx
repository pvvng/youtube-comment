import { getServerSession } from "next-auth"
import NavBarHubContainer from "./NavBarHubContainer";

/** 세션 받기 위한 server-component */
export default async function NavbarContainer(){

    const session = await getServerSession();

    return <NavBarHubContainer session={session} />
}