'use client';

import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface PropsType {
    feelData : {
        positive: number;
        negative: number;
        neutral: number;
    }
}

export default function FeelGraphContainer({feelData} : PropsType){
    console.log(feelData)
    let graphFeelData = [
        {name : 'positive', value : feelData.positive},
        {name : 'negative', value : feelData.negative},
        {name : 'neutral', value : feelData.neutral},
    ]
    return (
        <div style={{height : '300px'}}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={graphFeelData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: -12,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="skyblue" activeBar={<Rectangle fill="pink" />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}