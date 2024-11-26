'use client'

import { useRouter } from 'next/navigation';
import fetchYoutuberProfileData from '@/@util/functions/fetch/fetchYoutuberProfileData';
import HeartBtn from '@/app/components/HeartBtn/HeartBtn';

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
        <div className="row align-items w-100 m-auto position-relative">
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
                        <div style={{ marginLeft: 'auto' }}>
                            <HeartBtn
                                id={item.channelId}
                                name={item.title}
                                thumbnailUrl={item.thumbnails}
                                type="youtuber"

                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};