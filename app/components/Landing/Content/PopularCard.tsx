import { TopYoutuberData } from "@/types/youtuber";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PopularCard(
    { topYoutuber }: { topYoutuber: TopYoutuberData }
) {
    const router = useRouter();

    return (
        <div className="popular-card m-auto text-center mb-4">
            <h2 className="m-0">인기 유튜버</h2>
            <h2><span className="fw-bold">{topYoutuber.youtuber.name}</span></h2>
            <div
                className="m-auto position-relative"
                style={{
                    width: '120px',
                    height: '120px',
                    overflow: 'hidden',
                }}
            >
                <Image
                    className="w-100 border"
                    src={topYoutuber.youtuber.thumbnail.url}
                    alt={`${topYoutuber.youtuber.name} thumbnail`}
                    fill
                    loading="lazy"
                    sizes="120px"
                    style={{
                        borderRadius: '50%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                />
            </div>
            <p className="mt-3"><span className="fw-bold">{topYoutuber.extra.popularity}</span>만큼의 관심도</p>
            <button className="sign-up rounded mt-2" onClick={() => (router.push(`/youtuber/${topYoutuber.channelId}`))}>더 알아보기</button>
        </div>
    );
}