'use client'

import { useRef } from "react"
import { handleFocus } from "@/@util/functions/input/handleFocus";
import { useRouter } from "next/navigation";
import { checkVideoId } from "@/@util/functions/input/checkVideoId";

/** video 검색 input component */
export default function InputContainer(){

    const router = useRouter();
    const inputRef = useRef<HTMLInputElement|null>(null);
    
    return(
        <div>
            <input 
                ref={inputRef} 
                onKeyDown={(e) => {
                    if (e.key === 'Enter') checkVideoId(inputRef, router);
                }}
                // input 클릭 시 전체 선택
                onFocus={() => handleFocus(inputRef)} 
            />
            <button onClick= { () => checkVideoId(inputRef, router) } >
                검색
            </button>
        </div>
    )
}

