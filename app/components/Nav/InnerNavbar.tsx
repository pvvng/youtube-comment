"use client";

import { Session } from "next-auth";
import InputContainer from "../InputContainer";
import NavLogoContainer from "./NavItems";
import { SignInBtn, SignOutBtn } from "../SignItems/SignBtn";
import { useValue } from "./ValueContext";

const InnerNavbar: React.FC<{ session: Session | null }> = ({ session }) => {
    const { value } = useValue(); // 이제 ValueProvider 내에서 사용되므로 오류가 발생하지 않음

    return (
        <div
        className="row row-center w-100 p-3 bg-whiter"
        style={{ margin: "auto" }}
        >
            <div className="col-2 text-start">
                <NavLogoContainer />
            </div>
            <div className={value ? "col-10 text-center" : "col-8 text-center"}>
                <InputContainer />
            </div>
            <div
                className={value ? "" : "col-2 text-end pe-0"}
                style={value ? { display: "none" } : undefined}
            >
                {session ? <SignOutBtn /> : <SignInBtn />}
            </div>
        </div>
    );
};

export default InnerNavbar;
