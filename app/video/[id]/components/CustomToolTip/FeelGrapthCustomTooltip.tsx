import '@/app/css/video.css';

interface TooltipProps {
    active?: boolean;
    payload?: Array<{
        payload: {
            name: string;
            emoji: string;
            value: number;
        };
    }>;
    label?: string;
}

export default function FeelGrapthCustomTooltip({ active, payload }: TooltipProps) {

    // 확인되지 않으면 null 반환
    if (! (active && payload && payload.length)) return null;

    const {name, emoji, value} = payload[0].payload;

    let koName : {[key : string] : string} = {
        'positive' : '긍정',
        'negative' : '부정',
        'neutral' : '중립',
    }

    return (
        <div className="tooltip-container">
            <p className='fw-bold m-0'>
                {`${emoji} ${koName[name]}적인 댓글 : ${Math.round(value)}%`}
            </p>
        </div>
    );
}
