'use client';

import { PosType } from "@/types/word";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import ErrorContainer from "@/app/components/ErrorContainer";
import WordCloud from "react-d3-cloud";

export default function WordCloudContainer(
    {keyWordData} : {keyWordData : PosType[]}
){
    // 라우터
    const router = useRouter();
    
    const tooltipRef = useRef<HTMLDivElement | null>(null);

    // value 순으로 정렬
    keyWordData = keyWordData.sort((a, b) => b.value - a.value);

    // 가장 큰 값 저장
    let highValue = keyWordData[0].value;

    function valueCount(highValue: number) {
        return (word: { value: number }) => {
            // 제곱근 스케일
            const scaledValue = Math.sqrt(word.value) / Math.sqrt(highValue); // 제곱근 스케일 적용
            return scaledValue * 20;
        };
    }

    function handleMouseOver (event: any, d: {text :string, value : number}){
        if (tooltipRef.current) {
            const pTag = tooltipRef.current.querySelector('p');

            tooltipRef.current.style.left = `${(event.offsetX)}px`;
            tooltipRef.current.style.top = `${(event.offsetY - 30)}px`;

            tooltipRef.current.style.opacity = "1";
            tooltipRef.current.style.visibility = "visible";

            if(pTag) {
                pTag.textContent = `${d.text} : ${d.value}`;
            }
        }
    };

    function handleMouseOut(){
        if (tooltipRef.current) {
            tooltipRef.current.style.opacity = "0";
            tooltipRef.current.style.visibility = "hidden";
        }
    };

    if(keyWordData.length === 0) return <ErrorContainer errorMessage="데이터가 존재하지 않습니다." />

    return (
        <>
            <button 
                className="float-start refresh-btn" 
                onClick={() => {router.refresh()}}
            >
                <FontAwesomeIcon icon={faArrowsRotate} />
            </button>
            <div style={{clear : 'both'}}/>
            <div 
                className="mt-4 mb-2" 
                style={{
                    maxWidth : '400px', 
                    margin : 'auto', 
                    cursor : 'pointer',
                    position : 'relative'
                }}
                onMouseLeave={handleMouseOut}
            >
                <WordCloud
                    data={keyWordData}
                    width={200}
                    height={200}
                    font="Impact" 
                    fontWeight="bold"
                    spiral="rectangular"
                    fontSize={valueCount(highValue)}
                    padding={2}
                    random={Math.random}
                    fill='black' // 각 단어에 색상 적용
                    onWordMouseOver={handleMouseOver}
                />
                <div 
                    ref={tooltipRef}
                    className="tooltip" 
                    style={{
                        width : 120, 
                        zIndex : 100, 
                    }}
                >
                    <p className='m-0 text-center'>
                        {/* keywword label text */}
                        text : value
                    </p> 
                </div>
            </div>
        </>
    )
}