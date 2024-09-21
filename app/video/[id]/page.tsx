import MainContainer from "./components/MainContainer";

interface PropsType {
    params : {id : string};
}

export default function VideoDetail(props :PropsType){

    // props로 비디오 아이디 받아서 props로 전달
    const videoId = props.params.id;

    return <MainContainer videoId={videoId} />;
}