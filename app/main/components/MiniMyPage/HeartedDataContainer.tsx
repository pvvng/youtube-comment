
import { useDBUserStore } from "@/app/store";
import { UserHeartedType } from "@/types/userdata";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import getRandomIndex from "@/@util/functions/getRandomIndex";
import RenderHeartedDataCard from "./HeartedDataCardContainer";

interface PropsType {
    type: "video" | "youtuber";
}

export default function HeartedDataContainer(
    { type }: PropsType
) {
    // string
    const renderString = type === "video" ? "동영상" : "유튜버";
    const NO_HEARTED_DATA = `아직 찜한 ${renderString}${type === "video" ? "이" : "가"} 없어요.`

    // zustand userdata
    const { userdata } = useDBUserStore();

    // state
    const [heartedDataState, setHeartedDataState] = useState<UserHeartedType[] | undefined>(undefined);
    const [randomNumberSetState, setRandomNumberSetState] = useState<Set<number>>(new Set());

    // random index 설정
    useEffect(() => {
        setRandomNumberSetState(getRandomIndex(heartedDataState));
    }, [heartedDataState, setRandomNumberSetState]);

    // userdata type 설정
    useEffect(() => {
        if (userdata) {
            setHeartedDataState(
                userdata[type === "video" ? "videoHeart" : "youtuberHeart"]
            );
        }
    }, [userdata]);

    return (
        <>
            {
                (heartedDataState?.length || 0) > 4?
                <button 
                    className="refresh-btn float-end" 
                    onClick={() => {
                        setRandomNumberSetState(getRandomIndex(heartedDataState));
                    }}
                >
                    <FontAwesomeIcon icon={faRefresh} />
                </button> : null
            }
            <p className="fw-bold">
                찜한 {renderString} ({heartedDataState?.length || 0})
            </p>
            <RenderHeartedDataCard
                type={type}
                heartedDataState={heartedDataState}
                noDataString={NO_HEARTED_DATA}
                randomNumberSet={randomNumberSetState}
            />
            <div style={{clear : 'both'}} />
        </>
    )
}