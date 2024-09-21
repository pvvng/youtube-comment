import { RefObject } from "react";

/** input focus handler 함수 */
export function handleFocus(
    inputRef : RefObject<HTMLInputElement>
){
    const inputElement = inputRef.current;
    if (inputElement && inputElement.value) {
        // 값이 존재할 때 전체 선택
        inputElement.select(); 
    }
};