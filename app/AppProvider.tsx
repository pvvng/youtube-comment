'use client';

import ReactQueryProvider from "@/@util/providers/ReactQueryProvider";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import FooterContainer from "./components/Footer/FooterContainer";
import { ReactNode } from "react";

export default function AppProvider({children} : {children : ReactNode}){
    return(
        <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
            <ReactQueryProvider>
                    {children}
                <FooterContainer />
            </ReactQueryProvider>
        </ReCaptchaProvider>
    )
}