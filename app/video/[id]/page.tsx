import NavbarContainer from "@/app/components/Navbar/NavbarContainer";
import MainContainer from "./components/Main/MainContainer";
import SideBarContainer from "./components/Main/SideBarContainer";

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
                <SideBarContainer />
                <MainContainer videoId={videoId} />
            </div>
        </>
    )
}