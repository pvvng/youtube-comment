import { useQuery } from "@tanstack/react-query";
import PopularCarouselContainer from "../../../main/components/Popularlist/PopularCarouselContainer";
import fetchDBPopularYoutuber from "@/@util/functions/fetch/fetchDBPopularYoutuber";
import useProcessError from "@/@util/hooks/useprocessError";
import PopularContainerLoadingSpinner from "../../../main/components/Popularlist/PopularContainerLoadingSpinner";
import CardHeaderContainer from "../../../main/components/Popularlist/CardHeaderContainer";
import ErrorContainer from "@/app/components/Error/ErrorContainer";

export default function PopularYoutuberHubContainer(){


    const { data, isLoading, isError, error } = useQuery({
        queryKey : ['youtuberPopularity'],
        queryFn : () => fetchDBPopularYoutuber(),
        refetchOnWindowFocus : false,
        // no cache
        gcTime : 0,
        staleTime : 0,
    })

    const errorMessage = useProcessError(isError, error, "null");
    if(errorMessage) return <ErrorContainer errorMessage={errorMessage} />;
    
    return (
        <>
            <CardHeaderContainer type="youtuber" />
            {
                !data || isLoading ?
                <PopularContainerLoadingSpinner />:
                <PopularCarouselContainer carouselData={data} type="youtuber" />
            }
            <div style={{clear : 'both'}} />
        </>
    )
}