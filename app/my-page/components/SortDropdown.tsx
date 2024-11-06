import { useState } from 'react';

interface SortDropdownProps {
    onSortChange: (value: string) => void; 
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSortChange }) => {
    const [selectedOption, setSelectedOption] = useState<string>('기본'); 

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value);
        onSortChange(value); // 부모 컴포넌트에 선택된 값 전달
    };

    return (
        <>
        <label htmlFor="sortButton" className="form-label mb-0" style={{ fontSize: '0.9rem' }}>정렬 기준:</label>
        <select value={selectedOption} onChange={handleChange} 
            id="sortButton" className="form-select form-select-sm">
        
            <option value="기본">기본</option>
            <option value="구독 일자 순">구독 일자 순</option>
            <option value="이름 순">이름 순</option>
            <option value="총 조회수 순">총 조회수 순</option>
            <option value="구독자 순">구독자 순</option>
        </select>
        </>
    );
};

export default SortDropdown;