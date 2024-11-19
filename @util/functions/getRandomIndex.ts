import { UserHeartedType } from "@/types/userdata";

const SLICE_NUM = 4;

/** mini mypage에서 랜덤 index 4개 뽑는 함수 */
export default function getRandomIndex(
    heartedDataState: UserHeartedType[]|undefined
){
    let randomNumberSet: Set<number> = new Set();

    if(!heartedDataState) return randomNumberSet;

    let dataLength = heartedDataState.length >= SLICE_NUM ?
    SLICE_NUM : heartedDataState.length;


    while (randomNumberSet.size !== dataLength) {
        const randomIndex = Math.floor(Math.random() * heartedDataState.length);
        randomNumberSet.add(randomIndex);
    }

    return randomNumberSet;
}