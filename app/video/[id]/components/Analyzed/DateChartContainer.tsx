import { DateDataType } from '@/types/comment';
import React, { useEffect, useRef, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DateChartCustomTooltip from '../CustomToolTip/DateChartCustomTooltip';
import { max } from 'moment-timezone';

export default function DatechartContainer(
    {dateData} : {dateData : DateDataType[]}
){

    // 데이터 그래프에 맞게 정돈
    let organizedDateData = dateData.map(v => {
        let [year, month, day] = v.date.split('-');
        return {
            date : `${year}년 ${month}월 ${day}일`,
            percent : parseFloat(v.percent.toFixed(2)), 
        }
    })

    // 최대 최솟값 구하기
    const maxPercent = Math.max(...organizedDateData.map(v => v.percent));
    const minPercent = Math.min(...organizedDateData.map(v => v.percent));

    // 최대값과 가진 tick만 반환하는 포맷터
    function tickFormatter(tick : string, index : number){
        const tickPercent = organizedDateData[index]?.percent;

        // 최대값일 때, 한 번만 '🔥' 반환
        if (tickPercent === maxPercent) return '🔥';

        // 그 외에는 빈 문자열 반환
        return ''; 
    };

    return (
        <div className='card-container mt-3'>
            <p className='m-0 fw-bold'>화제성 분석</p>
            <div style={{width : '100%', height : '250px'}}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={organizedDateData}
                        margin={{
                            top: 7,
                            right: 5,
                            left: -30,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="1 1"/>
                        {/* X축 tickFormatter 적용 */}
                            <XAxis dataKey="date" 
                            stroke="black" 
                            tickFormatter={tickFormatter} 
                            interval="preserveStartEnd"
                        />
                        {/* Y축의 범위를 최댓값으로 설정 */}
                        <YAxis domain={[0, Math.ceil(maxPercent)]} stroke="black" />
                        <Tooltip content={<DateChartCustomTooltip max={maxPercent} min={minPercent} />} />
                        <Line dot={false} type="monotone" dataKey="percent" stroke="#ff0000" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
