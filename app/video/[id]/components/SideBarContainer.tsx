export default function SideBarContainer(){
    return (
        <div 
            className="w-100 bg-secondary p-2" 
            style={{height : '100vh', margin : 'auto', position : 'sticky', top:0}}
        >
            <div className="row w-100" style={{margin : 'auto'}}>
                <div className="col-3 col-sm-12">
                    <a href="#video">영상</a>
                </div>
                <div className="col-3 col-sm-12">
                    <a href="#topicality">화제성 분석</a>
                </div>
                <div className="col-3 col-sm-12">
                    <a href="#feeling">감정 분석</a>
                </div>
                <div className="col-3 col-sm-12">
                    <a href="#keyword">키워드 분석</a>
                </div>
            </div>
        </div>
    )
}