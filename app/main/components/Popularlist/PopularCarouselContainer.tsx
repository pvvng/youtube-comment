'use client';

import '@/app/css/carousel.css';

import { PopularType } from "@/types/popular";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from "react";

interface PropsType {
    carouselData : PopularType[];
    type : string;
}

const LEFT_LAST = ['d-none', ''];
const RIGHT_LAST = ['', 'd-none'];
const DEFAULT_STATE_ARR = ['', ''];
const HIDDEN_STATE_ARR = ['d-none', 'd-none'];

export default function PopularCarouselContainer(
    {carouselData, type} : PropsType
){
    const [carouselState, setCarouselState] = useState(0);
    const [hideCarouselArrowState, setHideCarouselArrowState] = useState(LEFT_LAST);
    const [viewOffset, setViewOffset] = useState(0);

    const dataLength = useMemo(() => carouselData.length, [carouselData]);
    const moveLength = useMemo(() => parseInt((100 / dataLength).toFixed(2)), [dataLength]);
    const maxTranslateX = useMemo(() => (dataLength - viewOffset) * moveLength, [dataLength, moveLength, viewOffset]);

    const router = useRouter();

    function moveLeft() {
        if (carouselState < 0) {
            setCarouselState((prev) => prev + moveLength);
        } 
    };

    function moveRight() {
        if (carouselState > -Math.round(maxTranslateX)) {
            setCarouselState((prev) => prev - moveLength);
        } 
    };

    // 화면 크기에 따른 maxTranslateX 업데이트 함수
    const updateViewOffset = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth >= 1024) { // lg 이상
            setViewOffset(5);
        }else if (screenWidth >= 992) { // lg 이상
            setViewOffset(4);
        }else if (screenWidth >= 466) { // sm 이상
            setViewOffset(3);
        }else { // xs (576 이하)
            setViewOffset(2);
        }

        setCarouselState(0);
    };

    useEffect(() => {
        updateViewOffset();

        // resize 이벤트 리스너 추가
        window.addEventListener("resize", updateViewOffset);

        // 컴포넌트 언마운트 시 리스너 제거
        return () => {
            window.removeEventListener("resize", updateViewOffset);
        };
    }, [viewOffset]);

    useEffect(() => {
        if(carouselState >= 0){
            if(dataLength <= viewOffset){
                setHideCarouselArrowState(HIDDEN_STATE_ARR);
            }else{
                setHideCarouselArrowState(LEFT_LAST);         
            }
        }else if (carouselState <= -Math.round(maxTranslateX)){
            if(dataLength <= viewOffset){
                setHideCarouselArrowState(HIDDEN_STATE_ARR);
            }else{
                setHideCarouselArrowState(RIGHT_LAST);
            }
        }else{
            if(dataLength <= viewOffset){
                setHideCarouselArrowState(HIDDEN_STATE_ARR);
            }else{
                setHideCarouselArrowState(DEFAULT_STATE_ARR);
            }
        }
    }, [carouselState, hideCarouselArrowState, dataLength, viewOffset]);

    if(dataLength === 0) return (
        <div 
            className="d-flex row-center" 
            style={{minHeight : 100}}
        >
            <p className='m-0'>데이터가 없습니다.</p>
        </div>
    )

    return(
        <div 
            className="mb-3" 
            style={{overflow : 'hidden', position : 'relative'}}
        >
            <div style={{
                    width : `${dataLength * (100/viewOffset)}%`, 
                    transform : `translateX(${carouselState}%)`,
                    transition : 'all 1s'
                }}
            >
                {carouselData.map((cd, i) => 
                    <div 
                        key={cd.dataId + i}
                        className="float-start text-center"
                        style={{width : moveLength + '%', padding: '0 8px'}}
                    >
                        <div 
                            className='image-square-container border'
                            onClick={() => {
                                router.push(`/${type}/${cd.dataId}`);
                            }}
                        >
                            <Image
                                src={cd.thumnailUrl}
                                alt={cd.name}
                                className='thumbnail-container'
                                fill
                            />
                        </div>
                    </div>
                )}
                <div style={{clear : 'both'}} />
            </div>
            <span 
                className={`left-arrow-head ${hideCarouselArrowState[0]}`}
                onClick={() => moveLeft()}
            >
                <FontAwesomeIcon icon={faAngleUp}  style={{transform: 'rotate(-90deg)'}} />            
            </span>
            <span 
                className={`right-arrow-head ${hideCarouselArrowState[1]}`}
                onClick={() => moveRight()}
            >
                <FontAwesomeIcon icon={faAngleUp}  style={{transform: 'rotate(90deg)'}} />            
            </span>
        </div>
    )
}