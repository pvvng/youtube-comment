"use client";

import { Session } from "next-auth";
import { SignInBtn, SignOutBtn } from "../SignItems/SignBtn";
import { useValue } from "./ValueContext";
import InputContainer from "../InputContainer";
import NavLogoContainer from "./NavItems";

/**context를 사용하기 위한 허브 */
const InnerNavbar: React.FC<{ session: Session | null }> = ({ session }) => {
    const { state } = useValue(); 
    
    return (
        <div
            className="row row-center w-100 p-3 bg-whiter"
            style={{ margin: "auto" }}
        >
            <div className="col-2 text-start">
                <NavLogoContainer />
            </div>
            <div className={state[0] ? "col-10 text-center" : "col-8 text-center"}>
                <InputContainer />
            </div>
            <div
                className={state[0] ? "" : "col-2 text-end pe-0"}
                style={state[0] ? { display: "none" } : undefined}
            >
                {session ? <SignOutBtn session={session}/> : <SignInBtn />}
            </div>
        </div>
    );
};

export default InnerNavbar;
