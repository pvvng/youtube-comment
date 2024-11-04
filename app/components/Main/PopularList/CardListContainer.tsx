'use client';

import { RecentVideoType } from "@/@util/hooks/useUpdateRecentVideoLocalStorage";
import PopularVideoHubContainer from "./PopularVideoHubContainer";
import PopularYoutuberHubContainer from "./PopularYoutuberHubContainer";

export interface VideoCardType extends RecentVideoType{};

export default function CardListContainer(){

    return(
        <div 
            className="p-2 border mt-md-0 mt-3" 
            style={{borderRadius : '10px'}}
        >
            <PopularYoutuberHubContainer />
            <h6 className="fw-bold m-0">인기 영상</h6>
            <hr className="m-0 mt-2 mb-3" />
            <PopularVideoHubContainer />
        </div>
    )
}