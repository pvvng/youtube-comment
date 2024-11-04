import { FilteredVideoSnippet, VideoStatisticsType } from "@/types/video";
import axios from "axios";

export interface PostDataType {
    videoId : string,
    title : string,
    thumnailUrl : string
}

export default async function fetchUpdateVideoPopularity(
    video: FilteredVideoSnippet & VideoStatisticsType,
    videoId : string
) {
    try {
        const postData = {
            videoId : videoId,
            title : video.title,
            thumnailUrl : video.thumbnails.url
        }
        let resultPostPopularity = await axios.post(
            '/api/post/database/popular/video', postData
        );

        return resultPostPopularity.data.message;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios 에러 발생:", error.message);
        } else if (error instanceof Error) {
            console.error("일반 에러 발생:", error.message);
        } else {
            console.error("알 수 없는 에러 발생");
        }
        throw error;
    }
}
