import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const EXPLAIN_CONTENT = [
    {msg : "유튜뷰는 한국어 분석만 지원합니다."},
    {msg : "유튜뷰의 분석 결과가 항상 정확한 것은 아닙니다. 참고용으로만 활용해주세요."},
    {msg : "유튜뷰는 개인정보를 저장하지 않습니다."},

]

export default function ExplainContainer (){
    return(
        <div className="p-3 container">
            <div className="row row-center w-100 m-auto">
                <div className="col-12">
                    <div className="popular-card m-auto text-center mb-4">
                        <span className="card__title fw-bold">
                            <FontAwesomeIcon icon={faTriangleExclamation} />{' '}주의사항
                        </span>
                        {EXPLAIN_CONTENT.map((v, i) => <p className="fw-bold" key={v.msg + i}>{i+1}. {v.msg}</p>)}
                    </div>
                </div>
            </div>
        </div>
    )
}