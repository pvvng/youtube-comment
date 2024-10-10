'use client';

import { DateDataType } from '@/types/comment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DateChartCustomTooltip from '../CustomToolTip/DateChartCustomTooltip';
import { useEffect, useRef } from 'react';
import { useScrollStore } from '@/app/store';

export default function DatechartContainer(
    {dateData} : {dateData : DateDataType[]}
){
    // 사이드바 스크롤을 위한 설정
    const topicalityContainerRef = useRef(null);
    const setSectionRef = useScrollStore((state) => state.setSectionRef);
    
    useEffect(() => {
        setSectionRef('topicality', topicalityContainerRef);
    }, [setSectionRef]);

    // 데이터 그래프에 맞게 정돈
    let organizedDateData = dateData.map((v, index) => {
        let [year, month, day] = v.date.split('-');
        return {
            index : index,
            date : `${year}년 ${month}월 ${day}일`,
            percent : parseFloat(v.percent.toFixed(2)), 
        }
    })

    const percentData = organizedDateData.map(v => v.percent);
    // 최대 최솟 평균값 구하기
    const maxPercent = Math.max(...percentData);
    const minPercent = Math.min(...percentData);
    const avgPercent = (maxPercent + minPercent) / 4;

    return (
        <div className='card-container mt-3' id='topicality' ref={topicalityContainerRef}>
            <p className='fw-bold'>화제성 분석</p>
            <div style={{width : '100%', height : '250px'}}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={organizedDateData}
                        margin={{
                            top: 0,
                            right: 10,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="1 1"/>
                        {/* X축 tickFormatter 적용 */}
                        <XAxis 
                            dataKey="date" 
                            stroke="black" 
                            tickFormatter={() => ''} 
                            interval="preserveStartEnd" // 모든 tick 강제 표시
                        />
                        {/* Y축의 범위를 최댓값으로 설정 */}
                        <YAxis domain={[0, Math.ceil(maxPercent)]} stroke="black" />
                        <Tooltip content={<DateChartCustomTooltip max={maxPercent} min={minPercent} dateData={organizedDateData} avg={avgPercent} />} />
                        <Line dot={false} type="monotone" dataKey="percent" stroke="#ff0000" strokeWidth={1.2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
