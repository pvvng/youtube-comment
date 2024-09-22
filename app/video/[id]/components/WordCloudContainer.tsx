'use client';

import WordCloud from "react-d3-cloud";

export default function WordCloudContainer(
    {keyWordData} : {keyWordData : string[]}
){
    // 키워드 카운트 맵
    const keyWordMap = new Map();
    for(let i = 0; i < keyWordData.length; i++){
        let getter = keyWordMap.get(keyWordData[i]) || 0;
        keyWordMap.set(keyWordData[i], getter + 1);
    }
    // 키워드 맵 배열로 변환 후 sort
    let wordData = Array.from(keyWordMap)
    .sort((a, b) => b[1] - a[1])
    .map(v => {return { text : v[0], value : v[1]} });

    const totalValue = wordData.reduce((acc, cul) => {
        return acc + cul.value;
    },0);

    // 길이가 100 이상이면 자르기
    if(wordData.length > 100){
        wordData = wordData.slice(0,100);
    }

    // 배율을 선형적으로 조정할 수 있도록 배열의 길이에 따른 offset 설정
    const scaleFactor = calculateOffset(wordData.length);

    if(wordData.length === 0) return <h3>데이터 없음</h3>
    return (
        <div 
            className="mt-4 mb-2" 
            style={{
                maxWidth : '1024px', 
                margin : 'auto', 
                cursor : 'pointer'
            }}
        >
            <WordCloud
                data={wordData}
                width={100}
                height={100}
                font="Impact" 
                fontWeight="bold"
                spiral="rectangular"
                fontSize={(word) => Math.round((word.value/totalValue) * scaleFactor)}
                // fontSize={(word) => Math.log2(word.value) * 5}
                // rotate={(word) => word.value % 360}
                padding={2}
                random={Math.random}
                fill={(word :string) => 'black'} // 각 단어에 무작위 색상 적용
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