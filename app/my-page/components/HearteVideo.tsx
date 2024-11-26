"use client";

import "@/app/css/card.css";

import { useRouter } from "next/navigation";
import { useDBUserStore } from "@/app/store";
import { fetchVideoData } from "@/@util/functions/fetch/fetchVideoData";
import HeartBtn from "@/app/components/HeartBtn/HeartBtn";

export default function Heartevideo() {

    const { userdata } = useDBUserStore();

    const router = useRouter();

    return (
        <div className="p-2 custom-scrollbar mypage-card-container mt-2">
            <div className="row align-items w-100" style={{ margin: "auto" }}>
                <h5 
                    className="mb-0 fw-medium"
                    style={{ fontSize: '1.25rem', lineHeight: '1.75rem', color: 'rgba(0, 0, 0, 1)' }}
                >
                    찜한 영상: {userdata?.videoHeart.length}
                </h5>
                {userdata?.videoHeart.map((item, index) => (
                    <div className="col-12 col-md-6 mb-3 align-items-start" key={index}>
                        <div className="video-item ">
                            <div className="me-3">
                                <img
                                    src={item.thumbnailUrl}
                                    alt={item.name}
                                    className="video-thumbnail rounded"
                                    loading="lazy"
                                    onClick={async () => {
                                        await fetchVideoData(item.id);
                                        router.push(`/video/${item.id}`);
                                    }}
                                />
                            </div>
                            <div>
                                <h6 className="video-title">{item.name}</h6>
                            </div>
                            <div style={{ marginLeft: "auto" }}>
                                <HeartBtn
                                    id={item.id}
                                    name={item.name}
                                    thumbnailUrl={item.thumbnailUrl}
                                    type="video"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
