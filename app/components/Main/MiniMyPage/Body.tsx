import CardContainer from "../CardContainer";

export default function MiniMyPageBody(){
    return(
        <div className="w-100 bg-secondary p-2" style={{minHeight : '200px'}}>
            <h4>찜한 동영상</h4>
            <CardContainer n={3} />
            <h4>찜한 유튜버</h4>
            <CardContainer n={3} />
            <h4>구독 목록</h4>
            <CardContainer n={3} />
            <button className="float-end">마이페이지</button>
            <div style={{clear : 'both'}}></div>
        </div>
    )
}