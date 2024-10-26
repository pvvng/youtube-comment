'use client'

import { useRouter } from "next/navigation"
import { useValue } from "./ValueContext";


/**홈버튼과 뒤로가기 버튼 구현 */
export default function NavLogoContainer(){
    const router = useRouter();
    const { inputRef, state, onResize } = useValue();

    /**뒤로가기 버튼 기능 함수 */
    const handleClick = () => {
        if (state[0]) {
            onResize(false,1);
            onResize(false,0);

            if (inputRef.current) {
                inputRef.current.classList.add('hidden');
            }
        } else {
            router.push('/'); // 홈으로 이동
        }
    };
    
    return (
        <button onClick={handleClick}>
            {state[0]? '뒤로가기' : ' 홈으로'}
        </button>
    );
}

