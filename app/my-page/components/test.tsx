import React, { useState } from 'react';

const MyNewComponent: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const HeartnumbList: number[] = [5, 3, 8]; // 예시 데이터

    const onOptionSelect = (index: number) => {
        setSelectedOption(index);
    };

    return (
        <div className="mt-4">
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item d-flex justify-content-between align-items-center"
                    onClick={() => onOptionSelect(0)}>
                    구독목록 살펴보기
                    <span className="badge bg-primary rounded-pill ms-2">{HeartnumbList[0]}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center"
                    onClick={() => onOptionSelect(1)}>
                    찜한 유투버 살펴보기
                    <span className="badge bg-primary rounded-pill ms-2">{HeartnumbList[1]}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center"
                    onClick={() => onOptionSelect(2)}>
                    찜한 영상 살펴보기
                    <span className="badge bg-primary rounded-pill ms-2">{HeartnumbList[2]}</span>
                </li>
            </ul>
            <hr />
            {selectedOption !== null && (
                <div className="mt-0"> {/* 마진을 0으로 설정하여 붙어있게 함 */}
                    <p>선택한 옵션: {selectedOption === 0 ? '구독목록' : selectedOption === 1 ? '유투버' : '영상'}</p>
                </div>
            )}
        </div>
    );
};

export default MyNewComponent;