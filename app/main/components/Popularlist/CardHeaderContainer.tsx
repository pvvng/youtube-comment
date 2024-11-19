import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PropsType {
    type: string;
}

export default function CardHeaderContainer(
    {type} : PropsType
){
    return (
        <>
            <div className="card-header-container" style={{margin : 'auto'}}>
                <span className="fw-bold m-0">
                    {
                        type === "video" ? 
                        <span>
                            <span className="mx-2" style={{color : 'orangered'}}><FontAwesomeIcon icon={faFire} /></span>
                            인기 급상승 영상
                        </span>: 
                        type === "youtuber" ? 
                        <span>
                            <span className="mx-2" style={{color : 'orangered'}}><FontAwesomeIcon icon={faFire} /></span>
                            인기 급상승 유튜버
                        </span>:
                        <span>upexpected type</span>
                    }
                </span>
            </div>
            <hr className="m-0 mb-3" />
        </>
    )
}