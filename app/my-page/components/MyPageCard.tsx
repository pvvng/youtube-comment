import { MyPageCardDataType } from "./MyPageHubContainer";
import { useRouter } from "next/navigation";
import dateToString from "@/@util/functions/dateToString";
import HeartBtn from "@/app/components/HeartBtn/HeartBtn";
import Image from "next/image";

export default function Card ({data, type} : {data : MyPageCardDataType, type : "video" | "youtuber"}){

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