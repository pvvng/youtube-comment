'use client'

import { useRouter } from 'next/navigation';
import fetchYoutuberProfileData from '@/@util/functions/fetch/fetchYoutuberProfileData';
import { useDBUserStore } from "@/app/store";
import { fetchVideoData } from '@/@util/functions/fetch/fetchVideoData';

export default function Heartevideo(){

    const router = useRouter();
    const { userdata } = useDBUserStore();
   

    return (
        <>
            <div className="row row-center w-100" style={{margin : 'auto'}}>
                <h5>찜한 영상: {userdata?.videoHeart.length}</h5>
                {userdata?.videoHeart.map((item, index) => (
                    <div className="col-12 col-md-6 mb-3" key={index}>
                        <div
                            className="d-flex align-items-center p-3 border rounded"
                            style={{ backgroundColor: "#f8f9fa" }}
                        >
                            <div className="me-3">
                                <img
                                    src={item.thumbnailUrl}
                                    alt={item.name}
                                    className="rounded" // 원형 대신 둥근 직사각형으로 변경
                                    style={{ width: "120px", height: "80px", borderRadius: "10px" }}
                                    onClick={async () => {
                                        await fetchVideoData(item.id);
                                        router.push(`/video/${item.id}`)
                                    }}
                                />
                            </div>
                            <div>
                                <h6 className="m-0 fw-bold">{item.name}</h6>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};