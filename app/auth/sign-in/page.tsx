import { GoogleSignInBtn } from "@/app/components/SignItems/SignBtn";

const BACKGROUND_STYE = {
    width: '100%', 
    // navbar 크기 빼기
    height: 'calc(100vh - 100px)',
    display: 'grid',
    placeItems: 'center',
    background : 'black',
}

export default function SignInPage(){

    return (
        <div style={{...BACKGROUND_STYE, backgroundSize:'contain', backgroundPosition:'center center', backgroundRepeat:'no-repeat'}}>
            <GoogleSignInBtn />
        </div>
    )
}