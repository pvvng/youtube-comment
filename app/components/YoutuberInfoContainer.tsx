import { Dispatch, SetStateAction, useEffect } from "react";

interface PropsType {
    name : string;
    info : string; 
    infoClicker : [number, number, "visible" | "hidden"]; 
    setInfoClicker: Dispatch<SetStateAction<[number, number, "visible" | "hidden"]>>;
}

export default function YoutuberInfoContainer({name, info, infoClicker, setInfoClicker} : PropsType){
    const splitedInfo = info.split('\n');
    return (
        <div 
            id="overlay" 
            className="alert-overlay"
            style={{
                zIndex : infoClicker[0],
                opacity : infoClicker[1],
                visibility : infoClicker[2]
            }} 
            onClick={(e) => {
                let target = e.target as HTMLElement
                if(target.id === 'overlay') setInfoClicker([0, -10000, 'hidden'])
            }}
        >
            <div style={{background : 'white', borderRadius : 10, minWidth : '200px'}}>
                {/* head */}
                <div 
                    className="bg-black w-100 p-2 text-center" 
                    style={{
                        color : 'white', 
                        borderTopLeftRadius : 10, 
                        borderTopRightRadius : 10
                    }}
                ><span className="fw-bold">{name}</span></div>
                {/* body */}
                <div className="p-3">
                    {splitedInfo.map((si, i) => <p key={si +i} className="">{si}</p>)}
                    <button 
                        className="btn btn-dark float-end" 
                        onClick={() => setInfoClicker([0, -10000, 'hidden'])}
                    >닫기</button>
                    <div style={{clear : 'both'}} />
                </div>
            </div>
        </div>
    )
}