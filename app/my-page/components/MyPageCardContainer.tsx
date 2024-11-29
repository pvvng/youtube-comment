import { MyPageCardDataType } from "./MyPageHubContainer";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dateToString from "@/@util/functions/dateToString";
import HeartBtn from "@/app/components/HeartBtn/HeartBtn";
import Image from "next/image";
import SortDropdown from "./SortDropdown";

interface PropsType {
    cardData : MyPageCardDataType[];
    type : "video" | "youtuber";
}

export default function MyPageCardContainer(
    {cardData, type} : PropsType
){
    const [visibleData, setVisibleData] = useState<MyPageCardDataType[]>([]);
    const [loadMore, setLoadMore] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);

    // console.log(cardData)
    // 최초 마운트 시 상단 10개 데이터만 렌더링 
    useEffect(() => {
        setVisibleData(cardData.slice(0,10));
    },[]);

    // 끝에 가면 데이터 새로 추가
    useEffect(() => {
        if(loadMore && visibleData.length < cardData.length){
            const nextData = cardData.slice(visibleData.length, visibleData.length + 10);
            setVisibleData(prev => [...prev, ...nextData]);
            setLoadMore(false); // 데이터를 불러온 후 다시 loadMore 상태를 false로 설정
        }
    }, [loadMore]);

    // Intersection Observer (한무 스크롤) 설정
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setLoadMore(true); // 끝에 도달하면 추가 데이터를 불러오기 위해 상태 업데이트
            }
        });
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, []);

    return (
        <div className="custom-scrollbar card-container box-shadowing" style={{borderColor : '#dee2e6'}}>
            {/* <SortDropdown /> */}
            {
                visibleData.length === 0 ?
                <div className="row row-center m-auto w-100" style={{height : '98%'}}>
                    <div className="text-center">
                        <img src={'/logo/logo-mask.png'} className="w-100" style={{maxWidth : '180px'}} alt="youtuview logo" />
                        <p className="m-0 mt-2">데이터가 존재하지 않습니다.</p>
                    </div>
                </div>:
                <div className="row align-itmes m-auto w-100">
                    {visibleData.map(data => <Card key={data.id + data.thumbnailUrl} data={data} type={type} />)}
                </div>
            }
            <div ref={observerRef} style={{ height: "1px" }}></div>
        </div>
    )
}

function Card ({data, type} : {data : MyPageCardDataType, type : "video" | "youtuber"}){

    const router = useRouter();

    return (
        <div 
            className="col-12 col-md-6 mt-3 mypage-card-wrapper" 
            key={data.id + data.thumbnailUrl} 
            onClick={() => router.push(`/${type}/${data.id}`)} // 부모 div 클릭 시 라우팅
        >
            <div className="row row-center w-100 m-auto card-container box-shadowing" style={{borderColor : '#dee2e6'}}>
                <div className="col-3">
                    <div
                        className="m-auto position-relative"
                        style={{
                            width: '45px', // 원하는 정사각형 크기
                            height: '45px', // 원하는 정사각형 크기
                            overflow: 'hidden', // 잘린 부분 숨기기
                        }}
                    >
                        <Image 
                            fill 
                            loading="lazy"
                            sizes="50px"
                            src={data.thumbnailUrl} 
                            alt={data.name} 
                            className="border" 
                            style={{
                                borderRadius : '50%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }} 
                        />
                    </div>
                </div>
                <div className="col-9">
                    <p className="m-0 fw-bold text-hide">{data.name}</p>
                </div>
                <div className="text-end d-flex row-center justify-content-end">
                    {
                        data.publisedAt && 
                        <p className="m-0" style={{color : 'grey'}}>
                            {dateToString(data.publisedAt)} 구독
                        </p>
                    }
                    <div 
                        className="ms-2 mt-2"
                        onClick={(e) => e.stopPropagation()} // 하트 버튼 클릭 시 부모의 클릭 이벤트 중단 (이벤트 버블링 차단)
                    >
                        <HeartBtn id={data.id} name={data.name} thumbnailUrl={data.thumbnailUrl} type={type} />
                    </div>
                </div>
            </div>
        </div>
    )
}