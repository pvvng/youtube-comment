import '@/app/css/skeleton.css';

import HeartBtn from '@/app/components/HeartBtn/HeartBtn';
import { UserHeartedType } from '@/types/userdata';
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCircleXmark } from '@fortawesome/free-solid-svg-icons';

interface CardPropsType {
    type: "video" | "youtuber";
    heartedDataState: UserHeartedType[] | undefined;
    randomNumberSet: Set<number>;
}

export default function RenderHeartedDataCard(
    { type, heartedDataState, randomNumberSet }: CardPropsType
) {

    const stringToType = type === "video" ? "동영상이" : "유튜버가";

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
        <div style={{height : 25}}>
            <p className='m-0 c-dark'>
                <FontAwesomeIcon style={{fontSize : 24}} icon={faHeartCircleXmark} />
                <span className='mx-2' style={{color : 'black'}}>찜한 {stringToType} 없어요</span>
            </p> 
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