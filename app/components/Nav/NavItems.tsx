'use client'

import { useRouter } from "next/navigation"
import { useValue } from "./ValueContext";

export default function NavLogoContainer(){
    const router = useRouter();
    const { value, changeValue, changeSearch, inputRef } = useValue();
   
    const handleClick = () => {
        if (value) {
            // value가 true일 때의 동작
            changeValue(false); // 뒤로가기가 눌렸으니 다시 홈버튼으로 변환
            changeSearch(false); //버튼 기능 되돌리기    
            //버튼으로 이름바꾸기 useState에 눈에 들어오게 변수 이름 변경 
            if (inputRef.current) {
                inputRef.current.classList.add('hidden');
            }
        } else {
            // value가 false일 때의 동작
            router.push('/'); // 홈으로 이동
        }
    };
    
    return (
        <button onClick={handleClick}>
            {value ? '뒤로가기' : '홈으로'}
        </button>
    );
}

