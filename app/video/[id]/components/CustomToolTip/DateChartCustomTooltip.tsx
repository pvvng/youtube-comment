import '@/app/css/video.css';
import { faFire, faHeart, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface DateChartCustomTooltipProps {
    active?: boolean;
    payload?: {
        payload : {
            index : number; 
            date :string; 
            percent : number;
        }
    }[];
    label?: string;
    max: number;
    min: number;
    dateData : {
        index : number;
        date : string;
        percent : number; 
    }[];
    avg : number;
}

export default function DateChartCustomTooltip(
    { active, payload, label, max, min, dateData, avg } : DateChartCustomTooltipProps
){
    // 데이터 확인되지 않으면 null 반환
    if (!(active && payload && payload.length)) return null;

    const data = payload[0].payload;
    const { index, date, percent } = data;

    return (
        <div className="tooltip-container">
            <div className='fw-bold mb-2'>
                {
                    max === percent? 
                    <p className='m-0' style={{color : '#FF3333'}}>
                        <FontAwesomeIcon icon={faHeart} /> 영상의 리즈시절
                    </p>:
                    index > 0 && percent - dateData[index - 1].percent > avg? 
                    <p className='m-0' style={{color : '#FF9900'}}>
                        <FontAwesomeIcon icon={faFire} /> 인기 급상승! 
                        {' '}({-Math.round(percent - dateData[index - 1].percent * 100)}% 상승)
                    </p>:
                    min === percent ? 
                    <p className='m-0' style={{color : '#0066FF'}}>
                        <FontAwesomeIcon icon={faSnowflake} /> 화제성 동결
                    </p>:
                    null
                } 
                {date}
            </div>
            <p className='m-0'>
                {Math.round(percent * 10)}%의 화제성
            </p>
        </div>
    )
}