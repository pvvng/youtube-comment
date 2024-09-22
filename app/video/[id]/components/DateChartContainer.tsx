import { DateDataType } from '@/types/comment';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DatechartContainer(
    {dateData} : {dateData : DateDataType[]}
){
    const maxPercent = Math.max(...dateData.map(v => v.percent));

    // 데이터 그래프에 맞게 정돈
    let organizedDateData = dateData.map(v => {
        let [_, month, day] = v.date.split('-');
        return {
            date : month + '/' + day,
            '%' : v.percent.toFixed(2), 
        }
    })
    
    return (
        <div style={{height : '300px'}}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={organizedDateData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: -12,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="date" />
                    {/* Y축의 범위를 최댓값으로 설정 */}
                    <YAxis domain={[0, Math.ceil(maxPercent)]} />
                    <Tooltip />
                    <Line dot={false} type="monotone" dataKey="%" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
