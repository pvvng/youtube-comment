import '@/app/css/video.css';

interface DateChartCustomTooltipProps {
    active?: boolean;
    payload?: [{payload : {date :string, percent : number}}];
    label?: string;
    max: number;
    min: number;
}

export default function DateChartCustomTooltip(
    { active, payload, label, max, min } : DateChartCustomTooltipProps
){

    // 데이터 확인되지 않으면 null 반환
    if (!(active && payload && payload.length)) return null;

    const data = payload[0].payload;
    const { date, percent } = data;

    return (
        <div className="tooltip-container">
            <p className='fw-bold'>
                {
                    max === percent ? 
                    <span>🔥{' '}</span>:
                    min === percent ? 
                    <span>❄️{' '}</span>:
                    null
                } 
                {date}
            </p>
            <p className='m-0'>
                {percent}%의 화제성
            </p>
        </div>
    )
}