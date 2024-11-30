import NavbarContainer from "@/app/components/Navbar/NavbarContainer";
import MainContainer from "./components/Main/MainContainer";
import FooterContainer from "@/app/components/Footer/FooterContainer";

interface PropsType {
    params : {id : string};
}

export default function VideoDetail(props :PropsType){

    // props로 비디오 아이디 받아서 props로 전달
    const videoId = props.params.id;

    return (
        <>
            <NavbarContainer />
            <div style={{position : 'relative'}}>
                <MainContainer videoId={videoId} />
            </div>
            <FooterContainer />
        </>
    )
}