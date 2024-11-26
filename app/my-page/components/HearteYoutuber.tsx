'use client'

import { useRouter } from 'next/navigation';
import { useDBUserStore } from "@/app/store";
import HeartBtn from '@/app/components/HeartBtn/HeartBtn';
import fetchYoutuberProfileData from '@/@util/functions/fetch/fetchYoutuberProfileData';

export default function HearteYoutuber() {

    const { userdata } = useDBUserStore();

    const router = useRouter();

    return (
        <>
            <div
                className="p-2 custom-scrollbar mypage-card-container mt-2"
            >   
                <div className="row align-items w-100" style={{ margin: 'auto' }}>
                    <h5 className="mb-0 fw-medium"
                        style={{ fontSize: '1.25rem', lineHeight: '1.75rem', color: 'rgba(0, 0, 0, 1)' }}>
                        찜한 유투버: {userdata?.youtuberHeart.length}</h5>
                    {userdata?.youtuberHeart.map((item, index) => (
                        <div className="col-12 col-md-6 mb-3" key={index}>
                            <div
                                className="d-flex align-items-center p-3 border rounded"
                                style={{ backgroundColor: "#f8f9fa" }}
                            >
                                <div className="me-3">
                                    <img
                                        src={item.thumbnailUrl}
                                        alt={item.name}
                                        className="rounded-circle"
                                        style={{ width: "80px", height: "80px" }}
                                        onClick={async () => {
                                            await fetchYoutuberProfileData(item.id);
                                            router.push(`/youtuber/${item.id}`)
                                        }}
                                    />
                                </div>
                                <h6 className="m-0 fw-bold">{item.name}</h6>
                                <div style={{ marginLeft: 'auto' }}>
                                    <HeartBtn
                                        id={item.id}
                                        name={item.name}
                                        thumbnailUrl={item.thumbnailUrl}
                                        type="youtuber"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};