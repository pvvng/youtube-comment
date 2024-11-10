'use client'

import { useRouter } from 'next/navigation';
import fetchYoutuberProfileData from '@/@util/functions/fetch/fetchYoutuberProfileData';

interface Youtuber {
    channelId: string;
    thumbnails: string;
    title: string;
    publishedAt: string; // 날짜 형식에 맞게 조절
}


interface SortDataProps {
    youtuber: Youtuber[]; // youtuber를 배열로 정의
}

export default function SortData({ youtuber } : SortDataProps){

    const router = useRouter();

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('ko-KR', options);
    };

    return (
        <>
            <div className="row row-center w-100" style={{margin : 'auto'}}>
                <h5>구독한 유튜버 수: {youtuber.length}</h5>
                {youtuber.map((item, index) => (
                    <div className="col-12 col-md-6 mb-3" key={index}>
                        <div
                            className="d-flex align-items-center p-3 border rounded"
                            style={{ backgroundColor: "#f8f9fa" }}
                        >
                            <div className="me-3">
                                <img
                                    src={item.thumbnails}
                                    alt={item.title}
                                    className="rounded-circle"
                                    style={{ width: "80px", height: "80px" }}
                                    onClick={async () => {
                                        await fetchYoutuberProfileData(item.channelId);
                                        router.push(`/youtuber/${item.channelId}`)
                                    }}
                                />
                            </div>
                            <div>
                                <h6 className="m-0 fw-bold">{item.title}</h6>
                                <p className="m-0">구독일자: {formatDate(item.publishedAt)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};