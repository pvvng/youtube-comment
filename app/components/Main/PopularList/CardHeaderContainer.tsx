interface PropsType {
    type: string;
}

export default function CardHeaderContainer(
    {type} : PropsType
){
    return (
        <>
            <div className="card-header-container text-center" style={{margin : 'auto'}}>
                <span className="fw-bold m-0">
                    {
                        type === "video" ? 
                        <span>인기 급상승 영상</span>: 
                        type === "youtuber" ? 
                        <span>인기 급상승 유튜버</span>:
                        <span>upexpected type</span>
                    }
                </span>
            </div>
            <hr className="m-0 mb-3" />
        </>
    )
}