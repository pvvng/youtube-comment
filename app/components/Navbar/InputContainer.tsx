"use client";

import '@/app/css/nav.css';
import { useRef } from "react";
import { handleFocus } from "@/@util/functions/input/handleFocus";
import { useRouter } from "next/navigation";
import { checkVideoId } from "@/@util/hooks/checkVideoId";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

/** video 검색 input component */
export default function InputContainer(){

    const router = useRouter();
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div 
            className="input-container text-center"
        >
            <input 
                className="input"
                placeholder="Search something..." 
                name="text" 
                type="text"
                ref={inputRef}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        checkVideoId(inputRef, router);
                    }
                }}
                // input 클릭 시 전체 선택
                onFocus={() => handleFocus(inputRef)}
        />
            <button 
                className='search-button'
                onClick={() => checkVideoId(inputRef, router)}
            >
                <FontAwesomeIcon icon={faSearch}/>
            </button>
        </div>
    );
}