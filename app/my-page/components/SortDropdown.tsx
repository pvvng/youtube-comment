import "@/app/css/radio.css";

import React, { useState } from 'react';
import { SortButtonSVG } from '@/app/SvgContainer';

/** 정렬 드롭다운 컴포넌트 */
export default function SortDropdown() {
    const [selectedOption, setSelectedOption] = useState<string>("기본");

    // 이벤트 타입을 React.ChangeEvent<HTMLInputElement>로 설정
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedText = event.target.nextElementSibling?.getAttribute('data-txt');
        if (selectedText) {
            const trimmedText = selectedText.slice(0, 2);
            setSelectedOption(selectedText);
            // onSortChange(trimmedText);
        }
    };

    return (
        <div className="position-relative mb-5">
            <div className="select">
                <div className="selected" data-default="정렬기준: " data-one="구독 순" data-two="이름 순" data-three="찜">
                    {selectedOption}
                    <SortButtonSVG />
                </div>
                <div className="options">
                    <div title="기본">
                        <input id="default" name="option" type="radio" checked={selectedOption === "기본"} onChange={handleOptionChange} />
                        <label className="option" htmlFor="default" data-txt="기본" />
                    </div>
                    <div title="구독 순">
                        <input id="subscription-date" name="option" type="radio" checked={selectedOption === "구독 순"} onChange={handleOptionChange} />
                        <label className="option" htmlFor="subscription-date" data-txt="구독 순" />
                    </div>
                    <div title="이름 순">
                        <input id="name" name="option" type="radio" checked={selectedOption === "이름 순"} onChange={handleOptionChange} />
                        <label className="option" htmlFor="name" data-txt="이름 순" />
                    </div>
                    <div title="찜">
                        <input id="favorites" name="option" type="radio" checked={selectedOption === "찜"} onChange={handleOptionChange} />
                        <label className="option" htmlFor="favorites" data-txt="찜" />
                    </div>
                </div>
            </div>
        </div>
    );
};



