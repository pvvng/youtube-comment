import { getServerSession } from "next-auth";
import { ValueProvider } from "./ValueContext";
import InnerNavbar from "./InnerNavbar";

/**navbar를 감싸기 위해 존재하는 컴포넌트 */
export default async function Navbar(){

    const session = await getServerSession();
    
    return (
        <ValueProvider>
            <InnerNavbar session={session} />
        </ValueProvider>
    );
}

 