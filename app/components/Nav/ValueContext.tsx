'use client'
import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';

interface ValueContextType {
    value: boolean;
    changeValue: (newValue: boolean) => void;
    search: boolean;
    changeSearch: (newValue: boolean) => void;
    inputRef: React.RefObject<HTMLInputElement>; // inputRef 추가
}

const ValueContext = createContext<ValueContextType | undefined>(undefined);

interface ValueProviderProps {
    children: ReactNode; // children의 타입을 ReactNode로 정의
}

export const ValueProvider: React.FC<ValueProviderProps> = ({ children }) => {
    const [value, setValue] = useState(false);
    const [search, setserch] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null); // inputRef 생성
    const changeValue = (newValue: boolean) => {
        setValue(newValue);
    };
    const changeSearch = (newValue: boolean) => {
        setserch(newValue);
    };
    return (
        <ValueContext.Provider value={{ value, changeValue, search, changeSearch, inputRef }}>
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
