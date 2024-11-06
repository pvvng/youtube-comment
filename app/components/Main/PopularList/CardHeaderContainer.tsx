import { PopularType } from "@/types/popular";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

interface PropsType {
    refetch: (options?: RefetchOptions) => 
        Promise<QueryObserverResult<PopularType[], Error>>;
    type: string;
}

export default function CardHeaderContainer(
    {refetch, type} : PropsType
){
    return (
        <>
            <div className="row row-center card-header-container" style={{margin : 'auto'}}>
                <div className="text-start col-8">
                    <span className="fw-bold m-0">
                        {
                            type === "video" ? 
                            <span>인기 급상승 영상</span>: 
                            type === "youtuber" ? 
                            <span>인기 급상승 유튜버</span>:
                            <span>upexpected type</span>
                        }
                    </span>
                </div>
                <div className="text-end col-4">
                    <button 
                        className="refresh-btn"
                        onClick={() => { refetch() }}
                    >
                        <FontAwesomeIcon icon={faArrowsRotate} />
                    </button>
                </div>
            </div>
            <hr className="m-0 mb-3" />
        </>
    )
}