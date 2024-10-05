'use client';

import { PosType } from "@/types/word";
import WordCloud from "react-d3-cloud";

export default function WordCloudContainer(
    {keyWordData} : {keyWordData : PosType[]}
){
    keyWordData = keyWordData.sort((a, b) => b.value - a.value);
    let highValue = keyWordData[0].value;

    function valueCount(highValue: number) {
        // 최대 좋아요가 100개 이하인 댓글 처리
        if (highValue <= 80) {
            return (word: { value: number }) => {
                const totalValue = keyWordData.reduce((acc, cur) => acc + cur.value, 0);
                const scaleFactor = calculateOffset(keyWordData.length);
                return Math.round((word.value / totalValue) * scaleFactor);
            };
        } else {
            return (word: { value: number }) => Math.log2(word.value) * 1.5;
        }
    }

    if(keyWordData.length === 0) return <h3>데이터 없음</h3>
    return (
        <div 
            className="mt-4 mb-2" 
            style={{
                maxWidth : '400px', 
                margin : 'auto', 
                cursor : 'pointer'
            }}
        >
            <WordCloud
                data={keyWordData}
                width={100}
                height={100}
                font="Impact" 
                fontWeight="bold"
                spiral="rectangular"
                fontSize={valueCount(highValue)}
                padding={2}
                random={Math.random}
                fill='black' // 각 단어에 색상 적용
                // onWordClick={(event, d) => {
                //     console.log(`onWordClick: ${d.text} / ${d.value}`);
                // }}
                // onWordMouseOver={(event, d) => {
                //     console.log(`onWordMouseOver: ${d.text} / ${d.value}`);
                // }}
                // onWordMouseOut={(event, d) => {
                //     console.log(`onWordMouseOut: ${d.text} / ${d.value}`);
                // }}
            />
        </div>
    )
}

/** 배열 길이에 따라 offset 부여하는 함수 */
function calculateOffset(arrayLength: number): number {
    const minLength = 0;
    const maxLength = 100;
    const minOffset = 50;
    const maxOffset = 800;

    // 배열의 길이가 minLength 이상, maxLength 이하일 때만 선형적으로 계산
    if (arrayLength <= minLength) {
        return minOffset; // 배열 길이가 0일 때 50
    } else if (arrayLength >= maxLength) {
        return maxOffset; // 배열 길이가 100일 때 500
    } else {
        // 배열 길이에 따라 선형적으로 계산
        return minOffset + ((arrayLength - minLength) / (maxLength - minLength)) * (maxOffset - minOffset);
    }
}