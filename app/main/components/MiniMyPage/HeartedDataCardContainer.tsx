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

    if (!heartedDataState) return <p>로딩중입니다.</p>;
    if (heartedDataState.length === 0) return <p>{noDataString}</p>;

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