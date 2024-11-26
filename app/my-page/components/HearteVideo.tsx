"use client";

import { useRouter } from "next/navigation";
import fetchYoutuberProfileData from "@/@util/functions/fetch/fetchYoutuberProfileData";
import { useDBUserStore } from "@/app/store";
import { fetchVideoData } from "@/@util/functions/fetch/fetchVideoData";
import HeartBtn from "@/app/components/HeartBtn/HeartBtn";
import "@/app/css/card.css";

export default function Heartevideo() {
    const router = useRouter();
    const { userdata } = useDBUserStore();
    console.log(userdata);
    return (
        //     <>
        //    <div
        //   className="p-2 custom-scrollbar card-container mt-2"
        //   style={{ maxHeight: "400px", overflowY: "auto" ,marginBottom: "20px"}}
        // >
        //         <div className="row row-center w-100" style={{ margin: "auto" }}>
        //             <h5>찜한 영상: {userdata?.videoHeart.length}</h5>
        //             {userdata?.videoHeart.map((item, index) => (
        //                 <div className="col-12 col-md-6 mb-3 align-items-start" key={index}>
        //                     <div
        //                         className="d-flex align-items-start p-3 border rounded"
        //                         style={{ backgroundColor: "#f8f9fa" }}
        //                     >
        //                         <div className="me-3">
        //                             <img
        //                                 src={item.thumbnailUrl}
        //                                 alt={item.name}
        //                                 className="rounded" // 원형 대신 둥근 직사각형으로 변경
        //                                 style={{
        //                                     width: "120px",
        //                                     height: "80px",
        //                                     borderRadius: "10px",
        //                                 }}
        //                                 onClick={async () => {
        //                                     await fetchVideoData(item.id);
        //                                     router.push(`/video/${item.id}`);
        //                                 }}
        //                             />

        //                         </div>
        //                         <div>
        //                             <h6 className="m-0 fw-bold">{item.name}</h6>
        //                         </div>
        //                         <div   style={{ marginLeft: 'auto' }}>

        //                             <HeartBtn
        //                                 id={item.id}
        //                                 name={item.name}
        //                                 thumbnailUrl={item.thumbnailUrl}
        //                                 type="video"

        //                             />
        //                         </div>
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //         </div>
        //     </>
        <div className="p-2 custom-scrollbar card-container mt-2" style={{overflowY: 'scroll'}}>
            <div className="row row-center w-100" style={{ margin: "auto" }}>
                <h5 className="mb-0 fw-medium"
                    style={{ fontSize: '1.25rem', lineHeight: '1.75rem', color: 'rgba(0, 0, 0, 1)' }}>
                    찜한 영상: {userdata?.videoHeart.length}</h5>
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
