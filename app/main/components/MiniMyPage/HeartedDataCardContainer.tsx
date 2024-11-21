import '@/app/css/skeleton.css';

import HeartBtn from '@/app/components/HeartBtn/HeartBtn';
import { UserHeartedType } from '@/types/userdata';
import { useRouter } from "next/navigation";

interface CardPropsType {
    type: "video" | "youtuber";
    heartedDataState: UserHeartedType[] | undefined;
    noDataString: string;
    randomNumberSet: Set<number>;
}

export default function RenderHeartedDataCard(
    { type, heartedDataState, noDataString, randomNumberSet }: CardPropsType
) {
    const router = useRouter();

    const skeletonArr = new Array(4).fill(0);

    // 로딩 중일때 skeleton ui 등장
    if (!heartedDataState) return (
        skeletonArr.map((_, i) => { 
            return <div key={i} className='heart-skeleton' />
        })
    );

    // 찜한 데이터가 없을 때
    if (heartedDataState.length === 0) return (
        <div className='d-flex row-center' style={{height : 100}}>
            <p className='m-0'>{noDataString}</p>
        </div>
    );

    return (
        heartedDataState.map((v, i) => {
            if (randomNumberSet.has(i)) {
                return (
                    <div key={v.id + i} className='d-flex align-items mb-1'>
                        <HeartBtn {...v} type={type} />
                        <p
                            className='a-tag text-hide mx-2 m-0'
                            onClick={() => { 
                                router.push(`/${type}/${v.id}`); 
                            }}
                        >{v.name}</p>
                    </div>
                )
            }
            return;
        })
    );
}