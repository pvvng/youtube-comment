import PopularCarouselContainer from "./PopularCarouselContainer";
import fetchDBPopularYoutuber from "@/@util/functions/fetch/fetchDBPopularYoutuber";
import useProcessError from "@/@util/hooks/useprocessError";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

export default function PopularYoutuberHubContainer(){

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey : ['commentData'],
        queryFn : () => fetchDBPopularYoutuber(),
        refetchOnWindowFocus : false,
        // 캐시타임 1시간(3600000ms)
        gcTime : 3600000,
        staleTime : 3600000,
    })

    useProcessError(isError, error, "null");
    
    return (
        <>
            <button 
                className="float-end refresh-btn"
                onClick={() => {refetch()}}
            >
                <FontAwesomeIcon icon={faArrowsRotate} />
            </button>
            <h6 className="fw-bold m-0">인기 유튜버</h6>
            <hr className="m-0 mt-2 mb-3" />
            {
                !data || isLoading ?
                <div className="d-flex row-center" style={{minHeight : 100}}>
                    <div 
                        className="spinner-border" 
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>
                </div>:
                <PopularCarouselContainer carouselData={data} />
            }
            <div style={{clear : 'both'}} />
        </>
    )
}