'use client';

export default function SideBarContainer(){

    return (
        <div 
            className="w-100 bg-secondary p-2" 
            style={{height : '100vh', margin : 'auto', position : 'sticky', top:0}}
        >
            <h2>사이드바</h2>
            <div className="row w-100" style={{margin : 'auto'}}>
                <div className="col-3 col-sm-12">
                    <button className="w-100">영상</button>
                </div>
                <div className="col-3 col-sm-12">
                    <button className="w-100">화제성 분석</button>
                </div>
                <div className="col-3 col-sm-12">
                    <button className="w-100">감정 분석</button>
                </div>
                <div className="col-3 col-sm-12">
                    <button className="w-100">키워드 분석</button>
                </div>
            </div>
        </div>
    )
}