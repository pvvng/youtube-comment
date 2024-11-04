'use client';

import { PopularYoutuberType } from "@/types/popular/youtuber";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";

interface PropsType {
    carouselData : PopularYoutuberType[]
}

const LEFT_LAST = ['d-none', ''];
const RIGHT_LAST = ['', 'd-none'];
const DEFAULT_STATE_ARR = ['', ''];

export default function PopularCarouselContainer(
    {carouselData} : PropsType
){
    const [carouselState, setCarouselState] = useState(0);
    const [hideCarouselArrowState, setHideCarouselArrowState] = useState(LEFT_LAST);

    const dataLength = useMemo(() => carouselData.length, [carouselData]);
    const moveLength = useMemo(() => parseInt((100 / dataLength).toFixed(2)), [dataLength]);
    const maxTranslateX = useMemo(() => (dataLength - 4) * moveLength, [dataLength, moveLength]);

    function moveLeft() {
        if (carouselState < 0) {
            setCarouselState((prev) => prev + moveLength);
        } 
    }

    function moveRight() {
        if (carouselState > -Math.round(maxTranslateX)) {
            setCarouselState((prev) => prev - moveLength);
        } 
    }

    useEffect(() => {
        if(carouselState >= 0){
            setHideCarouselArrowState(LEFT_LAST);
        }else if (carouselState <= -Math.round(maxTranslateX)){
            setHideCarouselArrowState(RIGHT_LAST);
        }else{
            setHideCarouselArrowState(DEFAULT_STATE_ARR);
        }
    }, [carouselState, hideCarouselArrowState]);

    return(
        <div 
            className="mb-3" 
            style={{overflow : 'hidden', position : 'relative'}}
        >
            <div style={{
                    width : `${dataLength * 25}%`, 
                    transform : `translateX(${carouselState}%)`,
                    transition : 'all 1s'
                }}
            >
                {
                    carouselData.map((cd, i) => {
                        return (
                            <div 
                                key={cd.channelId + i}
                                className="float-start text-center"
                                style={{width : moveLength + '%'}}
                            >
                                <div className="mx-2">
                                    <img 
                                        src={cd.thumnailUrl} 
                                        width="100%" 
                                        className="border"
                                        style={{
                                            borderRadius : '50%',
                                            maxWidth : 150
                                        }} 
                                    />
                                </div>
                            </div>
                        )
                    })
                }
                <div style={{clear : 'both'}} />
            </div>
            <span 
                className={hideCarouselArrowState[0]}
                style={{
                    position : 'absolute', 
                    top : 'calc(50% - 14px)',
                    fontSize: 24
                }}
                onClick={() => moveLeft()}
            >
                <FontAwesomeIcon icon={faAngleUp}  style={{transform: 'rotate(-90deg)'}} />            
            </span>
            <span 
                className={hideCarouselArrowState[1]}
                style={{
                    position : 'absolute', 
                    top : 'calc(50% - 14px)', 
                    right : 8,
                    fontSize: 24
                }}
                onClick={() => moveRight()}
            >
                <FontAwesomeIcon icon={faAngleUp}  style={{transform: 'rotate(90deg)'}} />            
            </span>
        </div>
    )
}