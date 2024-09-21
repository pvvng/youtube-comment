/** **샘플링할 데이터의 개수 구하기**
 * 
 * - 데이터 샘플링 비율
 * 
 * 1. 총 댓글 수 < 100
 * 전체 댓글을 불러오는 것이 좋습니다
 * 
 * 2. 100 <= 총 댓글 수 < 1,000
 * 전체의 20-30% 정도를 샘플링해도 좋습니다.
 * 
 * 3. 1,000 <= 총 댓글 수 < 10,000
 * 10-20% 정도의 비율을 고려합니다.
 * 
 * 4. 10,000 이상
 * 5-10% 정도의 비율을 고려합니다.
 * */
export function samplingCount(count : number){
    if(count < 100){ 
        return count
    }else if(100 <= count && count < 1000) {
        return Math.round((count * 25) / 100);
    }else if(1000 <= count && count < 10000){
        return Math.round((count * 15) / 100);
    }else {
        return Math.round((count * 5) / 100);
    }
}