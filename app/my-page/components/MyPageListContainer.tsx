'use client'

import { useMyPageListStore } from "@/app/store";

interface PropsType {
    heartList: {
        length: number;
        name: string;
    }[]; // Heartnumber 배열의 타입
}

export default function MyPageListContainer({ heartList } : PropsType) {

    const { selectedOption, updateSelectedOption } = useMyPageListStore();

    return (
        <>
            <div className="mt-4">
                <div className="list-item-container row row-center w-100">
                    {
                        heartList.map((v, i) => 
                            <div 
                                key={v.name} 
                                className="fw-bold col-4 position-relative p-2 pt-4 border rounded-top text-hide"
                                style={{
                                    transition : 'all 0.3s',
                                    backgroundColor: selectedOption[i] ? '#175fb8' : 'white',
                                    color: selectedOption[i] ? 'white' : 'black',
                                }}
                                onClick={() => updateSelectedOption(i)}
                            >
                                {v.name}
                                <span 
                                    className="badge list-badge m-1"
                                    style={{
                                        borderRadius : '9999px',
                                        backgroundColor: selectedOption[i] ? 'white' : '#175fb8',
                                        color: selectedOption[i] ? 'black' : 'white',
                                    }}
                                >{v.length}</span>
                            </div>
                        )
                    }
                </div>
            </div>
            <div style={{clear : 'both'}} />
        </>
    )

}