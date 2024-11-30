'use client';

import { useEffect, useState } from "react";
import { PopularType } from "@/types/popular";
import Image from "next/image";

export default function CarouselImageContainer(
    {cardData, moveLength} : {cardData : PopularType, moveLength : number}
){
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true); // 이미지가 화면에 보일 때 priority 적용
                    }
                });
            },
            { threshold: 0.5 } // 50% 이상 보일 때
        );

        const imageElement = document.getElementById(`carousel-image-${cardData.name}`);
        if (imageElement) {
            observer.observe(imageElement);
        }

        return () => {
            if (imageElement) {
                observer.unobserve(imageElement);
            }
        };
    }, [cardData.dataId]);

    return (
        <div
            key={cardData.dataId + cardData._id}
            className="float-start text-center"
            style={{ width: moveLength + '%', padding: '0 8px' }}
        >
            <div
                className="image-square-container border"
                data-id={cardData.dataId}
            >
                <Image
                    fill
                    id={`carousel-image-${cardData.name}`}
                    sizes="100px"
                    priority={isVisible ? true : false} // isVisible이 true이면 priority 사용
                    loading={isVisible ? undefined : "lazy"} // isVisible이 false이면 lazy 로딩
                    src={cardData.thumnailUrl}
                    alt={cardData.name}
                    className="thumbnail-container"
                />
            </div>
        </div>
    )
}