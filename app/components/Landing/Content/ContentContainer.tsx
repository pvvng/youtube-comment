import { faChartSimple, faArrowUpAZ, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ContentContainer(){
    return (
        <div className='mt-3 p-2 container'>
            <div className="row row-center" style={{margin : 'auto'}}>
                {
                    LetterContent.map(content => {
                        return <LetterContainer key={content.id} {...content} />
                    })
                }
            </div>
        </div>
    )
}

interface PropsType { 
    title : string;
    description : string;
    icon : IconDefinition;
};

function LetterContainer(props : PropsType){
    return(
        <div className="col-12 col-sm-6 col-lg-4">
            <div className="letter-card mb-4">
                <div>
                    <span className="card__title fw-bold">
                        <FontAwesomeIcon icon={props.icon} />
                        {' ' + props.title}
                    </span>
                    <p className="card__content">
                        {props.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

const LetterContent = [
    {
        id : 0, 
        title: '키워드 분석',
        description : '댓글에서 자주 사용된 베스트 키워드를 최대 100개까지 분석하여 워드 클라우드 형태로 제공합니다.', 
        icon : faArrowUpAZ
    }, 
    {
        id : 1, 
        title: '긍정/부정 분류', 
        description :'긍정적인 댓글, 부정적인 댓글, 중립적인 댓글의 비율을 그래프로 확인할 수 있습니다.',
        icon : faChartSimple
    }, 
    {
        id : 2, 
        title: '구글 계정 연동', 
        description :'구글 아이디로 로그인하여 구독한 유튜버에 대한 분석을 진행할 수 있습니다.',
        icon : faGoogle
    }
];