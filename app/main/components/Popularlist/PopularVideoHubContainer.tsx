import { useQuery } from "@tanstack/react-query";
import PopularCarouselContainer from "../../../main/components/Popularlist/PopularCarouselContainer";
import useProcessError from "@/@util/hooks/useprocessError";
import fetchDBPopularVideo from "@/@util/functions/fetch/fetchDBPopularVideo";
import PopularContainerLoadingSpinner from "../../../main/components/Popularlist/PopularContainerLoadingSpinner";
import CardHeaderContainer from "../../../main/components/Popularlist/CardHeaderContainer";
import ErrorContainer from "@/app/components/ErrorContainer";

export default function PopularVideoHubContainer(){

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