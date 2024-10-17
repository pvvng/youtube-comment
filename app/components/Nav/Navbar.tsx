import { getServerSession } from "next-auth";
import { ValueProvider } from "./ValueContext";
import InnerNavbar from "./InnerNavbar";

export default async function Navbar(){

    const session = await getServerSession();
    
    return (
        <ValueProvider>
            <InnerNavbar session={session} />
        </ValueProvider>
    );
}

 