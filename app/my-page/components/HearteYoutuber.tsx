'use client'

import { useRouter } from 'next/navigation';
import fetchYoutuberProfileData from '@/@util/functions/fetch/fetchYoutuberProfileData';
import { useDBUserStore } from "@/app/store";
import HeartBtn from '@/app/components/HeartBtn/HeartBtn';

export default function HearteYoutuber(){

    const router = useRouter();
    const { userdata } = useDBUserStore();

    return (
        <>
            <div className="row row-center w-100" style={{margin : 'auto'}}>
                <h5>찜한 유투버: {userdata?.youtuberHeart.length}</h5>
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
                            <div>
                                <h6 className="m-0 fw-bold">{item.name}</h6>
                            </div>
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
        </>
    );
};