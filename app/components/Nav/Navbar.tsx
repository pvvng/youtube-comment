import { getServerSession } from "next-auth";
import InputContainer from "../InputContainer";
import NavLogoContainer from "./NavItems";
import { SignInBtn, SignOutBtn } from "../SignItems/SignBtn";

export default async function Navbar(){

    const session = await getServerSession();

    return(
        <div className="row row-center w-100 p-3 bg-danger" style={{margin : 'auto'}}>
            <div className="col-3">
                <NavLogoContainer />
            </div>
            <div className="col-6">
                <InputContainer />
            </div>
            <div className="col-3">
                {
                    session ? 
                    <SignOutBtn />:
                    <SignInBtn />
                }
            </div>
        </div>
    )
}