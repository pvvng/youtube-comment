'use client'

interface ListcountainerProps {
    Heartnumber: number[]; // Heartnumber 배열의 타입
    onOptionSelect: (index: number) => void;
}



export default function Listcountainer({ Heartnumber, onOptionSelect } : ListcountainerProps) {
   
    const HeartnumbList = Heartnumber;

    return (
        // <>
        //     <div className="mt-4">
        //         <ul className="list-group">
        //             <li className="list-group-item d-flex justify-content-between align-items-center"
        //                  onClick={() => onOptionSelect(0)}>
        //                 구독목록 살펴보기
        //                 <span className="badge bg-primary rounded-pill">{HeartnumbList[0]}</span>
        //             </li>
        //             <li className="list-group-item d-flex justify-content-between align-items-center"
        //                  onClick={() => onOptionSelect(1)}>
        //                 찜한 유투버 살펴보기
        //                 <span className="badge bg-primary rounded-pill">{HeartnumbList[1]}</span>
        //             </li>
        //             <li className="list-group-item d-flex justify-content-between align-items-center"
        //                   onClick={() => onOptionSelect(2)}>
        //                 찜한 영상 살펴보기
        //                 <span className="badge bg-primary rounded-pill">{HeartnumbList[2]}</span>
        //             </li>
        //         </ul>
        //         <hr />
        //     </div>
        //     </>
        //     )
   
            <div className="mt-4">
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item d-flex justify-content-between align-items-center"
                    onClick={() => onOptionSelect(0)}>
                    구독목록 살펴보기
                    <span className="badge bg-primary rounded-pill ms-2">{HeartnumbList[0]}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center"
                    onClick={() => onOptionSelect(1)}>
                    찜한 유투버 살펴보기
                    <span className="badge bg-primary rounded-pill ms-2">{HeartnumbList[1]}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center"
                    onClick={() => onOptionSelect(2)}>
                    찜한 영상 살펴보기
                    <span className="badge bg-primary rounded-pill ms-2">{HeartnumbList[2]}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center"
                    onClick={() => onOptionSelect(2)}>
                    분석한 영상 살펴보기
                    <span className="badge bg-primary rounded-pill ms-2">{HeartnumbList[2]}</span>
                </li>
            </ul>
        
           
        </div>

    )

}