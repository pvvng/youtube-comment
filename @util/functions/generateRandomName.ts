/** 사용자 이름이 존재하지 않는 경우 랜덤한 이름 생성 */
export default function generateRandomName(length: number): string {
    const characters = '가나다라마바사아자차카타파하0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
