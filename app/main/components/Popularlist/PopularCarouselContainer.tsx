'use client';

import '@/app/css/carousel.css';

import { PopularType } from "@/types/popular";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from "react";
import moment from 'moment-timezone';
import CarouselImageContainer from './CarouselImageContainer';

interface PropsType {
    carouselData: PopularType[];
    type: string;
}

const LEFT_LAST = ['d-none', ''];
const RIGHT_LAST = ['', 'd-none'];
const DEFAULT_STATE_ARR = ['', ''];
const HIDDEN_STATE_ARR = ['d-none', 'd-none'];

export default function PopularCarouselContainer(
    { carouselData, type }: PropsType
) {
    const [carouselState, setCarouselState] = useState(0);
    const [hideCarouselArrowState, setHideCarouselArrowState] = useState(LEFT_LAST);
    const [viewOffset, setViewOffset] = useState(0);

    const koreaTime = moment().tz('Asia/Seoul').format('YYYY년 MM월 DD일');

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
        } else if (screenWidth >= 992) { // lg 이상
            setViewOffset(4);
        } else if (screenWidth >= 466) { // sm 이상
            setViewOffset(3);
        } else { // xs (576 이하)
            setViewOffset(2);
        }

        setCarouselState(0);
    };

    const handleMouseEvents = (e: React.MouseEvent<HTMLDivElement>) => {
        let isDragging = false;
        const startX = e.clientX;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const endX = moveEvent.clientX;
            const distance = startX - endX;

            if (Math.abs(distance) > 5) {
                isDragging = true; // 드래그가 발생했음을 기록
            }

            if (distance > 100) {
                moveRight();
                document.removeEventListener('mousemove', handleMouseMove);
            } else if (distance < -100) {
                moveLeft();
                document.removeEventListener('mousemove', handleMouseMove);
            }
        };

        const handleMouseUp = (upEvent: MouseEvent) => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);

            const endX = upEvent.clientX;

            if (!isDragging && Math.abs(startX - endX) <= 5) {
                // 클릭으로 간주 (드래그가 아닌 경우)
                const target = upEvent.target as HTMLElement;
                const clickableParent = target.closest('.image-square-container');
                if (clickableParent) {
                    const dataId = clickableParent.getAttribute('data-id');
                    if (dataId) {
                        router.push(`/${type}/${dataId}`);
                    }
                }
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleTouchEvents = (e: React.TouchEvent<HTMLDivElement>) => {
        let isDragging = false;
        const startX = e.touches[0].clientX; // 터치 시작 지점
    
        const handleTouchMove = (moveEvent: TouchEvent) => {
            const endX = moveEvent.touches[0].clientX; // 현재 터치 위치
            const distance = startX - endX;
    
            if (Math.abs(distance) > 5) {
                isDragging = true; // 드래그 중인 것으로 간주
            }
    
            if (distance > 50) { // 오른쪽으로 스와이프
                moveRight();
                document.removeEventListener('touchmove', handleTouchMove);
            } else if (distance < -50) { // 왼쪽으로 스와이프
                moveLeft();
                document.removeEventListener('touchmove', handleTouchMove);
            }
        };
    
        const handleTouchEnd = (endEvent: TouchEvent) => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
    
            if (!isDragging) {
                // 클릭으로 간주 (드래그가 아닌 경우)
                const target = endEvent.target as HTMLElement;
                const clickableParent = target.closest('.image-square-container');
                if (clickableParent) {
                    const dataId = clickableParent.getAttribute('data-id');
                    if (dataId) {
                        router.push(`/${type}/${dataId}`);
                    }
                }
            }
        };
    
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
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
        if (carouselState >= 0) {
            if (dataLength <= viewOffset) {
                setHideCarouselArrowState(HIDDEN_STATE_ARR);
            } else {
                setHideCarouselArrowState(LEFT_LAST);
            }
        } else if (carouselState <= -Math.round(maxTranslateX)) {
            if (dataLength <= viewOffset) {
                setHideCarouselArrowState(HIDDEN_STATE_ARR);
            } else {
                setHideCarouselArrowState(RIGHT_LAST);
            }
        } else {
            if (dataLength <= viewOffset) {
                setHideCarouselArrowState(HIDDEN_STATE_ARR);
            } else {
                setHideCarouselArrowState(DEFAULT_STATE_ARR);
            }
        }
    }, [carouselState, hideCarouselArrowState, dataLength, viewOffset]);

    if (dataLength === 0) return (
        <div
            className="d-flex row-center p-2 text-center"
            style={{ minHeight: 150 }}
        >
            <p className='m-0'>{koreaTime}에 수집된 데이터가 아직 없습니다.</p>
        </div>
    )

    return (
        <div
            className="mb-3 position-relative overflow-hidden"
            onMouseDown={handleMouseEvents}
            onTouchStart={handleTouchEvents} // 터치 이벤트 추가
        >
            <div
                style={{
                    width: `${dataLength * (100 / viewOffset)}%`,
                    transform: `translateX(${carouselState}%)`,
                    transition: 'all 1s',
                }}
            >
                {carouselData.map(cardData => 
                    <CarouselImageContainer key={cardData._id + cardData.dataId} cardData={cardData} moveLength={moveLength} />
                )}
                <div style={{ clear: 'both' }} />
            </div>
            <span
                className={`left-arrow-head ${hideCarouselArrowState[0]}`}
                onClick={() => moveLeft()}
            >
                <FontAwesomeIcon
                    icon={faAngleUp}
                    style={{ transform: 'rotate(-90deg)' }}
                />
            </span>
            <span
                className={`right-arrow-head ${hideCarouselArrowState[1]}`}
                onClick={() => moveRight()}
            >
                <FontAwesomeIcon
                    icon={faAngleUp}
                    style={{ transform: 'rotate(90deg)' }}
                />
            </span>
        </div>
    );
}