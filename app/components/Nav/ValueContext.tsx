'use client'
import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';

interface ValueContextType {
    state: boolean[];
    onResize: (nextValue: boolean, num: number) => void;
    inputRef: React.RefObject<HTMLInputElement>; // inputRef 추가
}

const ValueContext = createContext<ValueContextType | undefined>(undefined);

interface ValueProviderProps {
    children: ReactNode; // children의 타입을 ReactNode로 정의
}

export const ValueProvider: React.FC<ValueProviderProps> = ({ children }) => {
    const [state, setState] = useState([false, true]);
    const inputRef = useRef<HTMLInputElement | null>(null); // inputRef 생성

    const onResize = (nextValue: boolean, num: number) => {
        setState(prevState => {
            const newState = [...prevState]; // 이전 상태를 복사
            newState[num] = nextValue; // num 인덱스의 값을 업데이트
            return newState; // 새로운 상태 반환
        });
    }

    return (
        <ValueContext.Provider value={{ inputRef, state, onResize }}>
            {children}
        </ValueContext.Provider>
    );
};
export const useValue = () => {
    const context = useContext(ValueContext);
    if (context === undefined) {
        throw new Error('useValue must be used within a ValueProvider');
    }
    return context;
};
