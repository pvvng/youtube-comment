'use client';

import { BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, Cell, Rectangle } from "recharts";
import FeelGrapthCustomTooltip from "../CustomToolTip/FeelGrapthCustomTooltip";

const BAR_COLORS = {
    positive: '#6699FF',
    negative: '#FF9933',
    neutral: '#CCCCCC',
};

interface FeelGrapthContainerPropsType extends PropsType {
    type : string;
}

export default function FeelGraphContainer({ feelData, type }: FeelGrapthContainerPropsType) {

    // 평균 낼 전체값 구하기
    let total = feelData.positive + feelData.negative + feelData.neutral;

    const graphFeelData: GraphData[] = [
        { name: 'positive', emoji: '😍', value: feelData.positive / total * 100 },
        { name: 'negative', emoji: '😣', value: feelData.negative / total * 100  },
        { name: 'neutral', emoji: '😐', value: feelData.neutral / total * 100  },
    ];

    return (
        <div id="sentiment" className='card-container mt-3'>
            <p className='fw-bold'>
                {
                    type === "video" ?
                    <span>댓글 감정 분석</span>:
                    <span>{`${type} 채널 감정 분석`}</span>
                }
            </p>
            <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={graphFeelData}
                        margin={{
                            top: 7,
                            right: 10,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="1 1" />
                        <XAxis dataKey="emoji" stroke="black" />
                        <YAxis stroke="black" />
                        <Tooltip content={<FeelGrapthCustomTooltip />} />
                        <Bar 
                            dataKey="value" 
                            radius={[10, 10, 0, 0]} 
                            activeBar={<Rectangle fill="#FF0033" />}
                        >
                            {graphFeelData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={BAR_COLORS[entry.name as keyof typeof BAR_COLORS]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

interface PropsType {
    feelData: {
        positive: number;
        negative: number;
        neutral: number;
    }
}

interface GraphData {
    name: string;
    emoji: string;
    value: number;
}