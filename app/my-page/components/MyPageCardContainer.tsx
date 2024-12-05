import { MyPageCardDataType } from "./MyPageHubContainer";
import SortDropdown from "./SortDropdown";
import useInfiniteScroll from "@/@util/hooks/useInfiniteScroll";
import Card from "./MyPageCard";

interface PropsType {
    cardData : MyPageCardDataType[];
    type : "video" | "youtuber";
}

export default function MyPageCardContainer(
    {cardData, type} : PropsType
){
    // 무한 스크롤 설정
    const {visibleData, observerRef} = useInfiniteScroll(cardData)

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