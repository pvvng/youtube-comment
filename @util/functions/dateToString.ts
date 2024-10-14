/** 
 * Date 타입의 데이터를 년 월 일의 문자열로 변경하는 함수 
 * 
 * ex) 2023-09-27T03:22:18Z(Date|string) => 2023년 09월 27일
 * */
export default function dateToString(date : Date|string){
    let strDate : string = '';

    if(typeof date !== 'string') strDate = date.toString();
    else strDate = date;

    let splitedDate = strDate.split('T')[0];
    
    let [year, month, day] = splitedDate.split('-');
    return `${year}년 ${month}월 ${day}일`
}