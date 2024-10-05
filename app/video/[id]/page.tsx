import MainContainer from "./components/Main/MainContainer";
import SideBarContainer from "./components/Main/SideBarContainer";

interface PropsType {
    params : {id : string};
}

export default function VideoDetail(props :PropsType){

    // props로 비디오 아이디 받아서 props로 전달
    const videoId = props.params.id;

    return (
        <div className="row w-100" style={{margin :'auto'}}>
            <div className="col-md-3 col-lg-2 p-0 d-none d-md-block">
                <SideBarContainer />
            </div>
            <div className="col-md-9 col-lg-10 col-12">
                <MainContainer videoId={videoId} />
            </div>
        </div>
    )
}