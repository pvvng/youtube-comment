'use client';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { checkVideoId } from "@/@util/hooks/checkVideoId";
import { handleFocus } from '@/@util/functions/input/handleFocus';

export default function LadingSearchButton(){

    const router = useRouter();
    const inputRef = useRef<HTMLInputElement | null>(null);

    return(
        /* From Uiverse.io by 0xnihilism */ 
        <div className="input__container">
            <div className="shadow__input"></div>
            <button 
                className="input__button__shadow"
                onClick={() => checkVideoId(inputRef, router)}
            >
                <FontAwesomeIcon icon={faSearch} />
            </button>
            <input
                type="text"
                name="search-input"
                className="input__search"
                placeholder="유튜브 영상 url을 입력하세요!"
                ref={inputRef}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        checkVideoId(inputRef, router);
                    }
                }}
                // input 클릭 시 전체 선택
                onFocus={() => handleFocus(inputRef)}
            />
        </div>

    )
}