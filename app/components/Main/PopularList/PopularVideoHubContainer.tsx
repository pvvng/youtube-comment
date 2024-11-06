import { useQuery } from "@tanstack/react-query";
import PopularCarouselContainer from "./PopularCarouselContainer";
import useProcessError from "@/@util/hooks/useprocessError";
import fetchDBPopularVideo from "@/@util/functions/fetch/fetchDBPopularVideo";
import PopularContainerLoadingSpinner from "./PopularContainerLoadingSpinner";
import CardHeaderContainer from "./CardHeaderContainer";
import ErrorContainer from "../../ErrorContainer";

export default function PopularYoutuberHubContainer(){

    const { data, isLoading, isError, error } = useQuery({
        queryKey : ['videoPopularity'],
        queryFn : () => fetchDBPopularVideo(),
        refetchOnWindowFocus : false,
        // no cache
        gcTime : 0,
        staleTime : 0,
    })

    const errorMessage = useProcessError(isError, error, "null");

    if(errorMessage) return <ErrorContainer errorMessage={errorMessage} />;
    
    return (
        <>
            <CardHeaderContainer type="video" />
            {
                !data || isLoading ?
                <PopularContainerLoadingSpinner />:
                <PopularCarouselContainer carouselData={data} type="video" />
            }
            <div style={{clear : 'both'}} />
        </>
    )
}