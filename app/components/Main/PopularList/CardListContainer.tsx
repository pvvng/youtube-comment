'use client';

import { RecentVideoType } from "@/@util/hooks/useUpdateRecentVideoLocalStorage";
import PopularVideoHubContainer from "./PopularVideoHubContainer";
import PopularYoutuberHubContainer from "./PopularYoutuberHubContainer";

export interface VideoCardType extends RecentVideoType{};

export default function CardListContainer(){

    return(
        <>
            <div 
                className="border mt-md-0 mt-3" 
                style={{borderRadius : '10px'}}
            >
                <PopularYoutuberHubContainer />
            </div>
            <div 
                className="border mt-3" 
                style={{borderRadius : '10px'}}
            >
                <PopularVideoHubContainer />
            </div>
        </>

    )
}