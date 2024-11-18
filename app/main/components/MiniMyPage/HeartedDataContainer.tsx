import { useDBUserStore } from "@/app/store";

interface PropsType {
    type : string;
}

export default function HeartedDataContainer(
    {type} : PropsType
){
    const renderString = type === "video" ? "동영상" : "유튜버";

    const { userdata } = useDBUserStore();

    return(
        <>
            <p className="fw-bold">찜한 {renderString}</p>
            {
                !userdata ? 
                <p>
                    아직 찜한{' '} 
                    {renderString}
                    {type === "video" ? "이" : "가"} 
                    {' '}없어요!
                </p> :
                userdata[type === "video" ? "videoHeart" : "youtuberHeart"]
                .map(v => <p key={v.id}>{v.name}</p>)
            }

        </>
    )
}